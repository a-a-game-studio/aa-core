"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const System_1 = require("../../Namespace/System");
const express = require('express');
const router = express.Router();
exports.router = router;
const FileR_1 = require("./FileR");
const FileM_1 = require("./Model/FileM");
/**
 * Контроллер
 */
class FileCtrl extends System_1.BaseCtrl {
    /**
     * Конструктор
     *
     * @param req
     * @param res
     */
    async faInit() {
        // Инициализация бизнес моделей
        this.fileM = new FileM_1.FileM(this.req);
        //==================================================
        /*  Проверка авторизации */
        await this.userSys.isAuth();
        /*   Проверка права доступа на модуль */
        await this.userSys.isAccessCtrl('file-module');
        /*  Проверка являетесь ли вы администратором */
        this.userSys.isAdmin();
    }
}
FileCtrl.sBaseUrl = '/file';
exports.FileCtrl = FileCtrl;
router.post(FileR_1.FileR.uploadImg.route, async (req, res, next) => {
    const ctrl = new FileCtrl(req, res);
    await ctrl.faInit();
    await ctrl.faAction('Загрузить картинку в файловое хранилище', () => {
        return ctrl.fileM.addImg(req.body, req.conf.FileModule.sSavePath);
    });
});
//# sourceMappingURL=FileCtrl.js.map