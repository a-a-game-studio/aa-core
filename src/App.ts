import * as express from 'express';
import * as Controller from './Namespace/Controller'
// Подключене системных файлов
import * as Middleware from './Namespace/Middleware'
// Базовый модуль
import * as IndexController from './Module/Common/Controller/IndexController';

import ConfigMiddleware from './Middleware/ConfigMiddleware'
const bodyParser = require('body-parser');
const cors = require('cors');

/**
 * Класс приложения со всеми компонентами
 */
export class App {

    protected objExpress: express.Express;
    protected port: number;

    protected bodyMaxSize: string = '50mb';

    constructor(objExpress: express.Express, port: number = 3005) {
        this.objExpress = objExpress;
        this.objExpress.use(bodyParser.urlencoded({ limit: this.bodyMaxSize, extended: true }));
        this.objExpress.use(bodyParser.json());

        /*для подкл к API*/
        this.objExpress.use(cors());
        this.objExpress.options('*', cors());

        /* LEGO ошибок */

        this.objExpress.use(ConfigMiddleware);

        /* LEGO ошибок */
        this.objExpress.use(Middleware.ErrorSysMiddleware);

        /* запрос */
        this.objExpress.use(Middleware.RequestSysMiddleware);

        /* ответ */
        this.objExpress.use(Middleware.ResponseSysMiddleware);

        /* проверка авторизации на уровне приложения */
        this.objExpress.use(Middleware.AuthSysMiddleware);


        this.objExpress.use(IndexController.router);

        // Модуль для администрирования пользователей
        this.objExpress.use(Controller.AdminUserController.router);

    }

    /**
     * Размер тела запроса
     * @param size 
     */
    public setBodyMaxSize(size: number) {
        if (size <= 0) {
            throw 'bodyMaxSize mast be more than zero'
        }
        this.bodyMaxSize = size + 'mb';
    }

    /**
     * запуск приложения
     */
    public start() {
        console.log('server start at http://localhost:' + this.port);
        this.objExpress.listen(3005);
    }

}