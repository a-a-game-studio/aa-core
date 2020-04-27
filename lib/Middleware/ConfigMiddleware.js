"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* LEGO ошибок */
async function ConfigMiddleware(req, res, next) {
    req.infrastructure = {
        mysql: null,
        redis: null,
        rabbit: null
    };
    if (!req.conf) {
        req.sys.errorSys.error('not_config', 'Не указан конфиг');
    }
    next();
}
exports.default = ConfigMiddleware;
//# sourceMappingURL=ConfigMiddleware.js.map