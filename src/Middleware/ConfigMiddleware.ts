// Подключение системных классов
import { MainRequest } from '../System/MainRequest';
import { RabbitSenderSys } from '../System/RabbitSenderSys';
import { RedisSys } from '../System/RedisSys';

/* LEGO ошибок */
export default async function ConfigMiddleware(req: MainRequest, res: any, next: any) {

    req.infrastructure = {
        mysql: null,
        redis: null,
        rabbit: null
    }

    if(!req.conf){
        req.sys.errorSys.error('not_config', 'Не указан конфиг');
    }

    if(!req.conf.mysql){
        req.sys.errorSys.error('not_config_mysql', 'Не указан конфиг mysql');
    }

    if(!req.conf.redis){
        req.sys.errorSys.error('not_config_redis', 'Не указан конфиг redis');
    }

    if(!req.conf.rabbit){
        req.sys.errorSys.error('not_config_rabbit', 'Не указан конфиг rabbit');
    }

    if( req.sys.errorSys.isOk() ){
        req.infrastructure.mysql = require('knex')(req.conf.mysql);
        req.infrastructure.redis = new RedisSys(req.conf.redis);
        req.infrastructure.rabbit = await RabbitSenderSys.Init(req.conf.rabbit.connection, req.conf.rabbit.queryList);;
    }

    next();
}
