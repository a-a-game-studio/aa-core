import BaseM from '../../System/BaseM';
import { AdminEditUserR } from './AdminEditUserR';
import R = AdminEditUserR;
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
    init(data: R.init.RequestI): Promise<R.init.ResponseI>;
    /**
     * Выбрать пользователя
     *
     * @param array data
     * @return array|null
     */
    selectUser(data: R.selectUser.RequestI): Promise<R.selectUser.ResponseI>;
    /**
     * Выбрать группу
     *
     * @param array data
     * @return array|null
     */
    selectGroup(data: R.selectGroup.RequestI): Promise<R.selectGroup.ResponseI>;
    /**
     * Добавить пользователя в группу - Добавить Роль
     *
     * @param array data
     * @return array|null
     */
    addUserToGroup(data: R.addUserToGroup.RequestI): Promise<R.addUserToGroup.ResponseI>;
    /**
     * Удалить пользователя из группы - Убрать Роль
     *
     * @param array data
     * @return array|null
     */
    delUserFromGroup(data: R.delUserFromGroup.RequestI): Promise<R.delUserFromGroup.ResponseI>;
    addUser(data: R.addUser.RequestI): Promise<R.addUser.ResponseI>;
    /**
 *
 * @param data Удалить пользователя
 */
    saveUser(data: R.saveUser.RequestI): Promise<R.saveUser.ResponseI>;
    /**
     *
     * @param data Удалить пользователя
     */
    delUser(data: R.delUser.RequestI): Promise<R.delUser.ResponseI>;
}
