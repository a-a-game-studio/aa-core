import { BaseCtrl } from "../../Namespace/System";
import { UserModule } from '@a-a-game-studio/aa-classes/lib';


const express = require('express');

const router = express.Router();


const rootPath = '/user';

/**
 * Контроллер 
 */
class UserController extends BaseCtrl {

    /**
     * index page
     */
    public async Index() {
        this.resp.send(
            this.responseSys.response({}, 'UserController')
        );
    }

    /**
     * Ифнормация об пользователе
     */
    public async getUserInfo() {
        let data = this.userSys.data;
        try {
            delete data.pass;
        } catch (e) {

        }

        this.resp.send(
            this.responseSys.response(data, 'проверка авторизации')
        );
    }


    /**
     * Регистрация по логину и паролю
     * @param login 
     * @param pass 
     * @param passConfirm 
     * 
     * @returns token: string
     */
    public async registerByLoginAndPass() {

        /* определяем входные данные */
        let reqData = <UserModule.UserR.registerByLoginAndPassREQ>this.req.body;

        let data = {
            token: await this.userSys.actions.registerA.faRegisterByLoginAndPass(reqData)
        };

        this.resp.send(
            this.responseSys.response(data, 'проверка авторизации')
        );
    }

    public async update() {
        let data: null;
        const errorString = this.fClassName() + '.' + this.fMethodName();

        /* определяем входные данные */
        let reqData = <UserModule.UserR.updateREQ>this.req.body;

        await this.userSys.actions.updateA.faUpdate(reqData.user);

        this.resp.send(
            this.responseSys.response(data, 'update')
        );
    }

}

/**
 * Индексная страница
 */
router.get(rootPath + '/', async (req: any, res: any) => {
    const self = <UserController>await UserController.Init(req, res);
    await self.Index();
});

/**
 * Информация о харегисрированном пользователе
 */
router.post(rootPath + '/getUserInfo', async (req: any, res: any) => {
    const self = <UserController>await UserController.Init(req, res);
    await self.getUserInfo();
});

/**
 * Регистрация по логину и паролю
 */
router.post(rootPath + '/registerByLoginAndPass', async (req: any, res: any) => {
    const self = <UserController>await UserController.Init(req, res);
    await self.registerByLoginAndPass();
});

/**
 * Обновление
 */
router.post(rootPath + '/update', async (req: any, res: any) => {
    const self = <UserController>await UserController.Init(req, res);
    await self.update();
});




export default router;
