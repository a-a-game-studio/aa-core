
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

    protected errorSys: Components.ErrorSys;
    protected userSys: UserSys;

    constructor(req: MainRequest) {

        this.errorSys = req.sys.errorSys;
        this.userSys = req.sys.userSys;
    }


    /**
     * Логический блок
     * @param sError - Сообщение об ощибке
     * @param callback - функция содержащая логическую операцию
     */
    async ifOk(sError:string, callback:Function):Promise<any>{

        let out = null;
        if( this.errorSys.isOk() ){
            try{
                out = await callback();
                this.errorSys.devNotice('ifok', sError);
            } catch(e) {
                throw this.errorSys.throw(e, sError)
            }
        } else {
            throw this.errorSys.throwLogic(sError)
        }
        
        return out;

    }

    /**
     * задержка на нужное кол-во секунд
     * @param n
     */
    faWait(n: number): Promise<boolean> {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(true);
            }, n);
        });
    }


}
