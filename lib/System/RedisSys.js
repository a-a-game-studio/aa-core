"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var redis = require("redis");
/**
 * Обертка над редисом которая понимает async/await
 *
 *  Для запуска redis в докере
 *  docker run -p 6379:6379 --name some-redis -d redis
 */
class RedisSys {
    constructor(conf, bUse = true) {
        this.bUse = bUse;
        this.conf = conf;
        this.fSetUse(bUse);
    }
    /**
     * Если нужно использовать редис
     * в противном случае используется как заглушка
     * @param bUse
     */
    fSetUse(bUse) {
        this.bUse = bUse;
        if (bUse) {
            console.log('Redis client try connect ...');
            this.redisClient = redis.createClient(this.conf);
            this.redisClient.on('connect', function () {
                console.log('Redis client connected');
            });
            this.redisClient.on("error", function (err) {
                console.log("Redis client error");
                console.log(err);
            });
        }
    }
    /**
     * Получить значение из редиса
     * @param key
     */
    get(key) {
        return new Promise((resolve, reject) => {
            if (this.bUse) {
                this.redisClient.get(key, function (err, reply) {
                    if (err) {
                        resolve(null);
                    }
                    resolve(reply);
                });
            }
            else {
                resolve(null);
            }
        });
    }
    ;
    /**
     * Получить ключи по шаблону
     * @param keys
     */
    keys(keys) {
        return new Promise((resolve, reject) => {
            if (this.bUse) {
                this.redisClient.keys(keys, function (err, reply) {
                    if (err) {
                        resolve(null);
                    }
                    resolve(reply);
                });
            }
            else {
                resolve(null);
            }
        });
    }
    ;
    /**
     * Поместить значение в редис
     * @param key
     * @param val
     * @param time
     */
    set(key, val, time = 3600) {
        if (this.bUse) {
            this.redisClient.set(key, val, 'EX', time);
        }
    }
    /**
     * Удалить ключи по ID
     * @param keys
     */
    del(keys) {
        if (this.bUse) {
            if (keys.length > 0) {
                this.redisClient.del(keys);
            }
        }
    }
}
exports.RedisSys = RedisSys;
//# sourceMappingURL=RedisSys.js.map