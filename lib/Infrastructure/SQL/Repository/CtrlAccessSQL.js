"use strict";
// Глобальные сервисы
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Сущьности и правила валидации
const CtrlAccessE_1 = require("../Entity/CtrlAccessE");
const BaseSQL_1 = __importDefault(require("../../../System/BaseSQL"));
/**
 * Здесь методы для SQL запросов
 * - Группы пользователей
 */
class CtrlAccessSQL extends BaseSQL_1.default {
    constructor(req) {
        super(req);
    }
    // ========================================
    // SELECT
    // ========================================
    /**
     * Получить контроллер доступа по Alias
     *
     * @param string aliasCtrlAccess
     * @return array|null
     */
    async getCtrlAccessByAlias(aliasCtrlAccess) {
        let ok = this.errorSys.isOk();
        let sql = '';
        // Декларация ошибок
        this.errorSys.declare([
            'get_ctrl_access',
            'get_ctrl_access_not_found'
        ]);
        sql = `
            SELECT
                ca.id,
                ca.alias,
                ca.name,
                ca.descript
            FROM ${CtrlAccessE_1.CtrlAccessE.NAME} ca
            WHERE ca.alias = :alias
            LIMIT 1
        `;
        let respCtrlAccess = null;
        if (ok) {
            try {
                respCtrlAccess = (await this.db.raw(sql, {
                    'alias': aliasCtrlAccess
                }))[0][0];
            }
            catch (e) {
                ok = false;
                this.errorSys.errorEx(e, 'get_ctrl_access', 'Не удалось получить контроль доступа');
            }
        }
        return respCtrlAccess;
    }
    /**
     * Получить контроллер доступа по ID
     *
     * @param integer idCtrlAccess
     * @return array|null
     */
    async getCtrlAccessByID(idCtrlAccess) {
        let ok = this.errorSys.isOk();
        let resp = null;
        // Декларация ошибок
        this.errorSys.declare([
            'get_ctrl_access',
            'ctrl_access_not_found'
        ]);
        let sql = `
            SELECT
                ca.id,
                ca.alias,
                ca.name,
                ca.descript
            FROM ${CtrlAccessE_1.CtrlAccessE.NAME} ca
            WHERE ca.id = :id_ctrl_access
            LIMIT 1
        `;
        try {
            resp = (await this.db.raw(sql, {
                'id_ctrl_access': idCtrlAccess
            }))[0];
        }
        catch (e) {
            ok = false;
            this.errorSys.error('get_ctrl_access', 'Не удалось получить контроль доступа');
        }
        if (ok && resp.length > 0) {
            resp = resp[0];
        }
        else {
            resp = null;
            ok = false;
            this.errorSys.error('ctrl_access_not_found', 'Контроллер доступа не найден');
        }
        return resp;
    }
    /**
     * Получить список контроллеров доступа
     *
     * @return array|null
     */
    async getAllCtrlAccess() {
        let ok = this.errorSys.isOk();
        let bCache = false; // Наличие кеша
        let sql = '';
        let resp = null;
        // Декларация ошибок
        this.errorSys.declare([
            'get_list_ctrl_access'
        ]);
        let ctrlAccessList = null;
        if (ok) { // Получаем весь список контроллеров доступа
            ctrlAccessList = await this.cacheSys.autoCache("CtrlAccessSQL.getAllCtrlAccess()", 3600, async () => {
                let ctrlAccessList = null;
                sql = `
                    SELECT
                        ca.id,
                        ca.alias,
                        ca.name
                    FROM ${CtrlAccessE_1.CtrlAccessE.NAME} ca
                    ;
                `;
                try {
                    ctrlAccessList = (await this.db.raw(sql))[0];
                }
                catch (e) {
                    ok = false;
                    this.errorSys.error('get_list_ctrl_access', 'Не удалось получить группы пользователя');
                }
                return ctrlAccessList;
            }); // autoCache
        }
        // Формирование ответа
        return ctrlAccessList;
    }
    // ========================================
    // UPDATE
    // ========================================
    /**
     * Сохранить контроллер доступа
     *
     * @param integer idCtrlAccess
     * @return boolean
     */
    async saveCtrlAccess(idCtrlAccess, data) {
        let ok = this.errorSys.isOk();
        // Декларация ошибок
        this.errorSys.declare([
            'db_save_ctrl_access'
        ]);
        console.log('===>data:', data);
        let vCtrlAccessE = new CtrlAccessE_1.CtrlAccessE();
        if (ok && this.modelValidatorSys.fValid(vCtrlAccessE.getRulesUpdate(), data)) {
            let resp = null;
            try {
                console.log('===>result:', this.modelValidatorSys.getResult());
                resp = await this.db(CtrlAccessE_1.CtrlAccessE.NAME)
                    .where({
                    id: idCtrlAccess
                })
                    .update(this.modelValidatorSys.getResult());
            }
            catch (e) {
                ok = false;
                this.errorSys.errorEx(e, 'db_save_ctrl_access', 'Не удалось сохранить изменения в контроллере доступа');
            }
        }
        if (ok) {
            await this.cacheSys.clearCache('CtrlAccessSQL*');
        }
        return ok;
    }
    // ========================================
    // INSERT
    // ========================================
    /**
     * Добавить контроль доступа
     *
     * @return boolean
     */
    async addCtrlAccess(data) {
        let ok = this.errorSys.isOk();
        // Декларация ошибок
        this.errorSys.declare([
            'add_ctrl_access'
        ]);
        let vCtrlAccessE = new CtrlAccessE_1.CtrlAccessE();
        let idCtrlAccess = 0;
        if (ok && this.modelValidatorSys.fValid(vCtrlAccessE.getRulesInsert(), data)) {
            try {
                idCtrlAccess = (await this.db(CtrlAccessE_1.CtrlAccessE.NAME)
                    .insert(this.modelValidatorSys.getResult()))[0];
            }
            catch (e) {
                ok = false;
                this.errorSys.errorEx(e, 'add_ctrl_access', 'Не удалось добавить контроль доступа');
            }
        }
        if (ok) { // Удалить связанный кеш
            this.cacheSys.clearCache('CtrlAccessSQL*');
        }
        return idCtrlAccess;
    }
    // ========================================
    // DELETE
    // ========================================
    /**
     * удалить контроллер доступа по ID
     *
     * @param string aliasCtrlAccess
     * @return boolean
     */
    async delCtrlAccessByAlias(aliasCtrlAccess) {
        let ok = this.errorSys.isOk();
        // Декларация ошибок
        /*   this.errorSys.declareEx({
              'del_ctrl_access':'Не удалось удалить контроллер доступа'
          }); */
        if (ok) {
            try {
                await this.db(CtrlAccessE_1.CtrlAccessE.NAME)
                    .where({
                    alias: aliasCtrlAccess,
                })
                    .limit(1)
                    .del();
            }
            catch (e) {
                ok = false;
                this.errorSys.errorEx(e, 'del_ctrl_access', 'Не удалось удалить контроллер доступа');
            }
        }
        if (ok) { // Удаляем связный кеш
            this.cacheSys.clearCache('CtrlAccessSQL*');
        }
        return ok;
    }
    // ========================================
    // COUNT
    // ========================================
    /**
     * Проверить наличия контроллера доступа по ALIAS
     * Alias униакльное поле потому LIMIT 1
     *
     * @param string aliasCtrlAccess
     * @return integer
     */
    async cntCtrlAccessByAlias(aliasCtrlAccess) {
        let ok = this.errorSys.isOk();
        // Декларация ошибок
        this.errorSys.declare([
            'cnt_ctrl_access'
        ]);
        let resp = null;
        let cntCtrlAccess = 0;
        if (ok) { // Получить количество контроллеров доступа
            let sql = `
                SELECT
                    COUNT(*) cnt
                FROM ${CtrlAccessE_1.CtrlAccessE.NAME} ca
                WHERE ca.alias = :alias
                LIMIT 1
            `;
            try {
                resp = (await this.db.raw(sql, {
                    'alias': aliasCtrlAccess
                }))[0];
                cntCtrlAccess = Number(resp[0]['cnt']);
            }
            catch (e) {
                ok = false;
                this.errorSys.error('cnt_ctrl_access', 'Не удалось подсчитать контроль доступа');
            }
        }
        if (ok) { // Ответ
            return cntCtrlAccess;
        }
        else {
            return -1; // В случае если произошла SQL ошибка
        }
    }
}
exports.CtrlAccessSQL = CtrlAccessSQL;
//# sourceMappingURL=CtrlAccessSQL.js.map