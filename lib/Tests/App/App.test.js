"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const middleware = __importStar(require("../../Namespace/Middleware"));
const sharedMem = {};
const express_1 = __importDefault(require("express"));
const MainConfigTest_1 = require("./MainConfigTest");
const app = express_1.default();
// =========================
// Базовая конфигурация expressa
// =========================
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(bodyParser.json({ limit: '50mb', extended: true }));
const cors = require('cors');
/*для подкл к API*/
app.use(cors());
app.options('*', cors());
app.use(express_1.default.static(__dirname + '/../../../src/Tests/App/public'));
// Инициализация конфига
app.use(function InitConfigMiddleware(req, res, next) {
    req.conf = MainConfigTest_1.conf;
    next();
});
// =========================
// Подключение middleware
// =========================
/* Инициализация базовых систем */
app.use(middleware.InitBaseSysMiddleware);
/** Конфигурирование приложения */
app.use(middleware.ConfigMiddleware);
// кэш
app.use(middleware.SharedMemMiddleware(sharedMem));
// база
app.use(middleware.MySqlMiddleware);
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
const controller = __importStar(require("../../Namespace/Controller"));
// Базовый модуль
app.use(controller.IndexController.router);
// Модуль для пользователей
// app.use(controller.UserController.router);
// Модуль для login
app.use(controller.LoginCtrl.router);
// файлы
app.use(controller.FileCtrl.router);
app.use(controller.FileCtrl.router);
console.log('server start at http://localhost:' + MainConfigTest_1.conf.common.port);
app.listen(MainConfigTest_1.conf.common.port);
//# sourceMappingURL=App.test.js.map