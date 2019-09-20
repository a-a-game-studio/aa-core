// Подключение системных классов
import * as Core from '../index';

const config = require('../Config/MainConfig.js');


const db = require('knex')(config.mysql);
const redisSys = new Core.System.RedisSys(config.redis);

// Отправщик картинок в очередь;
let rabbitSender:Core.System.RabbitSenderSys = null;
async function run(){
    rabbitSender =  await Core.System.RabbitSenderSys.Init(config.rabbit.connection, config.rabbit.queryList);
}; run();

/* LEGO ошибок */
export default async function ConfigMiddleware(request: Core.System.MainRequest, response: any, next: any) {

    request.conf = config;
    request.infrastructure = {
        mysql: db,
        redis: redisSys,
        rabbit: rabbitSender
    }

    next();
}
