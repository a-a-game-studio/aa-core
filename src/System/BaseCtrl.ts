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

    static sBaseUrl: string = '/'; // базовый путь к api-методов для контролера

    constructor(req: MainRequest) {

        this.req = req;
        this.responseSys = req.sys.responseSys;
        this.errorSys = req.sys.errorSys;
        this.userSys = req.sys.userSys;
        
    }

}
