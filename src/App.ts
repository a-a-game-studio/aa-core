import * as express from 'express';
import * as Controller from './Namespace/Controller'
// Подключене системных файлов
import * as Middleware from './Namespace/Middleware'
// Базовый модуль
import * as IndexController from './Module/Common/Controller/IndexController';
import * as System from './Namespace/System'
import MainRequest, { ConfI } from './System/MainRequest';
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('knex');
/**
 * Класс приложения со всеми компонентами
 */
export class App {

    protected iPort: number; // порт подключения
    protected bodyMaxSize: string = '50mb'; // размер body
    protected conf: ConfI; // конфиг

    protected bUseMySql: boolean;
    protected bUseRabbitSender: boolean;
    protected bUseReddis: boolean;
    protected bUseAuthSys: boolean;

    public objExpress: express.Express;


    constructor(conf: ConfI, iPort: number = 3005) {

        this.bUseMySql = false;
        this.bUseRabbitSender = false;
        this.bUseReddis = false;
        this.bUseAuthSys = false;

        this.objExpress = express(); // уст. Express

        this.conf = conf; // уст. конфиг

        this.iPort = iPort; // уст. порт

        this.objExpress.use((req: MainRequest, resp: any, next: any) => {
            req.conf = this.conf;
            req.infrastructure = {
                mysql: null,
                redis: null,
                rabbit: null,
            }
            next();
        }); // уст. конфиг

        /* LEGO ошибок */
        this.objExpress.use(Middleware.ErrorSysMiddleware);

        /* запрос */
        this.objExpress.use(Middleware.RequestSysMiddleware);

        /* ответ */
        this.objExpress.use(Middleware.ResponseSysMiddleware);



        /* дефолтный index page */
        this.objExpress.use(IndexController.router);

        // Модуль для администрирования пользователей
        this.objExpress.use(Controller.AdminUserController.router);

    }

    /**
     * отключить Cors
     */
    public fDisableCors(): App {
        this.objExpress.use(cors());
        this.objExpress.options('*', cors());

        return this;
    }

    /**
     * Размер тела запроса
     * @param size 
     */
    public fSetBodyMaxSize(iSize: number): App {
        if (iSize <= 0) {
            throw 'bodyMaxSize mast be more than zero'
        }
        this.bodyMaxSize = iSize + 'mb';

        return this;
    }

    /**
     * Использоватть bodyParser с дефолтными настройками
     */
    public fUseBodyParser(): App {
        this.objExpress.use(bodyParser.urlencoded({ limit: this.bodyMaxSize, extended: true }));
        this.objExpress.use(bodyParser.json());
        return this;
    }

    /**
     * запуск приложения
     */
    public fStart(): void {
        console.log('server start at http://localhost:' + this.iPort);
        this.objExpress.listen(this.iPort);
    }

    /**
     * Использовать MySql
     */
    public fUseMySql(): App {
        this.objExpress.use((req: MainRequest, resp: any, next: any) => {
            req.infrastructure.mysql = db(this.conf.mysql);
            next();
        }); // уст. конфиг

        this.bUseMySql = true;

        return this;
    }

    /**
     * Использовать Reddis
     */
    public fUseReddis(): App {
        if(!this.conf.redis) throw 'Config redis connection is empty';


        this.objExpress.use((req: MainRequest, resp: any, next: any) => {
            req.infrastructure.redis = new System.RedisSys(this.conf.redis);
            next();
        }); // уст. конфиг

        this.bUseReddis = true;

        return this;
    }

    /**
     * Ипользование отправки в RabbitMQ
     */
    public async faUseRabbitSender(): Promise<App> {

        if(!this.conf.rabbit.connection) throw 'Config rabbit connection is empty';

        let rabbitSender = await System.RabbitSenderSys.Init(
            this.conf.rabbit.connection,
            this.conf.rabbit.queryList
        );

        this.objExpress.use((req: MainRequest, resp: any, next: any) => {
            req.infrastructure.rabbit = rabbitSender;
            next();
        }); // уст. конфиг

        this.bUseRabbitSender = true;

        return this;
    }

    /**
     * Использование AuthSys
     */
    public fUseAuthSys(): App {

        if(!this.bUseReddis) throw 'Reddis is not use';
        if(!this.bUseMySql) throw 'MySql is not use';
        
        /* проверка авторизации на уровне приложения */
        this.objExpress.use(Middleware.AuthSysMiddleware);
        
        this.bUseAuthSys = true;

        return this;
    }

}