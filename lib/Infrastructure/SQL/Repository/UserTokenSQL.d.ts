import BaseSQL from '../../../System/BaseSQL';
/**
 * Здесь методы для SQL запросов
 */
export declare class UserTokenSQL extends BaseSQL {
    /**
     * проверка на то что есть apikey в базе
     */
    isAuth(apikey?: string): Promise<boolean>;
    /**
     * Выдает apikey по id_user
     */
    getUserApiKey(id_user: number): Promise<string>;
    /**
     * вставляет ключ для юзера
     * ничего не проверяет только вставляет
     * @param id_user
     */
    insertUserApiKey(id_user: number): Promise<string>;
}
