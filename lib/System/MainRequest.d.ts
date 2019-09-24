import * as AAClasses from '@a-a-game-studio/aa-classes/lib';
import { UserSys } from './UserSys';
import { ResponseSys } from './ResponseSys';
import { Request } from 'express';
import { Seo } from './Seo';
import { ListDB } from '@a-a-game-studio/aa-classes/lib/BaseClass/ListDB';
export interface ConfI {
    env: string;
    mysql: {
        client: string;
        connection: {
            host: string;
            user: string;
            password: string;
            database: string;
        };
        pool: {
            min: number;
            max: number;
        };
        migrations: {
            tableName: string;
            directory: string;
        };
        acquireConnectionTimeout: number;
    };
    redis: {
        url: string;
    };
    rabbit?: {
        connection: string;
        queryList: string[];
    };
    S3?: {
        endpoint: string;
        bucket: string;
        access: string;
        secret: string;
    };
    seo?: Seo;
}
export interface MainRequest extends Request {
    headers: {
        [key: string]: any;
    };
    body: any;
    method: string;
    sys: {
        token: string;
        bAuth: boolean;
        errorSys: AAClasses.Components.ErrorSys;
        userSys: UserSys;
        responseSys: ResponseSys;
        systemCore: AAClasses.SysteCoreModule.SystemCore;
    };
    conf: ConfI;
    infrastructure: {
        mysql: any;
        redis: any;
        rabbit: any;
    };
    seo?: Seo;
    listDB?: ListDB;
}
/**
 * Инициализация MainRequest для консольных запросов
 */
export declare function initMainRequest(conf: any): MainRequest;
