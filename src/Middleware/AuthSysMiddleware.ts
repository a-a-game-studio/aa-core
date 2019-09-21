import {SysteCoreModule} from '@a-a-game-studio/aa-classes/lib';

import { MainRequest } from '../System/MainRequest';
import { UserSys } from '../System/UserSys';

/* проверка аутентификации на уровне приложения */
export class AuthSysMiddleware {

    protected listDBData: SysteCoreModule.ListDBI;

    constructor(listDBData: SysteCoreModule.ListDBI) {
        this.listDBData = listDBData;
        this.faMiddleware = this.faMiddleware.bind(this);
    }

    /**
     * Эта ф-я используется как Middleware
     * @param req 
     * @param response 
     * @param next 
     */
    public async faMiddleware(req: MainRequest, response: any, next: any) {

        if (req.headers.token) {
            req.sys.token = req.headers.token;
        } else {
            req.sys.token = '';
        }

        /* юзерь не авторизован */
        req.sys.bAuth = false;

        const listDB = new SysteCoreModule.ListDB(this.listDBData);
        const userSys = new UserSys(req, listDB);

        // Инициализируем систему для пользователей
        await userSys.init();

        req.sys.userSys = userSys;

        /* находим пользователя по ключу */
        if (req.sys.token) {
            await req.sys.userSys.actions.infoA.faGetUserInfoByToken(req.sys.token);
        }

        /* флаг авторизации */
        if (req.sys.userSys.is()) {
            req.sys.systemCore = new SysteCoreModule.SystemCore(req.sys.errorSys, req.sys.userSys, listDB);
        }

        next();
    }

}