import * as Components from '@a-a-game-studio/aa-components/lib';
import { MainRequest } from './MainRequest';
import { UserSys } from './UserSys';
/**
 * Обертка над написание запросов Knex
 */
export declare class KnexSys {
    protected errorSys: Components.ErrorSys;
    protected userSys: UserSys;
    constructor(req: MainRequest);
    /**
     * Получить строку из SQL raw запроса
     * @param data
     */
    fOneRaw(data: any): any;
    /**
     * Получить список из SQL raw запроса
     * @param data
     */
    fListRaw(data: any): Promise<any>;
    /**
     * Получить поле из SQL raw запроса
     * @param data
     * @param sField
     */
    fFieldRaw(sField: string, data: any): number | string | boolean | bigint;
    /**
     * Получить строку из SQL builder запроса
     * @param data
     */
    fOne(data: any): Promise<any>;
    /**
     * Получить строку из SQL builder запроса
     * @param data
     */
    fList(data: any): Promise<any>;
    /**
     * Получить поле из SQL builder запроса
     * @param sField
     * @param data
     */
    fField(sField: string, data: any): Promise<number | string | boolean | bigint>;
}
