"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
// Подключение системных классов
// Подключение системных моделей
const UserM_1 = require("../Model/UserM");
const GroupM_1 = require("../Model/GroupM");
const CtrlAccessM_1 = require("../Model/CtrlAccessM");
const AccessGroupM_1 = require("../Model/AccessGroupM");
const BaseCtrl_1 = require("../../../System/BaseCtrl");
const router = express.Router();
exports.router = router;
/**
 * API для Админки
 * Редактирование и управление пользователями, а так-же их правами
 */
class AdminUserController extends BaseCtrl_1.default {
    /**
     * Конструктор
     *
     * @param req
     * @param res
     */
    static async Init(req, res) {
        const self = new AdminUserController(req, res);
        // Инициализация бизнес моделей
        self.userM = new UserM_1.UserM(req);
        self.groupM = new GroupM_1.GroupM(req);
        self.ctrlAccessM = new CtrlAccessM_1.CtrlAccessM(req);
        self.accessGroupM = new AccessGroupM_1.AccessGroupM(req);
        //==================================================
        // Проверка авторизации
        await self.userSys.isAuth();
        // Проверка права доступа на модуль
        await self.userSys.isAccessCtrl('admin_user');
        // Проверка являетесь ли вы администратором
        self.userSys.isAdmin();
        return self;
    }
}
AdminUserController.sBaseUrl = '/api/admin/user'; // базовый путь api-методов для контролера
// ==========================================
// SELECT
// ==========================================
/**
 * Получить список пользователей
 */
router.post(AdminUserController.sBaseUrl + '/get-users', async (req, res, next) => {
    let self = await AdminUserController.Init(req, res);
    let ok = self.userSys.isAccessRead(); // Проверка доступа
    let out = null;
    if (ok) { // Получаем список пользователей
        try {
            out = await self.userM.getUserList(req.body);
        }
        catch (e) {
            self.errorSys.errorEx(e, 'fatal_error', 'Фатальная ошибка');
        }
    }
    res.send(self.responseSys.response(out, 'Список пользователей'));
    // res.send(JSON.stringify(req.body, null,2));
});
/*
 * Получить одного пользователя
 */
router.post(AdminUserController.sBaseUrl + '/get-user', async (req, res, next) => {
    let self = await AdminUserController.Init(req, res);
    let ok = self.userSys.isAccessRead(); // Проверка доступа
    let out = null;
    if (ok) { // Получаем пользователя по ID
        try {
            out = await self.userM.getUserByID(req.body);
        }
        catch (e) {
            self.errorSys.errorEx(e, 'fatal_error', 'Фатальная ошибка');
        }
    }
    res.send(self.responseSys.response(out, 'Информация о пользователе'));
});
/**
 * Получить Краткаю информацию по группе
 */
router.post(AdminUserController.sBaseUrl + '/get-group', async (req, res, next) => {
    let self = await AdminUserController.Init(req, res);
    let ok = self.userSys.isAccessRead(); // Проверка доступа
    let out = null;
    if (ok) { // Получаем группу по ID
        try {
            out = await self.groupM.getGroupByID(req.body);
        }
        catch (e) {
            self.errorSys.errorEx(e, 'fatal_error', 'Фатальная ошибка');
        }
    }
    res.send(self.responseSys.response(out, 'Краткая информация по группе'));
});
/**
 * Получить краткую информацию по контроллеру доступа
 */
router.post(AdminUserController.sBaseUrl + '/get-ctrl-access', async (req, res, next) => {
    let self = await AdminUserController.Init(req, res);
    let ok = self.userSys.isAccessRead(); // Проверка доступа
    let out = null;
    if (ok) { // Получаем контроль доступа по ID
        try {
            out = await self.ctrlAccessM.getCtrlAccessByAlias(req.body);
        }
        catch (e) {
            self.errorSys.errorEx(e, 'fatal_error', 'Фатальная ошибка');
        }
    }
    res.send(self.responseSys.response(out, 'Краткая информация по контроллеру доступа'));
});
/**
 * @Route("/api/admin/user/get-user-groups", name="api__admin__user__get_user_groups")
 */
router.post(AdminUserController.sBaseUrl + '/get-user-groups', async (req, res, next) => {
    let self = await AdminUserController.Init(req, res);
    let ok = self.userSys.isAccessRead(); // Проверка доступа
    let out = null;
    if (ok) { // Получаем роли по ID пользователя
        try {
            out = await self.userM.getUserGroupsByUserID(req.body);
        }
        catch (e) {
            self.errorSys.errorEx(e, 'fatal_error', 'Фатальная ошибка');
        }
    }
    res.send(self.responseSys.response(out, 'Роли доступные пользователю'));
});
/**
 * Получить список модулей доступных группе
 *
 * @Route("/api/admin/user/get-ctrl-access-of-group", name="api__admin__user__get_ctrl_access_of_group")
 */
