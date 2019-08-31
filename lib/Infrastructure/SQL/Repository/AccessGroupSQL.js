"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Библиотеки
const _ = require("lodash");
// Сущьности и правила валидации
const AccessGroupE_1 = require("../Entity/AccessGroupE");
const BaseSQL_1 = require("../../../System/BaseSQL");
/**
 * Здесь методы для SQL запросов
 * - Связка Групп пользователей с модулями
 */
class AccessGroupSQL extends BaseSQL_1.default {
    constructor(req) {
        super(req);
    }
    // ==================================
    // SELECT
    // ==================================
    /**
     * Получить список модулей доступных группе по ID Группы
     *
     * @param integer idGroup
     * @return array|null
     */
    async getCtrlAccessOfGroupByID(idGroup) {
        let ok = this.errorSys.isOk();
        this.errorSys.declare([
            'get_ctrl_access',
        ]);
        let resp = null;
        if (ok) { // Получить список модулей доступных группе по ID Группы
            let sql = `
                SELECT
                    ag.id access_group_id,
                    ag.group_id,
                    ag.ctrl_access_id,
                    ag.create_access,
                    ag.read_access,
                    ag.update_access,
                    ag.delete_access,
                    ag.id access_group_id,
                    ca.alias,
                    ca.name,
                    ca.descript
                FROM access_group ag
                JOIN ctrl_access ca ON ca.id = ag.ctrl_access_id
                WHERE ag.group_id = :id_group
                ;
            `;
            try {
                resp = (await this.db.raw(sql, {
                    'id_group': idGroup
                }))[0];
            }
            catch (e) {
                ok = false;
                this.errorSys.error('get_ctrl_access', 'Не удалось получить контроль доступа');
            }
        }
        return resp;
    }
    /**
     * Получить права CRUD по конкретному модулю
     * на основе групп к которым принадлежит пользователь
     *
     * @param array aIdGroup
     * @param integer idCtrlAccess
     * @return array|null
     */
    async getAccessCRUD(aIdsGroup, idCtrlAccess) {
        let ok = this.errorSys.isOk();
        let sql = '';
        // Декларация ошибок
        this.errorSys.declare([
            'user_no_has_group',
            'get_access_crud'
        ]);
        if (aIdsGroup.length < 1) { // Если пользователь не имеет групп - значит у него нет прав
            ok = false;
            this.errorSys.error('user_no_has_group', 'Пользователь не состоит в группе');
        }
        // Превращаем массив Ids в строку
        let sIdsGroup = aIdsGroup.join(',');
        let aAccessCRUD = {};
        if (ok) { // Получаем права CRUD
            sql = `
                SELECT
                    SUM(ag.create_access) \`create\`,
                    SUM(ag.read_access) \`read\`,
                    SUM(ag.update_access) \`update\`,
                    SUM(ag.delete_access) \`delete\`
                FROM access_group ag
                JOIN ctrl_access ca ON ca.id = ag.ctrl_access_id
                WHERE
                    ag.group_id IN (${sIdsGroup})
                AND
                    ag.ctrl_access_id = :ctrl_access_id
                ;
            `;
            try {
                aAccessCRUD = (await this.db.raw(sql, {
                    'ctrl_access_id': idCtrlAccess
                }))[0];
                aAccessCRUD = aAccessCRUD[0];
            }
            catch (e) {
                ok = false;
                this.errorSys.error('get_access_crud', 'Не удалось получить доступы к модулю');
            }
        }
        let a = {};
        _.forEach(aAccessCRUD, (v, k) => {
            a[k] = Boolean(v);
        });
        aAccessCRUD = a;
        return aAccessCRUD;
    }
    /**
     * Получить права на доступ к модулю
     * на основе групп к которым принадлежит пользователь
     *
     * @param array aIdGroup
     * @param integer idCtrlAccess
     * @return array|null
     */
    async getAccess(aIdsGroup, idCtrlAccess) {
        let ok = this.errorSys.isOk();
        // Декларация ошибок
        this.errorSys.declare([
            'user_no_has_group',
            'get_access_to_ctrl'
        ]);
        let sql = '';
        if (aIdsGroup.length < 1) { // Если пользователь не имеет групп - значит у него нет прав
            ok = false;
            this.errorSys.error('user_no_has_group', 'Пользователь не состоит в группе');
        }
        // Превращаем массив Ids в строку
        let sIdsGroup = aIdsGroup.join(',');
        let bAccess = false;
        if (ok) {
            sql = `
                SELECT
                    count(*) cnt
                FROM access_group ag
                JOIN ctrl_access ca ON ca.id = ag.ctrl_access_id
                WHERE
                    ag.group_id IN (${sIdsGroup})
                AND
                    ag.ctrl_access_id = :ctrl_access_id
                LIMIT 1
                ;
            `;
            let resp = [];
            try {
                resp = (await this.db.raw(sql, {
                    'ctrl_access_id': idCtrlAccess
                }))[0];
                bAccess = Boolean(resp[0]['cnt']);
            }
            catch (e) {
                ok = false;
                this.errorSys.error('get_access_to_ctrl', 'Не удалось получить доступы к модулю');
            }
        }
        return bAccess;
    }
    // ========================================
    // INSERT
    // ========================================
    /**
     * Добавить контроль доступа к группе
     *
     * @return boolean
     */
    async addCtrlAccessToGroup(idCtrlAccess, idGroup) {
        let ok = this.errorSys.isOk();
        let sql = '';
        // Декларация ошибок
        this.errorSys.declare([
            'add_ctrl_access'
        ]);
        let idAccessGroup = 0;
        if (ok) {
            let resp = null;
            try {
                resp = await this.db('access_group')
                    .returning('id')
                    .insert({
                    group_id: idGroup,
                    ctrl_access_id: idCtrlAccess,
                });
                idAccessGroup = resp[0];
            }
            catch (e) {
                ok = false;
                this.errorSys.error('add_ctrl_access', 'Не удалось добавить права на модуль');
            }
        }
        let aRelatedKeyRedis = [];
        if (ok) { // Удалить связанный кеш
            aRelatedKeyRedis = await this.redisSys.keys('AccessGroupSQL*');
            this.redisSys.del(aRelatedKeyRedis);
        }
        return idAccessGroup;
    }
    // ========================================
    // UPDATE
    // ========================================
    /**
     * Изменить параметры доступа
     *
     * @param integer idAccessGroup
     * @return boolean
     */
    async saveAccessGroup(idAccessGroup, data) {
        let ok = this.errorSys.isOk();
        let sql = '';
        // Декларация ошибок
        this.errorSys.declare([
            'save_access_group'
        ]);
        let vAccessGroupE = new AccessGroupE_1.AccessGroupE();
        if (ok && this.modelValidatorSys.fValid(vAccessGroupE.getRulesUpdate(), data)) {
            let resp = null;
            try {
                resp = await this.db('access_group')
                    .where({
                    id: idAccessGroup
                })
                    .update(this.modelValidatorSys.getResult());
            }
            catch (e) {
                ok = false;
                this.errorSys.error('save_access_group', 'Не удалось сохранить изменения в группе');
            }
        }
        let aRelatedKeyRedis = [];
        if (ok) { // Удалить связанный кеш
            aRelatedKeyRedis = await this.redisSys.keys('AccessGroupSQL*');
            this.redisSys.del(aRelatedKeyRedis);
        }
        return ok;
    }
    // ========================================
    // DELETE
    // ========================================
    /**
     * удалить права на модуль у группы
     *
     * @param string idCtrlAccess
     * @param string idGroup
     * @return boolean
     */
    async delCtrlAccessFromGroup(idCtrlAccess, idGroup) {
        let ok = this.errorSys.isOk();
        // Декларация ошибок
        this.errorSys.declare([
            'del_ctrl_access'
        ]);
        if (ok) {
            let resp = null;
            try {
                resp = await this.db('access_group')
                    .where({
                    group_id: idGroup,
                    ctrl_access_id: idCtrlAccess,
                })
                    .limit(1)
                    .del();
            }
            catch (e) {
                ok = false;
                this.errorSys.error('del_ctrl_access', 'Не удалось удалить права на модуль');
            }
        }
        let aRelatedKeyRedis = [];
        if (ok) { // Удалить связанный кеш
            aRelatedKeyRedis = await this.redisSys.keys('AccessGroupSQL*');
            this.redisSys.del(aRelatedKeyRedis);
        }
        return ok;
    }
    // ========================================
    // COUNT
    // ========================================
    /**
     * Проверить наличие связи между модулем и группой
     * связь модуля и группы должна быть только одна
     *
     * @param idCtrlAccess:number
     * @param idGroup:number
     * @return integer
     */
    async cntAccessGroup(idCtrlAccess, idGroup) {
        let ok = this.errorSys.isOk();
        // Декларация ошибок
        this.errorSys.declare([
            'cnt_ctrl_access'
        ]);
        let resp = [];
        let sql = '';
        let cntAccessGroup = 0;
        if (ok) { // Получить количество контроллеров доступа
            sql = `
                SELECT
                    COUNT(*) cnt
                FROM access_group ag
                WHERE
                    ag.group_id = :group_id
                AND
                    ag.ctrl_access_id = :ctrl_access_id
                LIMIT 1
            `;
            try {
                resp = (await this.db.raw(sql, {
                    'group_id': idGroup,
                    'ctrl_access_id': idCtrlAccess
                }))[0];
                cntAccessGroup = Number(resp[0]['cnt']);
            }
            catch (e) {
                ok = false;
                this.errorSys.error('cnt_ctrl_access', 'Не удалось подсчитать контроль доступа');
            }
        }
        resp = null;
        if (ok) { // Ответ
            return cntAccessGroup;
        }
        else {
            return -1; // В случае если произошла SQL ошибка
        }
    }
}
exports.AccessGroupSQL = AccessGroupSQL;
//# sourceMappingURL=AccessGroupSQL.js.map