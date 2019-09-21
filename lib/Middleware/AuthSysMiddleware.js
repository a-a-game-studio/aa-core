"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lib_1 = require("@a-a-game-studio/aa-classes/lib");
const UserSys_1 = require("../System/UserSys");
/* проверка аутентификации на уровне приложения */
class AuthSysMiddleware {
    constructor(listDBData) {
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
    async faMiddleware(req, response, next) {
        if (req.headers.token) {
            req.sys.token = req.headers.token;
        }
        else {
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
    fInitListDB() {
        return new lib_1.SysteCoreModule.ListDB(this.listDBData);
    }
    /**
     * Ф-я подключения пользователя
     * ее стоит преопределять когда наследуешь класс UserSys
     * @param req
     */
    fInitUser(req) {
        return new UserSys_1.UserSys(req, this.listDB);
    }
    /**
     * Ф-я подключения SystemCore
     * ее стоит преопределять когда наследуешь класс SystemCore
     * @param req: MainRequest
     */
    fInitSystemCore(req) {
        return new lib_1.SysteCoreModule
            .SystemCore(req.sys.errorSys, req.sys.userSys, this.listDB);
    }
}
exports.AuthSysMiddleware = AuthSysMiddleware;
//# sourceMappingURL=AuthSysMiddleware.js.map