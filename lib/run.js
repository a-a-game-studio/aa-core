"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const config = require('./Config/MainConfig.js');
const app = express();
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
    req.conf = config;
    next();
});
// =========================
// Подключение middleware
// =========================
const middleware = require("./Namespace/Middleware");
/* Инициализация базовых систем */
app.use(middleware.InitBaseSysMiddleware);
/** Конфигурирование приложения */
app.use(middleware.ConfigMiddleware);
/* запрос */
app.use(middleware.RequestSysMiddleware);
/* ответ */
app.use(middleware.ResponseSysMiddleware);
/* проверка авторизации на уровне приложения */
app.use(middleware.AuthSysMiddleware);
// =========================
// Подключение контроллеров
// =========================
const controller = require("./Namespace/Controller");
// Базовый модуль
app.use(controller.IndexController.router);
// Модуль для администрирования пользователей
app.use(controller.AdminUserController.router);
// Модуль для администрирования пользователей
app.use(controller.UserController.router);
console.log('server start at http://localhost:' + config.common.port);
app.listen(config.common.port);
//# sourceMappingURL=run.js.map