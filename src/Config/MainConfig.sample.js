

//Конфигурация
module.exports = {
    env: 'prod', // Тип окружения
    mysql: { // Knex mysql
        "client": "mysql",
        "connection": {
            "host": "localhost",
            "user": "db_user",
            "password": "db_pass",
            "database": "db_name"
        },
        "pool": { "min": 0, "max": 7 },
        "migrations": {
            "tableName": "knex_migrations",
            "directory": "./src/Infrastructure/SQL/Migrations"
        },
        "acquireConnectionTimeout": 60000
    },


    redis: { // Конфигруация редиса
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
        query:{ // Список очередей
            query1:'query1' // Очередь для картинок каталога
        },
        // Соединение с кроликом
        connection: 'amqp://devs3.63pokupki.ru:5672'
    },

    S3: {
        endpoint: 'https://file.yousite.ru:8000',
        bucket: { // Список корзин
            backet1:'backet1' // Картинки для товаров
        },
        baseUrl: 'https://file.yousite.ru:8000',
        access: 'accessKey1',
        secret: 'verySecretKey1',
    }
};
