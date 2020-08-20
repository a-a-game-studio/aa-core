"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lib_1 = require("@a-a-game-studio/aa-redis-sys/lib");
var redis = require("redis");
/**
 * Пключенеи к редису
 * @param req
 * @param res
 * @param next
 */
async function RedisMiddleware(req, res, next) {
    if (!req.conf.redis) {
        req.sys.errorSys.error('not_config_redis', 'Не указан конфиг redis');
    }
    if (req.sys.errorSys.isOk()) {
        console.log('redis connection...');
        req.infrastructure.redis = new lib_1.RedisSys.RedisSys(req.conf.redis, redis.createClient(req.conf.redis));
    }
    console.log('connection redis complete;');
    next();
}
exports.default = RedisMiddleware;
//# sourceMappingURL=RedisMiddleware.js.map