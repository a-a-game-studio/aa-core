import BaseM from '../../../System/BaseM';
import * as V from '../Validator/AdminEditUserV';
/**
 * Бизнес модель пользователя суда мы нас проксирует контроллер 1 url = 1 метод модели
 * Внутри метода делаем нужную бизнес логику
 */
export declare class AdminEditUserM extends BaseM {
    private userSQL;
    private groupSQL;
    private userGroupSQL;
    constructor(req: any);
    /**
     * Получить стартовые данные для работы страницы
     * @param data
     */
    init(data: V.init.RequestI): Promise<V.init.ResponseI>;
    /**
     * Выбрать пользователя
     *
     * @param array data
     * @return array|null
     */
    selectUser(data: V.selectUser.RequestI): Promise<V.selectUser.ResponseI>;
    /**
     * Выбрать группу
     *
     * @param array data
     * @return array|null
     */
    selectGroup(data: V.selectGroup.RequestI): Promise<V.selectGroup.ResponseI>;
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
    addUser(data: V.addUser.RequestI): Promise<V.addUser.ResponseI>;
    /**
 *
 * @param data Удалить пользователя
 */
    saveUser(data: V.saveUser.RequestI): Promise<V.saveUser.ResponseI>;
    /**
     *
     * @param data Удалить пользователя
     */
    delUser(data: V.delUser.RequestI): Promise<V.delUser.ResponseI>;
}
