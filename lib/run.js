"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(bodyParser.json());
const cors = require('cors');
/*для подкл к API*/
app.use(cors());
app.options('*', cors());
const Core = require("./index");
const ConfigMiddleware_1 = require("./Middleware/ConfigMiddleware");
app.use(ConfigMiddleware_1.default);
/* LEGO ошибок */
app.use(Core.Middleware.ErrorSysMiddleware);
/* запрос */
app.use(Core.Middleware.RequestSysMiddleware);
/* ответ */
app.use(Core.Middleware.ResponseSysMiddleware);
/* проверка авторизации на уровне приложения */
app.use(Core.Middleware.AuthSysMiddleware);
// Базовый модуль
const IndexController = require("./Module/Common/Controller/IndexController");
app.use(IndexController.router);
// Модуль для администрирования пользователей
app.use(Core.Controller.AdminUserController.router);
console.log('server start at http://localhost:3005');
app.listen(3005);
//# sourceMappingURL=run.js.map