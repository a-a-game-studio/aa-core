import BaseSQL from '../../../System/BaseSQL';
import { EnumParamI } from '../Entity/EnumParamE';
/**
 * Здесь методы для SQL запросов
 * параметр enum
 */
export declare class EnumParamSQL extends BaseSQL {
    /**
     * Получить параметр enum по ID
     *
     * @param idEnumParam
     */
    oneEnumParamByID(idEnumParam: number): Promise<any>;
    /**
     * Получить все параметр enumы
     */
    listAllEnumParam(): Promise<any>;
    /**
     * Получить все параметр enumы
     */
    listByParam(data: {
        id_enum: number;
    }): Promise<EnumParamI[]>;
    /**
     * Добавить группу
     *
     * @return boolean
     */
    addEnumParam(data: EnumParamI): Promise<number>;
    /**
     * Сохранить группу по ID
     *
     * @param integer idEnumParam
     * @return boolean
     */
    saveEnumParam(idEnumParam: number, data: EnumParamI): Promise<boolean>;
    /**
     * удалить группу по ID
     *
     * @param string kCtrlAccess
     * @return boolean
     */
    delEnumParamByID(idEnumParam: number): Promise<boolean>;
    /**
     * удалить группу по ID
     *
     * @param string kCtrlAccess
     * @return boolean
     */
    delAllEnumParamOfEnum(idEnum: number): Promise<boolean>;
}
