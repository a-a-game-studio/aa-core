
// Подключение компонентной библиотеки
import * as Components from '@a-a-game-studio/aa-components/lib';

import { UserSys } from './UserSys';
import { ResponseSys } from './ResponseSys';

import { Request } from 'express';

export interface ConfI{ // Конфигурация
    env: string; // Тип окружения
    // ================================
    mysql: { // Конфиг для MySql
        client: string, // mysql
        connection: { // Параметры соединения
            host: string; // "127.0.0.1"
            user: string; // Пользователь
            password: string; // Пароль
            database: string; // Имя базы данных
        },
        pool: { min: number, max: number }, // Количество соединений
        migrations: {
            tableName: string; // "knex_migrations",
            directory: string; // "./src/Infrastructure/SQL/Migrations"
        },
        acquireConnectionTimeout: number; // таймоут 60000
    };

    // ================================

    redis: { // Конфиг для редиса
        url: string; // "redis://127.0.0.1:6379"
    };

    rabbit?: {
        connection: string;
    };

    S3?: {
        endpoint: string;
        bucket: string;
        access: string;
        secret: string;
    },

};

export default interface MainRequest extends Request {
    headers: { [key: string]: any };
    body: any;
    method: string;

    sys: {
        apikey: string,
        bAuth: boolean, /* флаг авторизации */
        errorSys: Components.ErrorSys,
        userSys: UserSys,
        responseSys: ResponseSys
    };
    conf: ConfI
    infrastructure:{
        mysql:any;
        redis:any;
        rabbit: any;
    }
}

/**
 * Инициализация MainRequest для консольных запросов
 */
export function initMainRequest(conf: any): MainRequest {

    let mainRequest: any = {
        headers: null,
        sys: {
            apikey: '',
            bAuth: false, /* флаг авторизации */
            errorSys: null,
            userSys: null,
            responseSys: null,
            aaQuerySys:null
        },
        conf:null,
        infrastructure:{
            mysql:null,
            redis:null,
            rabbit:null,
        }
    };

    mainRequest.conf = conf;

    mainRequest.sys.errorSys = new Components.ErrorSys(conf.env);

    return mainRequest;
}
