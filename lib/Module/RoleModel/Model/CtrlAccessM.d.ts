import BaseM from '../../../System/BaseM';
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
    getAllCtrlAccess(data: {
        [key: string]: any;
    }): any;
    /**
     * Получить иформацию по контроллеру
     *
     * @param array data
     * @return array|null
     */
    getCtrlAccessByAlias(data: {
        [key: string]: any;
    }): any;
    /**
     * Изменить данные контроллера доступа
     *
     * @param array data
     * @return array|null
     */
    saveCtrlAccess(data: {
        [key: string]: any;
    }): Promise<any>;
    /**
     * Добавить контроллер доступа
     *
     * @param array data
     * @return array|null
     */
    addCtrlAccess(data: {
        [key: string]: any;
    }): Promise<any>;
    /**
     * Удалить контроллер доступа
     *
     * @param array data
     * @return array|null
     */
    delCtrlAccess(data: {
        [key: string]: any;
    }): Promise<any>;
}
