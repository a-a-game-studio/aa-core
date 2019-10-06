import { MainRequest } from '../../../System/MainRequest';
import { GroupI } from '../Entity/GroupE';
import BaseSQL from '../../../System/BaseSQL';
/**
 * Здесь методы для SQL запросов
 * - Группы пользователей
 */
export declare class GroupSQL extends BaseSQL {
    constructor(req: MainRequest);
    /**
     * Получить группу по ID
     *
     * @param integer idGroup
     * @return array|null
     */
    getGroupByID(idGroup: number): Promise<any>;
    /**
     * Получить группы/роли
     *
     * @return array|null
     */
    getAllGroups(): Promise<any>;
    /**
     * Добавить группу
     *
     * @return boolean
     */
    addGroup(data: GroupI): Promise<number>;
    /**
     * Сохранить группу по ID
     *
     * @param integer idGroup
     * @return boolean
     */
    saveGroup(idGroup: number, data: GroupI): Promise<boolean>;
    /**
     * удалить группу по ID
     *
     * @param string aliasCtrlAccess
     * @return boolean
     */
    delGroupByID(idGroup: number): Promise<boolean>;
}
