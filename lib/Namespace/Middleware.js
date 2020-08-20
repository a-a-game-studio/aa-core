"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SharedMemMiddleware = exports.RedisMiddleware = exports.MySqlMiddleware = exports.InitSubSysMiddleware = exports.InitBaseSysMiddleware = exports.ConfigMiddleware = exports.AuthSysMiddleware = exports.ResponseSysMiddleware = exports.RequestSysMiddleware = void 0;
/* Создает объект запроса */
const RequestSysMiddleware_1 = __importDefault(require("../Middleware/RequestSysMiddleware"));
exports.RequestSysMiddleware = RequestSysMiddleware_1.default;
/* Создает объект ответа */
const ResponseSysMiddleware_1 = __importDefault(require("../Middleware/ResponseSysMiddleware"));
exports.ResponseSysMiddleware = ResponseSysMiddleware_1.default;
/* проверка авторизации на уровне приложения */
const AuthSysMiddleware_1 = __importDefault(require("../Middleware/AuthSysMiddleware"));
exports.AuthSysMiddleware = AuthSysMiddleware_1.default;
/* Конфигурирование приложения */
const ConfigMiddleware_1 = __importDefault(require("../Middleware/ConfigMiddleware"));
exports.ConfigMiddleware = ConfigMiddleware_1.default;
/* Инициализация базовых систем */
const InitBaseSysMiddleware_1 = __importDefault(require("../Middleware/InitBaseSysMiddleware"));
exports.InitBaseSysMiddleware = InitBaseSysMiddleware_1.default;
/* Инициализация подсистем */
const InitSubSysMiddleware_1 = __importDefault(require("../Middleware/InitSubSysMiddleware"));
exports.InitSubSysMiddleware = InitSubSysMiddleware_1.default;
const RedisMiddleware_1 = __importDefault(require("../Middleware/RedisMiddleware"));
exports.RedisMiddleware = RedisMiddleware_1.default;
const MySqlMiddleware_1 = __importDefault(require("../Middleware/MySqlMiddleware"));
exports.MySqlMiddleware = MySqlMiddleware_1.default;
const SharedMemMiddleware_1 = require("../Middleware/SharedMemMiddleware");
Object.defineProperty(exports, "SharedMemMiddleware", { enumerable: true, get: function () { return SharedMemMiddleware_1.SharedMemMiddleware; } });
//# sourceMappingURL=Middleware.js.map