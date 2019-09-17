/**
 * Описание полей пользователя
 */
export interface UserI {
    id?: number;
    login?: string;
    name?: string;
    email?: string;
}
export declare class UserE {
    static NAME: string;
    getRulesInsert(): {
        [key: string]: any;
    };
}
