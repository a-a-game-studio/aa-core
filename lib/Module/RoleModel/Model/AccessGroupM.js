"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Системные классы
const BaseM_1 = require("../../../System/BaseM");
// Классы SQL Запросов
const UserSQL_1 = require("../../../Infrastructure/SQL/Repository/UserSQL");
const CtrlAccessSQL_1 = require("../../../Infrastructure/SQL/Repository/CtrlAccessSQL");
const AccessGroupSQL_1 = require("../../../Infrastructure/SQL/Repository/AccessGroupSQL");
/**
 * Контроллеры доступа по модулям
 * Внутри метода делаем нужную бизнес логику
 */
class AccessGroupM extends BaseM_1.default {
    constructor(req) {
        super(req);
        this.userSQL = new UserSQL_1.UserSQL(req);
        this.ctrlAccessSQL = new CtrlAccessSQL_1.CtrlAccessSQL(req);
        this.accessGroupSQL = new AccessGroupSQL_1.AccessGroupSQL(req);
    }
    /**
     * Получить иформацию по контроллеру
     *
     * @param array data
     * @return array|null
     */
    async getCtrlAccessOfGroupByID(data) {
        let ok = this.errorSys.isOk();
        this.errorSys.declare([
            'group_id',
        ]);
        let idGroup = null;
        if (!data['group_id']) {
            ok = false;
            this.errorSys.error('group_id', 'Отсутствует ID группы');
        }
        else {
            idGroup = Number(data['group_id']);
        }
        let ctrlAccessList = null;
        if (ok) { // Получить список модулей доступных группе
            ctrlAccessList = await this.accessGroupSQL.getCtrlAccessOfGroupByID(idGroup);
            if (!ctrlAccessList) {
                this.errorSys.devWarning('group_no_has_ctrl_access', 'Группа не имеет доступных ей модулей');
            }
        }
        let out = null;
        if (ok) { // Формирование ответа
            out = ctrlAccessList;
        }
        else {
            out = [];
        }
        return out;
    }
    /**
     * Добавить разрешения на модуль в группу
     *
     * @param array data
     * @return array|null
     */
    async addCtrlAccessToGroup(data) {
        let ok = this.errorSys.isOk(); // Статус выполнения
        this.errorSys.declare([
            'ctrl_access_id',
            'group_id',
            'is_exist_ctrl_access',
            'cnt_access_group',
            'add_ctrl_access_to_group' // Не удалось добавить доступ на модуль группе
        ]);
        let idCtrlAccess = 0;
        if (!data['ctrl_access_id']) {
            ok = false;
            this.errorSys.error('ctrl_access_id', 'Отсутствует ID Модуля');
        }
        else {
            idCtrlAccess = Number(data['ctrl_access_id']);
        }
        let idGroup = 0;
        if (!data['group_id']) {
            ok = false;
            this.errorSys.error('group_id', 'Отсутствует IF группы');
        }
        else {
            idGroup = Number(data['group_id']);
        }
        let cntAccessGroup = 0;
        if (ok) { // Проверить существуют ли связь модуля и группы
            cntAccessGroup = await this.accessGroupSQL.cntAccessGroup(idCtrlAccess, idGroup);
            if (cntAccessGroup < 0) {
                ok = false;
                this.errorSys.error('is_exist_ctrl_access', 'Проверка на существования доступа провалилась');
            }
        }
        if (ok && cntAccessGroup > 0) { // Если связь уже существует - говорим об ошибке
            ok = false;
            this.errorSys.error('cnt_access_group', 'Группа уже имеет доступ к этому модулю');
        }
        let idAccessGroup = 0;
        if (ok) { // Получить список ролей пользователя
            idAccessGroup = await this.accessGroupSQL.addCtrlAccessToGroup(idCtrlAccess, idGroup);
            if (idAccessGroup < 1) {
                ok = false;
                this.errorSys.error('add_ctrl_access_to_group', 'Не удалось добавить доступ на модуль группе');
            }
        }
        // Формируем ответ
        return {
            access_group_id: idAccessGroup
        };
    }
    /**
     * Изменить данные доступа группе
     *
     * @param array data
     * @return null
     */
    async saveAccessGroup(data) {
        let ok = this.errorSys.isOk();
        this.errorSys.declare([
            'access_group_id',
            'save_access_group' // Не удалось изменить параметры доступа
        ]);
        let idAccessGroup = 0;
        if (!data['access_group_id']) {
            ok = false;
            this.errorSys.error('access_group_id', 'Отсутствует ID доступа');
        }
        else {
            idAccessGroup = Number(data['access_group_id']);
        }
        let accessGroup = false;
        if (ok) { // Получить группу
            accessGroup = await this.accessGroupSQL.saveAccessGroup(idAccessGroup, data);
            if (!accessGroup) {
                ok = false;
                this.errorSys.error('save_access_group', 'Не удалось изменить параметры доступа');
            }
        }
        return null;
    }
    /**
     * Удалить доступ к модулю из группы
     *
     * @param array data
     * @return null
     */
    async delCtrlAccessFromGroup(data) {
        let ok = this.errorSys.isOk(); // Статус выполнения
        this.errorSys.declare([
            'ctrl_access_id',
            'group_id',
            'is_exist_ctrl_access',
            'cnt_access_group',
            'del_ctrl_access_to_group' // Не удалось убрать права на модуль у группы
        ]);
        let idCtrlAccess = 0;
        if (!data['ctrl_access_id']) {
            ok = false;
            this.errorSys.error('ctrl_access_id', 'Отсутствует ID модуля');
        }
        else {
            idCtrlAccess = Number(data['ctrl_access_id']);
        }
        let idGroup = 0;
        if (!data['group_id']) {
            ok = false;
            this.errorSys.error('group_id', 'Отсутствует ID группы');
        }
        else {
            idGroup = Number(data['group_id']);
        }
        let cntAccessGroup = 0;
        if (ok) { // Проверить существуют ли связь модуля и группы
            cntAccessGroup = await this.accessGroupSQL.cntAccessGroup(idCtrlAccess, idGroup);
            if (cntAccessGroup < 0) {
                ok = false;
                this.errorSys.error('is_exist_ctrl_access', 'Проверка на существования доступа провалилась');
            }
        }
        if (ok && cntAccessGroup < 1) { // Если связь не существует - говорим об ошибке
            ok = false;
            this.errorSys.error('cnt_access_group', 'Группа не имеет доступ к этому модулю');
        }
        let delCtrlAccessFromGroup = false;
        if (ok) { // Удалить права на модуль из группы
            delCtrlAccessFromGroup = await this.accessGroupSQL.delCtrlAccessFromGroup(idCtrlAccess, idGroup);
            if (!delCtrlAccessFromGroup) {
                ok = false;
                this.errorSys.error('del_ctrl_access_to_group', 'Не удалось убрать права на модуль у группы');
            }
        }
        // Не возвращаем никаких данных
        return null;
    }
}
exports.AccessGroupM = AccessGroupM;
// export {AccessGroupM};
//# sourceMappingURL=AccessGroupM.js.map