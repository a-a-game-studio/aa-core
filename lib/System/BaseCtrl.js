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
}
BaseCtrl.sBaseUrl = '/'; // базовый путь к api-методов для контролера
exports.default = BaseCtrl;
//# sourceMappingURL=BaseCtrl.js.map