
import * as express from 'express';
import {Response} from "express";
import {NextFunction} from "express";


const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ limit: '50mb',extended: true }));
app.use(bodyParser.json());

const cors = require('cors');
/*для подкл к API*/
app.use(cors());
app.options('*', cors());

/* LEGO ошибок */

import * as Component from '@a-a-game-studio/aa-components/lib';
import * as Core from './index';


import ConfigMiddleware from './Middleware/ConfigMiddleware'
app.use(ConfigMiddleware);

/* LEGO ошибок */
app.use(Core.Middleware.ErrorSysMiddleware);

/* запрос */
app.use(Core.Middleware.RequestSysMiddleware);

/* ответ */
app.use(Core.Middleware.ResponseSysMiddleware);

/* проверка авторизации на уровне приложения */
app.use(Core.Middleware.AuthSysMiddleware);

// Базовый модуль
import * as IndexController from './Module/Common/Controller/IndexController';
app.use(IndexController.router);

// Модуль для администрирования пользователей
app.use(Core.Controller.AdminUserController.router);

console.log('server start at http://localhost:3005');
app.listen(3005);
