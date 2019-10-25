"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
// Подключение системных классов
// Подключение системных моделей
const UserM_1 = require("../Model/UserM");
const GroupM_1 = require("../Model/GroupM");
const CtrlAccessM_1 = require("../Model/CtrlAccessM");
const AccessGroupM_1 = require("../Model/AccessGroupM");
const BaseCtrl_1 = require("../../../System/BaseCtrl");
const router = express.Router();
exports.router = router;
/**
 * API для Админки
 * Редактирование и управление пользователями, а так-же их правами
 */
class AdminUserController extends BaseCtrl_1.default {
    /**
     * Конструктор
     *
     * @param req
     * @param res
     */
    async fInit() {
        // Инициализация бизнес моделей
        this.userM = new UserM_1.UserM(this.req);
        this.groupM = new GroupM_1.GroupM(this.req);
        this.ctrlAccessM = new CtrlAccessM_1.CtrlAccessM(this.req);
        this.accessGroupM = new AccessGroupM_1.AccessGroupM(this.req);
        //==================================================
        // Проверка авторизации
        await this.userSys.isAuth();
        // Проверка права доступа на модуль
        await this.userSys.isAccessCtrl('admin_user');
        // Проверка являетесь ли вы администратором
        this.userSys.isAdmin();
    }
}
//# sourceMappingURL=AdminUserController.js.map