const express = require('express');
// Подключение системных классов
import * as System from '../../Namespace/System'

// Подключение системных моделей
import { AdminEditEnumM } from './AdminEditEnumM'

import BaseCtrl from '../../System/BaseCtrl'

import {AdminEditEnumR} from './AdminEditEnumR'
import R = AdminEditEnumR;

const router = express.Router();

/**
 * API для Админки
 * Редактирование и управление пользователями, а так-же их правами
 */
class Ctrl extends BaseCtrl {

    public adminEditUserM: AdminEditEnumM;

    /**
     * Конструктор
     *
     * @param req
     * @param res
     */
    public async faInit() {
        
        // Инициализация бизнес моделей
        this.adminEditUserM = new AdminEditEnumM(this.req);

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
router.post(R.init.route, async (req: System.MainRequest, res: any, next: any) => {
    const ctrl = new Ctrl(req, res);
    await ctrl.faInit();
    await ctrl.faAction(R.init.action, () => {
        return ctrl.adminEditUserM.init(req.body);
    })
});

/**
 * Выбрать группу
 */
router.post(R.selectEnum.route, async (req: System.MainRequest, res: any, next: any) => {
    const ctrl = new Ctrl(req, res);
    await ctrl.faInit();
    await ctrl.faAction(R.selectEnum.action, () => {
        return ctrl.adminEditUserM.selectEnum(req.body);
    })
});

/**
 * Выбрать контроллер доступа
 */
router.post(R.selectEnumParam.route, async (req: System.MainRequest, res: any, next: any) => {
    const ctrl = new Ctrl(req, res);
    await ctrl.faInit();
    await ctrl.faAction(R.selectEnumParam.action, () => {
        return ctrl.adminEditUserM.selectEnumParam(req.body);
    })
});


/**
 * Удалить контроллер из группы
 */
router.post(R.delEnumParam.route, async (req: System.MainRequest, res: any, next: any) => {
    const ctrl = new Ctrl(req, res);
    await ctrl.faInit();
    await ctrl.faAction(R.delEnumParam.action, () => {
        return ctrl.adminEditUserM.delEnumParam(req.body);
    })
});

/**
 * Добавить группу
 */
router.post(R.addEnum.route, async (req: System.MainRequest, res: any, next: any) => {
    const ctrl = new Ctrl(req, res);
    await ctrl.faInit();
    await ctrl.faAction(R.addEnum.action, () => {
        return ctrl.adminEditUserM.addEnum(req.body);
    })
});

/**
 * Удалить группу
 */
router.post(R.delEnum.route, async (req: System.MainRequest, res: any, next: any) => {
    const ctrl = new Ctrl(req, res);
    await ctrl.faInit();
    await ctrl.faAction(R.delEnum.action, () => {
        return ctrl.adminEditUserM.delEnum(req.body);
    })
});

/**
 * Сохранить группу
 */
router.post(R.saveEnum.route, async (req: System.MainRequest, res: any, next: any) => {
    const ctrl = new Ctrl(req, res);
    await ctrl.faInit();
    await ctrl.faAction(R.saveEnum.action, () => {
        return ctrl.adminEditUserM.saveEnum(req.body);
    })
});

/**
 * Сохранить контроллер доступа
 */
router.post(R.saveEnumParam.route, async (req: System.MainRequest, res: any, next: any) => {
    const ctrl = new Ctrl(req, res);
    await ctrl.faInit();
    await ctrl.faAction(R.saveEnumParam.action, () => {
        return ctrl.adminEditUserM.saveEnumParam(req.body);
    })
});

/**
 * Добавить контроллер доступа
 */
router.post(R.addEnumParam.route, async (req: System.MainRequest, res: any, next: any) => {
    const ctrl = new Ctrl(req, res);
    await ctrl.faInit();
    await ctrl.faAction(R.addEnumParam.action, () => {
        return ctrl.adminEditUserM.addEnumParam(req.body);
    })
});

export { router };