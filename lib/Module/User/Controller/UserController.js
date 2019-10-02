"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const System_1 = require("../../../Namespace/System");
const User_1 = require("@a-a-game-studio/aa-classes/lib/User/User");
const express = require('express');
const router = express.Router();
exports.router = router;
/**
 * Контроллер
 */
class UserController extends System_1.BaseCtrl {
    constructor(req, resp) {
        super(req, resp);
        this.user = new User_1.User(this.errorSys, req.listDB);
        this.user.actions.infoA.faGetInfoById(this.userSys.idUser);
    }
    /**
     * index page
     */
    async Index() {
        this.resp.send(this.responseSys.response({}, 'UserController'));
    }
    /**
     * Ифнормация об пользователе
     */
    async getUserInfo() {
        let data = this.user.data;
        try {
            delete data.pass;
        }
        catch (e) {
        }
        this.resp.send(this.responseSys.response({}, 'проверка авторизации'));
    }
    /**
     * Регистрация по логину и паролю
     * @param login
     * @param pass
     * @param passConfirm
     *
     * @returns token: string
     */
    async registerByLoginAndPass() {
        /* определяем входные данные */
        let reqData = this.req.body;
        let data = {
            token: await this.user.actions.registerA.faRegisterByLoginAndPass(reqData)
        };
        this.resp.send(this.responseSys.response(data, 'проверка авторизации'));
    }
    async update() {
        let data;
        const errorString = this.fClassName() + '.' + this.fMethodName();
        /* определяем входные данные */
        let reqData = this.req.body;
        await this.user.actions.updateA.faUpdate(reqData.user);
        this.resp.send(this.responseSys.response(data, 'update'));
    }
}
UserController.sBaseUrl = '/user';
exports.UserController = UserController;
/**
 * Индексная страница
 */
router.get(UserController.sBaseUrl + '/', async (req, res) => {
    const self = await UserController.Init(req, res);
    await self.Index();
});
/**
 * Информация о харегисрированном пользователе
 */
router.post(UserController.sBaseUrl + '/getUserInfo', async (req, res) => {
    const self = await UserController.Init(req, res);
    await self.getUserInfo();
});
/**
 * Регистрация по логину и паролю
 */
router.post(UserController.sBaseUrl + '/registerByLoginAndPass', async (req, res) => {
    const self = await UserController.Init(req, res);
    await self.registerByLoginAndPass();
});
/**
 * Обновление
 */
router.post(UserController.sBaseUrl + '/update', async (req, res) => {
    const self = await UserController.Init(req, res);
    await self.update();
});
//# sourceMappingURL=UserController.js.map