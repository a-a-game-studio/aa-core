import * as Components from '@a-a-game-studio/aa-components/lib';
import { UserSys } from './UserSys';
import { ResponseSys } from './ResponseSys';
import { Request } from 'express';
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
    };
    S3?: {
        endpoint: string;
        bucket: string;
        access: string;
        secret: string;
    };
}
export default interface MainRequest extends Request {
    headers: {
        [key: string]: any;
    };
    body: any;
    method: string;
    sys: {
        apikey: string;
        bAuth: boolean;
        errorSys: Components.ErrorSys;
        userSys: UserSys;
        responseSys: ResponseSys;
    };
    conf: ConfI;
    infrastructure: {
        mysql: any;
        redis: any;
        rabbit: any;
    };
}
/**
 * Инициализация MainRequest для консольных запросов
 */
export declare function initMainRequest(conf: any): MainRequest;
