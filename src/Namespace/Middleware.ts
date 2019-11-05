/* Создает объект запроса */
import RequestSysMiddleware from '../Middleware/RequestSysMiddleware'

/* Создает объект ответа */
import ResponseSysMiddleware from '../Middleware/ResponseSysMiddleware'

/* проверка авторизации на уровне приложения */
import  AuthSysMiddleware  from '../Middleware/AuthSysMiddleware'

/* Конфигурирование приложения */
import ConfigMiddleware from '../Middleware/ConfigMiddleware'

/* Инициализация базовых систем */
import InitBaseSysMiddleware from '../Middleware/InitBaseSysMiddleware'

/* Инициализация подсистем */
import InitSubSysMiddleware from '../Middleware/InitSubSysMiddleware'

export {
    RequestSysMiddleware,
    ResponseSysMiddleware,
    AuthSysMiddleware,
    ConfigMiddleware,
    InitBaseSysMiddleware,
    InitSubSysMiddleware
}