router.post(AdminUserController.sBaseUrl + '/get-ctrl-access-of-group', async (req, res, next) => {
    let self = await AdminUserController.Init(req, res);
    let ok = self.userSys.isAccessRead(); // Проверка доступа
    let out = null;
    if (ok) { // Получаем модули доступные группе по ID группы
        try {
            out = await self.accessGroupM.getCtrlAccessOfGroupByID(req.body);
        }
        catch (e) {
            self.errorSys.errorEx(e, 'fatal_error', 'Фатальная ошибка');
        }
    }
    res.send(self.responseSys.response(out, 'Модули доступные группе'));
});
/**
 * @Route("/api/admin/user/get-group-list", name="api__admin__user_get_group_list")
 */
router.post(AdminUserController.sBaseUrl + '/get-group-list', async (req, res, next) => {
    let self = await AdminUserController.Init(req, res);
    let ok = self.userSys.isAccessRead(); // Проверка доступа
    let out = null;
    if (ok) { // Получаем весь список ролей
        try {
            out = await self.groupM.getAllGroups(req.body);
        }
        catch (e) {
            self.errorSys.errorEx(e, 'fatal_error', 'Фатальная ошибка');
        }
    }
    res.send(self.responseSys.response(out, 'Все Роли/Группы пользователей'));
});
/**
 * @Route("/api/admin/user/get-ctrl-access-list", name="api__admin__user_get_ctrl_access_list")
 */
router.post(AdminUserController.sBaseUrl + '/get-ctrl-access-list', async (req, res, next) => {
    let self = await AdminUserController.Init(req, res);
    let ok = self.userSys.isAccessRead(); // Проверка доступа
    let out = null;
    if (ok) { // Получаем весь список ролей
        try {
            out = await self.ctrlAccessM.getAllCtrlAccess(req.body);
        }
        catch (e) {
            self.errorSys.errorEx(e, 'fatal_error', 'Фатальная ошибка');
        }
    }
    res.send(self.responseSys.response(out, 'Все контроллеры'));
});
// ====================================================
// UPDATE
// ====================================================
/**
 * @Route("/api/admin/user/save-group", name="api__admin__user__save_group")
 */
router.post(AdminUserController.sBaseUrl + '/save-group', async (req, res, next) => {
    let self = await AdminUserController.Init(req, res);
    let ok = self.userSys.isAccessUpdate(); // Проверка доступа
    let out = null;
    if (ok) { // сохраняем данные группы
        try {
            out = await self.groupM.saveGroup(req.body);
        }
        catch (e) {
            self.errorSys.errorEx(e, 'fatal_error', 'Фатальная ошибка');
        }
    }
    res.send(self.responseSys.response(out, 'Данные группы сохраненны'));
});
/**
 * @Route("/api/admin/user/save-ctrl-access", name="api__admin__user__save_ctrl_access")
 */
router.post(AdminUserController.sBaseUrl + '/save-ctrl-access', async (req, res, next) => {
    let self = await AdminUserController.Init(req, res);
    let ok = self.userSys.isAccessUpdate(); // Проверка доступа
    let out = null;
    if (ok) { // сохраняем данные контроллера доступа
        try {
            out = await self.ctrlAccessM.saveCtrlAccess(req.body);
        }
        catch (e) {
            self.errorSys.errorEx(e, 'fatal_error', 'Фатальная ошибка');
        }
    }
    res.send(self.responseSys.response(out, 'Сохранены данные контроллера доступа к модулю'));
});
/**
 * @Route("/api/admin/user/save-access-group", name="api__admin__user__save_access_group")
 */
router.post(AdminUserController.sBaseUrl + '/save-access-group', async (req, res, next) => {
    let self = await AdminUserController.Init(req, res);
    let ok = self.userSys.isAccessUpdate(); // Проверка доступа
    let out = null;
    if (ok) { // сохраняем/изменяем доступы группы к модулю
        try {
            out = await self.accessGroupM.saveAccessGroup(req.body);
        }
        catch (e) {
            self.errorSys.errorEx(e, 'fatal_error', 'Фатальная ошибка');
        }
    }
    res.send(self.responseSys.response(out, 'Изменены параметры доступа к модулю'));
});
// ========================================================
// INSERT
// ========================================================
/**
 * @Route("/api/admin/user/add-ctrl-access", name="api__admin__user__add_ctrl_access")
 */
