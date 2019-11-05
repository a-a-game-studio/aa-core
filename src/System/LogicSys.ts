
import *  as Components  from '@a-a-game-studio/aa-components/lib';

// Системные сервисы
import { RedisSys } from './RedisSys';
import { MainRequest } from './MainRequest';

import { UserSys } from './UserSys';
import { isObject, isArray } from 'util';


/**
 * Система кеширования
 */
export class LogicSys {

    protected redisSys: RedisSys;

    protected errorSys: Components.ErrorSys;
    protected userSys: UserSys;

    constructor(req: MainRequest) {

        this.errorSys = req.sys.errorSys;
        this.userSys = req.sys.userSys;

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
    async ifOk(sError:string, callback:any):Promise<any>{

        let out = null;
        if( this.errorSys.isOk() ){
            try{
                out = await callback();
            } catch(e) {
                throw this.errorSys.throw(e, sError)
            }
        } else {
            throw this.errorSys.throwLogic(sError)
        }
        
        return out;

    }

}
