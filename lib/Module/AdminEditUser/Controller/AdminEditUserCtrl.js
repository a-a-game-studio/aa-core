"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
// Подключение системных классов
// Подключение системных моделей
const AdminEditUserM_1 = require("../Model/AdminEditUserM");
const BaseCtrl_1 = require("../../../System/BaseCtrl");
const V = require("../Validator/AdminEditUserV");
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
    async faInit() {
        // Инициализация бизнес моделей
        this.adminEditUserM = new AdminEditUserM_1.AdminEditUserM(this.req);
        //==================================================
        // Проверка авторизации
        await this.userSys.isAuth();
        // Проверка права доступа на модуль
        await this.userSys.isAccessCtrl('admin-edit-user');
        // Проверка являетесь ли вы администратором
        this.userSys.isAdmin();
    }
}
/**
 * INIT
 */
router.post(V.init.route, async (req, res, next) => {
    const ctrl = new AdminUserController(req, res);
    await ctrl.faInit();
    await ctrl.faAction(V.init.action, () => {
        return ctrl.adminEditUserM.init(req.body);
    });
});
/**
 * Выбрать пользователя
 */
router.post(V.selectUser.route, async (req, res, next) => {
    const ctrl = new AdminUserController(req, res);
    await ctrl.faInit();
    await ctrl.faAction(V.selectUser.action, () => {
        return ctrl.adminEditUserM.selectUser(req.body);
    });
});
/**
 * Выбрать группу
 */
router.post(V.selectGroup.route, async (req, res, next) => {
    const ctrl = new AdminUserController(req, res);
    await ctrl.faInit();
    await ctrl.faAction(V.selectGroup.action, () => {
        return ctrl.adminEditUserM.selectGroup(req.body);
    });
});
/**
 * Добавить пользователя к группе
 */
router.post(V.addUserToGroup.route, async (req, res, next) => {
    const ctrl = new AdminUserController(req, res);
    await ctrl.faInit();
    await ctrl.faAction(V.addUserToGroup.action, () => {
        return ctrl.adminEditUserM.addUserToGroup(req.body);
    });
});
/**
 * Удалить пользователя из группы
 */
router.post(V.delUserFromGroup.route, async (req, res, next) => {
    const ctrl = new AdminUserController(req, res);
    await ctrl.faInit();
    await ctrl.faAction(V.delUserFromGroup.action, () => {
        return ctrl.adminEditUserM.delUserFromGroup(req.body);
    });
});
/**
 * Добавить пользователя
 */
router.post(V.addUser.route, async (req, res, next) => {
    const ctrl = new AdminUserController(req, res);
    await ctrl.faInit();
    await ctrl.faAction(V.addUser.action, () => {
        return ctrl.adminEditUserM.addUser(req.body);
    });
});
/**
 * Удалить пользователя
 */
router.post(V.delUser.route, async (req, res, next) => {
    const ctrl = new AdminUserController(req, res);
    await ctrl.faInit();
    await ctrl.faAction(V.delUser.action, () => {
        return ctrl.adminEditUserM.delUser(req.body);
    });
});
/**
 * Сохранить пользователя
 */
router.post(V.saveUser.route, async (req, res, next) => {
    const ctrl = new AdminUserController(req, res);
    await ctrl.faInit();
    await ctrl.faAction(V.delUser.action, () => {
        return ctrl.adminEditUserM.saveUser(req.body);
    });
});
//# sourceMappingURL=AdminEditUserCtrl.js.map