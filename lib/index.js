"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Подключение компонентной библиотеки
const Components = require("@a-a-game-studio/aa-components/lib");
exports.Components = Components;
const BaseCtrl_1 = require("./System/BaseCtrl");
exports.BaseCtrl = BaseCtrl_1.default;
// export { BaseCtrl as BaseCtrl };
const BaseSQL_1 = require("./System/BaseSQL");
exports.BaseSQL = BaseSQL_1.default;
// export { BaseSQL as BaseSQL };
const BaseM_1 = require("./System/BaseM");
exports.BaseM = BaseM_1.default;
// export { BaseM as BaseM };
const lib_1 = require("@a-a-game-studio/aa-components/lib");
exports.ErrorSys = lib_1.ErrorSys;
// export { ErrorSys, BaseSQL };
const UserSys_1 = require("./System/UserSys");
exports.UserSys = UserSys_1.UserSys;
const ResponseSys_1 = require("./System/ResponseSys");
exports.ResponseSys = ResponseSys_1.ResponseSys;
const MainRequest_1 = require("./System/MainRequest");
exports.initMainRequest = MainRequest_1.initMainRequest;
// export { MainRequest as MainRequest };
// /* LEGO ошибок */
const ErrorSysMiddleware_1 = require("./Middleware/ErrorSysMiddleware");
/* Создает объект запроса */
const RequestSysMiddleware_1 = require("./Middleware/RequestSysMiddleware");
/* Создает объект ответа */
const ResponseSysMiddleware_1 = require("./Middleware/ResponseSysMiddleware");
// /* проверка авторизации на уровне приложения */
const AuthSysMiddleware_1 = require("./Middleware/AuthSysMiddleware");
const RedisSys_1 = require("./System/RedisSys");
exports.RedisSys = RedisSys_1.RedisSys;
/* Класс для работы с S3 */
const S3_1 = require("./System/S3");
exports.S3 = S3_1.S3;
/* Отправлятор сообщений в Rabbit */
const RabbitSenderSys_1 = require("./System/RabbitSenderSys");
exports.RabbitSenderSys = RabbitSenderSys_1.RabbitSenderSys;
/* Конструктор Консольной команды */
const BaseCommand_1 = require("./System/BaseCommand");
exports.BaseCommand = BaseCommand_1.default;
/* Конструктор теста */
const BaseTest_1 = require("./System/BaseTest");
exports.BaseTest = BaseTest_1.default;
/* Хелпер полезных функций */
const HelperSys = require("./System/HelperSys");
exports.HelperSys = HelperSys;
const Middleware = {
    ErrorSysMiddleware: ErrorSysMiddleware_1.default,
    RequestSysMiddleware: RequestSysMiddleware_1.default,
    ResponseSysMiddleware: ResponseSysMiddleware_1.default,
    AuthSysMiddleware: AuthSysMiddleware_1.default
};
exports.Middleware = Middleware;
//# sourceMappingURL=index.js.map