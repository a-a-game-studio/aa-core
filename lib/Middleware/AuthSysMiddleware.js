"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const UserSys_1 = require("../System/UserSys");
/* проверка аутентификации на уровне приложения */
async function AuthSysMiddleware(request, response, next) {
    if (request.headers.token) {
        request.sys.token = request.headers.token;
    }
    else {
        request.sys.token = '';
    }
    /* юзерь не авторизован */
    request.sys.bAuth = false;
    const userSys = new UserSys_1.UserSys(request);
    // Инициализируем систему для пользователей
    await userSys.init();
    request.sys.userSys = userSys;
    next();
}
exports.default = AuthSysMiddleware;
//# sourceMappingURL=AuthSysMiddleware.js.map