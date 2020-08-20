"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RabbitQueue = exports.RabbitSenderSys = void 0;
const amqp = __importStar(require("amqplib/callback_api"));
/**
 * Отправщик сообщений в очередь
 */
class RabbitSenderSys {
    constructor(connection) {
        this.connection = connection;
        this.aQuery = [];
    }
    /**
     * Отправить сообщение в очередь
     * @param msg
     */
    sendToQueue(sQueue, msg) {
        this.aQuery[sQueue].sendToQueue(JSON.stringify(msg));
    }
    /**
     * Закрыть соединение
     */
    close() {
        setTimeout(() => {
            this.connection.close();
        }, 1000);
    }
    /**
     * Асинхронный конструктор
     * @param query
     */
    static Init(confConnect, queryList) {
        return new Promise((resolve, reject) => {
            try {
                /* подключаемся к серверу */
                amqp.connect(confConnect, async function (error0, connection) {
                    if (error0) {
                        throw error0;
                    }
                    let rabbitSender = new RabbitSenderSys(connection);
                    for (let kQuery in queryList) {
                        let sQuery = queryList[kQuery];
                        rabbitSender.aQuery[sQuery] = await RabbitQueue.init(connection, sQuery);
                        resolve(rabbitSender);
                    }
                });
            }
            catch (e) {
                console.log(e);
                reject(e);
            }
        });
    }
}
exports.RabbitSenderSys = RabbitSenderSys;
/**
 * Очередь
 */
class RabbitQueue {
    constructor(sQuery, conn, channel) {
        this.conn = conn;
        this.sQuery = sQuery;
        this.channel = channel;
    }
    sendToQueue(msg) {
        // console.log(this.sQuery, Buffer.from(msg));
        this.channel.sendToQueue(this.sQuery, Buffer.from(msg), {
            persistent: true
        });
    }
    static init(conn, sQuery) {
        return new Promise((resolve, reject) => {
            try {
                /* подключаемся к каналу */
                conn.createChannel(function (error1, channel) {
                    if (error1) {
                        throw error1;
                    }
                    channel.assertQueue(sQuery, {
                        durable: false
                    });
                    /* отдаем новый экземпляр класса */
                    resolve(new RabbitQueue(sQuery, conn, channel));
                });
            }
            catch (e) {
                console.log(e);
                reject(e);
            }
        });
        // return vQuery;
    }
}
exports.RabbitQueue = RabbitQueue;
//# sourceMappingURL=RabbitSenderSys.js.map