// Системные сервисы
import { ErrorSys } from '@a-a-game-studio/aa-components/lib';
import { UserSys } from './UserSys';
import MainRequest from './MainRequest';
/**
 * Базовая модель
 */
export default class BaseM {

    public errorSys: ErrorSys;
    public userSys: UserSys;
    public req: MainRequest;

    constructor(req: MainRequest) {
        this.errorSys = req.sys.errorSys;
        this.userSys = req.sys.userSys;
        this.req = req;
        
    }

}
