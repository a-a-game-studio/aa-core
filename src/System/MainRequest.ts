
// Подключение компонентной библиотеки
import * as AAClasses from '@a-a-game-studio/aa-classes/lib';

import { UserSys } from './UserSys';
import { ResponseSys } from './ResponseSys';

import { Request } from 'express';
import { Seo } from './Seo';
import { ListDB } from '@a-a-game-studio/aa-classes/lib/BaseClass/ListDB';

export interface ConfI { // Конфигурация
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
        queryList: {[key:string]:string};
    };

    S3?: {
        endpoint: string;
        bucket: string;
        access: string;
        secret: string;
    },

    seo?: Seo;

};

export interface MainRequest extends Request {
    headers: { [key: string]: any };
    body: any;
    method: string;

    sys: {
        token: string,
        bAuth: boolean, /* флаг авторизации */
        errorSys: AAClasses.Components.ErrorSys,
        userSys: UserSys,
        responseSys: ResponseSys,
        systemCore: AAClasses.SysteCoreModule.SystemCore
    };
    conf: ConfI;
    infrastructure: {
        mysql: any;
        redis: any;
        rabbit: any;
    },
    seo?: Seo;
    listDB?: ListDB;
}

/**
 * Инициализация MainRequest для консольных запросов
 */
export function initMainRequest(conf: any): MainRequest {

    let mainRequest: any = {
        headers: null,
        sys: {
            token: '',
            bAuth: false, /* флаг авторизации */
            errorSys: null,
            userSys: null,
            responseSys: null,
            aaQuerySys: null
        },
        conf: null,
        infrastructure: {
            mysql: null,
            redis: null,
            rabbit: null,
        }
    };

    mainRequest.conf = conf;

    mainRequest.sys.errorSys = new AAClasses.Components.ErrorSys(conf.env);
    mainRequest.seo = new Seo();

    return mainRequest;
}
