import { ResponseSys } from './ResponseSys';
import { ErrorSys } from '@a-a-game-studio/aa-components/lib';
import MainRequest from './MainRequest';
import { UserSys } from './UserSys';
/**
 * SQL Запросы
 */
export default class BaseCtrl {
    req: MainRequest;
    errorSys: ErrorSys;
    userSys: UserSys;
    responseSys: ResponseSys;
    constructor(req: MainRequest);
}
