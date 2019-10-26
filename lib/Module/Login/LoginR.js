"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/** Модуль логина/авторизации */
var LoginR;
(function (LoginR) {
    // =======================================================
    /** Начальные данные */
    let init;
    (function (init) {
        /** APIURL */
        init.route = '/aa/login/init';
        /** Alias действия */
        init.action = 'init';
    })(init = LoginR.init || (LoginR.init = {}));
    // =======================================================
    /** Залогиниться */
    let login;
    (function (login) {
        /** APIURL */
        login.route = '/aa/login/login';
        /** Alias действия */
        login.action = 'login';
    })(login = LoginR.login || (LoginR.login = {}));
    // =======================================================
    /** Зарегистрироваться */
    let register;
    (function (register) {
        /** APIURL */
        register.route = '/aa/login/register';
        /** Alias действия */
        register.action = 'register';
    })(register = LoginR.register || (LoginR.register = {}));
})(LoginR = exports.LoginR || (exports.LoginR = {}));
//# sourceMappingURL=LoginR.js.map