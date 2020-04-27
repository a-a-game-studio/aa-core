"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Сущьности и правила валидации
const GroupE_1 = require("../Entity/GroupE");
const BaseSQL_1 = __importDefault(require("../../../System/BaseSQL"));
/**
 * Здесь методы для SQL запросов
 * - Группы пользователей
 */
class GroupSQL extends BaseSQL_1.default {
    constructor(req) {
        super(req);
    }
    // ========================================
    // SELECT
    // ========================================
    /**
     * Получить группу по ID
     * @param integer idGroup
     */
    async getGroupByID(idGroup) {
        let oneGroup = null;
        await this.logicSys.ifOk('Получить группу', async () => {
            let sql = `
                SELECT
                    g.id,
                    g.alias,
                    g.name,
                    g.descript
                FROM ${GroupE_1.GroupE.NAME} g
                WHERE g.id = :id_group
                LIMIT 1
            `;
            oneGroup = this.knexSys.fOneRaw(await this.db.raw(sql, {
                id_group: idGroup
            }));
        });
        return oneGroup;
    }
    /**
     * Получить группы/роли
     *
     * @return array|null
     */
    async getAllGroups() {
        let ok = this.errorSys.isOk();
        let bCache = false; // Наличие кеша
        let sql = '';
        let resp = null;
        // Декларация ошибок
        this.errorSys.declare([
            'get_roles'
        ]);
        let groupList = null;
        if (ok && !bCache) { // Получаем весь список групп
            groupList = await this.cacheSys.autoCache(`GroupSQL.getAllGroups()`, 3600, async () => {
                let groupList = null;
                sql = `
                    SELECT
                        g.id,
                        g.name,
                        g.alias
                    FROM ${GroupE_1.GroupE.NAME} g
                    ;
                `;
                try {
                    groupList = (await this.db.raw(sql))[0];
                }
                catch (e) {
                    ok = false;
                    this.errorSys.error('get_roles', 'Не удалось получить группы пользователя');
                }
                return groupList;
            }); // autoCache
        }
        // Формирование ответа
        return groupList;
    }
    // ========================================
    // INSERT
    // ========================================
    /**
     * Добавить группу
     *
     * @return boolean
     */
    async addGroup(data) {
        let ok = this.errorSys.isOk();
        // Декларация ошибок
        this.errorSys.declare([
            'add_group'
        ]);
        let vGroupE = new GroupE_1.GroupE();
        let idGroup = 0;
        if (ok && this.modelValidatorSys.fValid(vGroupE.getRulesInsert(), data)) {
            try {
                idGroup = (await this.db(GroupE_1.GroupE.NAME)
                    .insert(this.modelValidatorSys.getResult()))[0];
            }
            catch (e) {
                ok = false;
                this.errorSys.errorEx(e, 'add_group', 'Не удалось добавить группу');
            }
        }
        if (ok) { // Удалить связанный кеш
            this.cacheSys.clearCache('GroupSQL*');
        }
        return idGroup;
    }
    // ========================================
    // UPDATE
    // ========================================
    /**
     * Сохранить группу по ID
     *
     * @param integer idGroup
     * @return boolean
     */
    async saveGroup(idGroup, data) {
        let ok = this.errorSys.isOk();
        // Декларация ошибок
        this.errorSys.declare([
            'save_group'
        ]);
        let vGroupE = new GroupE_1.GroupE();
        if (ok && this.modelValidatorSys.fValid(vGroupE.getRulesUpdate(), data)) {
            let resp = null;
            try {
                resp = await this.db(GroupE_1.GroupE.NAME)
                    .where({
                    id: idGroup
                })
                    .update(this.modelValidatorSys.getResult());
            }
            catch (e) {
                ok = false;
                this.errorSys.errorEx(e, 'save_group', 'Не удалось сохранить изменения в группе');
            }
        }
        let aRelatedKeyRedis = [];
        if (ok) { // Удалить связанный кеш
            aRelatedKeyRedis = await this.redisSys.keys('GroupSQL*');
            this.redisSys.del(aRelatedKeyRedis);
        }
        return ok;
    }
    // ========================================
    // DELETE
    // ========================================
    /**
     * удалить группу по ID
     *
     * @param string aliasCtrlAccess
     * @return boolean
     */
    async delGroupByID(idGroup) {
        let ok = this.errorSys.isOk();
        // Декларация ошибок
        /*  this.errorSys.declareEx({
             'del_group':'Не удалось удалить группу'
         });
  */
        if (ok) {
            try {
                await this.db(GroupE_1.GroupE.NAME)
                    .where({
                    id: idGroup,
                })
                    .limit(1)
                    .del();
            }
            catch (e) {
                ok = false;
                this.errorSys.errorEx(e, 'del_group', 'Не удалось удалить группу');
            }
        }
        if (ok) { // Удаляем связный кеш
            this.cacheSys.clearCache('GroupSQL*');
        }
        return ok;
    }
}
exports.GroupSQL = GroupSQL;
//# sourceMappingURL=GroupSQL.js.map