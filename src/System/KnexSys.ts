
import *  as Components  from '@a-a-game-studio/aa-components/lib';

// Системные сервисы
import { RedisSys } from './RedisSys';
import { MainRequest } from './MainRequest';

import { UserSys } from './UserSys';


/**
 * Обертка над написание запросов Knex
 */
export class KnexSys {

    protected errorSys: Components.ErrorSys;
    protected userSys: UserSys;

    constructor(req: MainRequest) {
        this.errorSys = req.sys.errorSys;
        this.userSys = req.sys.userSys;
    }

    /**
     * Получить строку из SQL raw запроса
     * @param sError
     * @param cbQuery
     */
    async faOneRaw(sError:string, cbQuery:Function): Promise<any>{
        let ok = this.errorSys.isOk();
        let one = null;
        
        if(ok){ // Получаем стоку базы LIMIT 1
            try{ 
                one = (await cbQuery())[0][0];
            } catch(e){
                throw this.errorSys.throw(e, sError);
            }
        }

        return one;
    }

    /**
     * Получить список из SQL raw запроса
     * @param sError
     * @param cbQuery
     */
    async faListRaw(sError:string, cbQuery:Function): Promise<any>{
        let list = null;

        if(this.errorSys.isOk()){
            try{ 
                list = (await cbQuery())[0];
            } catch(e){
                throw this.errorSys.throw(e, sError);
            }
        }

        return list;
    }

    /**
     * Получить поле из SQL raw запроса
     * @param sError
     * @param sField
     * @param cbQuery
     */
    async faFieldRaw(sError:string, sField:string ,cbQuery:Function): Promise<any>{
        let ok = this.errorSys.isOk();
        let field = null;
        
        if( this.errorSys.isOk() ){
            try{ // Получаем стоку базы LIMIT 1
                field = (await cbQuery())[0][0][sField];
            } catch(e){
                throw this.errorSys.throw(e, sError);
            }
        }

        return field;
    }

    // ==========================================

    /**
     * Получить строку из SQL builder запроса
     * @param sError
     * @param cbQuery
     */
    async faOne(sError:string, cbQuery:Function): Promise<any>{
        let ok = this.errorSys.isOk();
        let one = null;
        
        if( this.errorSys.isOk() ){
            try{ // Получаем стоку базы LIMIT 1
                one = (await cbQuery())[0];
            } catch(e){
                throw this.errorSys.throw(e, sError);
            }
        }

        return one;
    }

    /**
     * Получить строку из SQL builder запроса
     * @param sError
     * @param cbQuery
     */
    async faList(sError:string, cbQuery:Function): Promise<any>{
        let list = null;

        if( this.errorSys.isOk() ){
            try{ // Получаем стоку базы LIMIT 1
                list = (await cbQuery());
            } catch(e){
                throw this.errorSys.throw(e, sError);
            }
        }

        return list;
    }

    /**
     * Получить поле из SQL builder запроса
     * @param sError
     * @param sField
     * @param cbQuery
     */
    async faField(sError:string, sField:string ,cbQuery:Function): Promise<number|string|boolean|bigint>{
        let ok = this.errorSys.isOk();
        let field = null;
        
        if( this.errorSys.isOk() ){
            try{ // Получаем стоку базы LIMIT 1
                field = (await cbQuery())[0][sField];
            } catch(e){
                throw this.errorSys.throw(e, sError);
            }
        }

        return field;
    }
}
