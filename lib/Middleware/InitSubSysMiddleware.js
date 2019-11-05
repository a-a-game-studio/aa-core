"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const KnexSys_1 = require("../System/KnexSys");
const CacheSys_1 = require("../System/CacheSys");
const LogicSys_1 = require("../System/LogicSys");
/* LEGO ошибок */
function InitSubSysMiddleware(req, response, next) {
    req.sys.knexSys = new KnexSys_1.KnexSys(req); // Система автоматизации написания SQL запросов
    req.sys.cacheSys = new CacheSys_1.CacheSys(req); // Система кеширования
    req.sys.logicSys = new LogicSys_1.LogicSys(req); // Система логики
    next();
}
exports.default = InitSubSysMiddleware;
//# sourceMappingURL=InitSubSysMiddleware.js.map