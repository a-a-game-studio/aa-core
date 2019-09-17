"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Сущьности и правила валидации
const GroupsE_1 = require("../Entity/GroupsE");
const BaseSQL_1 = require("../../../System/BaseSQL");
/**
 * Здесь методы для SQL запросов
 * - Группы пользователей
 */
class GroupsSQL extends BaseSQL_1.default {
    constructor(req) {
        super(req);
    }
    // ========================================
    // SELECT
    // ========================================
    /**
     * Получить группу по ID
     *
     * @param integer idGroup
     * @return array|null
     */
    async getGroupByID(idGroup) {
        let ok = this.errorSys.isOk();
        let sql = '';
        // Декларация ошибок
        this.errorSys.declareEx({
            'get_group': 'Не удалось получить группу'
        });
        sql = `
            SELECT
                g.id,
                g.alias,
                g.name,
                g.descript
            FROM ${GroupsE_1.GroupsE.NAME} g
            WHERE g.id = :id_group
            LIMIT 1
        `;
        let respGroup = null;
        try {
            respGroup = (await this.db.raw(sql, {
                id_group: idGroup
            }))[0][0];
        }
        catch (e) {
            ok = false;
            this.errorSys.error('get_group', 'Не удалось получить группу');
        }
        return respGroup;
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
            groupList = await this.autoCache(`GroupsSQL.getAllGroups()`, 3600, async () => {
                let groupList = null;
                sql = `
                    SELECT
                        g.id,
                        g.name,
                        g.alias
                    FROM ${GroupsE_1.GroupsE.NAME} g
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
        let vGroupsE = new GroupsE_1.GroupsE();
        if (ok && this.modelValidatorSys.fValid(vGroupsE.getRulesUpdate(), data)) {
            let resp = null;
            try {
                resp = await this.db(GroupsE_1.GroupsE.NAME)
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
            aRelatedKeyRedis = await this.redisSys.keys('GroupsSQL*');
            this.redisSys.del(aRelatedKeyRedis);
        }
        return ok;
    }
}
exports.GroupsSQL = GroupsSQL;
//# sourceMappingURL=GroupsSQL.js.map