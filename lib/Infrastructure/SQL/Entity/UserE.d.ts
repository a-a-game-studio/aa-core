/**
 * Описание идентификаторов и связей пользователя
 */
export interface UserIDs {
    user_id?: number;
    login?: string;
    name?: string;
    email?: string;
    phone?: string;
    token?: string;
}
/**
 * Описание полей пользователя
 */
export interface UserI {
    id?: number;
    login?: string;
    name?: string;
    surname?: string;
    patronymic?: string;
    email?: string;
    phone?: string;
    pswd?: string;
    hash?: string;
}
export declare class UserE {
    static NAME: string;
    getRulesInsert(): {
        [key: string]: any;
    };
    /** Правила обновления таблицы */
    getRulesUpdate(): {
        [key: string]: any;
    };
}
