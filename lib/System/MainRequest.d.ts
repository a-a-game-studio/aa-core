import * as AAClasses from '@a-a-game-studio/aa-classes/lib';
import { UserSys } from './UserSys';
import { ResponseSys } from './ResponseSys';
import { Request } from 'express';
import { Seo } from './Seo';
import { ListDB } from '@a-a-game-studio/aa-classes/lib/BaseClass/ListDB';
import { KnexSys } from './KnexSys';
import { CacheSys } from './CacheSys';
import { LogicSys } from './LogicSys';
/**
 * Типы ошибок ответа
 */
export declare enum TError {
    None = 0,
    PageNotFound = 404,
    Api = 1,
    AllBad = 500
}
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
        queryList: {
            [key: string]: string;
        };
    };
    S3?: {
        endpoint: string;
        bucket: string;
        access: string;
        secret: string;
    };
    seo?: Seo;
    FileModule?: {
        sSavePath: string;
        sUrl: string;
    };
    common: {
        env: string;
        port: number;
    };
}
export interface MainRequest extends Request {
    headers: {
        [key: string]: any;
    };
    body: any;
    method: string;
    errorType?: TError;
    sys: {
        token: string;
        bAuth: boolean;
        errorSys: AAClasses.Components.ErrorSys;
        userSys: UserSys;
        knexSys: KnexSys;
        logicSys: LogicSys;
        cacheSys: CacheSys;
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
