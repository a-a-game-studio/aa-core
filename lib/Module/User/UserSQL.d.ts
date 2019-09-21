import { UserModule, Components } from '@a-a-game-studio/aa-classes/lib';
import * as db from "knex";
export declare class UserSQL extends UserModule.UserDB {
    protected db: db;
    constructor(errorSys: Components.ErrorSys, db: db);
    /**
    * Получить пользователя по его id
    * @param userId
    */
    faGetInfoById(userId: number): Promise<UserModule.UserI>;
    /**
    * Получить пользователя по его token
    * @param userId
    */
    faGetUserInfoByToken(sToken: string): Promise<UserModule.UserI>;
    /**
     * Список пользователей
     * @param arg
     */
    faGetUserList(arg: Components.SimpleI.listArg): Promise<UserModule.UserI[]>;
    /**
     * Регистрация по логину и паролю
     * @param login
     * @param pass
     * @param passConfirm
     *
     * @returns token: string
     */
    faRegisterByLoginAndPass(sLogin: string, sPass: string): Promise<string>;
    /**
     * Выдает токен по логину и паролю
     * @param login
     * @param pass
     * @returns token
     */
    faGetTokenByLoginAndPass(sLogin: string, sPass: string): Promise<string>;
    /**
     * Обновлене инфы об юзере
     * @param data
    */
    faUpdate(data: UserModule.UserI): Promise<boolean>;
}
