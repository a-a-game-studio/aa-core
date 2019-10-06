import BaseM from '../../../System/BaseM';
import * as V from '../Validator/GroupV';
/**
 * Группы пользователей
 * Внутри метода делаем нужную бизнес логику
 */
export declare class GroupM extends BaseM {
    /** @var SQL\UserSQL userSQL */
    private userSQL;
    /** @var SQL\GroupSQL groupSQL */
    private groupSQL;
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
     * Добавить группу
     *
     * @param array data
     * @return array|null
     */
    addGroup(data: V.addGroup.RequestI): Promise<V.addGroup.ResponseI>;
    /**
     * Получить сокращенную иформацию группы по ID
     *
     * @param array data
     * @return array|null
     */
    saveGroup(data: V.saveGroup.RequestI): Promise<V.saveGroup.ResponseI>;
    /**
     * Удалить группу по ID
     *
     * @param array data
     * @return array|null
     */
    delGroup(data: V.delGroup.RequestI): Promise<V.delGroup.ResponseI>;
}
