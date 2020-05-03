import { MainRequest } from '../../../System/MainRequest';
import BaseSQL from '../../../System/BaseSQL';
import { UserI, UserIDs } from '../Entity/UserE';
/**
 * Здесь методы для SQL запросов
 */
export declare class UserSQL extends BaseSQL {
    constructor(req: MainRequest);
    /**
     * Получить список пользователей
     *
     * @param integer iOffset
     * @param integer iLimit
     * @param array sSearchFIO
     * @return array|null
     */
    getUserList(iOffset: number, iLimit: number, aFilter: {
        search_surname?: string;
        search_username?: string;
    }): Promise<any>;
    /**
     * Получить пользователя по ID
     *
     * @param integer idUser
     * @return array|null
     */
    getUserByID(idUser: number): Promise<any>;
    /**
     * Получить идентификаторы пользователя по ID
     *
     * @param sToken
     */
    getUserIDsByToken(sToken: string): Promise<UserIDs>;
    fGetUserInfoByToken(token?: string): Promise<UserI>;
    fGetUserInfoById(userId: number): Promise<UserI>;
    /**
     * Для авторизации
     * Выдает токен по логину и паролю
     * @param login
     * @param pass
     * @returns token
     */
    faGetTokenByLoginAndPass(sLogin: string, sPass: string): Promise<string>;
    /**
     * Регистрация по логину и паролю
     * @param login
     * @param pass
     * @param passConfirm
     *
     * @returns token: string
     */
    faRegister(data: {
        login: string;
        name?: string;
        email?: string;
        pswd: string;
    }): Promise<string>;
    /**
     * Обновлене инфы об юзере
     * @param data
     */
    faUpdate(idUser: number, data: UserI): Promise<boolean>;
    /**
     * Обновлене инфы об юзере
     * @param data
     */
    faConfirmRegisterByID(idUser: number): Promise<boolean>;
    /**
     * Обновлене инфы об юзере
     * @param data
     */
    faDelUser(idUser: number): Promise<boolean>;
}
