"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Библиотеки
const utf8 = require('utf8');
const uniqid = require('uniqid');
const uuidv4 = require('uuid/v4');
var md5 = require('md5');
const BaseSQL_1 = require("../../../System/BaseSQL");
const UserTokenE_1 = require("../Entity/UserTokenE");
/**
 * Здесь методы для SQL запросов
 */
class UserTokenSQL extends BaseSQL_1.default {
    // ==========================
    // SELECT
    // ==========================
    /**
     * проверка на то что есть apikey в базе
     */
    async isAuth(apikey = '') {
        let bResp = false;
        let sql = '';
        let ok = true;
        let resp = null;
        // Декларация ошибок
        this.errorSys.declare([
            'api_key_in_db'
        ]);
        /* если ключ больше 4 */
        if (apikey.length > 4) {
            if (await this.redisSys.get('is_auth_' + apikey)) {
                bResp = true;
                this.errorSys.devNotice(`cache:UserSQL.isAuth(${apikey})`, 'Взято из кеша');
            }
            else {
                //Получаем одного пользователя
                sql = `
                    SELECT 
                        ut.token
                    FROM ${UserTokenE_1.UserTokenE.NAME} ut
                    WHERE 
                        ut.token= :token 
                    ORDER BY ut.token DESC
                    LIMIT 1;
                `;
                try {
                    resp = (await this.db.raw(sql, {
                        'token': apikey
                    }))[0];
                    if (resp.length > 0) {
                        bResp = true;
                        this.redisSys.set('is_auth_' + apikey, 1, 3600);
                    }
                }
                catch (e) {
                    ok = false;
                    this.errorSys.error('api_key_in_db', 'Не удалось проверить apikey');
                }
            }
        }
        return bResp;
    }
    /**
     * Выдает apikey по user_id
     */
    async getUserApiKey(user_id) {
        let ok = true;
        let resp = null;
        // Декларация ошибок
        this.errorSys.declare([
            'api_key_in_db'
        ]);
        let token = null;
        if (ok) { /* выбираем последний из вставленных */
            let sql = `
                SELECT 
                    ut.* 
                FROM ${UserTokenE_1.UserTokenE.NAME} ut
                WHERE 
                    ut.user_id = :user_id
                ORDER BY ut.user_token_id DESC
                LIMIT 1
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
                this.errorSys.error('api_key_in_db', 'Не удалось проверить apikey');
            }
        }
        return token;
    }
    // ==========================
    // INSERT
    // ==========================
    /**
     * вставляет ключ для юзера
     * ничего не проверяет только вставляет
     * @param user_id
     */
    async insertUserApiKey(user_id) {
        let ok = true;
        let apikey = uniqid(uuidv4() + '-');
        // Декларация ошибок
        this.errorSys.declareEx({
            'db_inser_key_for_user': 'Не удалось вставить ключ пользователя'
        });
        let idUserToken = 0;
        try {
            idUserToken = await this.db('user_token').insert({
                api_key: apikey,
                user_id: user_id,
            });
        }
        catch (e) {
            ok = false;
            this.errorSys.error('inser_key_for_user', 'Не удалось вставить ключ пользователя');
        }
        if (ok) {
            return apikey;
        }
        else {
            return null;
        }
    }
}
exports.UserTokenSQL = UserTokenSQL;
//# sourceMappingURL=UserTokenSQL.js.map