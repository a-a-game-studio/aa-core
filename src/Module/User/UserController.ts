import { BaseCtrl, MainRequest } from "../../Namespace/System";
import { UserModule } from '@a-a-game-studio/aa-classes/lib';
import { User } from "@a-a-game-studio/aa-classes/lib/User/User";
const express = require('express');
const router = express.Router();


/**
 * Контроллер 
 */
export class UserController extends BaseCtrl {
    
    static sBaseUrl = '/user';

    protected user: User;

    constructor(req: MainRequest.MainRequest, resp: any) {
        super(req, resp);
        this.user = new User(this.errorSys,req.listDB);
        this.user.actions.infoA.faGetInfoById(this.userSys.idUser);
    }

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
        let data = this.user.data;
        try {
            delete data.pass;
        } catch (e) {

        }

        this.resp.send(
            this.responseSys.response({}, 'проверка авторизации')
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
            token: await this.user.actions.registerA.faRegisterByLoginAndPass(reqData)
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

        await this.user.actions.updateA.faUpdate(reqData.user);

        this.resp.send(
            this.responseSys.response(data, 'update')
        );
    }

}

/**
 * Индексная страница
 */
router.get(UserController.sBaseUrl  + '/', async (req: any, res: any) => {
    const self = <UserController>await UserController.Init(req, res);
    await self.Index();
});

/**
 * Информация о харегисрированном пользователе
 */
router.post(UserController.sBaseUrl  + '/getUserInfo', async (req: any, res: any) => {
    const self = <UserController>await UserController.Init(req, res);
    await self.getUserInfo();
});

/**
 * Регистрация по логину и паролю
 */
router.post(UserController.sBaseUrl  + '/registerByLoginAndPass', async (req: any, res: any) => {
    const self = <UserController>await UserController.Init(req, res);
    await self.registerByLoginAndPass();
});

/**
 * Обновление
 */
router.post(UserController.sBaseUrl  + '/update', async (req: any, res: any) => {
    const self = <UserController>await UserController.Init(req, res);
    await self.update();
});




export default router;
