import * as AAClasses from '@a-a-game-studio/aa-classes/lib';
import * as db from "knex";
import { PassToHash, generateToken } from '../../System/HashFunc';


export class UserSQL extends AAClasses.UserModule.UserDB {

    protected db: db;

    constructor(errorSys: AAClasses.Components.ErrorSys, db: db) {
        super(errorSys);
        this.db = db;
    }


    /**
    * Получить пользователя по его id
    * @param userId 
    */
    public async faGetInfoById(userId: number): Promise<AAClasses.UserModule.UserI> {
        let res: AAClasses.UserModule.UserI;
        const errorString = this.fClassName() + '.' + this.fMethodName();

        let sql = `SELECT * from 
                ${AAClasses.UserModule.UserE.NAME} u 
            where u.id = :userId 
            LIMIT 1`;
        try {
            let result = await this.db.raw(sql, {
                'userId': userId,
            });
            res = result[0][0];
        } catch (e) {
            this.errorSys.error(errorString, String(e));
        }

        return res;
    }

    /**
    * Получить пользователя по его token
    * @param userId 
    */
    public async faGetUserInfoByToken(sToken: string): Promise<AAClasses.UserModule.UserI> {
        let res: AAClasses.UserModule.UserI;
        const errorString = this.fClassName() + '.' + this.fMethodName();

        let sql = `SELECT u.* FROM ${AAClasses.UserModule.UserE.NAME} u

            JOIN ${AAClasses.UserModule.UserTokenE.NAME} ut
            ON ut.user_id=u.id
            
            WHERE ut.token = :token LIMIT 1`;

        try {
            let result = await this.db.raw(sql, {
                'token': sToken,
            });
            res = result[0][0];
        } catch (e) {
            this.errorSys.error(errorString, String(e));
        }

        return res;
    }

    /**
     * Список пользователей
     * @param arg 
     */
    public async faGetUserList(arg: AAClasses.Components.SimpleI.listArg): Promise<AAClasses.UserModule.UserI[]> {
        let res: AAClasses.UserModule.UserI[];
        const errorString = this.fClassName() + '.' + this.fMethodName();

        let sql = `SELECT * from ${AAClasses.UserModule.UserE.NAME} u  LIMIT 10`;
        try {
            let result = await this.db.raw(sql, {

            });
            res = result[0];
        } catch (e) {
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
    public async faRegisterByLoginAndPass(sLogin: string, sPass: string): Promise<string> {
        let token = generateToken();
        const errorString = this.fClassName() + '.' + this.fMethodName();

        try {

            /* inser user */

            let newUser: AAClasses.UserModule.UserI = {
                login: sLogin,
                pass: PassToHash(sPass),
                hash: generateToken()
            }

            // Валидируем входящие данные
            if (!this.modelValidatorSys.fValid(this.userE.getRulesInsert(), newUser)) {
                throw 'validation error';
            }

            let d = await this.db(AAClasses.UserModule.UserE.NAME)
                .insert(this.modelValidatorSys.getResult());

            if (!d) {
                throw 'err insert';
            }

            let userId = d[0];

            /* insert token */
            await this.db(AAClasses.UserModule.UserTokenE.NAME)
                .insert({
                    user_id: userId,
                    token: token,
                });


        } catch (e) {
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
    public async faGetTokenByLoginAndPass(sLogin: string, sPass: string): Promise<string> {
        let res = '';
        const errorString = this.fClassName() + '.' + this.fMethodName();

        let sql = `SELECT ut.token FROM ${AAClasses.UserModule.UserE.NAME} u

            JOIN ${AAClasses.UserModule.UserTokenE.NAME} ut
                ON u.id=ut.user_id
            
            WHERE            
                u.login= :login
                AND
                u.pass= :pass 
            LIMIT 1`;

        try {
            let result = await this.db.raw(sql, {
                'login': sLogin,
                'pass': PassToHash(sPass),
            });
            res = result[0][0]['token'];
        } catch (e) {
            this.errorSys.error(errorString, String(e));
        }

        return res;
    }


    /**
     * Обновлене инфы об юзере
     * @param data 
    */
    public async faUpdate(data: AAClasses.UserModule.UserI): Promise<boolean> {
        const errorString = this.fClassName() + '.' + this.fMethodName();

        try {

            // Валидируем входящие данные
            if (!this.modelValidatorSys.fValid(this.userE.getRulesUpdate(), data)) {
                throw 'validation error';
            }

            await this.db(AAClasses.UserModule.UserE.NAME)
                .where({
                    id: data.id
                })
                .update(this.modelValidatorSys.getResult());

        } catch (e) {
            this.errorSys.error(errorString, String(e));
        }

        return this.errorSys.isOk();
    }


}