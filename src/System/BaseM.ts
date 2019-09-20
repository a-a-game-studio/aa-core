// Системные сервисы
import * as AAClasses from '@a-a-game-studio/aa-classes/lib';

import { UserSys } from './UserSys';
import { MainRequest } from './MainRequest';
/**
 * Базовая модель
 */
export default class BaseM {

    public errorSys: AAClasses.Components.ErrorSys;
    public userSys: UserSys;
    public req: MainRequest;

    constructor(req: MainRequest) {
        this.errorSys = req.sys.errorSys;
        this.userSys = req.sys.userSys;
        this.req = req;
        
    }

}
