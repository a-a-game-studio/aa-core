// Системные сервисы
import { ResponseSys } from './ResponseSys';
import *  as Components  from '@a-a-game-studio/aa-components/lib';

import { MainRequest } from './MainRequest';

import { UserSys } from './UserSys';


/**
 * Базовый контроллер
 */
export default class BaseCtrl {

    public req: MainRequest;
    public errorSys: Components.ErrorSys;
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

}
