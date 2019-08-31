"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lib_1 = require("@a-a-game-studio/aa-components/lib");
/* LEGO ошибок */
function ErrorSysMiddleware(request, response, next) {
    request.sys = {
        apikey: '',
        errorSys: null,
        userSys: null,
        responseSys: null,
        bAuth: false
    };
    request.sys.errorSys = new lib_1.ErrorSys();
    next();
}
exports.default = ErrorSysMiddleware;
//# sourceMappingURL=ErrorSysMiddleware.js.map