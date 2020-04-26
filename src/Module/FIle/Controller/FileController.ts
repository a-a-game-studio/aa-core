import { BaseCtrl, MainRequest } from "../../../Namespace/System";
const express = require('express');
const router = express.Router();

import { FileM } from '../Model/FileM';

/**
 * Контроллер 
 */
export class FileController extends BaseCtrl {

    static sBaseUrl = '/file';

    public fileM: FileM;

    /**
     * Конструктор
     *
     * @param req
     * @param res
     */
    public static async Init(req: MainRequest, res: any): Promise<FileController> {
        const self = new FileController(req, res);

        /*  Инициализация бизнес моделей */
        self.fileM = new FileM(req);

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


/**
 * Загрузить картинку в файловое хранилище
 */
router.post('/file/upload-img', async (req: MainRequest, res: any) => {

    const self = <FileController>await FileController.Init(req, res);
    let ok = self.userSys.isAccessRead();  /* Проверка доступа */

    let out = null;
    if (ok) {
        try {
            out = await self.fileM.addImg(req.body, req.conf.FileModule.sSavePath);
        } catch (e) {
            self.errorSys.errorEx(e, 'fatal_error', 'Фатальная ошибка')
        }
    }

    res.send(
        self.responseSys.response(out, 'Загрузить картинку в файловое хранилище')
    );
});

export { router };
