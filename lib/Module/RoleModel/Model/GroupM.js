"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Системные классы
const BaseM_1 = require("../../../System/BaseM");
// Классы SQL Запросов
const UserSQL_1 = require("../../../Infrastructure/SQL/Repository/UserSQL");
const GroupSQL_1 = require("../../../Infrastructure/SQL/Repository/GroupSQL");
// Валидация
const V = require("../Validator/GroupV");
/**
 * Группы пользователей
 * Внутри метода делаем нужную бизнес логику
 */
class GroupM extends BaseM_1.default {
    constructor(req) {
        super(req);
        this.userSQL = new UserSQL_1.UserSQL(req);
        this.groupSQL = new GroupSQL_1.GroupSQL(req);
    }
    /**
     * Получить список ролей/группы
     *
     * @param array data
     * @return array|null
     */
    async getAllGroups(data) {
        data = V.getAllGroups.valid(this.req, data);
        let ok = this.errorSys.isOk();
        this.errorSys.declare([
            'get_all_roles' // Не удалось получить группы пользователей
        ]);
        let allGroupsList = null;
        if (ok) { // Получить список ролей
            allGroupsList = await this.groupSQL.getAllGroups();
            if (!allGroupsList) {
                ok = false;
                this.errorSys.error('get_all_roles', 'Не удалось получить группы пользователей');
            }
        }
        let out = null;
        if (ok) { // Формирование ответа
            out = {
                list_group: allGroupsList
            };
        }
        return out;
    }
    /**
     * Получить сокращенную иформацию группы по ID
     *
     * @param array data
     * @return array|null
     */
    async getGroupByID(data) {
        data = V.getGroupByID.valid(this.req, data);
        let ok = this.errorSys.isOk();
        let idGroup = data.id_group;
        let groupList = null;
        if (ok) { // Получить группу
            groupList = await this.groupSQL.getGroupByID(idGroup);
            if (!groupList) {
                ok = false;
                this.errorSys.error('get_group', 'Не удалось получить группы пользователей');
            }
        }
        let out = null;
        if (ok) { // Формирование ответа
            out = groupList;
        }
        return out;
    }
    /**
     * Добавить группу
     *
     * @param array data
     * @return array|null
     */
    async addGroup(data) {
        data = V.addGroup.valid(this.req, data);
        let ok = this.errorSys.isOk();
        let idAddGroup = 0;
        if (ok) { // Получить группу
            idAddGroup = await this.groupSQL.addGroup(data);
            ok = this.errorSys.isOk();
        }
        let out = null;
        if (ok) { // Формирование ответа
            out = {
                id_group: idAddGroup,
            };
        }
        return out;
    }
    /**
     * Получить сокращенную иформацию группы по ID
     *
     * @param array data
     * @return array|null
     */
    async saveGroup(data) {
        data = V.saveGroup.valid(this.req, data);
        let ok = this.errorSys.isOk();
        let idGroup = data.id_group;
        let bSaveGroup = false;
        if (ok) { // Получить группу
            bSaveGroup = await this.groupSQL.saveGroup(idGroup, data);
            if (!bSaveGroup) {
                ok = false;
                this.errorSys.error('save_group', 'Не удалось сохранить данные группы');
            }
        }
        let out = null;
        if (ok) { // Формирование ответа
            out = {
                cmd_save_group: bSaveGroup,
            };
        }
        return out;
    }
    /**
     * Удалить группу по ID
     *
     * @param array data
     * @return array|null
     */
    async delGroup(data) {
        data = V.delGroup.valid(this.req, data);
        let ok = this.errorSys.isOk();
        let idGroup = data.id_group;
        let bDelGroup = false;
        if (ok) { // Получить группу
            bDelGroup = await this.groupSQL.delGroupByID(idGroup);
            ok = this.errorSys.isOk();
        }
        let out = null;
        if (ok) { // Формирование ответа
            out = {
                del_group: bDelGroup,
            };
        }
        return out;
    }
}
exports.GroupM = GroupM;
//# sourceMappingURL=GroupM.js.map