export interface RedisConf {
    url: string;
}
/**
 * Обертка над редисом которая понимает async/await
 *
 *  Для запуска redis в докере
 *  docker run -p 6379:6379 --name some-redis -d redis
 */
export declare class RedisSys {
    redisClient: any;
    private conf;
    constructor(conf: RedisConf);
    /**
     * Получить значение из редиса
     * @param key
     */
    get(key: string): Promise<string>;
    /**
     * Получить ключи по шаблону
     * @param keys
     */
    keys(keys: string): Promise<any[]>;
    /**
     * Поместить значение в редис
     * @param key
     * @param val
     * @param time
     */
    set(key: string, val: string | number, time?: number): void;
    /**
     * Удалить ключи по ID
     * @param keys
     */
    del(keys: any[]): void;
}
