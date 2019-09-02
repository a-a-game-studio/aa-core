import MainRequest from '../System/MainRequest';
import {ErrorSys} from '@a-a-game-studio/aa-components/lib';

/* LEGO ошибок */
export default function ErrorSysMiddleware(request: MainRequest, response: any, next: any) {

    request.sys = {
        apikey: '',
        errorSys: null,
        userSys: null,
        responseSys: null,
        bAuth: false
    }

    request.sys.errorSys = new ErrorSys('dev');
    next();
}