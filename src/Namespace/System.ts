import { UserSys } from '../System/UserSys'

import { ResponseSys } from '../System/ResponseSys'

import MainRequest from '../System/MainRequest'

import { initMainRequest } from '../System/MainRequest'

import { RedisSys } from '../System/RedisSys';

/* Класс для работы с S3 */
import { S3objectParamsI, S3confI, S3 } from '../System/S3';

/* Отправлятор сообщений в Rabbit */
import { RabbitSenderSys } from '../System/RabbitSenderSys';

/* Конструктор Консольной команды */
import BaseCommand from '../System/BaseCommand';

/* Конструктор теста */
import BaseTest from '../System/BaseTest';

import BaseCtrl from '../System/BaseCtrl'

import BaseSQL from '../System/BaseSQL'

import BaseM from '../System/BaseM'

export {
    UserSys,
    ResponseSys,
    MainRequest,
    initMainRequest,
    RedisSys,
    S3objectParamsI, S3confI, S3,
    RabbitSenderSys,
    BaseCommand,
    BaseTest,
    BaseCtrl,
    BaseSQL,
    BaseM
}