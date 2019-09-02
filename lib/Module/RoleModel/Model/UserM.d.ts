import BaseM from '../../../System/BaseM';
/**
 * Бизнес модель пользователя суда мы нас проксирует контроллер 1 url = 1 метод модели
 * Внутри метода делаем нужную бизнес логику
 */
export declare class UserM extends BaseM {
    /** @var SQL\UserSQL userSQL */
    private userSQL;
    /** @var SQL\UserGroupSQL userGroupSQL */
    private userGroupSQL;
    constructor(req: any);
    getUserList(data: {
        [key: string]: any;
    }): Promise<any>;
    /**
     * Получить пользователя по ID
     *
     * @param array data
     * @return array|null
     */
    getUserByID(data: {
        [key: string]: any;
    }): Promise<any>;
    /**
     * Получить список ролей пользователя
     *
     * @param array data
     * @return array|null
     */
    getUserGroupsByUserID(data: {
        [key: string]: any;
    }): Promise<any>;
    /**
     * Добавить пользователя в группу - Добавить Роль
     *
     * @param array data
     * @return array|null
     */
    addUserToGroup(data: {
        [key: string]: any;
    }): Promise<any>;
    /**
     * Удалить пользователя из группы - Убрать Роль
     *
     * @param array data
     * @return array|null
     */
    delUserFromGroup(data: {
        [key: string]: any;
    }): Promise<any>;
    fGetUserInfoByApiKey(apikey?: string): Promise<any>;
    getApiKeyByPhoneAndSms(body: {
        phone: string;
        sms: string;
    }): Promise<string>;
}
