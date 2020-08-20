"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express = require('express');
// Подключение системных классов
// Подключение системных моделей
const AdminEditUserM_1 = require("./AdminEditUserM");
const BaseCtrl_1 = __importDefault(require("../../System/BaseCtrl"));
const AdminEditUserR_1 = require("./AdminEditUserR");
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
router.post(AdminEditUserR_1.AdminEditUserR.init.route, async (req, res, next) => {
    const ctrl = new AdminUserController(req, res);
    await ctrl.faInit();
    await ctrl.faAction(AdminEditUserR_1.AdminEditUserR.init.action, () => {
        return ctrl.adminEditUserM.init(req.body);
    });
});
/**
 * Выбрать пользователя
 */
router.post(AdminEditUserR_1.AdminEditUserR.selectUser.route, async (req, res, next) => {
    const ctrl = new AdminUserController(req, res);
    await ctrl.faInit();
    await ctrl.faAction(AdminEditUserR_1.AdminEditUserR.selectUser.action, () => {
        return ctrl.adminEditUserM.selectUser(req.body);
    });
});
/**
 * Выбрать группу
 */
router.post(AdminEditUserR_1.AdminEditUserR.selectGroup.route, async (req, res, next) => {
    const ctrl = new AdminUserController(req, res);
    await ctrl.faInit();
    await ctrl.faAction(AdminEditUserR_1.AdminEditUserR.selectGroup.action, () => {
        return ctrl.adminEditUserM.selectGroup(req.body);
    });
});
/**
 * Добавить пользователя к группе
 */
router.post(AdminEditUserR_1.AdminEditUserR.addUserToGroup.route, async (req, res, next) => {
    const ctrl = new AdminUserController(req, res);
    await ctrl.faInit();
    await ctrl.faAction(AdminEditUserR_1.AdminEditUserR.addUserToGroup.action, () => {
        return ctrl.adminEditUserM.addUserToGroup(req.body);
    });
});
/**
 * Удалить пользователя из группы
 */
router.post(AdminEditUserR_1.AdminEditUserR.delUserFromGroup.route, async (req, res, next) => {
    const ctrl = new AdminUserController(req, res);
    await ctrl.faInit();
    await ctrl.faAction(AdminEditUserR_1.AdminEditUserR.delUserFromGroup.action, () => {
        return ctrl.adminEditUserM.delUserFromGroup(req.body);
    });
});
/**
 * Добавить пользователя
 */
router.post(AdminEditUserR_1.AdminEditUserR.addUser.route, async (req, res, next) => {
    const ctrl = new AdminUserController(req, res);
    await ctrl.faInit();
    await ctrl.faAction(AdminEditUserR_1.AdminEditUserR.addUser.action, () => {
        return ctrl.adminEditUserM.addUser(req.body);
    });
});
/**
 * Удалить пользователя
 */
router.post(AdminEditUserR_1.AdminEditUserR.delUser.route, async (req, res, next) => {
    const ctrl = new AdminUserController(req, res);
    await ctrl.faInit();
    await ctrl.faAction(AdminEditUserR_1.AdminEditUserR.delUser.action, () => {
        return ctrl.adminEditUserM.delUser(req.body);
    });
});
/**
 * Сохранить пользователя
 */
router.post(AdminEditUserR_1.AdminEditUserR.saveUser.route, async (req, res, next) => {
    const ctrl = new AdminUserController(req, res);
    await ctrl.faInit();
    await ctrl.faAction(AdminEditUserR_1.AdminEditUserR.delUser.action, () => {
        return ctrl.adminEditUserM.saveUser(req.body);
    });
});
//# sourceMappingURL=AdminEditUserCtrl.js.map