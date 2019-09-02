import BaseM from '../../../System/BaseM';
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
    getAllGroups(data: {
        [key: string]: any;
    }): Promise<any>;
    /**
     * Получить сокращенную иформацию группы по ID
     *
     * @param array data
     * @return array|null
     */
    getGroupByID(data: {
        [key: string]: any;
    }): Promise<any>;
    /**
     * Получить сокращенную иформацию группы по ID
     *
     * @param array data
     * @return array|null
     */
    saveGroup(data: {
        [key: string]: any;
    }): Promise<any>;
}