router.post(AdminUserController.sBaseUrl + '/add-ctrl-access', async (req, res, next) => {
    let self = await AdminUserController.Init(req, res);
    let ok = self.userSys.isAccessCreate(); // Проверка доступа
    let out = null;
    if (ok) { // Добавляем пользователя
        try {
            out = await self.ctrlAccessM.addCtrlAccess(req.body);
        }
        catch (e) {
            self.errorSys.errorEx(e, 'fatal_error', 'Фатальная ошибка');
        }
    }
    res.send(self.responseSys.response(out, 'Добавлен alias контроллера'));
});
/**
 * @Route("/api/admin/user/add-user-to-group", name="api__admin__user__add_user_to_group")
 */
router.post(AdminUserController.sBaseUrl + '/add-user-to-group', async (req, res, next) => {
    let self = await AdminUserController.Init(req, res);
    let ok = self.userSys.isAccessCreate(); // Проверка доступа
    let out = null;
    if (ok) { // Добавляем пользователя
        try {
            out = await self.userM.addUserToGroup(req.body);
        }
        catch (e) {
            self.errorSys.errorEx(e, 'fatal_error', 'Фатальная ошибка');
        }
    }
    res.send(self.responseSys.response(out, 'Добавлена роль пользователю'));
});
/**
 * @Route("/api/admin/user/add-ctrl-access-to-group", name="api__admin__user__add_ctrl_access_to_group")
 */
router.post(AdminUserController.sBaseUrl + '/add-ctrl-access-to-group', async (req, res, next) => {
    let self = await AdminUserController.Init(req, res);
    let ok = self.userSys.isAccessCreate(); // Проверка доступа
    let out = null;
    if (ok) { // Добавляем доступ группы к модулю
        try {
            out = await self.accessGroupM.addCtrlAccessToGroup(req.body);
        }
        catch (e) {
            self.errorSys.errorEx(e, 'fatal_error', 'Фатальная ошибка');
        }
    }
    res.send(self.responseSys.response(out, 'Группе добавлен доступ к модулю'));
});
// ==========================================================
// DELETE
// ==========================================================
/**
 * @Route("/api/admin/user/del-user-from-group", name="api__admin__user__del_user_from_group")
 */
router.post(AdminUserController.sBaseUrl + '/del-user-from-group', async (req, res, next) => {
    let self = await AdminUserController.Init(req, res);
    let ok = self.userSys.isAccessDelete(); // Проверка доступа
    let out = null;
    if (ok) { // Удаляем пользователя
        try {
            out = await self.userM.delUserFromGroup(req.body);
        }
        catch (e) {
            self.errorSys.errorEx(e, 'fatal_error', 'Фатальная ошибка');
        }
    }
    res.send(self.responseSys.response(out, 'Удалена роль у пользователя'));
});
/**
 * @Route("/api/admin/user/del-ctrl-access", name="api__admin__user__del_ctrl_access")
 */
router.post(AdminUserController.sBaseUrl + '/del-ctrl-access', async (req, res, next) => {
    let self = await AdminUserController.Init(req, res);
    let ok = self.userSys.isAccessDelete(); // Проверка доступа
    let out = null;
    if (ok) { // Удаляем пользователя
        try {
            out = await self.ctrlAccessM.delCtrlAccess(req.body);
        }
        catch (e) {
            self.errorSys.errorEx(e, 'fatal_error', 'Фатальная ошибка');
        }
    }
    res.send(self.responseSys.response(out, 'Удален контроллер доступа'));
});
/**
 * @Route("/api/admin/user/del-ctrl-access-from-group", name="api__admin__user__del_ctrl_access_from_group")
 */
router.post(AdminUserController.sBaseUrl + '/del-ctrl-access-from-group', async (req, res, next) => {
    let self = await AdminUserController.Init(req, res);
    let ok = self.userSys.isAccessDelete(); // Проверка доступа
    let out = null;
    if (ok) { // Удаляем доступ группы к модулю
        try {
            out = await self.accessGroupM.delCtrlAccessFromGroup(req.body);
        }
        catch (e) {
            self.errorSys.errorEx(e, 'fatal_error', 'Фатальная ошибка');
        }
    }
    res.send(self.responseSys.response(out, 'Группе удален доступ к модулю'));
});
//# sourceMappingURL=AdminUserController.js.map