"use strict";
//import * as _ from 'lodash';
Object.defineProperty(exports, "__esModule", { value: true });
// SQL Запросы
const UserSQL_1 = require("../Infrastructure/SQL/Repository/UserSQL");
const UserTokenSQL_1 = require("../Infrastructure/SQL/Repository/UserTokenSQL");
const UserGroupSQL_1 = require("../Infrastructure/SQL/Repository/UserGroupSQL");
const AccessGroupSQL_1 = require("../Infrastructure/SQL/Repository/AccessGroupSQL");
const CtrlAccessSQL_1 = require("../Infrastructure/SQL/Repository/CtrlAccessSQL");
/**
 * Клас который глобально знает все данные пользователя
 */
class UserSys {
    constructor(req) {
        this.bAuth = false; // Статус авторизирован пользователь или нет
        this.req = req;
        this.errorSys = req.sys.errorSys;
        this.userSQL = new UserSQL_1.UserSQL(req);
        this.userGroupSQL = new UserGroupSQL_1.UserGroupSQL(req);
        this.accessGroupSQL = new AccessGroupSQL_1.AccessGroupSQL(req);
        this.ctrlAccessSQL = new CtrlAccessSQL_1.CtrlAccessSQL(req);
        this.userTokenSQL = new UserTokenSQL_1.UserTokenSQL(req);
        this.ctrlAccessList = {};
        this.userGroupsList = {};
        this.accessCRUDList = {};
        /* вылавливаем token */
        this.token = req.sys.token;
        if (!this.token) {
            this.token = '';
            this.errorSys.devWarning('token', 'token - пустой');
        }
    }
    /**
     * Инициализация данных пользователя
     * тольrо если this.isAuth() == true
     *
     * @return void
     */
    async init() {
        let ok = this.errorSys.isOk(); // По умолчанию true
        // Проверяем apikey
        this.bAuth = await this.userTokenSQL.isAuth(this.token);
        if (this.bAuth) { // Ставим в общий слой видимости флаг авторизации
            this.req.sys.bAuth = true;
        }
        let userInfoList = {};
        if (ok && this.bAuth) { // Получаем информацию о пользователе по token
            userInfoList = await this.userSQL.fGetUserInfoByToken(this.token);
            if (!userInfoList) {
                ok = false;
                this.errorSys.error('get_user_info_in_auth', 'Не возомжно получить данные пользователя при авторизации');
            }
            else {
                this.userInfoList = userInfoList;
                this.idUser = userInfoList['id_user'];
            }
        }
        let userGroupsList = {};
        if (ok && this.bAuth) { // Получаем роли пользователя
            userGroupsList = await this.userGroupSQL.getUserGroupsByUserID(this.idUser);
            if (!userGroupsList) {
                ok = false;
                this.errorSys.error('get_user_roles_in_auth', 'Не возомжно получить роли пользователя при авторизации');
            }
        }
        this.userGroupsList = {};
        if (ok && this.bAuth) { // Проиндексировать группы по: имени группы
            for (let k in userGroupsList) {
                let idGroup = userGroupsList[k]['id_group'];
                let aliasGroup = userGroupsList[k]['alias'];
                if (aliasGroup) {
                    this.userGroupsList[aliasGroup] = idGroup;
                }
            }
        }
        let ctrlAccessListTemp = {};
        if (ok) { // Получаем все модули
            ctrlAccessListTemp = await this.ctrlAccessSQL.getAllCtrlAccess();
            if (!userGroupsList) {
                ok = false;
                this.errorSys.error('get_all_ctrl_access', 'Не получилось получить список модулей');
            }
        }
        if (ok) { // Проиндексировать модули по: alias модуля
            for (let k in ctrlAccessListTemp) {
                let idCtrlAccess = ctrlAccessListTemp[k]['id'];
                let aliasCtrlAccess = ctrlAccessListTemp[k]['alias'];
                if (aliasCtrlAccess) {
                    this.ctrlAccessList[aliasCtrlAccess] = idCtrlAccess;
                }
            }
        }
    }
    /**
     * Получения доступа на контроллер
     *
     * @param string alias
     * @return boolean
     */
    async isAccessCtrl(alias) {
        let ok = true;
        if (this.ctrlAccessList[alias]) { // Проверяем существование модуля
            this.errorSys.devNotice('ctrl_access_exist', `Модуль - ${alias} найден`);
            this.idCtrlAccess = this.ctrlAccessList[alias];
            this.aliasCtrlAccess = alias;
        }
        else {
            ok = false;
            this.errorSys.error('ctrl_access_no_exist', `Модуля ${alias} - не существует`);
        }
        let idsGroupList = [];
        if (ok) { // Получаем ID групп в которых состоит пользователь
            for (let k in this.userGroupsList) {
                idsGroupList.push(this.userGroupsList[k]);
            }
        }
        let ifCtrlAccess = false;
        if (ok) { // Проверяем имеет ли пользователь доступ к модулю
            ifCtrlAccess = await this.accessGroupSQL.getAccess(idsGroupList, this.idCtrlAccess);
            if (!ifCtrlAccess) {
                ok = false;
                this.errorSys.error('get_access', 'Не возможно получить права на контрллер');
            }
        }
        let accessCRUDList = [];
        if (ok) { // Получаем CRUD права на модуль
            accessCRUDList = await this.accessGroupSQL.getAccessCRUD(idsGroupList, this.idCtrlAccess);
            if (!accessCRUDList) {
                ok = false;
                this.errorSys.error('get_access_crud', 'Не возможно получить CRUD права на контрллер');
            }
        }
        this.accessCRUDList = accessCRUDList;
        if (ifCtrlAccess) {
            this.errorSys.devNotice("ctrl_access", `Доступ к ${alias} получен`);
        }
        else {
            this.errorSys.error('ctrl_access', `У вас нет доступа к ${alias}`);
        }
        return ifCtrlAccess;
    }
    /**
     * Доступ на CRUD
     * - Создание
     *
     * @return boolean
     */
    isAccessCreate() {
        let ok = this.errorSys.isOk();
        this.errorSys.declare([
            'crud_access_list',
            'access_create'
        ]);
        if (!this.accessCRUDList) {
            ok = false;
            this.errorSys.error('crud_access_list', 'Нет списка прав');
        }
        if (ok) {
            if (this.accessCRUDList['create']) {
                this.errorSys.devNotice('access_create', "Проверка прав на create прошла успешно");
            }
            else {
                ok = false;
                this.errorSys.error('access_create', 'У вас нет прав на create');
            }
        }
        return ok;
    }
    /**
     * Доступ на CRUD
     * - Чтение
     *
     * @return boolean
     */
    isAccessRead() {
        let ok = this.errorSys.isOk();
        this.errorSys.declare([
            'crud_access_list',
            'access_read'
        ]);
        if (!this.accessCRUDList) {
            ok = false;
            this.errorSys.error('crud_access_list', 'Нет списка прав');
        }
        if (ok) {
            if (this.accessCRUDList['read']) {
                this.errorSys.devNotice('access_read', "Проверка прав на read прошла успешно");
            }
            else {
                ok = false;
                this.errorSys.error('access_read', 'У вас нет прав на read');
            }
        }
        return ok;
    }
    /**
     * Доступ на CRUD
     * - Обновление
     *
     * @return boolean
     */
    isAccessUpdate() {
        let ok = this.errorSys.isOk();
        this.errorSys.declare([
            'crud_access_list',
            'access_update'
        ]);
        if (!this.accessCRUDList) {
            ok = false;
            this.errorSys.error('crud_access_list', 'Нет списка прав');
        }
        if (ok) {
            if (this.accessCRUDList['update']) {
                this.errorSys.devNotice('access_update', "Проверка прав на update прошла успешно");
            }
            else {
                ok = false;
                this.errorSys.error('access_update', 'У вас нет прав на обновление');
            }
        }
        return ok;
    }
    /**
     * Доступ на CRUD
     * - Удаление
     *
     * @return boolean
     */
    isAccessDelete() {
        let ok = this.errorSys.isOk();
        this.errorSys.declare([
            'crud_access_list',
            'access_delete'
        ]);
        if (!this.accessCRUDList) {
            ok = false;
            this.errorSys.error('crud_access_list', 'Нет списка прав');
        }
        if (ok) {
            if (this.accessCRUDList['delete']) {
                this.errorSys.devNotice('access_delete', "Проверка прав на delete прошла успешно");
            }
            else {
                ok = false;
                this.errorSys.error('access_delete', 'У вас нет прав на delete');
            }
        }
        return ok;
    }
    /**
     * Проверка является ли пользователь администратором
     *
     * @return boolean
     */
    isAdmin() {
        let ok = this.errorSys.isOk();
        this.errorSys.declare([
            'is_admin'
        ]);
        if (ok && this.userGroupsList['admin'] || this.userGroupsList['root']) {
            this.errorSys.devNotice('is_admin', 'Вы администратор');
        }
        else {
            ok = false;
            this.errorSys.error('is_admin', 'Вы не администратор');
        }
        return ok;
    }
    /**
     * Проверка является ли пользователь авторизированным
     */
    async isAuth() {
        let ok = this.errorSys.isOk();
        this.errorSys.declare([
            'is_auth'
        ]);
        if (ok && await this.userTokenSQL.isAuth(this.token)) {
            this.errorSys.devNotice('is_auth', 'Вы авторизованы');
        }
        else {
            ok = false;
            this.errorSys.error('is_auth', 'Вы не авторизованы');
        }
        return ok;
    }
    /**
     * Получить статус авторизирован пользователь или нет
     */
    ifAuth() {
        return this.bAuth;
    }
    /**
     * возвращает token
     *
     * @return string|null
     */
    fGetApikey() {
        return this.token;
    }
    /**
     * Получить ID пользователя
     */
    getIdUser() {
        return this.idUser;
    }
}
exports.UserSys = UserSys;
//# sourceMappingURL=UserSys.js.map