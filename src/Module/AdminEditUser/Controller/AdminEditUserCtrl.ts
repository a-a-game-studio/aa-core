const express = require('express');
// Подключение системных классов
// Подключение системных моделей
import { AdminEditUserM } from '../Model/AdminEditUserM';
import * as System from '../../../Namespace/System'

import BaseCtrl from '../../../System/BaseCtrl';

import * as V from '../Validator/AdminEditUserV'

const router = express.Router();

/**
 * API для Админки
 * Редактирование и управление пользователями, а так-же их правами
 */
class AdminUserController extends BaseCtrl {

    public adminEditUserM: AdminEditUserM;

    /**
     * Конструктор
     *
     * @param req
     * @param res
     */
    public async faInit() {
        
        // Инициализация бизнес моделей
        this.adminEditUserM = new AdminEditUserM(this.req);

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
router.post(V.init.route, async (req: System.MainRequest, res: any, next: any) => {
    const ctrl = new AdminUserController(req, res);
    await ctrl.faInit();
    await ctrl.faAction(V.init.action, () => {
        return ctrl.adminEditUserM.init(req.body);
    })
});

/**
 * Выбрать пользователя
 */
router.post(V.selectUser.route, async (req: System.MainRequest, res: any, next: any) => {
    const ctrl = new AdminUserController(req, res);
    await ctrl.faInit();
    await ctrl.faAction(V.selectUser.action, () => {
        return ctrl.adminEditUserM.selectUser(req.body);
    })
});

/**
 * Выбрать группу
 */
router.post(V.selectGroup.route, async (req: System.MainRequest, res: any, next: any) => {
    const ctrl = new AdminUserController(req, res);
    await ctrl.faInit();
    await ctrl.faAction(V.selectGroup.action, () => {
        return ctrl.adminEditUserM.selectGroup(req.body);
    })
});

/**
 * Добавить пользователя к группе
 */
router.post(V.addUserToGroup.route, async (req: System.MainRequest, res: any, next: any) => {
    const ctrl = new AdminUserController(req, res);
    await ctrl.faInit();
    await ctrl.faAction(V.addUserToGroup.action, () => {
        return ctrl.adminEditUserM.addUserToGroup(req.body);
    })
});

/**
 * Удалить пользователя из группы
 */
router.post(V.delUserFromGroup.route, async (req: System.MainRequest, res: any, next: any) => {
    const ctrl = new AdminUserController(req, res);
    await ctrl.faInit();
    await ctrl.faAction(V.delUserFromGroup.action, () => {
        return ctrl.adminEditUserM.delUserFromGroup(req.body);
    })
});

/**
 * Добавить пользователя
 */
router.post(V.addUser.route, async (req: System.MainRequest, res: any, next: any) => {
    const ctrl = new AdminUserController(req, res);
    await ctrl.faInit();
    await ctrl.faAction(V.addUser.action, () => {
        return ctrl.adminEditUserM.addUser(req.body);
    })
});

/**
 * Удалить пользователя
 */
router.post(V.delUser.route, async (req: System.MainRequest, res: any, next: any) => {
    const ctrl = new AdminUserController(req, res);
    await ctrl.faInit();
    await ctrl.faAction(V.delUser.action, () => {
        return ctrl.adminEditUserM.delUser(req.body);
    })
});

export { router };