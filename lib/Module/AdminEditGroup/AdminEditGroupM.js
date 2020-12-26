"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
// Системные классы
const BaseM_1 = __importDefault(require("../../System/BaseM"));
// Классы SQL Запросов
const CtrlAccessSQL_1 = require("../../Infrastructure/SQL/Repository/CtrlAccessSQL");
const AccessGroupSQL_1 = require("../../Infrastructure/SQL/Repository/AccessGroupSQL");
const V = __importStar(require("./AdminEditGroupV"));
const GroupSQL_1 = require("../../Infrastructure/SQL/Repository/GroupSQL");
/**
 * Бизнес модель пользователя суда мы нас проксирует контроллер 1 url = 1 метод модели
 * Внутри метода делаем нужную бизнес логику
 */
class AdminEditGroupM extends BaseM_1.default {
    constructor(req) {
        super(req);
        this.ctrlAccessSQL = new CtrlAccessSQL_1.CtrlAccessSQL(req);
        this.groupSQL = new GroupSQL_1.GroupSQL(req);
        this.accessGroupSQL = new AccessGroupSQL_1.AccessGroupSQL(req);
    }
    /**
     * Получить стартовые данные для работы страницы
     * @param data
     */
    async init(data) {
        data = V.init(this.req, data);
        let ok = this.errorSys.isOk();
        let aAccessCtrlList = null;
        if (ok) { // Получить список пользователей
            aAccessCtrlList = await this.ctrlAccessSQL.getAllCtrlAccess();
        }
        let aGroupList = null;
        if (ok) { // Получить список пользователей
            aGroupList = await this.groupSQL.getAllGroups();
        }
        let out = null;
        if (ok) { // Формирование ответа
            out = {
                is_init: true,
                list_ctrl_access: aAccessCtrlList,
                list_group: aGroupList // Список всех групп
            };
        }
        return out;
    }
    /**
     * Выбрать группу
     *
     * @param array data
     * @return array|null
     */
    async selectGroup(data) {
        data = V.selectGroup(this.req, data);
        let idGroup = data.id_group;
        let vGroup = null;
        await this.logicSys.ifOk('Получить список групп', async () => {
            vGroup = await this.groupSQL.getGroupByID(idGroup);
        });
        let aAccessGroups = null;
        await this.logicSys.ifOk('Получить список ролей пользователя', async () => {
            aAccessGroups = await this.accessGroupSQL.getCtrlAccessOfGroupByID(idGroup);
        });
        let out = null;
        await this.logicSys.ifOk('Формирование ответа', async () => {
            out = {
                one_group: vGroup,
                list_access_group: aAccessGroups
            };
        });
        return out;
    }
    // =======================================
    /**
     * Выбрать контроллер доступа
     *
     * @param array data
     * @return array|null
     */
    async selectCtrlAccess(data) {
        data = V.selectCtrlAccess(this.req, data);
        let idCtrlAccess = data.id_ctrl_access;
        let oneCtrlAccess = null;
        await this.logicSys.ifOk('Получить список ролей пользователя', async () => {
            oneCtrlAccess = await this.ctrlAccessSQL.getCtrlAccessByID(idCtrlAccess);
        });
        let out = null;
        this.logicSys.ifOk('Формирование ответа', async () => {
            out = {
                one_ctrl_access: oneCtrlAccess
            };
        });
        return out;
    }
    /**
     * Добавить добавить контроллер доступа группе
     *
     * @param array data
     */
    async addCtrlAccessToGroup(data) {
        data = V.addCtrlAccessToGroup(this.req, data);
        let ok = this.errorSys.isOk();
        let idCtrlAccess = data.id_ctrl_access;
        let idGroup = data.id_group;
        let idAddCtrlAccessToGroup = 0; // ID Связи между контроллером доступа и группой
        if (ok) { // Дать права группе на контроллер/модуль
            idAddCtrlAccessToGroup = await this.accessGroupSQL.addCtrlAccessToGroup(idCtrlAccess, idGroup);
        }
        let aAccessGroups = null;
        if (ok) { // Получить список модулей доступных группе
            aAccessGroups = await this.accessGroupSQL.getCtrlAccessOfGroupByID(idGroup);
        }
        let out = null;
        if (ok) { // Формирование ответа
            out = {
                add_ctrl_access_to_group: idAddCtrlAccessToGroup,
                list_access_group: aAccessGroups
            };
        }
        return out;
    }
    /**
     * Удалить права группы на контроллер/модуль
     *
     * @param array data
     */
    async delCtrlAccessFromGroup(data) {
        data = V.delCtrlAccessFromGroup(this.req, data);
        let ok = this.errorSys.isOk();
        let idCtrlAccess = data.id_ctrl_access;
        let idGroup = data.id_group;
        let bDelCtrlAccessFromGroup = false;
        if (ok) { // Удалить права на модуль у группы
            bDelCtrlAccessFromGroup = await this.accessGroupSQL.delCtrlAccessFromGroup(idCtrlAccess, idGroup);
        }
        let aAccessGroups = null;
        if (ok) { // Получить список модулей группы
            aAccessGroups = await this.accessGroupSQL.getCtrlAccessOfGroupByID(idGroup);
        }
        let out = null;
        if (ok) { // Формирование ответа
            out = {
                del_ctrl_access_from_group: bDelCtrlAccessFromGroup,
                list_access_group: aAccessGroups
            };
        }
        return out;
    }
    /**
     * Добавить группу пользователей
     * @param data
     */
    async addGroup(data) {
        data = V.addGroup(this.req, data);
        let ok = this.errorSys.isOk();
        // --------------------------
        let idGroup = null;
        if (ok) { // Регистрируем пользователя
            idGroup = await this.groupSQL.addGroup(data);
            if (!idGroup) {
                this.errorSys.error('add_group', 'Не удалось создать группу');
            }
        }
        // --------------------------
        let listGroup = null;
        if (ok) { // Получить список групп
            listGroup = await this.groupSQL.getAllGroups();
        }
        // --------------------------
        let vGroup = null;
        if (ok) { // Получить список пользователей
            vGroup = await this.groupSQL.getGroupByID(idGroup);
        }
        // --------------------------
        let out = null;
        if (ok) { // Формирование ответа
            out = {
                add_group: idGroup,
                one_group: vGroup,
                list_group: listGroup // Список пользователей
            };
        }
        return out;
    }
    /**
     * Сохранить группу
     * @param data данные
     */
    async saveGroup(data) {
        data = V.saveGroup(this.req, data);
        let ok = this.errorSys.isOk();
        let idGroup = data.id_group;
        let bSaveGroup = false;
        if (ok) { // Сохранить группу
            bSaveGroup = await this.groupSQL.saveGroup(idGroup, data);
        }
        // --------------------------
        let vGroup = null;
        if (ok) { // Получить информация по группу
            vGroup = await this.groupSQL.getGroupByID(idGroup);
        }
        // --------------------------
        let listGroup = null;
        if (ok) { // Получить список групп
            listGroup = await this.groupSQL.getAllGroups();
        }
        // --------------------------
        let out = null;
        if (ok) { // Формирование ответа
            out = {
                save_group: bSaveGroup,
                one_group: vGroup,
                list_group: listGroup // Список пользователей
            };
        }
        return out;
    }
    /**
     * Сохранить контроллер доступа
     * @param data данные
     */
    async saveCtrlAccess(data) {
        data = V.saveGroup(this.req, data);
        let ok = this.errorSys.isOk();
        let idCtrlAccess = data.id_ctrl_access;
        let bSaveCtrlAccess = false;
        if (ok) { // Сохранить группу
            bSaveCtrlAccess = await this.ctrlAccessSQL.saveCtrlAccess(idCtrlAccess, data);
        }
        // --------------------------
        let vCtrlAccess = null;
        if (ok) { // Получить информация по группу
            vCtrlAccess = await this.ctrlAccessSQL.getCtrlAccessByID(idCtrlAccess);
        }
        // --------------------------
        let listCtrlAccess = null;
        if (ok) { // Получить список групп
            listCtrlAccess = await this.ctrlAccessSQL.getAllCtrlAccess();
        }
        // --------------------------
        let out = null;
        if (ok) { // Формирование ответа
            out = {
                save_ctrl_access: bSaveCtrlAccess,
                one_ctrl_access: vCtrlAccess,
                list_ctrl_access: listCtrlAccess // Список пользователей
            };
        }
        return out;
    }
    /**
     * Удалить группу
     * @param data
     */
    async delGroup(data) {
        data = V.delGroup(this.req, data);
        let ok = this.errorSys.isOk();
        let idGroup = data.id_group;
        let bDelGroup = false;
        if (ok) { // Подтвердить регистрацию
            bDelGroup = await this.groupSQL.delGroupByID(idGroup);
        }
        // --------------------------
        let listGroup = null;
        if (ok) { // Получить список пользователей
            listGroup = await this.groupSQL.getAllGroups();
        }
        // --------------------------
        let out = null;
        if (ok) { // Формирование ответа
            out = {
                del_group: bDelGroup,
                list_group: listGroup // Список пользователей
            };
        }
        return out;
    }
    /**
     * Добавить группу пользователей
     * @param data
     */
    async addCtrlAccess(data) {
        data = V.addCtrlAccess(this.req, data);
        let ok = this.errorSys.isOk();
        // --------------------------
        let idGCtrlAccess = null;
        if (ok) { // Регистрируем пользователя
            idGCtrlAccess = await this.ctrlAccessSQL.addCtrlAccess(data);
            if (!idGCtrlAccess) {
                this.errorSys.error('add_ctrl_access', 'Не удалось создать группу');
            }
        }
        // --------------------------
        let aCtrlAccess = null;
        if (ok) { // Получить список групп
            aCtrlAccess = await this.ctrlAccessSQL.getAllCtrlAccess();
        }
        // --------------------------
        let vCtrlAccess = null;
        if (ok) { // Получить список пользователей
            vCtrlAccess = await this.ctrlAccessSQL.getCtrlAccessByID(idGCtrlAccess);
        }
        // --------------------------
        let out = null;
        if (ok) { // Формирование ответа
            out = {
                add_ctrl_access: idGCtrlAccess,
                one_ctrl_access: vCtrlAccess,
                list_ctrl_access: aCtrlAccess // Список контроллеров
            };
        }
        return out;
    }
}
exports.AdminEditGroupM = AdminEditGroupM;
//# sourceMappingURL=AdminEditGroupM.js.map