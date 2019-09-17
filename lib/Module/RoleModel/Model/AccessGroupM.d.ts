import BaseM from '../../../System/BaseM';
import * as V from '../Validator/AccessGroupV';
/**
 * Контроллеры доступа по модулям
 * Внутри метода делаем нужную бизнес логику
 */
export declare class AccessGroupM extends BaseM {
    private userSQL;
    private ctrlAccessSQL;
    private accessGroupSQL;
    constructor(req: any);
    /**
     * Получить иформацию по контроллеру
     *
     * @param array data
     * @return array|null
     */
    getCtrlAccessOfGroupByID(data: V.getCtrlAccessOfGroupByID.RequestI): Promise<V.getCtrlAccessOfGroupByID.ResponseI>;
    /**
     * Добавить разрешения на модуль в группу
     *
     * @param array data
     * @return array|null
     */
    addCtrlAccessToGroup(data: V.addCtrlAccessToGroup.RequestI): Promise<V.addCtrlAccessToGroup.ResponseI>;
    /**
     * Изменить данные доступа группе
     *
     * @param array data
     * @return null
     */
    saveAccessGroup(data: V.saveAccessGroup.RequestI): Promise<V.saveAccessGroup.ResponseI>;
    /**
     * Удалить доступ к модулю из группы
     *
     * @param array data
     * @return null
     */
    delCtrlAccessFromGroup(data: V.delCtrlAccessFromGroup.RequestI): Promise<V.delCtrlAccessFromGroup.ResponseI>;
}
