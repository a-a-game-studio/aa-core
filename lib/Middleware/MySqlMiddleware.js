"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Подключнеие к MySQl
 * @param req
 * @param res
 * @param next
 */
async function MySqlMiddleware(req, res, next) {
    if (!req.conf) {
        req.sys.errorSys.error('not_config', 'Не указан конфиг');
    }
    if (!req.conf.mysql) {
        req.sys.errorSys.error('not_config_mysql', 'Не указан конфиг mysql');
    }
    if (req.sys.errorSys.isOk()) {
        console.log('mysql connection...');
        req.infrastructure.mysql = require('knex')(req.conf.mysql);
    }
    console.log('connection mysql complete;');
    next();
}
exports.default = MySqlMiddleware;
//# sourceMappingURL=MySqlMiddleware.js.map