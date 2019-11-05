import * as Components from '@a-a-game-studio/aa-components/lib';
import { RedisSys } from './RedisSys';
import { MainRequest } from './MainRequest';
import { UserSys } from './UserSys';
/**
 * Система кеширования
 */
export declare class CacheSys {
    protected redisSys: RedisSys;
    protected errorSys: Components.ErrorSys;
    protected userSys: UserSys;
    constructor(req: MainRequest);
    /**
     * Авто кеширование для встраивания в функцию
     * @param sKey - Ключ кеша
     * @param iTimeSec - Время кеширования
     * @param callback - функция получающая данные из БД
     */
    autoCache(sKey: string, iTimeSec: number, callback: any): Promise<any>;
    /**
     * Авто массивов кеширование для встраивания в функцию
     * @param sKey - Ключ кеша
     * @param iTimeSec - Время кеширования
     * @param callback - функция получающая данные из БД
     */
    autoCacheList(sKey: string, iTimeSec: number, callback: any): Promise<any>;
    /**
     * Авто кеширование int переменной для встраивания в функцию
     * @param sKey - Ключ кеша
     * @param iTimeSec - Время кеширования
     * @param callback - функция получающая данные из БД
     */
    autoCacheInt(sKey: string, iTimeSec: number, callback: any): Promise<number>;
    /**
     * Авто кеширование ID переменной для встраивания в функцию
     * @param sKey - Ключ кеша
     * @param iTimeSec - Время кеширования
     * @param callback - функция получающая данные из БД
     */
    autoCacheID(sKey: string, iTimeSec: number, callback: any): Promise<number>;
    /**
     * Очистить кеш редиса
     * @param sKey
     */
    clearCache(sKey: string): Promise<void>;
}
