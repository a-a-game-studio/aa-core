"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Подключение системных классов
const Core = require("../index");
const config = require('../Config/MainConfig.js');
const db = require('knex')(config.mysql);
const redisSys = new Core.System.RedisSys(config.redis);
// Отправщик картинок в очередь;
let rabbitSender = null;
async function run() {
    rabbitSender = await Core.System.RabbitSenderSys.Init(config.rabbit.connection, config.rabbit.queryList);
}
;
run();
/* LEGO ошибок */
async function ConfigMiddleware(request, response, next) {
    request.conf = config;
    request.infrastructure = {
        mysql: db,
        redis: redisSys,
        rabbit: rabbitSender
    };
    next();
}
exports.default = ConfigMiddleware;
//# sourceMappingURL=ConfigMiddleware.js.map