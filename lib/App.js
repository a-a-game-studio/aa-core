"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Controller = require("./Namespace/Controller");
// Подключене системных файлов
const Middleware = require("./Namespace/Middleware");
// Базовый модуль
const IndexController = require("./Module/Common/Controller/IndexController");
const ConfigMiddleware_1 = require("./Middleware/ConfigMiddleware");
const bodyParser = require('body-parser');
const cors = require('cors');
/**
 * Класс приложения со всеми компонентами
 */
class App {
    constructor(objExpress, port = 3005) {
        this.bodyMaxSize = '50mb';
        this.objExpress = objExpress;
        this.objExpress.use(bodyParser.urlencoded({ limit: this.bodyMaxSize, extended: true }));
        this.objExpress.use(bodyParser.json());
        /*для подкл к API*/
        this.objExpress.use(cors());
        this.objExpress.options('*', cors());
        /* LEGO ошибок */
        this.objExpress.use(ConfigMiddleware_1.default);
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
    setBodyMaxSize(size) {
        if (size <= 0) {
            throw 'bodyMaxSize mast be more than zero';
        }
        this.bodyMaxSize = size + 'mb';
    }
    /**
     * запуск приложения
     */
    start() {
        console.log('server start at http://localhost:' + this.port);
        this.objExpress.listen(3005);
    }
}
exports.App = App;
//# sourceMappingURL=App.js.map