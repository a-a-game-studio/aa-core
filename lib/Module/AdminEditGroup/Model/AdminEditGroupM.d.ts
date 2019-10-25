import BaseM from '../../../System/BaseM';
import * as V from '../Validator/AdminEditGroupV';
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
    init(data: V.init.RequestI): Promise<V.init.ResponseI>;
    /**
     * Выбрать группу
     *
     * @param array data
     * @return array|null
     */
    selectGroup(data: V.selectGroup.RequestI): Promise<V.selectGroup.ResponseI>;
    /**
     * Выбрать контроллер доступа
     *
     * @param array data
     * @return array|null
     */
    selectCtrlAccess(data: V.selectCtrlAccess.RequestI): Promise<V.selectCtrlAccess.ResponseI>;
    /**
     * Добавить добавить контроллер доступа группе
     *
     * @param array data
     */
    addCtrlAccessToGroup(data: V.addCtrlAccessToGroup.RequestI): Promise<V.addCtrlAccessToGroup.ResponseI>;
    /**
     * Удалить права группы на контроллер/модуль
     *
     * @param array data
     */
    delCtrlAccessFromGroup(data: V.delCtrlAccessFromGroup.RequestI): Promise<V.delCtrlAccessFromGroup.ResponseI>;
    /**
     * Добавить группу пользователей
     * @param data
     */
    addGroup(data: V.addGroup.RequestI): Promise<V.addGroup.ResponseI>;
    /**
     * Сохранить группу
     * @param data данные
     */
    saveGroup(data: V.saveGroup.RequestI): Promise<V.saveGroup.ResponseI>;
    /**
     * Сохранить контроллер доступа
     * @param data данные
     */
    saveCtrlAccess(data: V.saveCtrlAccess.RequestI): Promise<V.saveCtrlAccess.ResponseI>;
    /**
     * Удалить группу
     * @param data
     */
    delGroup(data: V.delGroup.RequestI): Promise<V.delGroup.ResponseI>;
}
