"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Системные классы
const BaseM_1 = require("../../../System/BaseM");
// Классы SQL Запросов
const UserSQL_1 = require("../../../Infrastructure/SQL/Repository/UserSQL");
const GroupsSQL_1 = require("../../../Infrastructure/SQL/Repository/GroupsSQL");
/**
 * Группы пользователей
 * Внутри метода делаем нужную бизнес логику
 */
class GroupM extends BaseM_1.default {
    constructor(req) {
        super(req);
        this.userSQL = new UserSQL_1.UserSQL(req);
        this.groupsSQL = new GroupsSQL_1.GroupsSQL(req);
    }
    /**
     * Получить список ролей/группы
     *
     * @param array data
     * @return array|null
     */
    async getAllGroups(data) {
        let ok = this.errorSys.isOk(); // Статус выполнения
        this.errorSys.declare([
            'get_all_roles' // Не удалось получить группы пользователей
        ]);
        let allGroupsList = null;
        if (ok) { // Получить список ролей
            allGroupsList = await this.groupsSQL.getAllGroups();
            if (!allGroupsList) {
                ok = false;
                this.errorSys.error('get_all_roles', 'Не удалось получить группы пользователей');
            }
        }
        let out = null;
        if (ok) { // Формирование ответа
            out = allGroupsList;
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
        let ok = this.errorSys.isOk();
        let idGroup = 0;
        if (!data['group_id']) {
            ok = false;
            this.errorSys.error('group_id', 'Отсутствует ID группы');
        }
        else {
            idGroup = Number(data['group_id']);
        }
        let groupList = [];
        if (ok) { // Получить группу
            groupList = await this.groupsSQL.getGroupByID(idGroup);
            if (!groupList) {
                ok = false;
                this.errorSys.error('get_group', 'Не удалось получить группы пользователей');
            }
        }
        let out = null;
        if (ok) { // Формирование ответа
            out = groupList;
        }
        else {
            out = [];
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
        let ok = this.errorSys.isOk();
        let idGroup = 0;
        if (!data['group_id']) {
            ok = false;
            this.errorSys.error('group_id', 'Отсутствует ID группы');
        }
        else {
            idGroup = Number(data['group_id']);
        }
        let group = false;
        if (ok) { // Получить группу
            group = await this.groupsSQL.saveGroup(idGroup, data);
            if (!group) {
                ok = false;
                this.errorSys.error('save_group', 'Не удалось сохранить данные группы');
            }
        }
        return null;
    }
}
exports.GroupM = GroupM;
//# sourceMappingURL=GroupM.js.map