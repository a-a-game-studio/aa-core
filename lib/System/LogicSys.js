"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Система кеширования
 */
class LogicSys {
    constructor(req) {
        this.errorSys = req.sys.errorSys;
        this.userSys = req.sys.userSys;
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
                this.errorSys.devNotice('ifok', sError);
            }
            catch (e) {
                throw this.errorSys.throw(e, sError);
            }
        }
        else {
            this.errorSys.devWarning('ifok', sError + ' - Не выполненно');
        }
        return out;
    }
    /**
     * задержка на нужное кол-во секунд
     * @param n
     */
    faWait(n) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(true);
            }, n);
        });
    }
}
exports.LogicSys = LogicSys;
//# sourceMappingURL=LogicSys.js.map