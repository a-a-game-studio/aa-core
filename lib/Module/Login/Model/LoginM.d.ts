import BaseM from '../../../System/BaseM';
import * as V from '../Validator/LoginV';
/**
 * Бизнес модель пользователя суда мы нас проксирует контроллер 1 url = 1 метод модели
 * Внутри метода делаем нужную бизнес логику
 */
export declare class LoginM extends BaseM {
    private userSQL;
    constructor(req: any);
    init(data: V.init.RequestI): Promise<V.init.ResponseI>;
    login(data: V.login.RequestI): Promise<V.login.ResponseI>;
    register(data: V.register.RequestI): Promise<V.register.ResponseI>;
}
