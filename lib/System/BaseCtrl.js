"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Базовый контроллер
 */
class BaseCtrl {
    constructor(req, resp) {
        this.req = req;
        this.responseSys = req.sys.responseSys;
        this.errorSys = req.sys.errorSys;
        this.userSys = req.sys.userSys;
        this.resp = resp;
    }
    fClassName() {
        return this.constructor.name;
    }
    fMethodName() {
        var err = new Error();
        return /at \w+\.(\w+)/.exec(err.stack.split('\n')[2])[1]; // we want the 2nd method in the call stack
    }
    /**
     * Асинхронный конструктор
     * @param req
     * @param resp
     * @param bNeedAuth - нужно проверка на юзера
     */
    static async Init(req, resp, bNeedAuth = false) {
        let self = new this(req, resp);
        // Инициализация системных сервисов
        self.userSys = req.sys.userSys;
        self.responseSys = req.sys.responseSys;
        /* проверка авторизации */
        if (bNeedAuth && (!req.sys.bAuth)) {
            self.errorSys.error('authError', 'authError');
        }
        return self;
    }
}
BaseCtrl.sBaseUrl = '/'; // базовый путь к api-методов для контролера
exports.default = BaseCtrl;
//# sourceMappingURL=BaseCtrl.js.map