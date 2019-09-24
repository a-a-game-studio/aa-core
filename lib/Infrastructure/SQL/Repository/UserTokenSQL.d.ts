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
     * Выдает apikey по user_id
     */
    getUserApiKey(user_id: number): Promise<string>;
    /**
     * вставляет ключ для юзера
     * ничего не проверяет только вставляет
     * @param user_id
     */
    insertUserApiKey(user_id: number): Promise<string>;
}
