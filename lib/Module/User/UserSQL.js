"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lib_1 = require("@a-a-game-studio/aa-classes/lib");
const HashFunc_1 = require("../../System/HashFunc");
class UserSQL extends lib_1.UserModule.UserDB {
    constructor(errorSys, db) {
        super(errorSys);
        this.db = db;
    }
    /**
    * Получить пользователя по его id
    * @param userId
    */
    async faGetInfoById(userId) {
        let res;
        const errorString = this.fClassName() + '.' + this.fMethodName();
        let sql = `SELECT * from 
                ${lib_1.UserModule.UserE.NAME} u 
            where u.id = :userId 
            LIMIT 1`;
        try {
            let result = await this.db.raw(sql, {
                'userId': userId,
            });
            res = result[0][0];
        }
        catch (e) {
            this.errorSys.error(errorString, String(e));
        }
        return res;
    }
    /**
    * Получить пользователя по его token
    * @param userId
    */
    async faGetUserInfoByToken(sToken) {
        let res;
        const errorString = this.fClassName() + '.' + this.fMethodName();
        let sql = `SELECT u.* FROM ${lib_1.UserModule.UserE.NAME} u

            JOIN ${lib_1.UserModule.UserTokenE.NAME} ut
            ON ut.user_id=u.id
            
            WHERE ut.token = :token LIMIT 1`;
        try {
            let result = await this.db.raw(sql, {
                'token': sToken,
            });
            res = result[0][0];
        }
        catch (e) {
            this.errorSys.error(errorString, String(e));
        }
        return res;
    }
    /**
     * Список пользователей
     * @param arg
     */
    async faGetUserList(arg) {
        let res;
        const errorString = this.fClassName() + '.' + this.fMethodName();
        let sql = `SELECT * from ${lib_1.UserModule.UserE.NAME} u  LIMIT 10`;
        try {
            let result = await this.db.raw(sql, {});
            res = result[0];
        }
        catch (e) {
            this.errorSys.error(errorString, String(e));
        }
        return res;
    }
    /**
     * Регистрация по логину и паролю
     * @param login
     * @param pass
     * @param passConfirm
     *
     * @returns token: string
     */
    async faRegisterByLoginAndPass(sLogin, sPass) {
        let token = HashFunc_1.generateToken();
        const errorString = this.fClassName() + '.' + this.fMethodName();
        try {
            /* inser user */
            let newUser = {
                login: sLogin,
                pass: HashFunc_1.PassToHash(sPass),
                hash: HashFunc_1.generateToken()
            };
            // Валидируем входящие данные
            if (!this.modelValidatorSys.fValid(this.userE.getRulesInsert(), newUser)) {
                throw 'validation error';
            }
            let d = await this.db(lib_1.UserModule.UserE.NAME)
                .insert(this.modelValidatorSys.getResult());
            if (!d) {
                throw 'err insert';
            }
            let userId = d[0];
            /* insert token */
            await this.db(lib_1.UserModule.UserTokenE.NAME)
                .insert({
                user_id: userId,
                token: token,
            });
        }
        catch (e) {
            this.errorSys.error(errorString, String(e));
        }
        return token;
    }
    /**
     * Выдает токен по логину и паролю
     * @param login
     * @param pass
     * @returns token
     */
    async faGetTokenByLoginAndPass(sLogin, sPass) {
        let res = '';
        const errorString = this.fClassName() + '.' + this.fMethodName();
        let sql = `SELECT ut.token FROM ${lib_1.UserModule.UserE.NAME} u

            JOIN ${lib_1.UserModule.UserTokenE.NAME} ut
                ON u.id=ut.user_id
            
            WHERE            
                u.login= :login
                AND
                u.pass= :pass 
            LIMIT 1`;
        try {
            let result = await this.db.raw(sql, {
                'login': sLogin,
                'pass': HashFunc_1.PassToHash(sPass),
            });
            res = result[0][0]['token'];
        }
        catch (e) {
            this.errorSys.error(errorString, String(e));
        }
        return res;
    }
    /**
     * Обновлене инфы об юзере
     * @param data
    */
    async faUpdate(data) {
        const errorString = this.fClassName() + '.' + this.fMethodName();
        try {
            // Валидируем входящие данные
            if (!this.modelValidatorSys.fValid(this.userE.getRulesUpdate(), data)) {
                throw 'validation error';
            }
            await this.db(lib_1.UserModule.UserE.NAME)
                .where({
                id: data.id
            })
                .update(this.modelValidatorSys.getResult());
        }
        catch (e) {
            this.errorSys.error(errorString, String(e));
        }
        return this.errorSys.isOk();
    }
}
exports.UserSQL = UserSQL;
//# sourceMappingURL=UserSQL.js.map