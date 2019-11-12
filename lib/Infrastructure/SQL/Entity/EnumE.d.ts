/**
 * Описание потребления способности
 */
export interface EnumI {
    id?: number;
    k?: string;
    name?: string;
    descript?: string;
    path1?: string;
    path2?: string;
    path3?: string;
}
/**
 * Список свойств
 */
export declare class EnumE {
    static NAME: string;
    /**
     * Вставка ключевых записей таблицы
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
