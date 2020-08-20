"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LogicSys = void 0;
const lib_1 = require("@a-a-game-studio/aa-components/lib");
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
     * Блок для валидации входных данных
     * Выбрасывает ошибку в случае не правильности данных
     */
    fValidData(vModelRules, data) {
        const validator = new lib_1.ModelValidatorSys(this.errorSys);
        let validData = null;
        if (validator.fValid(vModelRules.get(), data)) {
            validData = validator.getResult();
        }
        else {
            const e = this.errorSys.throwValid('Ошибка входных данных');
            this.errorSys.errorEx(e, 'valid_data', 'Ошибка входных данных');
            throw e;
        }
        return validData;
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