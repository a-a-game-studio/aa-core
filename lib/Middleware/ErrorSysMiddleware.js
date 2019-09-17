"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lib_1 = require("@a-a-game-studio/aa-components/lib");
const config = require('../Config/MainConfig.js');
/* LEGO ошибок */
function ErrorSysMiddleware(request, response, next) {
    request.sys = {
        apikey: '',
        errorSys: null,
        userSys: null,
        responseSys: null,
        bAuth: false
    };
    request.sys.errorSys = new lib_1.ErrorSys(config.env);
    next();
}
exports.default = ErrorSysMiddleware;
//# sourceMappingURL=ErrorSysMiddleware.js.map