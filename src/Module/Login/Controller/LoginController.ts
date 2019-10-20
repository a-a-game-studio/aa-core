import { BaseCtrl, MainRequest } from "../../../Namespace/System";
import { UserModule } from '@a-a-game-studio/aa-classes/lib';
import * as System from '../../../Namespace/System'
const express = require('express');
const router = express.Router();

import * as V from '../Validator/LoginV'

import { LoginM } from '../Model/LoginM';

/**
 * Контроллер 
 */
export class UserController extends BaseCtrl {

    public loginM: LoginM;

    /**
     * Конструктор
     *
     * @param req
     * @param res
     */
    public async faInit() {

        await this.userSys.isAuth();

        // Инициализация бизнес моделей
        this.loginM = new LoginM(this.req);

    }

}

/**
 * INIT
 */
router.post(V.init.route, async (req: System.MainRequest, res: any, next: any) => {
    const ctrl = new UserController(req, res);
    await ctrl.faInit();
    await ctrl.faAction(V.init.action, () => {
        return ctrl.loginM.init(req.body);
    })
});

/**
 * Войти в систему
 */
router.post(V.login.route, async (req: System.MainRequest, res: any, next: any) => {
    const ctrl = new UserController(req, res);
    await ctrl.faInit();
    await ctrl.faAction(V.login.action, () => {
        return ctrl.loginM.login(req.body);
    })
});

/**
 * Зарегистрироваться
 */
router.post(V.register.route, async (req: System.MainRequest, res: any, next: any) => {
    const ctrl = new UserController(req, res);
    await ctrl.faInit();
    await ctrl.faAction(V.register.action, () => {
        return ctrl.loginM.register(req.body);
    })
});

export { router };
