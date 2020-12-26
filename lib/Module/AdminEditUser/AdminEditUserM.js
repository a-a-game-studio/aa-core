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
const UserSQL_1 = require("../../Infrastructure/SQL/Repository/UserSQL");
const UserGroupSQL_1 = require("../../Infrastructure/SQL/Repository/UserGroupSQL");
// Валидация
const V = __importStar(require("./AdminEditUserV"));
const GroupSQL_1 = require("../../Infrastructure/SQL/Repository/GroupSQL");
/**
 * Бизнес модель пользователя суда мы нас проксирует контроллер 1 url = 1 метод модели
 * Внутри метода делаем нужную бизнес логику
 */
class AdminEditUserM extends BaseM_1.default {
    constructor(req) {
        super(req);
        this.userSQL = new UserSQL_1.UserSQL(req);
        this.groupSQL = new GroupSQL_1.GroupSQL(req);
        this.userGroupSQL = new UserGroupSQL_1.UserGroupSQL(req);
    }
    /**
     * Получить стартовые данные для работы страницы
     * @param data
     */
    async init(data) {
        data = V.init(this.req, data);
        let ok = this.errorSys.isOk();
        let iOffset = data.offset;
        let iLimit = data.limit;
        let aFilter = {};
        if (ok) { // Формируем параметры фильтрации
            if (data.search_surname) {
                aFilter.search_surname = data.search_surname;
            }
            else {
                this.errorSys.devNotice('search_surname', 'Поиск по ФИО отсутствует');
            }
            if (data.search_username) {
                aFilter.search_username = data.search_username;
            }
            else {
                this.errorSys.devNotice('search_username', 'Поиск по логину отсутствует');
            }
        }
        let aUserList = null;
        if (ok) { // Получить список пользователей
            aUserList = await this.userSQL.getUserList(iOffset, iLimit, aFilter);
        }
        let aGroupList = null;
        if (ok) { // Получить список пользователей
            aGroupList = await this.groupSQL.getAllGroups();
        }
        let out = null;
        if (ok) { // Формирование ответа
            out = {
                is_init: true,
                count_user: 100,
                list_user: aUserList,
                list_group: aGroupList // Список всех групп
            };
        }
        return out;
    }
    /**
     * Выбрать пользователя
     *
     * @param array data
     * @return array|null
     */
    async selectUser(data) {
        data = V.selectUser(this.req, data);
        let ok = this.errorSys.isOk();
        let idUser = data.id_user;
        let vUser = null;
        if (ok) { // Получить список пользователей
            vUser = await this.userSQL.getUserByID(idUser);
        }
        let aUserGroups = null;
        if (ok) { // Получить список ролей пользователя
            aUserGroups = await this.userGroupSQL.getUserGroupsByUserID(idUser);
        }
        let out = null;
        if (ok) { // Формирование ответа
            out = {
                one_user: vUser,
                list_user_group: aUserGroups
            };
        }
        return out;
    }
    // =======================================
    /**
     * Выбрать группу
     *
     * @param array data
     * @return array|null
     */
    async selectGroup(data) {
        data = V.selectGroup(this.req, data);
        let ok = this.errorSys.isOk();
        let idGroup = data.id_group;
        let oneGroup = null;
        if (ok) { // Получить список ролей пользователя
            oneGroup = await this.groupSQL.getGroupByID(idGroup);
        }
        let out = null;
        if (ok) { // Формирование ответа
            out = {
                one_group: oneGroup
            };
        }
        return out;
    }
    /**
     * Добавить пользователя в группу - Добавить Роль
     *
     * @param array data
     * @return array|null
     */
    async addUserToGroup(data) {
        data = V.addUserToGroup(this.req, data);
        let ok = this.errorSys.isOk();
        let idUser = data.id_user;
        let idGroup = data.id_group;
        let idAddUserToGroup = 0; // ID Связи между пользователем и группой
        if (ok) { // Получить список ролей пользователя
            idAddUserToGroup = await this.userGroupSQL.addUserToGroup(idUser, idGroup);
        }
        let aUserGroups = null;
        if (ok) { // Получить список ролей пользователя
            aUserGroups = await this.userGroupSQL.getUserGroupsByUserID(idUser);
        }
        let out = null;
        if (ok) { // Формирование ответа
            out = {
                add_user_to_group: idAddUserToGroup,
                list_user_group: aUserGroups
            };
        }
        return out;
    }
    /**
     * Удалить пользователя из группы - Убрать Роль
     *
     * @param array data
     * @return array|null
     */
    async delUserFromGroup(data) {
        data = V.delUserFromGroup(this.req, data);
        let ok = this.errorSys.isOk();
        let idUser = data.id_user;
        let idGroup = data.id_group;
        let bDelUserFromGroup = false;
        if (ok) { // Получить список ролей пользователя
            bDelUserFromGroup = await this.userGroupSQL.delUserFromGroup(idUser, idGroup);
        }
        let aUserGroups = null;
        if (ok) { // Получить список ролей пользователя
            aUserGroups = await this.userGroupSQL.getUserGroupsByUserID(idUser);
        }
        let out = null;
        if (ok) { // Формирование ответа
            out = {
                del_user_from_group: bDelUserFromGroup,
                list_user_group: aUserGroups
            };
        }
        return out;
    }
    async addUser(data) {
        data = V.addUser(this.req, data);
        let ok = this.errorSys.isOk();
        // --------------------------
        let sToken = null;
        if (ok) { // Регистрируем пользователя
            sToken = await this.userSQL.faRegister(data);
            if (!sToken) {
                this.errorSys.error('register', 'Не удалось зарегистрировать пользователя');
            }
        }
        // --------------------------
        let vUserIDs = null;
        if (ok) { // Получить идентификаторы пользователя
            vUserIDs = await this.userSQL.getUserIDsByToken(sToken);
            if (!vUserIDs) {
                ok = false;
                this.errorSys.error('id_users', 'Не удалось получить идентификаторы пользователя');
            }
        }
        // --------------------------
        let bAddUser = false;
        if (ok) { // Подтвердить регистрацию
            bAddUser = await this.userSQL.faConfirmRegisterByID(vUserIDs.id);
            if (!bAddUser) {
                ok = false;
                this.errorSys.error('confirm_user', 'Не удалось получить подтвердить регистрацию');
            }
        }
        // --------------------------
        let listUser = null;
        if (ok) { // Получить список пользователей
            listUser = await this.userSQL.getUserList(0, 100, {});
        }
        // --------------------------
        let vUser = null;
        if (ok) { // Получить список пользователей
            vUser = await this.userSQL.getUserByID(vUserIDs.id);
        }
        // --------------------------
        let out = null;
        if (ok) { // Формирование ответа
            out = {
                add_user: vUserIDs.id,
                one_user: vUser,
                list_user: listUser // Список пользователей
            };
        }
        return out;
    }
    /**
 *
 * @param data Удалить пользователя
 */
    async saveUser(data) {
        data = V.saveUser(this.req, data);
        let ok = this.errorSys.isOk();
        let idUser = data.id_user;
        let bSaveUser = false;
        if (ok) { // Подтвердить регистрацию
            bSaveUser = await this.userSQL.faUpdate(idUser, data);
        }
        // --------------------------
        let vUser = null;
        if (ok) { // Получить список пользователей
            vUser = await this.userSQL.getUserByID(idUser);
        }
        // --------------------------
        let listUser = null;
        if (ok) { // Получить список пользователей
            listUser = await this.userSQL.getUserList(0, 100, {});
        }
        // --------------------------
        let out = null;
        if (ok) { // Формирование ответа
            out = {
                save_user: bSaveUser,
                one_user: vUser,
                list_user: listUser // Список пользователей
            };
        }
        return out;
    }
    /**
     *
     * @param data Удалить пользователя
     */
    async delUser(data) {
        data = V.delUser(this.req, data);
        let ok = this.errorSys.isOk();
        let idUser = data.id_user;
        let bDelUser = false;
        if (ok) { // Подтвердить регистрацию
            bDelUser = await this.userSQL.faDelUser(idUser);
        }
        // --------------------------
        let listUser = null;
        if (ok) { // Получить список пользователей
            listUser = await this.userSQL.getUserList(0, 100, {});
        }
        // --------------------------
        let out = null;
        if (ok) { // Формирование ответа
            out = {
                del_user: bDelUser,
                list_user: listUser // Список пользователей
            };
        }
        return out;
    }
}
exports.AdminEditUserM = AdminEditUserM;
//# sourceMappingURL=AdminEditUserM.js.map