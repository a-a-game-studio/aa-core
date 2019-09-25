/**
 * Описание полей пользователя
 */
export interface CtrlAccessI {
    id?: number;
    alias?: string;
    name?: string;
    descript?: string;
}
export declare class CtrlAccessE {
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
