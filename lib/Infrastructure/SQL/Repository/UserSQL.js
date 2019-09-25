"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Библиотеки
const utf8 = require('utf8');
const uniqid = require('uniqid');
var md5 = require('md5');
const BaseSQL_1 = require("../../../System/BaseSQL");
const UserE_1 = require("../Entity/UserE");
const UserTokenE_1 = require("../Entity/UserTokenE");
const UserSmsCodeE_1 = require("../Entity/UserSmsCodeE");
/**
 * Здесь методы для SQL запросов
 */
class UserSQL extends BaseSQL_1.default {
    constructor(req) {
        super(req);
    }
    /**
     * Получить список пользователей
     *
     * @param integer iOffset
     * @param integer iLimit
     * @param array sSearchFIO
     * @return array|null
     */
    async getUserList(iOffset, iLimit, aFilter) {
        let ok = this.errorSys.isOk();
        let sql = '';
        // Декларирование ошибок
        this.errorSys.declare([
            'get_user' // получение пользователей
        ]);
        let sSearchFIO = "";
        if (aFilter.search_fullname) {
            sSearchFIO = aFilter.search_fullname;
        }
        let sSearchUserName = "";
        if (aFilter.search_username) {
            sSearchUserName = aFilter.search_username;
        }
        let bSearchUserName = false; // Использовать поиск по имени или нет
        if (sSearchUserName) {
            bSearchUserName = true;
        }
        let bSearchFIO = false; // Использовать поиск по ФИО или нет
        if (sSearchFIO) {
            bSearchFIO = true;
        }
        let resp = null;
        if (ok) {
            sql = `
                SELECT
                    u.id,
                    u.name,
                    u.fullname,
                    u.login,
                    u.email,
                    u.avatar
                FROM ${UserE_1.UserE.NAME} u
                WHERE
                    CASE WHEN :if_search_username THEN u.name LIKE :search_username ELSE true END
                AND
                    CASE WHEN :if_search_fullname THEN u.fullname LIKE :search_fullname ELSE true END
                LIMIT :limit
                OFFSET :offset
                ;
            `;
            try {
                resp = (await this.db.raw(sql, {
                    'offset': iOffset,
                    'limit': iLimit,
                    'if_search_username': bSearchUserName,
                    'if_search_fullname': bSearchFIO,
                    'search_username': '%' + sSearchUserName + '%',
                    'search_fullname': '%' + sSearchFIO + '%'
                }))[0];
            }
            catch (e) {
                ok = false;
                this.errorSys.errorEx(e, 'get_user', 'Не удалось получить пользователя');
            }
        }
        return resp;
    }
    /**
     * Получить пользователя по ID
     *
     * @param integer idUser
     * @return array|null
     */
    async getUserByID(idUser) {
        let ok = this.errorSys.isOk();
        let resp = null;
        let sql = '';
        // Декларация ошибок
        this.errorSys.declare([
            'get_user'
        ]);
        sql = `
            SELECT
                u.id,
                u.name,
                u.email,
                u.avatar,
                u.fullname
            FROM ${UserE_1.UserE.NAME} u
            WHERE u.id = :user_id
            LIMIT 1
        `;
        try {
            resp = (await this.db.raw(sql, {
                'user_id': idUser
            }))[0];
            if (resp.length > 0) {
                resp = resp[0];
            }
            else {
                resp = null;
            }
        }
        catch (e) {
            ok = false;
            this.errorSys.errorEx(e, 'get_user', 'Не удалось получить пользователя');
        }
        return resp;
    }
    /* выдает инфу по юзеру по token */
    async fGetUserInfoByToken(token = '') {
        let ok = true;
        let resp = null;
        // Декларация ошибок
        this.errorSys.declare([
            'user_info_by_token'
        ]);
        if (ok) {
            let sql = `
                SELECT  
                    u.id,
                    u.name,
                    u.email,
                    u.avatar
                FROM ${UserE_1.UserE.NAME} u
                JOIN ${UserTokenE_1.UserTokenE.NAME} ut ON ut.user_id = u.id

                where ut.token= :token

                limit 1
            `;
            try {
                resp = (await this.db.raw(sql, {
                    'token': token
                }))[0];
                if (resp.length > 0) {
                    resp = resp[0];
                }
                else {
                    resp = null;
                }
            }
            catch (e) {
                ok = false;
                this.errorSys.error('user_info_by_token', 'Не удалось получить информацию о пользователе');
            }
        }
        return resp;
    }
    /**
     * проверка на то что есть token в базе
     */
    async isAuth(token = '') {
        let bResp = false;
        let sql = '';
        let ok = true;
        let resp = null;
        // Декларация ошибок
        this.errorSys.declare([
            'api_key_in_db'
        ]);
        /* если ключ больше 4 */
        if (token.length > 4) {
            if (await this.redisSys.get('is_auth_' + token)) {
                bResp = true;
                this.errorSys.devNotice(`cache:UserSQL.isAuth(${token})`, 'Взято из кеша');
            }
            else {
                //Получаем одного пользователя
                sql = `
                    select ut.token from ${UserTokenE_1.UserTokenE.NAME} ut

                    where ut.token= :token order by ut.token desc

                    limit 1;
                `;
                try {
                    resp = (await this.db.raw(sql, {
                        'token': token
                    }))[0];
                    if (resp.length > 0) {
                        bResp = true;
                        this.redisSys.set('is_auth_' + token, 1, 3600);
                    }
                }
                catch (e) {
                    ok = false;
                    this.errorSys.error('api_key_in_db', 'Не удалось проверить token');
                }
            }
        }
        return bResp;
    }
    /**
     * выдает id юзера по телефону и смс из таблицы user_sms_code
     */
    async getUserIdByPhoneAndSms(tel, sms) {
        let ok = this.errorSys.isOk();
        // Декларация ошибок
        this.errorSys.declareEx({
            'get_user_id_by_tel_and_sms': 'Не удалось найти пользователя с таким телефоном'
        });
        let idUser = 0;
        if (ok) { /* дата создания смски сегодня или никогда */
            let sql = `
                SELECT 
                    usc.user_id 
                FROM ${UserSmsCodeE_1.UserSmsCodeE.NAME} usc
                WHERE
                    usc.tel= :tel
                AND
                    usc.code= :sms
                AND 
                    (um.created_at + INTERVAL 1 DAY) between NOW() and (NOW() + INTERVAL 1 DAY) 
                LIMIT 1
            `;
            try {
                let respUserList = (await this.db.raw(sql, {
                    'tel': tel,
                    'sms': sms
                }))[0];
                if (respUserList.length > 0) {
                    idUser = respUserList[0]['user_id'];
                }
            }
            catch (e) {
                ok = false;
                this.errorSys.errorEx(e, 'get_user_id_by_tel_and_sms', 'Не удалось найти пользователя с таким телефоном');
            }
        }
        return idUser;
    }
    /* выдает строчку инфы из базы по логину об юзере */
    async getUserByUsername(username) {
        let ok = true;
        let resp = null;
        // Декларация ошибок
        this.errorSys.declare([
            'api_key_in_db'
        ]);
        if (ok) {
            /* todo прикрутить reddis */
            let sql = `
                SELECT *
                FROM ${UserE_1.UserE.NAME}
                WHERE username_clean = :username limit 1
                ;
            `;
            try {
                resp = (await this.db.raw(sql, {
                    'username': utf8.encode(username),
                }))[0];
                if (resp.length > 0) {
                    resp = resp[0];
                }
                else {
                    resp = null;
                }
            }
            catch (e) {
                ok = false;
                this.errorSys.error('api_key_in_db', 'Не удалось проверить token');
            }
        }
        return resp;
    }
    /* выдает token по user_id */
    async getUserToken(user_id) {
        let ok = true;
        let resp = null;
        // Декларация ошибок
        this.errorSys.declare([
            'api_key_in_db'
        ]);
        let token = null;
        if (ok) { /* выбираем последний из вставленных */
            let sql = `
                select * from ${UserTokenE_1.UserTokenE.NAME} ut
                where ut.user_id = :user_id
                order by ut.user_token_id desc
                limit 1
                ;
            `;
            try {
                resp = (await this.db.raw(sql, {
                    'user_id': user_id,
                }))[0];
                if (resp.length > 0) {
                    token = resp[0]['token'];
                }
                else {
                    token = null;
                }
            }
            catch (e) {
                ok = false;
                this.errorSys.error('api_key_in_db', 'Не удалось проверить token');
            }
        }
        return token;
    }
    /* вставляет ключ для юзера */
    /* ничего не проверяет только вставляет */
    async insertUserToken(user_id) {
        let ok = true;
        let sql = '';
        let token = this.generateToken();
        // Декларация ошибок
        this.errorSys.declare([
            'inser_key_for_user'
        ]);
        user_id = Number(user_id);
        sql = `INSERT INTO ${UserTokenE_1.UserTokenE.NAME} (\`user_id\`, \`token\`) VALUES (:user_id, :api_key)`;
        let resp = null;
        try {
            resp = await this.db('user_token').insert({
                api_key: token,
                user_id: user_id,
            });
        }
        catch (e) {
            ok = false;
            this.errorSys.error('inser_key_for_user', 'Не удалось вставить ключ пользователя');
        }
        if (ok) {
            return token;
        }
        else {
            return null;
        }
    }
    /* генерирует token */
    generateToken(max = 20) {
        /* md5 от текущей даты-вермени + рандом */
        return uniqid(md5(new Date().getTime()));
    }
    /* выдает инфу по юзеру по id */
    async fGetUserInfoById(userId) {
        let ok = true;
        let resp = null;
        // Декларация ошибок
        this.errorSys.declare([
            'api_key_in_db'
        ]);
        let sql = `
            select u.* from ${UserE_1.UserE.NAME} u

            where u.user_id= :user_id

            limit 1
        `;
        try {
            resp = (await this.db.raw(sql, {
                'user_id': userId,
            }))[0];
            if (resp.length > 0) {
                resp = resp[0];
            }
            else {
                resp = null;
            }
        }
        catch (e) {
            ok = false;
            this.errorSys.error('api_key_in_db', 'Не удалось проверить token');
        }
        return resp;
    }
}
exports.UserSQL = UserSQL;
//# sourceMappingURL=UserSQL.js.map