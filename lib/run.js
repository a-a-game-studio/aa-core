"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const MainConfig_1 = __importDefault(require("./Config/MainConfig"));
const app = express_1.default();
// =========================
// Базовая конфигурация expressa
// =========================
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(bodyParser.json());
const cors = require('cors');
/*для подкл к API*/
app.use(cors());
app.options('*', cors());
// Инициализация конфига
app.use(function InitConfigMiddleware(req, res, next) {
    req.conf = MainConfig_1.default;
    next();
});
// =========================
// Подключение middleware
// =========================
const middleware = __importStar(require("./Namespace/Middleware"));
/* Инициализация базовых систем */
app.use(middleware.InitBaseSysMiddleware);
/** Конфигурирование приложения */
app.use(middleware.ConfigMiddleware);
/** Инициализация подсистем */
app.use(middleware.InitSubSysMiddleware);
/* запрос */
app.use(middleware.RequestSysMiddleware);
/* ответ */
app.use(middleware.ResponseSysMiddleware);
/* проверка авторизации на уровне приложения */
app.use(middleware.AuthSysMiddleware);
// =========================
// Подключение контроллеров
// =========================
const controller = __importStar(require("./Namespace/Controller"));
// Базовый модуль
// app.use(controller.IndexController.router);
// Модуль для пользователей
// app.use(controller.UserController.router);
// Модуль для login
app.use(controller.LoginCtrl.router);
// Модуль для редактирования пользователей администратором
app.use(controller.AdminEditUserCtrl.router);
// Модуль для редактирования групп администратором
app.use(controller.AdminEditGroupCtrl.router);
// Модуль для редактирования ENUM дерева типов
app.use(controller.AdminEditEnumCtrl.router);
console.log('server start at http://localhost:' + MainConfig_1.default.common.port);
app.listen(MainConfig_1.default.common.port);
//# sourceMappingURL=run.js.map