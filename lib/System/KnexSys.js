"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Обертка над написание запросов Knex
 */
class KnexSys {
    constructor(req) {
        this.errorSys = req.sys.errorSys;
        this.userSys = req.sys.userSys;
    }
    /**
     * Получить строку из SQL raw запроса
     * @param data
     */
    fOneRaw(data) {
        let ok = this.errorSys.isOk();
        let one = null;
        if (ok) { // Получаем стоку базы LIMIT 1
            try {
                one = data[0][0];
            }
            catch (e) {
                throw this.errorSys.throwDB(e, 'faOneRaw');
            }
        }
        return one;
    }
    /**
     * Получить список из SQL raw запроса
     * @param data
     */
    async fListRaw(data) {
        let list = null;
        if (this.errorSys.isOk()) {
            try {
                list = data[0];
            }
            catch (e) {
                throw this.errorSys.throwDB(e, 'fListRaw');
            }
        }
        return list;
    }
    /**
     * Получить поле из SQL raw запроса
     * @param data
     * @param sField
     */
    fFieldRaw(sField, data) {
        let ok = this.errorSys.isOk();
        let field = null;
        if (this.errorSys.isOk()) {
            try { // Получаем стоку базы LIMIT 1
                field = data[0][0][sField];
            }
            catch (e) {
                throw this.errorSys.throwDB(e, 'fFieldRaw');
            }
        }
        return field;
    }
    // ==========================================
    /**
     * Получить строку из SQL builder запроса
     * @param data
     */
    async fOne(data) {
        let ok = this.errorSys.isOk();
        let one = null;
        if (this.errorSys.isOk()) {
            try { // Получаем стоку базы LIMIT 1
                one = data[0];
            }
            catch (e) {
                throw this.errorSys.throwDB(e, 'fOne');
            }
        }
        return one;
    }
    /**
     * Получить строку из SQL builder запроса
     * @param data
     */
    async fList(data) {
        let list = null;
        if (this.errorSys.isOk()) {
            try { // Получаем стоку базы LIMIT 1
                list = data;
            }
            catch (e) {
                throw this.errorSys.throwDB(e, 'fList');
            }
        }
        return list;
    }
    /**
     * Получить поле из SQL builder запроса
     * @param sField
     * @param data
     */
    async fField(sField, data) {
        let ok = this.errorSys.isOk();
        let field = null;
        if (this.errorSys.isOk()) {
            try { // Получаем стоку базы LIMIT 1
                field = data[0][sField];
            }
            catch (e) {
                throw this.errorSys.throwDB(e, 'fField');
            }
        }
        return field;
    }
}
exports.KnexSys = KnexSys;
//# sourceMappingURL=KnexSys.js.map