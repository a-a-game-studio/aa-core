"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Система кеширования
 */
class LogicSys {
    constructor(req) {
        this.errorSys = req.sys.errorSys;
        this.userSys = req.sys.userSys;
        if (req.infrastructure.redis) {
            this.redisSys = req.infrastructure.redis;
        }
        else {
            this.errorSys.error('db_redis', 'Отсутствует подключение к redis');
        }
    }
    /**
     * Логический блок
     * @param sError - Сообщение об ощибке
     * @param callback - функция содержащая логическую операцию
     */
    async ifOk(sError, callback) {
        let out = null;
        if (this.errorSys.isOk()) {
            try {
                out = await callback();
            }
            catch (e) {
                throw this.errorSys.throw(e, sError);
            }
        }
        else {
            throw this.errorSys.throwLogic(sError);
        }
        return out;
    }
}
exports.LogicSys = LogicSys;
//# sourceMappingURL=LogicSys.js.map