"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Системные классы
const BaseM_1 = require("../../../System/BaseM");
// Классы SQL Запросов
const UserSQL_1 = require("../../../Infrastructure/SQL/Repository/UserSQL");
const CtrlAccessSQL_1 = require("../../../Infrastructure/SQL/Repository/CtrlAccessSQL");
const AccessGroupSQL_1 = require("../../../Infrastructure/SQL/Repository/AccessGroupSQL");
// Валидация
const V = require("../Validator/AccessGroupV");
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
        data = V.getCtrlAccessOfGroupByID.valid(this.req, data);
        let ok = this.errorSys.isOk();
        let idGroup = data.id_group;
        let ctrlAccessList = null;
        if (ok) { // Получить список модулей доступных группе
            ctrlAccessList = await this.accessGroupSQL.getCtrlAccessOfGroupByID(idGroup);
            if (!ctrlAccessList) {
                this.errorSys.devWarning('group_no_has_ctrl_access', 'Группа не имеет доступных ей модулей');
            }
        }
        let out = null;
        if (ok) { // Формирование ответа
            out = {
                list_ctrl_access: ctrlAccessList
            };
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
        data = V.addCtrlAccessToGroup.valid(this.req, data);
        let ok = this.errorSys.isOk();
        this.errorSys.declareEx({
            'is_exist_ctrl_access': 'Проверка на существование доступа',
            'cnt_access_group': 'Группа уже имеет доступ к этому модулю',
            'add_ctrl_access_to_group': 'Не удалось добавить доступ на модуль группе',
        });
        let idCtrlAccess = data.id_ctrl_access;
        let idGroup = data.id_group;
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
        let out = null;
        if (ok) { // Формирование ответа
            out = {
                cmd_add_ctrl_access_to_group: idAccessGroup
            };
        }
        return out;
    }
    /**
     * Изменить данные доступа группе
     *
     * @param array data
     * @return null
     */
    async saveAccessGroup(data) {
        data = V.saveAccessGroup.valid(this.req, data);
        let ok = this.errorSys.isOk();
        this.errorSys.declareEx({
            'save_access_group': 'Не удалось изменить параметры доступа'
        });
        let idAccessGroup = data.id_access_group;
        let bAccessGroup = false;
        if (ok) { // Изменить параметры доступа
            bAccessGroup = await this.accessGroupSQL.saveAccessGroup(idAccessGroup, data);
            if (!bAccessGroup) {
                ok = false;
                this.errorSys.error('save_access_group', 'Не удалось изменить параметры доступа');
            }
        }
        let out = null;
        if (ok) { // Формирование ответа
            out = {
                cmd_save_access_group: bAccessGroup
            };
        }
        return out;
    }
    /**
     * Удалить доступ к модулю из группы
     *
     * @param array data
     * @return null
     */
    async delCtrlAccessFromGroup(data) {
        data = V.delCtrlAccessFromGroup.valid(this.req, data);
        let ok = this.errorSys.isOk();
        this.errorSys.declareEx({
            'is_exist_ctrl_access': 'Проверка на существования доступа провалилась',
            'cnt_access_group': 'Группа не имеет доступ к этому модулю',
            'del_ctrl_access_to_group': 'Не удалось убрать права на модуль у группы'
        });
        let idCtrlAccess = data.id_ctrl_access;
        let idGroup = data.id_group;
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
        let bDelCtrlAccessFromGroup = false;
        if (ok) { // Удалить права на модуль из группы
            bDelCtrlAccessFromGroup = await this.accessGroupSQL.delCtrlAccessFromGroup(idCtrlAccess, idGroup);
            if (!bDelCtrlAccessFromGroup) {
                ok = false;
                this.errorSys.error('del_ctrl_access_to_group', 'Не удалось убрать права на модуль у группы');
            }
        }
        let out = null;
        if (ok) { // Формирование ответа
            out = {
                cmd_del_ctrl_access_from_group: bDelCtrlAccessFromGroup
            };
        }
        return out;
    }
}
exports.AccessGroupM = AccessGroupM;
// export {AccessGroupM};
//# sourceMappingURL=AccessGroupM.js.map