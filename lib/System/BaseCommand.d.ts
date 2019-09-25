import { MainRequest } from './MainRequest';
import * as AAClasses from '@a-a-game-studio/aa-classes/lib';
import { UserSys } from './UserSys';
/**
 * Конструктор для консольных комманд
 */
export default class BaseCommand {
    db: any;
    errorSys: AAClasses.Components.ErrorSys;
    userSys: UserSys;
    constructor(req: MainRequest);
}
