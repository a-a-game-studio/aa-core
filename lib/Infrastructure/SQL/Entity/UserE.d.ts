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
    avatar?: string;
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
