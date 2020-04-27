"use strict";
// Глобальные сервисы
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Системные сервисы
const BaseSQL_1 = __importDefault(require("../../../System/BaseSQL"));
const UserGroupE_1 = require("../Entity/UserGroupE");
const GroupE_1 = require("../Entity/GroupE");
/**
 * Здесь методы для SQL запросов
 * - Управление группами пользователей
 */
class UserGroupSQL extends BaseSQL_1.default {
    constructor(req) {
        super(req);
    }
    // ========================================
    // SELECT
    // ========================================
    /**
     * Получить Группы/Роли пользователя по id_user
     *
     * @param integer idUser
     * @return array|null
     */
    async getUserGroupsByUserID(idUser) {
        let ok = this.errorSys.isOk();
        // Декларация ошибок
        /*  this.errorSys.declareEx({
             'get_role':'Не удалось получить группы пользователя'
         }); */
        let aUserGroups = null;
        if (ok) {
            aUserGroups = await this.cacheSys.autoCache(`UserGroupSQL.getUserGroupsByUserID(${idUser})`, 3600, async () => {
                let aUserGroups = null;
                let sql = `
                    SELECT
                        DISTINCT ug.id_group,
                        g.alias,
                        g.name
                    FROM ${UserGroupE_1.UserGroupE.NAME} ug
                    JOIN ${GroupE_1.GroupE.NAME} g ON g.id = ug.id_group
                    WHERE
                        ug.id_user = :id_user;
                    ;
                `;
                try {
                    aUserGroups = (await this.db.raw(sql, {
                        id_user: idUser
                    }))[0];
                }
                catch (e) {
                    ok = false;
                    this.errorSys.errorEx(e, 'get_role', 'Не удалось группы пользователя');
                }
                return aUserGroups;
            });
        }
        return aUserGroups;
    }
    // ========================================
    // INSERT
    // ========================================
    /**
     * Добавить пользователя в группу - дать Роль
     * Группа/Роль
     *
     * @param idUser - ID Пользователя
     * @param idGroup - ID Группы
     */
    async addUserToGroup(idUser, idGroup) {
        let ok = this.errorSys.isOk();
        // Декларация ошибок
        this.errorSys.declare([
            'ctrl_user_in_group',
            'user_in_group',
            'add_role'
        ]);
        let iCountUserInGroup = 0;
        if (ok) { // Проверяем имеется ли пользователь в группе
            let sql = `
                SELECT
                    count(*) cnt
                FROM ${UserGroupE_1.UserGroupE.NAME} ug
                WHERE
                    ug.id_user = :id_user
                AND
                    ug.id_group = :id_group
                LIMIT 1
                ;

            `;
            try {
                iCountUserInGroup = (await this.db.raw(sql, {
                    id_user: idUser,
                    id_group: idGroup
                }))[0][0]['cnt'];
            }
            catch (e) {
                ok = false;
                this.errorSys.errorEx(e, 'ctrl_user_in_group', 'Не удалось проверить наличия пользователя в группе');
            }
        }
        if (ok && iCountUserInGroup > 0) { // Проверяем имеется ли пользователь в группе
            ok = false;
            this.errorSys.error('user_in_group', 'Пользователь уже состоит в группе');
        }
        let idUserGroup = 0;
        if (ok) { // Если пользователя в группе нет добавляем его в группу
            try {
                idUserGroup = (await this.db(UserGroupE_1.UserGroupE.NAME)
                    .insert({
                    id_user: idUser,
                    id_group: idGroup
                }))[0];
            }
            catch (e) {
                ok = false;
                this.errorSys.errorEx(e, 'add_role', 'Не удалось добавить роль');
            }
        }
        if (ok) { // Очищаем связный кеш
            await this.cacheSys.clearCache('UserGroupSQL*');
        }
        // Формирование ответа
        return idUserGroup;
    }
    // ========================================
    // DELETE
    // ========================================
    /**
     * Удалить пользователя из группы - убрать Роль
     * Группа/Роль
     *
     * @param integer idUser
     * @param integer idGroup
     * @return array|null
     */
    async delUserFromGroup(idUser, idGroup) {
        let ok = this.errorSys.isOk();
        // Декларация ошибок
        this.errorSys.declare([
            'ctrl_user_in_group',
            'user_in_group',
            'del_role'
        ]);
        let iCountUserInGroup = 0;
        if (ok) { // Проверяем имеется ли пользователь в группе
            let sql = `
                SELECT
                    count(*) cnt
                FROM ${UserGroupE_1.UserGroupE.NAME} pug
                WHERE
                    pug.id_user = :id_user
                AND
                    pug.id_group = :id_group
                LIMIT 1
                ;

            `;
            try {
                let resp = (await this.db.raw(sql, {
                    id_user: idUser,
                    id_group: idGroup
                }))[0];
                iCountUserInGroup = resp[0]['cnt'];
            }
            catch (e) {
                ok = false;
                this.errorSys.error('ctrl_user_in_group', 'Не удалось проверить наличия пользователя в группе');
            }
        }
        if (ok && iCountUserInGroup < 1) { // Проверяем имеется ли пользователь в группе
            ok = false;
            this.errorSys.error('user_in_group', 'Пользователя нет в группе');
        }
        if (ok) { // Если пользователя в группе есть удаляем его из группы
            let sql = `
                DELETE FROM ${UserGroupE_1.UserGroupE.NAME}
                WHERE
                    id_user = :id_user
                AND
                    id_group = :id_group
                ;
            `;
            let resp = null;
            try {
                resp = await this.db(UserGroupE_1.UserGroupE.NAME)
                    .where({
                    id_user: idUser,
                    id_group: idGroup
                })
                    .del();
            }
            catch (e) {
                ok = false;
                this.errorSys.error('del_role', 'Не удалось удалить роль');
            }
        }
        if (ok) { // Очищаем связный кеш
            await this.cacheSys.clearCache('UserGroupSQL*');
        }
        // Формирование ответа
        return ok;
    }
}
exports.UserGroupSQL = UserGroupSQL;
//# sourceMappingURL=UserGroupSQL.js.map