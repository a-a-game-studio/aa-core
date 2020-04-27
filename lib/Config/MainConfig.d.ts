declare const _default: {
    env: string;
    mysql: {
        "client": string;
        "connection": {
            "host": string;
            "user": string;
            "password": string;
            "database": string;
        };
        "pool": {
            "min": number;
            "max": number;
        };
        "migrations": {
            "tableName": string;
            "directory": string;
        };
        "acquireConnectionTimeout": number;
    };
    common: {
        env: string;
        port: number;
    };
    redis: {
        "url": string;
    };
    /**
    Конфиг подклчения RabbitMQ
    Для запуска на локальной машине
    docker run -d --hostname 0.0.0.0 --network host rabbitmq:3

    Документация
    https://docs.docker.com/samples/library/rabbitmq/
    https://www.rabbitmq.com/tutorials/tutorial-two-javascript.html
    */
    rabbit: {
        queryList: {
            query1: string;
        };
        connection: string;
    };
    S3: {
        endpoint: string;
        bucket: string;
        access: string;
        secret: string;
    };
    FileModule: {
        sSavePath: string;
        sUrl: string;
    };
};
export default _default;
