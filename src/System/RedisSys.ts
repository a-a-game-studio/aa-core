var redis = require("redis");

/**
 * Обертка над редисом которая понимает async/await
 * 
 *  Для запуска redis в докере
 *  docker run -p 6379:6379 --name some-redis -d redis
 */
export class RedisSys {

    public redisClient: any;

    constructor(conf: any) {

        console.log('Redis client try connect ...');

        this.redisClient = redis.createClient(conf);

        this.redisClient.on('connect', function () {
            console.log('Redis client connected');
        });

        this.redisClient.on("error", function (err: any) {
            console.log("Redis client error");
            console.log(err);

            /* в случае отсутствия коннекта */
            if (err['code'] == 'ECONNREFUSED') {
                process.exit(1);
            }
        });

    }

    /**
     * Получить значение из редиса
     * @param key
     */
    public get(key: string): Promise<string> {
        return new Promise((resolve, reject) => {

            this.redisClient.get(key, function (err: any, reply: string) {
                if (err) {
                    resolve('');
                }
                resolve(reply);

            });
        })
    };

    /**
     * Получить ключи по шаблону
     * @param keys
     */
    public keys(keys: string): Promise<any[]> {
        return new Promise((resolve, reject) => {

            this.redisClient.keys(keys, function (err: any, reply: any[]) {
                if (err) {
                    reject(err);
                }
                resolve(reply);

            });

        })
    };

    /**
     * Поместить значение в редис
     * @param key
     * @param val
     * @param time
     */
    public set(key: string, val: string | number, time: number = 3600) {
        this.redisClient.set(key, val, 'EX', time);
    }

    /**
     * Удалить ключи по ID
     * @param keys
     */
    public del(keys: any[]) {
        if (keys.length > 0) {
            this.redisClient.del(keys);
        }
    }
}
