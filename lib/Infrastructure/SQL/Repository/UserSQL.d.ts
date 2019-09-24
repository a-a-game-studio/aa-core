import { MainRequest } from '../../../System/MainRequest';
import BaseSQL from '../../../System/BaseSQL';
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
        search_fullname?: string;
        search_username?: string;
    }): Promise<any>;
    /**
     * Получить пользователя по ID
     *
     * @param integer idUser
     * @return array|null
     */
    getUserByID(idUser: number): Promise<any>;
    fGetUserInfoByToken(token?: string): Promise<any>;
    fGetUserInfoById(userId: number): Promise<any[]>;
}
