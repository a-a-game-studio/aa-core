import BaseM from '../../../System/BaseM';
import * as V from '../Validator/CtrlAccessV';
/**
 * Контроллеры доступа по модулям
 * Внутри метода делаем нужную бизнес логику
 */
export declare class CtrlAccessM extends BaseM {
    /** @var SQL\UserSQL userSQL */
    private userSQL;
    /** @var SQL\CtrlAccessSQL ctrlAccessSQL */
    private ctrlAccessSQL;
    constructor(req: any);
    /**
     * Получить список контроллеров доступа
     *
     * @param array data
     * @return array|null
     */
    getAllCtrlAccess(data: V.getAllCtrlAccess.RequestI): Promise<V.getAllCtrlAccess.ResponseI>;
    /**
     * Получить иформацию по контроллеру
     *
     * @param array data
     * @return array|null
     */
    getCtrlAccessByAlias(data: V.getCtrlAccessByAlias.RequestI): Promise<V.getCtrlAccessByAlias.ResponseI>;
    /**
     * Изменить данные контроллера доступа
     *
     * @param array data
     * @return array|null
     */
    saveCtrlAccess(data: V.saveCtrlAccess.RequestI): Promise<V.saveCtrlAccess.ResponseI>;
    /**
     * Добавить контроллер доступа
     *
     * @param array data
     */
    addCtrlAccess(data: V.addCtrlAccess.RequestI): Promise<V.addCtrlAccess.ResponseI>;
    /**
     * Удалить контроллер доступа
     *
     * @param array data
     * @return array|null
     */
    delCtrlAccess(data: V.delCtrlAccess.RequestI): Promise<V.delCtrlAccess.ResponseI>;
}
