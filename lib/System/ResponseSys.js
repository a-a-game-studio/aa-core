"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.faResponseStatic = exports.fGetRoutePath = exports.fResponse = exports.ResponseSys = void 0;
const MainRequest_1 = require("./MainRequest");
/**
 * Системный сервис формирования ответа
 */
class ResponseSys {
    constructor(req) {
        this.env = req.conf.common.env;
        if (this.env == 'local' || this.env == 'dev') {
            this.ifDevMode = true;
        }
        else {
            this.ifDevMode = false;
        }
        this.errorSys = req.sys.errorSys;
        this.tError = MainRequest_1.TError.AllBad;
    }
    /**
     * Формирование ответа клиенту
     *
     * @param array|null data
     * @param string sMsg
     * @return array
     */
    response(data, sMsg) {
        let out = {
            'ok': this.errorSys.isOk(),
            'e': !this.errorSys.isOk(),
            'errors': this.errorSys.getErrors(),
            // 'warning' : this.errorSys.getWarning(), // Временно убраны пользовательские предупреждения
            // 'notice' : this.errorSys.getNotice(), // Временно убраны пользовательские предупреждения
            'msg': sMsg,
        };
        if (this.ifDevMode) { // Выводит информацию для разработчиков и тестрировщиков
            out['dev_warning'] = this.errorSys.getDevWarning();
            out['dev_notice'] = this.errorSys.getDevNotice();
            // out['dev_declare'] = this.errorSys.getDevDeclare();
            out['dev_log'] = this.errorSys.getDevLog();
        }
        if (this.errorSys.isOk()) {
            out['data'] = data;
        }
        else {
            out['data'] = null;
            out['msg'] = 'Что то пошло не так - обратитесь к администратору';
        }
        return out;
    }
    /**
     * Установить шаблон рендера для faResponseStatic
     * @param sTpl
     */
    fSetTpl(sTpl) {
        this.sTpl = sTpl;
        return this;
    }
    /**
     * тип ошибки в случае неудачи faResponseStatic
     * @param sTpl
     */
    fSetTError(tError) {
        this.tError = tError;
        return this;
    }
    /**
     * Функция рендера страницы
     * @param faCallback - функция контролера
     * @param tpl - путь к шаблону hbs
     * ПОМНИТЕ об fSetTpl и fSetTError
     */
    async faResponseStatic(faCallback) {
        return async (req, res, next) => {
            try {
                res.render(this.sTpl, exports.fResponse(req, await faCallback(req)));
            }
            catch (error) {
                req.errorType = this.tError;
                next(error);
            }
        };
    }
    ;
}
exports.ResponseSys = ResponseSys;
/**
 * Функиця формирующая данные для шаблона
 * Ответ в шаблон страницы
 * эти переменные используются в шаблоне
 * @param req
 * @param data
 */
exports.fResponse = (req, data) => {
    return {
        seo: req.seo,
        route: exports.fGetRoutePath(req),
        data: data,
        config: req.conf,
        userInfo: req.sys.userSys.userInfo,
        bAuth: req.sys.bAuth,
        bIsAdmin: req.sys.userSys.isAdmin(),
        bIsProd: req.conf.common.env == 'prod',
        sRefer: req.header('Referer'),
    };
};
/*
* Костыль над версией пакета ноды
* @param req
*/
exports.fGetRoutePath = (req) => {
    let resp = null;
    try {
        resp = req.route.path;
    }
    catch (e) {
    }
    if (resp == null) {
        try {
            resp = req.route.originalUrl;
        }
        catch (e) {
        }
    }
    return resp;
};
/**
 * Функция рендера страницы
 * @param faCallback - функция контролера
 * @param tpl - путь к шаблону hbs
 */
exports.faResponseStatic = (tpl, tError, faCallback) => {
    return async (req, res, next) => {
        try {
            res.render(tpl, exports.fResponse(req, await faCallback(req)));
        }
        catch (error) {
            req.errorType = tError;
            next(error);
        }
    };
};
//# sourceMappingURL=ResponseSys.js.map