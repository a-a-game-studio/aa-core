import MainRequest from '../../../System/MainRequest';
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
    fGetUserInfoByApiKey(apikey?: string): Promise<any>;
    /**
     * проверка на то что есть apikey в базе
     */
    isAuth(apikey?: string): Promise<boolean>;
    /**
     * выдает id юзера по телефону и смс из таблицы user_sms_code
     */
    getUserIdByPhoneAndSms(tel: number, sms: number): Promise<number>;
    getUserByUsername(username: string): Promise<any[]>;
    getUserApiKey(user_id: number): Promise<string>;
    insertUserApiKey(user_id: number): Promise<string>;
    generateApiKey(max?: number): any;
    fGetUserInfoById(userId: number): Promise<any[]>;
}
