/**
 * Описание полей группы
 */
export interface GroupI {
    id?: number;
    alias?: string;
    name?: string;
    descript?: string;
}
/**
 * Правила работы с таблицей группы
 */
export declare class GroupE {
    static NAME: string;
    /**
     * Обновление ключевых записей таблицы
     */
    getRulesInsert(): {
        [key: string]: any;
    };
    /**
     * Обновление ключевых записей таблицы
     */
    getRulesUpdate(): {
        [key: string]: any;
    };
}
