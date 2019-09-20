// Системные сервисы
import { ResponseSys } from './ResponseSys';
import * as AAClasses from '@a-a-game-studio/aa-classes/lib';

import { MainRequest } from './MainRequest';

import { UserSys } from './UserSys';


/**
 * Базовый контроллер
 */
export default class BaseCtrl {

    public req: MainRequest;
    public errorSys: AAClasses.Components.ErrorSys;
    public userSys: UserSys;
    public responseSys: ResponseSys;

    protected resp: any;

    static sBaseUrl: string = '/'; // базовый путь к api-методов для контролера

    constructor(req: MainRequest, resp: any) {

        this.req = req;
        this.responseSys = req.sys.responseSys;
        this.errorSys = req.sys.errorSys;
        this.userSys = req.sys.userSys;
        this.resp = resp;

    }

    protected fClassName() {
        return this.constructor.name;
    }

    protected fMethodName(): string {
        var err = new Error();
        return /at \w+\.(\w+)/.exec(err.stack.split('\n')[2])[1] // we want the 2nd method in the call stack
    }

    /**
     * Асинхронный конструктор
     * @param req 
     * @param resp 
     * @param bNeedAuth - нужно проверка на юзера
     */
    static async Init(req: MainRequest, resp: any, bNeedAuth: boolean = false): Promise<BaseCtrl> {

        let self = new this(req, resp);

        // Инициализация системных сервисов
        self.userSys = req.sys.userSys;
        self.responseSys = req.sys.responseSys;

        /* проверка авторизации */
        if (bNeedAuth && (!req.sys.bAuth)) {
            self.errorSys.error('authError', 'authError');
        }

        return self;
    }


}
