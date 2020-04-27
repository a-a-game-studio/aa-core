/**
 * Описание полей пользователя
 */
export interface FileI {
    id?: number;
    file_name?: string;
}
export declare class FileE {
    static NAME: string;
    getRulesInsert(): {
        [key: string]: any;
    };
    /** Правила обновления таблицы */
    getRulesUpdate(): {
        [key: string]: any;
    };
}
