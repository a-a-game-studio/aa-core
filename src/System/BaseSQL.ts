
// Глобальные сервисы
import * as AAClasses from '@a-a-game-studio/aa-classes/lib';


// Системные сервисы
import { RedisSys } from './RedisSys';
import { MainRequest } from './MainRequest';

import { UserSys } from './UserSys';


/**
 * SQL Запросы
 */
export default class BaseSQL {

    protected db: any;
    protected redisSys: RedisSys;

    protected modelValidatorSys:  AAClasses.Components.ModelValidatorSys;
    protected errorSys: AAClasses.Components.ErrorSys;
    protected userSys: UserSys;

    constructor(req: MainRequest) {

        this.modelValidatorSys = new AAClasses.Components.ModelValidatorSys(req.sys.errorSys);
        this.errorSys = req.sys.errorSys;
        this.userSys = req.sys.userSys;

        if( req.infrastructure.mysql ){
            this.db = req.infrastructure.mysql;
        } else {
            this.errorSys.error('db_no_connection', 'Отсутствует подключение к mysql');
        }

        if( req.infrastructure.redis ){
            this.redisSys = req.infrastructure.redis;
        } else {
            this.errorSys.error('db_redis', 'Отсутствует подключение к redis');
        }
    }


    /**
     * Авто кеширование для встраивания в функцию
     * @param sKey - Ключ кеша
     * @param iTimeSec - Время кеширования
     * @param callback - функция получающая данные из БД
     */
    async autoCache(sKey:string, iTimeSec:number, callback:any):Promise<any>{

        let ok = this.errorSys.isOk();

        let bCache = false; // Наличие кеша

        let sCache = null;
        let out:any = null;
        if( ok ){ // Пробуем получить данные из кеша
            sCache = await this.redisSys.get(sKey);

            if( sCache ){
                bCache = true;
                this.errorSys.devNotice(
                    sKey, 'Значение взято из кеша'
                );
            }
        }

        if( ok && !bCache ){ // Если значения нет в кеше - добавляем его в кеш
            out = await callback();
            this.redisSys.set(
                sKey,
                JSON.stringify(out),
                iTimeSec
            );
        }

        if( ok && bCache ){ // Если значение взято из кеша - отдаем его в ответ
            out = JSON.parse(sCache);
        }

        return out;

    }

    /**
     * Очистить кеш редиса
     * @param sKey
     */
    async clearCache(sKey:string){
        let aKeyList = await this.redisSys.keys(sKey);
        this.redisSys.del(aKeyList);
    }
}
