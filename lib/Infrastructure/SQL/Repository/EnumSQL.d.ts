import BaseSQL from '../../../System/BaseSQL';
import { EnumI } from '../Entity/EnumE';
/**
 * Здесь методы для SQL запросов
 * enum
 */
export declare class EnumSQL extends BaseSQL {
    /**
     * Получить enum по ID
     *
     * @param idEnum
     */
    oneEnumByID(idEnum: number): Promise<any>;
    /**
     * Получить все enumы
     */
    listAllEnum(): Promise<EnumI[]>;
    /**
     * Добавить enum
     *
     * @return boolean
     */
    addEnum(data: EnumI): Promise<number>;
    /**
     * Сохранить enum по ID
     *
     * @param integer idEnum
     * @return boolean
     */
    saveEnum(idEnum: number, data: EnumI): Promise<boolean>;
    /**
     * удалить enum по ID
     *
     * @param string kCtrlAccess
     * @return boolean
     */
    delEnumByID(idEnum: number): Promise<boolean>;
}
