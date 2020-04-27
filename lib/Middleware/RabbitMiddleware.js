"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const RabbitSenderSys_1 = require("../System/RabbitSenderSys");
/**
 * Подключение к кролику
 * @param req
 * @param res
 * @param next
 */
async function RabbitMiddleware(req, res, next) {
    if (!req.conf.rabbit) {
        req.sys.errorSys.error('not_config_rabbit', 'Не указан конфиг rabbit');
    }
    if (req.sys.errorSys.isOk()) {
        console.log('rabbit connection...');
        req.infrastructure.rabbit = await RabbitSenderSys_1.RabbitSenderSys.Init(req.conf.rabbit.connection, req.conf.rabbit.queryList);
    }
    console.log('connection rabbit complete;');
    next();
}
exports.default = RabbitMiddleware;
//# sourceMappingURL=RabbitMiddleware.js.map