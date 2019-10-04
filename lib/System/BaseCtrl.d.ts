import { ResponseSys } from './ResponseSys';
import * as Components from '@a-a-game-studio/aa-components/lib';
import { MainRequest } from './MainRequest';
import { UserSys } from './UserSys';
/**
 * Базовый контроллер
 */
export default class BaseCtrl {
    req: MainRequest;
    errorSys: Components.ErrorSys;
    userSys: UserSys;
    responseSys: ResponseSys;
    protected resp: any;
    static sBaseUrl: string;
    constructor(req: MainRequest, resp: any);
    protected fClassName(): string;
    protected fMethodName(): string;
    /**
     * Асинхронный конструктор
     * @param req
     * @param resp
     * @param bNeedAuth - нужно проверка на юзера
     */
    static Init(req: MainRequest, resp: any, bNeedAuth?: boolean): Promise<BaseCtrl>;
}
