import { SysteCoreModule } from '@a-a-game-studio/aa-classes/lib';

import { MainRequest } from '../System/MainRequest';
import { UserSys } from '../System/UserSys';

/* проверка аутентификации на уровне приложения */
export class AuthSysMiddleware {

    protected listDBData: SysteCoreModule.ListDBI;
    protected listDB: SysteCoreModule.ListDB;

    constructor(listDBData: SysteCoreModule.ListDBI) {
        this.listDBData = listDBData;
        this.faMiddleware = this.faMiddleware.bind(this);
        this.fInitUser = this.fInitUser.bind(this);
        this.fInitSystemCore = this.fInitSystemCore.bind(this);
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

        /* список подключений к DB */
        this.listDB = this.fInitListDB();

        /* подключам юзера */
        req.sys.userSys = this.fInitUser(req);
        // Инициализируем систему для пользователей
        await req.sys.userSys.init();

        /* находим пользователя по ключу */
        if (req.sys.token) {
            await req.sys.userSys.actions.infoA.faGetUserInfoByToken(req.sys.token);
        }

        /* Инициализация SystemCore */
        if (req.sys.userSys.is()) {
            req.sys.systemCore = this.fInitSystemCore(req);
        }

        next();
    }

    /**
     * Ф-я подключения ListDB
     * ее стоит преопределять когда наследуешь класс ListDB
     * @param req 
     */
    protected fInitListDB(): SysteCoreModule.ListDB {
        return new SysteCoreModule.ListDB(this.listDBData);
    }

    /**
     * Ф-я подключения пользователя
     * ее стоит преопределять когда наследуешь класс UserSys
     * @param req 
     */
    protected fInitUser(req: MainRequest): UserSys {
        return new UserSys(req, this.listDB);
    }

    /**
     * Ф-я подключения SystemCore
     * ее стоит преопределять когда наследуешь класс SystemCore
     * @param req: MainRequest 
     */
    protected fInitSystemCore(req: MainRequest): SysteCoreModule.SystemCore {
        return new SysteCoreModule
                .SystemCore(req.sys.errorSys, req.sys.userSys, this.listDB);
    }

}