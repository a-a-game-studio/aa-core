"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lib_1 = require("@a-a-game-studio/aa-classes/lib");
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require("knex");
const express = require("express");
// Подключене системных файлов
const Middleware = require("./Namespace/Middleware");
const System = require("./Namespace/System");
const Controller = require("./Namespace/Controller");
// Базовый модуль
const IndexController = require("./Module/Common/Controller/IndexController");
const UserController_1 = require("./Module/User/UserController");
const AppDefaultMigration_1 = require("./AppDefaultMigration");
const ListDB_1 = require("@a-a-game-studio/aa-classes/lib/BaseClass/ListDB");
const UserSQL_1 = require("./Module/User/UserSQL");
/**
 * Класс приложения со всеми компонентами
 */
class App {
    constructor(conf, iPort = 3005) {
        this.bodyMaxSize = '50mb'; // размер body
        this.bUseMySql = false;
        this.bUseRabbitSender = false;
        this.bUseReddis = false;
        this.bUseAuthSys = false;
        this.bUserCtrl = false;
        this.bUseAAClasses = false;
        this.objExpress = express(); // уст. Express
        this.conf = conf; // уст. конфиг
        this.iPort = iPort; // уст. порт
        this.errorSys = new lib_1.Components.ErrorSys(this.conf.env);
        this.reddis = new System.RedisSys(this.conf.redis);
        /* Подключаем конфиг */
        this.objExpress.use((req, resp, next) => {
            req.conf = this.conf;
            req.infrastructure = {
                mysql: null,
                redis: null,
                rabbit: null,
            };
            next();
        }); // уст. конфиг
        /* LEGO ошибок */
        this.objExpress.use((req, response, next) => {
            req.sys = {
                token: '',
                errorSys: null,
                userSys: null,
                responseSys: null,
                bAuth: false,
                systemCore: null,
            };
            req.sys.errorSys = this.errorSys;
            next();
        });
        /* запрос */
        this.objExpress.use(Middleware.RequestSysMiddleware);
        /* ответ */
        this.objExpress.use(Middleware.ResponseSysMiddleware);
    }
    /**
     * отключить Cors
     */
    fDisableCors() {
        this.objExpress.use(cors());
        this.objExpress.options('*', cors());
        return this;
    }
    /**
     * Размер тела запроса
     * @param size
     */
    fSetBodyMaxSize(iSize) {
        if (iSize <= 0) {
            throw 'bodyMaxSize mast be more than zero';
        }
        this.bodyMaxSize = iSize + 'mb';
        return this;
    }
    /**
     * Использоватть bodyParser с дефолтными настройками
     */
    fUseBodyParser() {
        this.objExpress.use(bodyParser.urlencoded({ limit: this.bodyMaxSize, extended: true }));
        this.objExpress.use(bodyParser.json());
        return this;
    }
    /**
     * запуск приложения
     */
    fStart() {
        console.log('server start at http://localhost:' + this.iPort);
        this.objExpress.listen(this.iPort);
    }
    /**
     * Использовать MySql
     */
    fUseMySql() {
        if (!this.conf.mysql) {
            console.log('Config mysql connection is empty');
            process.exit(1);
        }
        ;
        this.objDb = db(this.conf.mysql);
        this.objExpress.use((req, resp, next) => {
            req.infrastructure.mysql = this.objDb;
            next();
        }); // уст. конфиг
        this.bUseMySql = true;
        return this;
    }
    /**
     * Использовать Reddis
     */
    fUseReddis() {
        if (!this.conf.redis) {
            console.log('Config redis connection is empty');
            process.exit(1);
        }
        ;
        this.reddis.fSetUse(true);
        this.objExpress.use((req, resp, next) => {
            req.infrastructure.redis = this.reddis;
            next();
        }); // уст. конфиг
        this.bUseReddis = true;
        return this;
    }
    /**
     * Ипользование отправки в RabbitMQ
     */
    async faUseRabbitSender() {
        if (!this.conf.rabbit.connection) {
            console.log('Config rabbit connection is empty');
            process.exit(1);
        }
        ;
        let rabbitSender = await System.RabbitSenderSys.Init(this.conf.rabbit.connection, this.conf.rabbit.queryList);
        this.objExpress.use((req, resp, next) => {
            req.infrastructure.rabbit = rabbitSender;
            next();
        }); // уст. конфиг
        this.bUseRabbitSender = true;
        return this;
    }
    /**
     * Использование AuthSys
     */
    async faUseAuthSys() {
        if (!this.bUseMySql) {
            console.log('faUseAuthSys: MySql is not used');
            process.exit(1);
        }
        ;
        /* проверка авторизации на уровне приложения */
        this.objExpress.use(Middleware.AuthSysMiddleware);
        this.bUseAuthSys = true;
        return this;
    }
    /**
     * Использовать контролер пользователя
     */
    fUseUserCtrl() {
        if (!this.bUseAuthSys) {
            console.log('faUserCtrl: AuthSys is not used');
            process.exit(1);
        }
        ;
        /* проверка авторизации на уровне приложения */
        this.objExpress.use(UserController_1.default);
        this.bUserCtrl = true;
        return this;
    }
    /**
     * Использованеи модуля администрования пользователей
     */
    fUseAdminUser() {
        if (!this.bUseAuthSys) {
            console.log('fUseAdminUser: AuthSys is not used');
            process.exit(1);
        }
        ;
        // Модуль для администрирования пользователей
        this.objExpress.use(Controller.AdminUserController.router);
        return this;
    }
    /**
     * Использовать статические файлы
     * @param sPath
     */
    fUseStatic(sPath) {
        this.objExpress.use(express.static(sPath));
        return this;
    }
    /**
     * ИСпользовать динамически шаблоны ejs
     * @param sPath
     */
    fUseViews(sPath) {
        this.objExpress.set('views', sPath);
        this.objExpress.set('view engine', 'ejs');
        return this;
    }
    /**
     * Использовать дефолтный index page
     */
    fUseDefaultIndex() {
        /* дефолтный index page */
        this.objExpress.use(IndexController.router);
        return this;
    }
    /**
     * Установка приложения
     */
    async faInstall() {
        console.log('Start install app...');
        console.log('Start migrate DB...');
        if (!this.bUseMySql) {
            console.log('faInstall: MySql is not use');
            process.exit(1);
        }
        ;
        await this.objDb.migrate.latest();
        console.log('Migrate done!');
        console.log('Install app done!');
        return this;
    }
    /**
     * Создать миграцию
     * @param name: string - Название миграции
     */
    async faMakeMigration(name) {
        if (!this.bUseMySql)
            throw 'MySql is not use';
        await this.objDb.migrate.make(name);
        return this;
    }
    /**
     * Выпольнить дефлтную миграцию
     */
    async faRunDefaultMigration() {
        const migrator = new AppDefaultMigration_1.AppDefaultMigration(this.objDb);
        await migrator.faRun();
    }
    /**
     * Использовать AAClasses
     * его нудно переопределять есть используются extended AAClasses
     */
    fUseAAClasses() {
        if (!this.bUseMySql)
            throw 'MySql is not use';
        /* модули доступа к данным */
        this.listDBData = {
            userDB: new UserSQL_1.UserSQL(this.errorSys, this.objDb),
            walletDB: new lib_1.WalletModule.WalletDB(this.errorSys),
            fileDB: new lib_1.FileModule.FileDB(this.errorSys),
        };
        this.listDB = new ListDB_1.ListDB(this.listDBData);
        /* Подключаем конфиг */
        this.objExpress.use((req, resp, next) => {
            req.listDB = this.listDB;
            next();
        }); // уст. конфиг
        this.bUseAAClasses = true;
        return this;
    }
}
exports.App = App;
//# sourceMappingURL=App.js.map