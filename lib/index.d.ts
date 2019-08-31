import * as Components from '@a-a-game-studio/aa-components/lib';
import BaseCtrl from './System/BaseCtrl';
import BaseSQL from './System/BaseSQL';
import BaseM from './System/BaseM';
import { ErrorSys } from '@a-a-game-studio/aa-components/lib';
import { UserSys } from './System/UserSys';
import { ResponseSys } from './System/ResponseSys';
import MainRequest from './System/MainRequest';
import { initMainRequest } from './System/MainRequest';
import ErrorSysMiddleware from './Middleware/ErrorSysMiddleware';
import RequestSysMiddleware from './Middleware/RequestSysMiddleware';
import ResponseSysMiddleware from './Middleware/ResponseSysMiddleware';
import AuthSysMiddleware from './Middleware/AuthSysMiddleware';
import { RedisSys } from './System/RedisSys';
import { S3objectParamsI, S3confI, S3 } from './System/S3';
import { RabbitSenderSys } from './System/RabbitSenderSys';
import BaseCommand from './System/BaseCommand';
import BaseTest from './System/BaseTest';
import * as HelperSys from './System/HelperSys';
declare const Middleware: {
    ErrorSysMiddleware: typeof ErrorSysMiddleware;
    RequestSysMiddleware: typeof RequestSysMiddleware;
    ResponseSysMiddleware: typeof ResponseSysMiddleware;
    AuthSysMiddleware: typeof AuthSysMiddleware;
};
export { BaseCtrl, BaseSQL, BaseM, Components, // Общие компоненты
ErrorSys, UserSys, ResponseSys, RedisSys, Middleware, MainRequest, // interface MainRequest
S3, S3objectParamsI, S3confI, RabbitSenderSys, initMainRequest, // Инициализация Main Request для тестов
BaseCommand, // Конструктор консольных комманд
BaseTest, // Конструктор тестов
HelperSys };
