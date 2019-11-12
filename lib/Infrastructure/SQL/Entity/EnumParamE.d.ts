/**
 * Описание потребления способности
 */
export interface EnumParamI {
    id?: number;
    id_enum?: number;
    k?: string;
    name?: string;
    val?: number;
    descript?: string;
    type?: string;
    arg1?: string;
    arg2?: string;
    arg3?: string;
}
/**
 * Свойство
 */
export declare class EnumParamE {
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
