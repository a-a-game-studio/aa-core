const express = require('express');
// Подключение системных классов
// Подключение системных моделей
import { AdminEditGroupM } from '../Model/AdminEditGroupM';
import * as System from '../../../Namespace/System'

import BaseCtrl from '../../../System/BaseCtrl';

import * as V from '../Validator/AdminEditGroupV'

const router = express.Router();

/**
 * API для Админки
 * Редактирование и управление пользователями, а так-же их правами
 */
class Ctrl extends BaseCtrl {

    public adminEditUserM: AdminEditGroupM;

    /**
     * Конструктор
     *
     * @param req
     * @param res
     */
    public async faInit() {
        
        // Инициализация бизнес моделей
        this.adminEditUserM = new AdminEditGroupM(this.req);

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
    const ctrl = new Ctrl(req, res);
    await ctrl.faInit();
    await ctrl.faAction(V.init.action, () => {
        return ctrl.adminEditUserM.init(req.body);
    })
});

/**
 * Выбрать группу
 */
router.post(V.selectGroup.route, async (req: System.MainRequest, res: any, next: any) => {
    const ctrl = new Ctrl(req, res);
    await ctrl.faInit();
    await ctrl.faAction(V.selectGroup.action, () => {
        return ctrl.adminEditUserM.selectGroup(req.body);
    })
});

/**
 * Выбрать контроллер доступа
 */
router.post(V.selectCtrlAccess.route, async (req: System.MainRequest, res: any, next: any) => {
    const ctrl = new Ctrl(req, res);
    await ctrl.faInit();
    await ctrl.faAction(V.selectCtrlAccess.action, () => {
        return ctrl.adminEditUserM.selectCtrlAccess(req.body);
    })
});

/**
 * Добавить контроллер доступа группе
 */
router.post(V.addCtrlAccessToGroup.route, async (req: System.MainRequest, res: any, next: any) => {
    const ctrl = new Ctrl(req, res);
    await ctrl.faInit();
    await ctrl.faAction(V.addCtrlAccessToGroup.action, () => {
        return ctrl.adminEditUserM.addCtrlAccessToGroup(req.body);
    })
});

/**
 * Удалить контроллер из группы
 */
router.post(V.delCtrlAccessFromGroup.route, async (req: System.MainRequest, res: any, next: any) => {
    const ctrl = new Ctrl(req, res);
    await ctrl.faInit();
    await ctrl.faAction(V.delCtrlAccessFromGroup.action, () => {
        return ctrl.adminEditUserM.delCtrlAccessFromGroup(req.body);
    })
});

/**
 * Добавить группу
 */
router.post(V.addGroup.route, async (req: System.MainRequest, res: any, next: any) => {
    const ctrl = new Ctrl(req, res);
    await ctrl.faInit();
    await ctrl.faAction(V.addGroup.action, () => {
        return ctrl.adminEditUserM.addGroup(req.body);
    })
});

/**
 * Удалить группу
 */
router.post(V.delGroup.route, async (req: System.MainRequest, res: any, next: any) => {
    const ctrl = new Ctrl(req, res);
    await ctrl.faInit();
    await ctrl.faAction(V.delGroup.action, () => {
        return ctrl.adminEditUserM.delGroup(req.body);
    })
});

/**
 * Сохранить группу
 */
router.post(V.saveGroup.route, async (req: System.MainRequest, res: any, next: any) => {
    const ctrl = new Ctrl(req, res);
    await ctrl.faInit();
    await ctrl.faAction(V.delGroup.action, () => {
        return ctrl.adminEditUserM.saveGroup(req.body);
    })
});

export { router };