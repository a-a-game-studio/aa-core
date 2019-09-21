var redis = require("redis");
export interface RedisConf {
    url: string;
}
/**
 * Обертка над редисом которая понимает async/await
 * 
 *  Для запуска redis в докере
 *  docker run -p 6379:6379 --name some-redis -d redis
 */
export class RedisSys {

    public redisClient: any;
    private bUse: boolean;
    private conf: RedisConf;

    constructor(conf: RedisConf, bUse: boolean = true) {
        this.bUse = bUse;
        this.conf = conf;
        this.fSetUse(bUse);
    }

    /**
     * Если нужно использовать редис
     * в противном случае используется как заглушка
     * @param bUse 
     */
    public fSetUse(bUse: boolean) {
        this.bUse = bUse;
        if (bUse) {
            console.log('Redis client try connect ...');

            this.redisClient = redis.createClient(this.conf);

            this.redisClient.on('connect', function () {
                console.log('Redis client connected');
            });

            this.redisClient.on("error", function (err: any) {
                console.log("Redis client error");
                console.log(err);
            });
        }
    }

    /**
     * Получить значение из редиса
     * @param key
     */
    public get(key: string): Promise<string> {
        return new Promise((resolve, reject) => {
            if (this.bUse) {
                this.redisClient.get(key, function (err: any, reply: string) {
                    if (err) {
                        resolve(null);
                    }
                    resolve(reply);
                });
            } else {
                resolve(null);
            }
        });
    };

    /**
     * Получить ключи по шаблону
     * @param keys
     */
    public keys(keys: string): Promise<any[]> {
        return new Promise((resolve, reject) => {
            if (this.bUse) {
                this.redisClient.keys(keys, function (err: any, reply: any[]) {
                    if (err) {
                        resolve(null);
                    }
                    resolve(reply);
                });
            } else {
                resolve(null);
            }
        });
    };

    /**
     * Поместить значение в редис
     * @param key
     * @param val
     * @param time
     */
    public set(key: string, val: string | number, time: number = 3600) {
        if (this.bUse) {
            this.redisClient.set(key, val, 'EX', time);
        }
    }

    /**
     * Удалить ключи по ID
     * @param keys
     */
    public del(keys: any[]) {
        if (this.bUse) {
            if (keys.length > 0) {
                this.redisClient.del(keys);
            }
        }
    }
}
