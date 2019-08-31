
// Подключение компонентной библиотеки
import * as Components from '@a-a-game-studio/aa-components/lib';

import { ErrorSys } from './ErrorSys';
import { UserSys } from './UserSys';
import { ResponseSys } from './ResponseSys';

import { Request } from 'express';

/**
 * Конфигурация
 */
export interface ConfI extends Components.BaseConfI {
    env:string;
    // ================================
    mysql: { // Конфиг для MySql
        client: string, // mysql
        connection: { // Параметры соединения
            host: string; // "127.0.0.1"
            user: string; // Пользователь
            password: string; // Пароль
            database: string; // Имя базы данных
        },
        pool: { min: number, max: number }, // Количество соединений (3,7)
        migrations: {
            tableName: string; // "knex_migrations",
            directory: string; // "./src/Infrastructure/SQL/Migrations"
        },
        acquireConnectionTimeout: number; // таймоут 60000
    };
    // ================================
    redis?: { // Конфиг для редиса
        url: string; // "redis://127.0.0.1:6379"
    };
    // ================================
    rabbit?: { // Rabit очереди
        connection: string;
    };

    S3?: { // S3 хранилище
        endpoint: string;
        bucket: string;
        access: string;
        secret: string;
    },

}

export interface CoreI extends Components.BaseCoreI {
    req?:Request;
    sys: {
        errorSys: Components.ErrorSys;
        userSys?: UserSys,
        responseSys: ResponseSys
    };
    conf:ConfI
    infrastructure?:{
        mysql?:any;
        redis?:any;
        rabbit?: any;
    }
}


/**
 * Инициализация MainRequest для консольных запросов
 */
export function initMainRequest(conf: ConfI): CoreI {

    // Инициализация базового ядра
    let baseCoreObj: Components.BaseCoreI = Components.initBaseCore(conf);

    let coreObj:CoreI = {
        env: baseCoreObj.env, // Тип окружения
        apikey: baseCoreObj.apikey, // API ключ
        sys: { // Системные сервисы
            errorSys: baseCoreObj.sys.errorSys, // Глобальная система ошибок
            userSys: null, // Система пользователя
            responseSys: null
        },
        conf: conf, // Конфигурация
        infrastructure:{ // Инфраструктурные компоненты
            mysql:null, // База данных MySQL
            redis:null, // Редис
            rabbit:null, // Ребит
        }
    };

    return coreObj;
}
