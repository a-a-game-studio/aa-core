/**
 * Описание полей группы
 */
export interface AccessGroupI {
    id?: number;
    group_id?: number;
    ctrl_access_id?: number;
    create_access?: boolean;
    read_access?: boolean;
    update_access?: boolean;
    delete_access?: boolean;
}
/**
 * Сущьность доступа группе пользователей
 */
export declare class AccessGroupE {
    static NAME: string;
    /**
     * Обновление ключевых записей таблицы
     */
    getRulesUpdate(): {
        [key: string]: any;
    };
    /**
     *  Правила создания записей в таблице
     */
    getRulesInsert(): {
        [key: string]: any;
    };
}
