import BaseM from '../../System/BaseM';
import { AdminEditGroupR } from './AdminEditGroupR';
import R = AdminEditGroupR;
/**
 * Бизнес модель пользователя суда мы нас проксирует контроллер 1 url = 1 метод модели
 * Внутри метода делаем нужную бизнес логику
 */
export declare class AdminEditGroupM extends BaseM {
    private ctrlAccessSQL;
    private groupSQL;
    private accessGroupSQL;
    constructor(req: any);
    /**
     * Получить стартовые данные для работы страницы
     * @param data
     */
    init(data: R.init.RequestI): Promise<R.init.ResponseI>;
    /**
     * Выбрать группу
     *
     * @param array data
     * @return array|null
     */
    selectGroup(data: R.selectGroup.RequestI): Promise<R.selectGroup.ResponseI>;
    /**
     * Выбрать контроллер доступа
     *
     * @param array data
     * @return array|null
     */
    selectCtrlAccess(data: R.selectCtrlAccess.RequestI): Promise<R.selectCtrlAccess.ResponseI>;
    /**
     * Добавить добавить контроллер доступа группе
     *
     * @param array data
     */
    addCtrlAccessToGroup(data: R.addCtrlAccessToGroup.RequestI): Promise<R.addCtrlAccessToGroup.ResponseI>;
    /**
     * Удалить права группы на контроллер/модуль
     *
     * @param array data
     */
    delCtrlAccessFromGroup(data: R.delCtrlAccessFromGroup.RequestI): Promise<R.delCtrlAccessFromGroup.ResponseI>;
    /**
     * Добавить группу пользователей
     * @param data
     */
    addGroup(data: R.addGroup.RequestI): Promise<R.addGroup.ResponseI>;
    /**
     * Сохранить группу
     * @param data данные
     */
    saveGroup(data: R.saveGroup.RequestI): Promise<R.saveGroup.ResponseI>;
    /**
     * Сохранить контроллер доступа
     * @param data данные
     */
    saveCtrlAccess(data: R.saveCtrlAccess.RequestI): Promise<R.saveCtrlAccess.ResponseI>;
    /**
     * Удалить группу
     * @param data
     */
    delGroup(data: R.delGroup.RequestI): Promise<R.delGroup.ResponseI>;
    /**
     * Добавить группу пользователей
     * @param data
     */
    addCtrlAccess(data: R.addCtrlAccess.RequestI): Promise<R.addCtrlAccess.ResponseI>;
}
