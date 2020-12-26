"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const Components = __importStar(require("@a-a-game-studio/aa-components/lib"));
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