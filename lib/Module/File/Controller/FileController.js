"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const System_1 = require("../../../Namespace/System");
const express = require('express');
const router = express.Router();
exports.router = router;
const FileM_1 = require("../Model/FileM");
/**
 * Контроллер
 */
class FileController extends System_1.BaseCtrl {
    /**
     * Конструктор
     *
     * @param req
     * @param res
     */
    static async Init(req, res) {
        const self = new FileController(req, res);
        /*  Инициализация бизнес моделей */
        self.fileM = new FileM_1.FileM(req);
        /* ================================================== */
        /*  Проверка авторизации */
        await self.userSys.isAuth();
        /*   Проверка права доступа на модуль */
        await self.userSys.isAccessCtrl('File');
        /*  Проверка являетесь ли вы администратором */
        self.userSys.isAdmin();
        return self;
    }
}
FileController.sBaseUrl = '/file';
exports.FileController = FileController;
/**
 * Загрузить картинку в файловое хранилище
 */
router.post('/file/upload-img', async (req, res) => {
    const self = await FileController.Init(req, res);
    let ok = self.userSys.isAccessRead(); /* Проверка доступа */
    let out = null;
    if (ok) {
        try {
            out = await self.fileM.addImg(req.body, req.conf.FileModule.sSavePath);
        }
        catch (e) {
            self.errorSys.errorEx(e, 'fatal_error', 'Фатальная ошибка');
        }
    }
    res.send(self.responseSys.response(out, 'Загрузить картинку в файловое хранилище'));
});
//# sourceMappingURL=FileController.js.map