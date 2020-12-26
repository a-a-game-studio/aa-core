"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
// Подключение системных моделей
const AdminEditGroupM_1 = require("./AdminEditGroupM");
const BaseCtrl_1 = __importDefault(require("../../System/BaseCtrl"));
const AdminEditGroupR_1 = require("./AdminEditGroupR");
var R = AdminEditGroupR_1.AdminEditGroupR;
const router = express.Router();
exports.router = router;
/**
 * API для Админки
 * Редактирование и управление пользователями, а так-же их правами
 */
class Ctrl extends BaseCtrl_1.default {
    /**
     * Конструктор
     *
     * @param req
     * @param res
     */
    async faInit() {
        // Инициализация бизнес моделей
        this.adminEditUserM = new AdminEditGroupM_1.AdminEditGroupM(this.req);
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
    const ctrl = new Ctrl(req, res);
    await ctrl.faInit();
    await ctrl.faAction(R.init.action, () => {
        return ctrl.adminEditUserM.init(req.body);
    });
});
/**
 * Выбрать группу
 */
router.post(R.selectGroup.route, async (req, res, next) => {
    const ctrl = new Ctrl(req, res);
    await ctrl.faInit();
    await ctrl.faAction(R.selectGroup.action, () => {
        return ctrl.adminEditUserM.selectGroup(req.body);
    });
});
/**
 * Выбрать контроллер доступа
 */
router.post(R.selectCtrlAccess.route, async (req, res, next) => {
    const ctrl = new Ctrl(req, res);
    await ctrl.faInit();
    await ctrl.faAction(R.selectCtrlAccess.action, () => {
        return ctrl.adminEditUserM.selectCtrlAccess(req.body);
    });
});
/**
 * Добавить контроллер доступа группе
 */
router.post(R.addCtrlAccessToGroup.route, async (req, res, next) => {
    const ctrl = new Ctrl(req, res);
    await ctrl.faInit();
    await ctrl.faAction(R.addCtrlAccessToGroup.action, () => {
        return ctrl.adminEditUserM.addCtrlAccessToGroup(req.body);
    });
});
/**
 * Удалить контроллер из группы
 */
router.post(R.delCtrlAccessFromGroup.route, async (req, res, next) => {
    const ctrl = new Ctrl(req, res);
    await ctrl.faInit();
    await ctrl.faAction(R.delCtrlAccessFromGroup.action, () => {
        return ctrl.adminEditUserM.delCtrlAccessFromGroup(req.body);
    });
});
/**
 * Добавить группу
 */
router.post(R.addGroup.route, async (req, res, next) => {
    const ctrl = new Ctrl(req, res);
    await ctrl.faInit();
    await ctrl.faAction(R.addGroup.action, () => {
        return ctrl.adminEditUserM.addGroup(req.body);
    });
});
/**
 * Удалить группу
 */
router.post(R.delGroup.route, async (req, res, next) => {
    const ctrl = new Ctrl(req, res);
    await ctrl.faInit();
    await ctrl.faAction(R.delGroup.action, () => {
        return ctrl.adminEditUserM.delGroup(req.body);
    });
});
/**
 * Сохранить группу
 */
router.post(R.saveGroup.route, async (req, res, next) => {
    const ctrl = new Ctrl(req, res);
    await ctrl.faInit();
    await ctrl.faAction(R.saveGroup.action, () => {
        return ctrl.adminEditUserM.saveGroup(req.body);
    });
});
/**
 * Сохранить контроллер доступа
 */
router.post(R.saveCtrlAccess.route, async (req, res, next) => {
    const ctrl = new Ctrl(req, res);
    await ctrl.faInit();
    await ctrl.faAction(R.saveCtrlAccess.action, () => {
        return ctrl.adminEditUserM.saveCtrlAccess(req.body);
    });
});
/**
 * Добавить контроллер доступа
 */
router.post(R.addCtrlAccess.route, async (req, res, next) => {
    const ctrl = new Ctrl(req, res);
    await ctrl.faInit();
    await ctrl.faAction(R.addCtrlAccess.action, () => {
        return ctrl.adminEditUserM.addCtrlAccess(req.body);
    });
});
//# sourceMappingURL=AdminEditGroupCtrl.js.map