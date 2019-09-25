import { SysteCoreModule } from '@a-a-game-studio/aa-classes/lib';
import { MainRequest } from '../System/MainRequest';
import { UserSys } from '../System/UserSys';
export declare class AuthSysMiddleware {
    protected listDBData: SysteCoreModule.ListDBI;
    protected listDB: SysteCoreModule.ListDB;
    constructor(listDBData: SysteCoreModule.ListDBI);
    /**
     * Эта ф-я используется как Middleware
     * @param req
     * @param response
     * @param next
     */
    faMiddleware(req: MainRequest, response: any, next: any): Promise<void>;
    /**
     * Ф-я подключения ListDB
     * ее стоит преопределять когда наследуешь класс ListDB
     * @param req
     */
    protected fInitListDB(): SysteCoreModule.ListDB;
    /**
     * Ф-я подключения пользователя
     * ее стоит преопределять когда наследуешь класс UserSys
     * @param req
     */
    protected fInitUser(req: MainRequest): UserSys;
    /**
     * Ф-я подключения SystemCore
     * ее стоит преопределять когда наследуешь класс SystemCore
     * @param req: MainRequest
     */
    protected fInitSystemCore(req: MainRequest): SysteCoreModule.SystemCore;
}
