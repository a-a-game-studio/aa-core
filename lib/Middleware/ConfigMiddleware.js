"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const RabbitSenderSys_1 = require("../System/RabbitSenderSys");
const RedisSys_1 = require("../System/RedisSys");
/* LEGO ошибок */
async function ConfigMiddleware(req, res, next) {
    req.infrastructure = {
        mysql: null,
        redis: null,
        rabbit: null
    };
    if (!req.conf) {
        req.sys.errorSys.error('not_config', 'Не указан конфиг');
    }
    if (!req.conf.mysql) {
        req.sys.errorSys.error('not_config_mysql', 'Не указан конфиг mysql');
    }
    if (!req.conf.redis) {
        req.sys.errorSys.error('not_config_redis', 'Не указан конфиг redis');
    }
    if (!req.conf.rabbit) {
        req.sys.errorSys.error('not_config_rabbit', 'Не указан конфиг rabbit');
    }
    if (req.sys.errorSys.isOk()) {
        req.infrastructure.mysql = require('knex')(req.conf.mysql);
        req.infrastructure.redis = new RedisSys_1.RedisSys(req.conf.redis);
        req.infrastructure.rabbit = await RabbitSenderSys_1.RabbitSenderSys.Init(req.conf.rabbit.connection, req.conf.rabbit.queryList);
        ;
    }
    next();
}
exports.default = ConfigMiddleware;
//# sourceMappingURL=ConfigMiddleware.js.map