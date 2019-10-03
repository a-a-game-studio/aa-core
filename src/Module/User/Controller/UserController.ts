import { BaseCtrl, MainRequest } from "../../../Namespace/System";
import { UserModule } from '@a-a-game-studio/aa-classes/lib';
const express = require('express');
const router = express.Router();

import { UserM } from '../Model/UserM';

/**
 * Контроллер 
 */
export class UserController extends BaseCtrl {
    
    static sBaseUrl = '/user';

    public userM: UserM;

    /**
     * Конструктор
     *
     * @param req
     * @param res
     */
    public static async Init(req: MainRequest, res: any): Promise<UserController> {
        const self = new UserController(req, res);

        // Инициализация бизнес моделей
        self.userM = new UserM(req);

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

/**
 * Индексная страница
 */
router.get('/user/', async (req: any, res: any) => {
    const self = <UserController>await UserController.Init(req, res);

    let ok = self.userSys.isAccessRead(); // Проверка доступа

    let out = null;
    if (ok) { // Получаем список пользователей
        try {
            await self.userM.getUserInfo(req.body);
        } catch (e) {
            self.errorSys.errorEx(e, 'fatal_error', 'Фатальная ошибка')
        }
    }

    res.send(
        self.responseSys.response(out, 'Список пользователей')
    );
});

/**
 * Информация о харегисрированном пользователе
 */
router.post('/user/get-user-info', async (req: any, res: any) => {

    const self = <UserController>await UserController.Init(req, res);
    let ok = self.userSys.isAccessRead(); // Проверка доступа

    let out = null;
    if (ok) { // Получаем список пользователей
        try {
            await self.userM.getUserInfo(req.body);
        } catch (e) {
            self.errorSys.errorEx(e, 'fatal_error', 'Фатальная ошибка')
        }
    }

    res.send(
        self.responseSys.response(out, 'Список пользователей')
    );
});

/**
 * Регистрация по логину и паролю
 */
router.post('/user/register', async (req: any, res: any) => {
    const self = <UserController>await UserController.Init(req, res);

    let ok = self.userSys.isAccessRead(); // Проверка доступа

    let out = null;
    if (ok) { // Получаем список пользователей
        try {
            // await self.userM.registerByLoginAndPass(req.body);
        } catch (e) {
            self.errorSys.errorEx(e, 'fatal_error', 'Фатальная ошибка')
        }
    }

    res.send(
        self.responseSys.response(out, 'Список пользователей')
    );
});

/**
 * Сохранение данных пользователя
 */
router.post('/user/save', async (req: any, res: any) => {
    const self = <UserController>await UserController.Init(req, res);

    let ok = self.userSys.isAccessRead(); // Проверка доступа

    let out = null;
    if (ok) { // Получаем список пользователей
        try {
            await self.userM.save(req.body);
        } catch (e) {
            self.errorSys.errorEx(e, 'fatal_error', 'Фатальная ошибка')
        }
    }

    res.send(
        self.responseSys.response(out, 'Список пользователей')
    );
});

export { router };
