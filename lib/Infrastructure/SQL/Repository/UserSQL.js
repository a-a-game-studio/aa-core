"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Библиотеки
const utf8 = require('utf8');
const BaseSQL_1 = require("../../../System/BaseSQL");
const UserE_1 = require("../Entity/UserE");
const UserTokenE_1 = require("../Entity/UserTokenE");
const HashFunc = require("../../../System/HashFunc");
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
                ORDER BY u.id DESC
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
            }))[0][0];
        }
        catch (e) {
            ok = false;
            this.errorSys.errorEx(e, 'get_user', 'Не удалось получить пользователя');
        }
        return resp;
    }
    /**
     * Получить идентификаторы пользователя по ID
     *
     * @param sToken
     */
    async getUserIDsByToken(sToken) {
        let ok = this.errorSys.isOk();
        let resp = null;
        let sql = '';
        // Декларация ошибок
        this.errorSys.declare([
            'get_user'
        ]);
        sql = `
            SELECT
                u.id as user_id,
                u.name,
                u.email,
                u.phone,
                ut.token
            FROM ${UserE_1.UserE.NAME} u
            LEFT JOIN ${UserTokenE_1.UserTokenE.NAME} ut ON ut.user_id = u.id
            WHERE ut.token = :token
            LIMIT 1
        `;
        try {
            resp = (await this.db.raw(sql, {
                'token': sToken
            }))[0][0];
        }
        catch (e) {
            ok = false;
            this.errorSys.errorEx(e, 'get_user', 'Не удалось получить пользователя');
        }
        return resp;
    }
    // ========================================
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
    /* выдает инфу по юзеру по id */
    async fGetUserInfoById(userId) {
        let ok = true;
        let resp = null;
        // Декларация ошибок
        this.errorSys.declare([
            'api_key_in_db'
        ]);
        let sql = `
            SELECT 
                u.*
            FROM ${UserE_1.UserE.NAME} u
            WHERE u.user_id= :user_id
            LIMIT 1
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
    /**
     * Для авторизации
     * Выдает токен по логину и паролю
     * @param login
     * @param pass
     * @returns token
     */
    async faGetTokenByLoginAndPass(sLogin, sPass) {
        let res = '';
        let sql = `
            SELECT ut.token FROM ${UserE_1.UserE.NAME} u
            JOIN ${UserTokenE_1.UserTokenE.NAME} ut ON u.id=ut.user_id
            WHERE            
                u.login= :login
            AND
                u.pass= :pass 
            LIMIT 1
        `;
        try {
            let result = await this.db.raw(sql, {
                'login': sLogin,
                'pass': HashFunc.fPassToHash(sPass),
            });
            res = result[0][0]['token'];
        }
        catch (e) {
            this.errorSys.errorEx(e, 'get_token_by_login_and_pass', 'Не удалось получить токен по логину и паролю');
        }
        return res;
    }
    // =================================
    // INSERT
    // =================================
    /**
     * Регистрация по логину и паролю
     * @param login
     * @param pass
     * @param passConfirm
     *
     * @returns token: string
     */
    async faRegister(data) {
        let token = HashFunc.fGenerateToken();
        let userE = new UserE_1.UserE();
        try {
            data.pswd = HashFunc.fPassToHash(data.pswd);
            // Валидируем входящие данные
            if (!this.modelValidatorSys.fValid(userE.getRulesInsert(), data)) {
                throw 'validation error';
            }
            let idUser = (await this.db(UserE_1.UserE.NAME)
                .insert(this.modelValidatorSys.getResult()))[0];
            /* insert token */
            await this.db(UserTokenE_1.UserTokenE.NAME)
                .insert({
                user_id: idUser,
                token: token,
            });
        }
        catch (e) {
            this.errorSys.error('register_user_by_login_and_pswd', 'Ошибка регистрации пользователя');
        }
        return token;
    }
    // =================================
    // UPDATE
    // =================================
    /**
     * Обновлене инфы об юзере
     * @param data
     */
    async faUpdate(data) {
        let userE = new UserE_1.UserE();
        try {
            // Валидируем входящие данные
            if (!this.modelValidatorSys.fValid(userE.getRulesUpdate(), data)) {
                throw 'validation error';
            }
            await this.db(UserE_1.UserE.NAME)
                .where({
                id: data.id
            })
                .update(this.modelValidatorSys.getResult());
        }
        catch (e) {
            this.errorSys.errorEx(e, 'save_user', 'Не удалось сохранить пользователя');
        }
        return this.errorSys.isOk();
    }
    // =========================================
    /**
     * Обновлене инфы об юзере
     * @param data
     */
    async faConfirmRegisterByID(idUser) {
        let userE = new UserE_1.UserE();
        try {
            await this.db(UserE_1.UserE.NAME)
                .where({
                id: idUser
            })
                .update({
                id_active: true
            });
        }
        catch (e) {
            this.errorSys.errorEx(e, 'confirm_register', 'Не удалось подтвердить регистрацию');
        }
        return this.errorSys.isOk();
    }
}
exports.UserSQL = UserSQL;
//# sourceMappingURL=UserSQL.js.map