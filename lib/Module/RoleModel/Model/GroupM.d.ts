import BaseM from '../../../System/BaseM';
import * as V from '../Validator/GroupV';
/**
 * Группы пользователей
 * Внутри метода делаем нужную бизнес логику
 */
export declare class GroupM extends BaseM {
    /** @var SQL\UserSQL userSQL */
    private userSQL;
    /** @var SQL\GroupsSQL groupsSQL */
    private groupsSQL;
    constructor(req: any);
    /**
     * Получить список ролей/группы
     *
     * @param array data
     * @return array|null
     */
    getAllGroups(data: V.getAllGroups.RequestI): Promise<V.getAllGroups.ResponseI>;
    /**
     * Получить сокращенную иформацию группы по ID
     *
     * @param array data
     * @return array|null
     */
    getGroupByID(data: V.getGroupByID.RequestI): Promise<V.getGroupByID.ResponseI>;
    /**
     * Получить сокращенную иформацию группы по ID
     *
     * @param array data
     * @return array|null
     */
    saveGroup(data: V.saveGroup.RequestI): Promise<V.saveGroup.ResponseI>;
}
