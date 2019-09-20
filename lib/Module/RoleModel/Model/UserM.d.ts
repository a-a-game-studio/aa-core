import BaseM from '../../../System/BaseM';
import * as V from '../Validator/UserV';
/**
 * Бизнес модель пользователя суда мы нас проксирует контроллер 1 url = 1 метод модели
 * Внутри метода делаем нужную бизнес логику
 */
export declare class UserM extends BaseM {
    /** @var SQL\UserSQL userSQL */
    private userSQL;
    /** @var SQL\UserGroupSQL userGroupSQL */
    private userGroupSQL;
    constructor(req: any);
    getUserList(data: V.getUserList.RequestI): Promise<V.getUserList.ResponseI>;
    /**
     * Получить пользователя по ID
     *
     * @param array data
     * @return array|null
     */
    getUserByID(data: V.getUserByID.RequestI): Promise<V.getUserByID.ResponseI>;
    /**
     * Получить список ролей пользователя
     *
     * @param array data
     * @return array|null
     */
    getUserGroupsByUserID(data: V.getUserGroupsByUserID.RequestI): Promise<V.getUserGroupsByUserID.ResponseI>;
    /**
     * Добавить пользователя в группу - Добавить Роль
     *
     * @param array data
     * @return array|null
     */
    addUserToGroup(data: V.addUserToGroup.RequestI): Promise<V.addUserToGroup.ResponseI>;
    /**
     * Удалить пользователя из группы - Убрать Роль
     *
     * @param array data
     * @return array|null
     */
    delUserFromGroup(data: V.delUserFromGroup.RequestI): Promise<V.delUserFromGroup.ResponseI>;
    /**
     *  выдает инфу по юзеру по token
     */
    fGetUserInfoByToken(token?: string): Promise<any>;
    getTokenByPhoneAndSms(data: V.getTokenByPhoneAndSms.RequestI): Promise<V.getTokenByPhoneAndSms.ResponseI>;
}
