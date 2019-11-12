"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
// Подключение системных классов
// Подключение системных моделей
const AdminEditUserM_1 = require("./AdminEditUserM");
const BaseCtrl_1 = __importDefault(require("../../System/BaseCtrl"));
const AdminEditUserR_1 = require("./AdminEditUserR");
var R = AdminEditUserR_1.AdminEditUserR;
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
router.post(R.init.route, async (req, res, next) => {
    const ctrl = new AdminUserController(req, res);
    await ctrl.faInit();
    await ctrl.faAction(R.init.action, () => {
        return ctrl.adminEditUserM.init(req.body);
    });
});
/**
 * Выбрать пользователя
 */
router.post(R.selectUser.route, async (req, res, next) => {
    const ctrl = new AdminUserController(req, res);
    await ctrl.faInit();
    await ctrl.faAction(R.selectUser.action, () => {
        return ctrl.adminEditUserM.selectUser(req.body);
    });
});
/**
 * Выбрать группу
 */
router.post(R.selectGroup.route, async (req, res, next) => {
    const ctrl = new AdminUserController(req, res);
    await ctrl.faInit();
    await ctrl.faAction(R.selectGroup.action, () => {
        return ctrl.adminEditUserM.selectGroup(req.body);
    });
});
/**
 * Добавить пользователя к группе
 */
router.post(R.addUserToGroup.route, async (req, res, next) => {
    const ctrl = new AdminUserController(req, res);
    await ctrl.faInit();
    await ctrl.faAction(R.addUserToGroup.action, () => {
        return ctrl.adminEditUserM.addUserToGroup(req.body);
    });
});
/**
 * Удалить пользователя из группы
 */
router.post(R.delUserFromGroup.route, async (req, res, next) => {
    const ctrl = new AdminUserController(req, res);
    await ctrl.faInit();
    await ctrl.faAction(R.delUserFromGroup.action, () => {
        return ctrl.adminEditUserM.delUserFromGroup(req.body);
    });
});
/**
 * Добавить пользователя
 */
router.post(R.addUser.route, async (req, res, next) => {
    const ctrl = new AdminUserController(req, res);
    await ctrl.faInit();
    await ctrl.faAction(R.addUser.action, () => {
        return ctrl.adminEditUserM.addUser(req.body);
    });
});
/**
 * Удалить пользователя
 */
router.post(R.delUser.route, async (req, res, next) => {
    const ctrl = new AdminUserController(req, res);
    await ctrl.faInit();
    await ctrl.faAction(R.delUser.action, () => {
        return ctrl.adminEditUserM.delUser(req.body);
    });
});
/**
 * Сохранить пользователя
 */
router.post(R.saveUser.route, async (req, res, next) => {
    const ctrl = new AdminUserController(req, res);
    await ctrl.faInit();
    await ctrl.faAction(R.delUser.action, () => {
        return ctrl.adminEditUserM.saveUser(req.body);
    });
});
//# sourceMappingURL=AdminEditUserCtrl.js.map