import BaseM from '../../System/BaseM';
import { AdminEditEnumR } from './AdminEditEnumR';
import R = AdminEditEnumR;
/**
 * Бизнес модель пользователя суда мы нас проксирует контроллер 1 url = 1 метод модели
 * Внутри метода делаем нужную бизнес логику
 */
export declare class AdminEditEnumM extends BaseM {
    private enumParamSQL;
    private enumSQL;
    private enumSys;
    constructor(req: any);
    /**
     * Получить стартовые данные для работы страницы
     * @param data
     */
    init(data: R.init.RequestI): Promise<R.init.ResponseI>;
    /**
     * Получить дерево объектов
     * @param data
     */
    getEnumTreeType(data: R.getEnumTreeType.RequestI): Promise<R.getEnumTreeType.ResponseI>;
    /**
     * Выбрать enumу
     * @param array data
     */
    selectEnum(data: R.selectEnum.RequestI): Promise<R.selectEnum.ResponseI>;
    /**
     * Выбрать параметр enum
     * @param array data
     */
    selectEnumParam(data: R.selectEnumParam.RequestI): Promise<R.selectEnumParam.ResponseI>;
    /**
     * Удалить enum параметр
     * @param data
     */
    delEnumParam(data: R.delEnumParam.RequestI): Promise<R.delEnumParam.ResponseI>;
    /**
     * Добавить enum
     * @param data
     */
    addEnum(data: R.addEnum.RequestI): Promise<R.addEnum.ResponseI>;
    /**
     * Сохранить enumу
     * @param data данные
     */
    saveEnum(data: R.saveEnum.RequestI): Promise<R.saveEnum.ResponseI>;
    /**
     * Сохранить контроллер доступа
     * @param data данные
     */
    saveEnumParam(data: R.saveEnumParam.RequestI): Promise<R.saveEnumParam.ResponseI>;
    /**
     * Удалить enum
     * @param data
     */
    delEnum(data: R.delEnum.RequestI): Promise<R.delEnum.ResponseI>;
    /**
     * Добавить enumу параметр
     * @param data
     */
    addEnumParam(data: R.addEnumParam.RequestI): Promise<R.addEnumParam.ResponseI>;
}
