import * as AAClasses from '@a-a-game-studio/aa-classes/lib';
import { UserSys } from './UserSys';
import { MainRequest } from './MainRequest';
/**
 * Базовая модель
 */
export default class BaseM {
    errorSys: AAClasses.Components.ErrorSys;
    userSys: UserSys;
    req: MainRequest;
    constructor(req: MainRequest);
}
