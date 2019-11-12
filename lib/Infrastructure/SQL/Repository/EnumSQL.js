"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Системные сервисы
const BaseSQL_1 = __importDefault(require("../../../System/BaseSQL"));
// Сущьности и правила валидации
const EnumE_1 = require("../Entity/EnumE");
const EnumParamE_1 = require("../Entity/EnumParamE");
/**
 * Здесь методы для SQL запросов
 * enum
 */
class EnumSQL extends BaseSQL_1.default {
    // ========================================
    // SELECT
    // ========================================
    /**
     * Получить enum по ID
     *
     * @param idEnum
     */
    async oneEnumByID(idEnum) {
        let ok = this.errorSys.isOk();
        let respEnum = null;
        await this.logicSys.ifOk('Получить enum по ID', async () => {
            let sql = `
                SELECT
                    e.*
                FROM ${EnumE_1.EnumE.NAME} e
                WHERE e.id = :id_enum
                LIMIT 1
            `;
            respEnum = this.knexSys.fOneRaw(await this.db.raw(sql, {
                id_enum: idEnum
            }));
        });
        return respEnum;
    }
    /**
     * Получить все enumы
     */
    async listAllEnum() {
        let ok = this.errorSys.isOk();
        let listEnum = null;
        if (ok) { // Получить список
            let sql = `
                SELECT
                    e.*
                FROM ${EnumE_1.EnumE.NAME} e
                ORDER BY id DESC
                ;
            `;
            try {
                listEnum = (await this.db.raw(sql))[0];
            }
            catch (e) {
                throw this.errorSys.throw(e, 'Не удалось получить список enumов');
            }
        }
        console.log('listAllEnum');
        // Формирование ответа
        return listEnum;
    }
    // ========================================
    // INSERT
    // ========================================
    /**
     * Добавить enum
     *
     * @return boolean
     */
    async addEnum(data) {
        let ok = this.errorSys.isOk();
        let vEnumE = new EnumE_1.EnumE();
        let idEnum = 0;
        if (ok && this.modelValidatorSys.fValid(vEnumE.getRulesInsert(), data)) {
            try {
                idEnum = (await this.db(EnumE_1.EnumE.NAME)
                    .insert({}))[0];
                (await this.db(EnumE_1.EnumE.NAME)
                    .where({
                    id: idEnum
                })
                    .update({
                    k: 'enum_' + idEnum,
                    name: 'enum #' + idEnum
                }));
            }
            catch (e) {
                throw this.errorSys.throw(e, 'Не удалось добавить enum');
            }
        }
        return idEnum;
    }
    // ========================================
    // UPDATE
    // ========================================
    /**
     * Сохранить enum по ID
     *
     * @param integer idEnum
     * @return boolean
     */
    async saveEnum(idEnum, data) {
        let ok = this.errorSys.isOk();
        let vEnumE = new EnumE_1.EnumE();
        if (ok && this.modelValidatorSys.fValid(vEnumE.getRulesUpdate(), data)) {
            console.log('idEnum:', idEnum);
            console.log(this.modelValidatorSys.getResult());
            let resp = null;
            try {
                resp = await this.db(EnumE_1.EnumE.NAME)
                    .where({
                    id: idEnum
                })
                    .update(this.modelValidatorSys.getResult());
            }
            catch (e) {
                throw this.errorSys.throw(e, 'Не удалось сохранить изменения в enumе');
            }
        }
        return ok;
    }
    // ========================================
    // DELETE
    // ========================================
    /**
     * удалить enum по ID
     *
     * @param string kCtrlAccess
     * @return boolean
     */
    async delEnumByID(idEnum) {
        let ok = this.errorSys.isOk();
        if (ok) {
            try {
                await this.db(EnumParamE_1.EnumParamE.NAME)
                    .where({
                    id_enum: idEnum,
                })
                    .del();
                await this.db(EnumE_1.EnumE.NAME)
                    .where({
                    id: idEnum,
                })
                    .limit(1)
                    .del();
            }
            catch (e) {
                throw this.errorSys.throw(e, 'Не удалось удалить enum');
            }
        }
        return ok;
    }
}
exports.EnumSQL = EnumSQL;
//# sourceMappingURL=EnumSQL.js.map