"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//Конфигурация
exports.default = {
    env: 'dev',
    mysql: {
        "client": "mysql",
        "connection": {
            "host": "localhost",
            "user": "root",
            "password": "Angel13q24w35e",
            "database": "lara_story_db"
        },
        "pool": { "min": 0, "max": 7 },
        "migrations": {
            "tableName": "knex_migrations_aa_core",
            "directory": "./src/Infrastructure/SQL/Migrations"
        },
        "acquireConnectionTimeout": 60000
    },
    common: {
        env: 'dev',
        port: 3007,
    },
    redis: {
        "url": "redis://127.0.0.1:6379"
    },
    /**
    Конфиг подклчения RabbitMQ
    Для запуска на локальной машине
    docker run -d --hostname 0.0.0.0 --network host rabbitmq:3

    Документация
    https://docs.docker.com/samples/library/rabbitmq/
    https://www.rabbitmq.com/tutorials/tutorial-two-javascript.html
    */
    rabbit: {
        // Список очередей которые будут подняты
        queryList: {
            query1: 'query1' // Очередь для картинок каталога
        },
        // Соединение с кроликом
        connection: 'amqp://localhost:5672'
    },
    S3: {
        endpoint: 'https://file.yousite.ru:8000',
        bucket: 'backet1',
        baseUrl: 'https://file.yousite.ru:8000',
        access: 'accessKey1',
        secret: 'verySecretKey1',
    }
};
//# sourceMappingURL=MainConfig.sample.js.map