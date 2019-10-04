import * as Components from '@a-a-game-studio/aa-components/lib';
import { UserSys } from './UserSys';
import { MainRequest } from './MainRequest';
/**
 * Базовая модель
 */
export default class BaseM {
    errorSys: Components.ErrorSys;
    userSys: UserSys;
    req: MainRequest;
    constructor(req: MainRequest);
}
