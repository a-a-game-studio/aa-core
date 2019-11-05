"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Components = require("@a-a-game-studio/aa-components/lib");
/**
 * SQL Запросы
 */
class BaseSQL {
    constructor(req) {
        this.modelValidatorSys = new Components.ModelValidatorSys(req.sys.errorSys);
        this.knexSys = req.sys.knexSys;
        this.cacheSys = req.sys.cacheSys;
        this.errorSys = req.sys.errorSys;
        this.userSys = req.sys.userSys;
        this.logicSys = req.sys.logicSys;
        if (req.infrastructure.mysql) {
            this.db = req.infrastructure.mysql;
        }
        else {
            this.errorSys.error('db_no_connection', 'Отсутствует подключение к mysql');
        }
        if (req.infrastructure.redis) {
            this.redisSys = req.infrastructure.redis;
        }
        else {
            this.errorSys.error('db_redis', 'Отсутствует подключение к redis');
        }
    }
}
exports.default = BaseSQL;
//# sourceMappingURL=BaseSQL.js.map