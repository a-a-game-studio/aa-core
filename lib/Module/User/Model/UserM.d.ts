import BaseM from '../../../System/BaseM';
import * as V from '../Validator/UserV';
/**
 * Бизнес модель пользователя суда мы нас проксирует контроллер 1 url = 1 метод модели
 * Внутри метода делаем нужную бизнес логику
 */
export declare class UserM extends BaseM {
    private userSQL;
    private userSMSCode;
    private userTokenSQL;
    private userGroupSQL;
    constructor(req: any);
    getUserInfo(data: V.getUserInfo.RequestI): Promise<V.getUserInfo.ResponseI>;
    login(data: V.login.RequestI): Promise<V.login.ResponseI>;
    register(data: V.register.RequestI): Promise<V.register.ResponseI>;
    /**
     * Сохранить
     * @param data
     */
    save(data: V.save.RequestI): Promise<V.save.ResponseI>;
}
