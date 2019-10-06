"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const System_1 = require("../../../Namespace/System");
const express = require('express');
const router = express.Router();
exports.router = router;
const UserM_1 = require("../Model/UserM");
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
    static async Init(req, res) {
        const self = new UserController(req, res);
        // Инициализация бизнес моделей
        self.userM = new UserM_1.UserM(req);
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
UserController.sBaseUrl = '/user';
exports.UserController = UserController;
/**
 * Индексная страница
 */
router.post('/user', async (req, res) => {
    const self = await UserController.Init(req, res);
    let ok = self.userSys.isAccessRead(); // Проверка доступа
    let out = null;
    if (ok) { // Получаем список пользователей
        try {
            out = await self.userM.getSelfUserInfo(req.body);
        }
        catch (e) {
            self.errorSys.errorEx(e, 'fatal_error', 'Фатальная ошибка');
        }
    }
    res.send(self.responseSys.response(out, 'Получить информацию о себе'));
});
/**
 * Информация о харегисрированном пользователе
 */
router.post('/user/get-user-info', async (req, res) => {
    const self = await UserController.Init(req, res);
    let ok = self.userSys.isAccessRead(); // Проверка доступа
    let out = null;
    if (ok) { // Получаем список пользователей
        try {
            out = await self.userM.getUserInfo(req.body);
        }
        catch (e) {
            self.errorSys.errorEx(e, 'fatal_error', 'Фатальная ошибка');
        }
    }
    res.send(self.responseSys.response(out, 'Получить информацию о пользователе'));
});
/**
 * Информация о харегисрированном пользователе
 */
router.post('/user/login', async (req, res) => {
    const self = await UserController.Init(req, res);
    let ok = self.userSys.isAccessRead(); // Проверка доступа
    let out = null;
    if (ok) { // Получаем список пользователей
        try {
            out = await self.userM.login(req.body);
        }
        catch (e) {
            self.errorSys.errorEx(e, 'fatal_error', 'Фатальная ошибка');
        }
    }
    res.send(self.responseSys.response(out, 'Авторизация'));
});
/**
 * Регистрация по логину и паролю
 */
router.post('/user/register', async (req, res) => {
    const self = await UserController.Init(req, res);
    let ok = self.userSys.isAccessRead(); // Проверка доступа
    let out = null;
    if (ok) { // Получаем список пользователей
        try {
            // out = await self.userM.registerByLoginAndPass(req.body);
        }
        catch (e) {
            self.errorSys.errorEx(e, 'fatal_error', 'Фатальная ошибка');
        }
    }
    res.send(self.responseSys.response(out, 'Список пользователей'));
});
/**
 * Сохранение данных пользователя
 */
router.post('/user/save', async (req, res) => {
    const self = await UserController.Init(req, res);
    let ok = self.userSys.isAccessRead(); // Проверка доступа
    let out = null;
    if (ok) { // Получаем список пользователей
        try {
            out = await self.userM.save(req.body);
        }
        catch (e) {
            self.errorSys.errorEx(e, 'fatal_error', 'Фатальная ошибка');
        }
    }
    res.send(self.responseSys.response(out, 'Список пользователей'));
});
//# sourceMappingURL=UserController.js.map