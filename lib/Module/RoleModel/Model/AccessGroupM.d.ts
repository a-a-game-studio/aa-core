import BaseM from '../../../System/BaseM';
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
    getCtrlAccessOfGroupByID(data: {
        [key: string]: any;
    }): Promise<any>;
    /**
     * Добавить разрешения на модуль в группу
     *
     * @param array data
     * @return array|null
     */
    addCtrlAccessToGroup(data: {
        [key: string]: any;
    }): Promise<any>;
    /**
     * Изменить данные доступа группе
     *
     * @param array data
     * @return null
     */
    saveAccessGroup(data: any): Promise<void>;
    /**
     * Удалить доступ к модулю из группы
     *
     * @param array data
     * @return null
     */
    delCtrlAccessFromGroup(data: any): Promise<void>;
}
