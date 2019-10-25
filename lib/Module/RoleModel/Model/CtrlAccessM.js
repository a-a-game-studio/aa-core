"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Системные классы
const BaseM_1 = require("../../../System/BaseM");
// Классы SQL Запросов
const UserSQL_1 = require("../../../Infrastructure/SQL/Repository/UserSQL");
const CtrlAccessSQL_1 = require("../../../Infrastructure/SQL/Repository/CtrlAccessSQL");
// Валидация
const V = require("../Validator/CtrlAccessV");
/**
 * Контроллеры доступа по модулям
 * Внутри метода делаем нужную бизнес логику
 */
class CtrlAccessM extends BaseM_1.default {
    constructor(req) {
        super(req);
        this.userSQL = new UserSQL_1.UserSQL(req);
        this.ctrlAccessSQL = new CtrlAccessSQL_1.CtrlAccessSQL(req);
    }
    /**
     * Получить список контроллеров доступа
     *
     * @param array data
     * @return array|null
     */
    async getAllCtrlAccess(data) {
        data = V.getAllCtrlAccess.valid(this.req, data);
        let ok = this.errorSys.isOk();
        this.errorSys.declare([
            'get_all_roles' // Не удалось получить группы пользователей
        ]);
        let allCtrlAccessList = null;
        if (ok) { // Получить список ролей
            allCtrlAccessList = await this.ctrlAccessSQL.getAllCtrlAccess();
            if (!allCtrlAccessList) {
                ok = false;
                this.errorSys.error('get_all_roles', 'Не удалось получить группы пользователей');
            }
        }
        let out = null;
        if (ok) { // Формирование ответа
            out = {
                list_ctrl_access: allCtrlAccessList
            };
        }
        return out;
    }
    /**
     * Получить иформацию по контроллеру
     *
     * @param array data
     * @return array|null
     */
    async getCtrlAccessByAlias(data) {
        data = V.getCtrlAccessByAlias.valid(this.req, data);
        let ok = this.errorSys.isOk();
        this.errorSys.declareEx({
            'get_ctrl_access': 'Не удалось получить контроллер доступа'
        });
        let aliasCtrlAccess = data.alias;
        let ctrlAccessList = null;
        if (ok) { // Получить группу
            ctrlAccessList = await this.ctrlAccessSQL.getCtrlAccessByAlias(aliasCtrlAccess);
            if (!ctrlAccessList) {
                ok = false;
                this.errorSys.error('get_ctrl_access', 'Не удалось получить контроллер доступа');
            }
        }
        let out = null;
        if (ok) { // Формирование ответа
            out = {
                one_ctrl_access: ctrlAccessList
            };
        }
        return out;
    }
    /**
     * Изменить данные контроллера доступа
     *
     * @param array data
     * @return array|null
     */
    async saveCtrlAccess(data) {
        data = V.saveCtrlAccess.valid(this.req, data);
        let ok = this.errorSys.isOk();
        this.errorSys.declareEx({
            'save_ctrl_access': 'Не удалось сохранить данные группы'
        });
        let idCtrlAccess = data.id_ctrl_access;
        let bCtrlAccess = false;
        if (ok) { // Получить группу
            bCtrlAccess = await this.ctrlAccessSQL.saveCtrlAccess(idCtrlAccess, data);
            if (!bCtrlAccess) {
                ok = false;
                this.errorSys.error('save_ctrl_access', 'Не удалось сохранить данные группы');
            }
        }
        let out = null;
        if (ok) { // Формирование ответа
            out = {
                cmd_save_ctrl_access: true
            };
        }
        return out;
    }
    /**
     * Добавить контроллер доступа
     *
     * @param array data
     */
    async addCtrlAccess(data) {
        data = V.addCtrlAccess.valid(this.req, data);
        let ok = this.errorSys.isOk();
        this.errorSys.declareEx({
            'is_exist_ctrl_access': 'Проверка на существования ctrl_access по alias провалилась',
            'cnt_ctrl_access': 'Контроллер с таким alias уже существует',
            'add_ctrl_access': 'Не удалось добавить модуль доступа',
        });
        let aliasCtrlAccess = data.alias;
        let cntCtrlAccess = 0;
        if (ok) { // Проверить существуют ли контроллер доступа с таким ALIAS
            cntCtrlAccess = await this.ctrlAccessSQL.cntCtrlAccessByAlias(aliasCtrlAccess);
            if (cntCtrlAccess < 0) {
                ok = false;
                this.errorSys.error('is_exist_ctrl_access', 'Проверка на существования ctrl_access по alias провалилась');
            }
        }
        if (ok && cntCtrlAccess > 0) { // Если контроллер уже существует - говорим об ошибке
            ok = false;
            this.errorSys.error('cnt_ctrl_access', 'Контроллер с таким alias уже существует');
        }
        let idCtrlAccess = 0;
        if (ok) { // Добавить контроллер доступа
            idCtrlAccess = await this.ctrlAccessSQL.addCtrlAccess(data);
            if (!idCtrlAccess) {
                ok = false;
                this.errorSys.error('add_ctrl_access', 'Не удалось добавить модуль доступа');
            }
        }
        let out = null;
        if (ok) { // Формирование ответа
            out = {
                cmd_add_ctrl_access: idCtrlAccess
            };
        }
        return out;
    }
    /**
     * Удалить контроллер доступа
     *
     * @param array data
     * @return array|null
     */
    async delCtrlAccess(data) {
        data = V.delCtrlAccess.valid(this.req, data);
        let ok = this.errorSys.isOk();
        this.errorSys.declareEx({
            'is_exist_ctrl_access': 'Проверка на существования ctrl_access по alias провалилась',
            'cnt_ctrl_access': 'Контроллера с таким alias не существует',
            'del_ctrl_access': 'Не удалось удалить контроллер доступа',
        });
        let aliasCtrlAccess = data.alias;
        let cntCtrlAccess = 0;
        if (ok) { // Проверить существуют ли контроллер доступа с таким ALIAS
            cntCtrlAccess = await this.ctrlAccessSQL.cntCtrlAccessByAlias(aliasCtrlAccess);
            if (cntCtrlAccess < 0) {
                ok = false;
                this.errorSys.error('is_exist_ctrl_access', 'Проверка на существования ctrl_access по alias провалилась');
            }
        }
        if (ok && cntCtrlAccess < 1) { // Если контроллер не существует - говорим об ошибке
            ok = false;
            this.errorSys.error('cnt_ctrl_access', 'Контроллера с таким alias не существует');
        }
        let okCtrlAccess = false;
        if (ok) { // Получить контроллер доступа
            okCtrlAccess = await this.ctrlAccessSQL.delCtrlAccessByAlias(aliasCtrlAccess);
            if (!okCtrlAccess) {
                ok = false;
                this.errorSys.error('del_ctrl_access', 'Не удалось удалить контроллер доступа');
            }
        }
        let out = null;
        if (ok) { // Формирование ответа
            out = {
                cmd_del_ctrl_access: okCtrlAccess
            };
        }
        return out;
    }
}
exports.CtrlAccessM = CtrlAccessM;
//# sourceMappingURL=CtrlAccessM.js.map