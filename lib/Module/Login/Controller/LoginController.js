"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const System_1 = require("../../../Namespace/System");
const express = require('express');
const router = express.Router();
exports.router = router;
const V = require("../Validator/LoginV");
const LoginM_1 = require("../Model/LoginM");
/**
 * Контроллер
 */
class UserController extends System_1.BaseCtrl {
    /**
     * Конструктор
     *
     * @param req
     * @param res
     */
    async faInit() {
        // Инициализация бизнес моделей
        this.loginM = new LoginM_1.LoginM(this.req);
    }
}
exports.UserController = UserController;
/**
 * INIT
 */
router.post(V.init.route, async (req, res, next) => {
    const ctrl = new UserController(req, res);
    await ctrl.faInit();
    await ctrl.userSys.isAuth(); // Пробуем авторизироваться
    await ctrl.faAction('Страница логин', () => {
        return ctrl.loginM.init(req.body);
    });
});
/**
 * Войти в систему
 */
router.post(V.login.route, async (req, res, next) => {
    const ctrl = new UserController(req, res);
    await ctrl.faInit();
    await ctrl.faAction('Войти в систему', () => {
        return ctrl.loginM.login(req.body);
    });
});
/**
 * Зарегистрироваться
 */
router.post(V.register.route, async (req, res, next) => {
    const ctrl = new UserController(req, res);
    await ctrl.faInit();
    await ctrl.faAction('Зарегистрироваться', () => {
        return ctrl.loginM.register(req.body);
    });
});
//# sourceMappingURL=LoginController.js.map