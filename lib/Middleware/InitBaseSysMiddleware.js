"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AAComponents = require("@a-a-game-studio/aa-components/lib");
/* LEGO ошибок */
function InitBaseSysMiddleware(req, response, next) {
    req.sys = {
        token: '',
        errorSys: null,
        userSys: null,
        cacheSys: null,
        knexSys: null,
        logicSys: null,
        responseSys: null,
        bAuth: false,
        systemCore: null,
    };
    req.sys.errorSys = new AAComponents.ErrorSys(req.conf.env);
    next();
}
exports.default = InitBaseSysMiddleware;
//# sourceMappingURL=InitBaseSysMiddleware.js.map