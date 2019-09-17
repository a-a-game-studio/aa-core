import { ErrorSys } from '@a-a-game-studio/aa-components/lib';
import { RedisSys } from './RedisSys';
import MainRequest from './MainRequest';
import { ModelValidatorSys } from '@a-a-game-studio/aa-components/lib';
import { UserSys } from './UserSys';
/**
 * SQL Запросы
 */
export default class BaseSQL {
    protected db: any;
    protected redisSys: RedisSys;
    protected modelValidatorSys: ModelValidatorSys;
    protected errorSys: ErrorSys;
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
     * Очистить кеш редиса
     * @param sKey
     */
    clearCache(sKey: string): Promise<void>;
}
