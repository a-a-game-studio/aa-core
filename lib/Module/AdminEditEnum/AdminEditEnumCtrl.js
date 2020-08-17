"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express = require('express');
// Подключение системных моделей
const AdminEditEnumM_1 = require("./AdminEditEnumM");
const BaseCtrl_1 = __importDefault(require("../../System/BaseCtrl"));
const AdminEditEnumR_1 = require("./AdminEditEnumR");
var R = AdminEditEnumR_1.AdminEditEnumR;
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
        this.adminEditUserM = new AdminEditEnumM_1.AdminEditEnumM(this.req);
        //==================================================
        // Проверка авторизации
        await this.userSys.isAuth();
        // Проверка права доступа на модуль
        await this.userSys.isAccessCtrl('admin-edit-user');
        // Проверка являетесь ли вы администратором
        this.userSys.isAdmin();
    }
}
router.post(R.init.route, async (req, res, next) => {
    const ctrl = new Ctrl(req, res);
    await ctrl.faInit();
    await ctrl.faAction('INIT', () => {
        return ctrl.adminEditUserM.init(req.body);
    });
});
router.post(R.getEnumTreeType.route, async (req, res, next) => {
    const ctrl = new Ctrl(req, res);
    await ctrl.faInit();
    await ctrl.faAction('Получить enum дерево типов', () => {
        return ctrl.adminEditUserM.getEnumTreeType(req.body);
    });
});
router.post(R.selectEnum.route, async (req, res, next) => {
    const ctrl = new Ctrl(req, res);
    await ctrl.faInit();
    await ctrl.faAction('Выбрать enum', () => {
        return ctrl.adminEditUserM.selectEnum(req.body);
    });
});
router.post(R.selectEnumParam.route, async (req, res, next) => {
    const ctrl = new Ctrl(req, res);
    await ctrl.faInit();
    await ctrl.faAction('Выбрать enum параметр', () => {
        return ctrl.adminEditUserM.selectEnumParam(req.body);
    });
});
router.post(R.delEnumParam.route, async (req, res, next) => {
    const ctrl = new Ctrl(req, res);
    await ctrl.faInit();
    await ctrl.faAction('Удалить параметр enum', () => {
        return ctrl.adminEditUserM.delEnumParam(req.body);
    });
});
router.post(R.addEnum.route, async (req, res, next) => {
    const ctrl = new Ctrl(req, res);
    await ctrl.faInit();
    await ctrl.faAction('Добавить enum', () => {
        return ctrl.adminEditUserM.addEnum(req.body);
    });
});
router.post(R.delEnum.route, async (req, res, next) => {
    const ctrl = new Ctrl(req, res);
    await ctrl.faInit();
    await ctrl.faAction('Удалить enum', () => {
        return ctrl.adminEditUserM.delEnum(req.body);
    });
});
router.post(R.delEnumParam.route, async (req, res, next) => {
    const ctrl = new Ctrl(req, res);
    await ctrl.faInit();
    await ctrl.faAction('Удалить enum параметр', () => {
        return ctrl.adminEditUserM.delEnumParam(req.body);
    });
});
router.post(R.saveEnum.route, async (req, res, next) => {
    const ctrl = new Ctrl(req, res);
    await ctrl.faInit();
    await ctrl.faAction('Сохранить enum', () => {
        return ctrl.adminEditUserM.saveEnum(req.body);
    });
});
router.post(R.saveEnumParam.route, async (req, res, next) => {
    const ctrl = new Ctrl(req, res);
    await ctrl.faInit();
    await ctrl.faAction('Сохранить enum параметр', () => {
        return ctrl.adminEditUserM.saveEnumParam(req.body);
    });
});
router.post(R.addEnumParam.route, async (req, res, next) => {
    const ctrl = new Ctrl(req, res);
    await ctrl.faInit();
    await ctrl.faAction('Добавить enum параметр', () => {
        return ctrl.adminEditUserM.addEnumParam(req.body);
    });
});
//# sourceMappingURL=AdminEditEnumCtrl.js.map