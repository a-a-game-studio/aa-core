"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Базовый контроллер
 */
class BaseCtrl {
    constructor(req) {
        this.req = req;
        this.responseSys = req.sys.responseSys;
        this.errorSys = req.sys.errorSys;
        this.userSys = req.sys.userSys;
    }
}
BaseCtrl.sBaseUrl = '/'; // базовый путь к api-методов для контролера
exports.default = BaseCtrl;
//# sourceMappingURL=BaseCtrl.js.map