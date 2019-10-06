"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Components = require("@a-a-game-studio/aa-components/lib");
// =======================================================
/** Получить информацию о себе */
var getSelfUserInfo;
(function (getSelfUserInfo) {
    /**
     * Валидация
     *
     * @param req MainRequest
     * @param data RequestI
     */
    function valid(req, data) {
        let rules = new Components.ModelRulesC();
        // =======================================
        let validator = new Components.ModelValidatorSys(req.sys.errorSys);
        validator.fValid(rules.get(), data);
        return validator.getResult();
    }
    getSelfUserInfo.valid = valid;
})(getSelfUserInfo = exports.getSelfUserInfo || (exports.getSelfUserInfo = {}));
// =======================================================
/** Получить информацию о пользователе */
var getUserInfo;
(function (getUserInfo) {
    /**
     * Валидация
     *
     * @param req MainRequest
     * @param data RequestI
     */
    function valid(req, data) {
        let rules = new Components.ModelRulesC();
        // =======================================
        // Проверка с какой записи получать данные
        rules.set(rules.rule('user_id')
            .type(Components.ModelRulesT.int)
            .require()
            .more(0)
            .errorEx('user_id', 'user_id'));
        // =======================================
        let validator = new Components.ModelValidatorSys(req.sys.errorSys);
        validator.fValid(rules.get(), data);
        return validator.getResult();
    }
    getUserInfo.valid = valid;
})(getUserInfo = exports.getUserInfo || (exports.getUserInfo = {}));
// =======================================================
/** Залогиниться */
var login;
(function (login) {
    /**
     * Валидация
     *
     * @param req MainRequest
     * @param data RequestI
     */
    function valid(req, data) {
        let rules = new Components.ModelRulesC();
        // =======================================
        // Проверка с какой записи получать данные
        rules.set(rules.rule('login')
            .type(Components.ModelRulesT.text)
            .require()
            .minLen(3)
            .maxLen(100)
            .errorEx('login', 'login'));
        // Сколько записей получать
        rules.set(rules.rule('pswd')
            .type(Components.ModelRulesT.text)
            .require()
            .minLen(6)
            .maxLen(100)
            .errorEx('pswd', 'pswd'));
        // =======================================
        let validator = new Components.ModelValidatorSys(req.sys.errorSys);
        validator.fValid(rules.get(), data);
        return validator.getResult();
    }
    login.valid = valid;
})(login = exports.login || (exports.login = {}));
/** Зарегистрироваться */
var register;
(function (register) {
    /**
     * Валидация
     *
     * @param req MainRequest
     * @param data RequestI
     */
    function valid(req, data) {
        let rules = new Components.ModelRulesC();
        // =======================================
        // логин
        rules.set(rules.rule('login')
            .type(Components.ModelRulesT.text)
            .require()
            .minLen(3)
            .maxLen(100)
            .errorEx('login', 'login'));
        // email
        rules.set(rules.rule('email')
            .type(Components.ModelRulesT.str)
            .require()
            .if('.+@.+\..+')
            .minLen(3)
            .maxLen(100)
            .errorEx('email', 'email'));
        // пароль
        rules.set(rules.rule('pswd')
            .type(Components.ModelRulesT.text)
            .require()
            .minLen(6)
            .maxLen(100)
            .errorEx('pswd', 'pswd'));
        // =======================================
        let validator = new Components.ModelValidatorSys(req.sys.errorSys);
        validator.fValid(rules.get(), data);
        return validator.getResult();
    }
    register.valid = valid;
})(register = exports.register || (exports.register = {}));
/** Сохранить данные о пользователе */
var save;
(function (save) {
    /**
     * Валидация
     *
     * @param req MainRequest
     * @param data RequestI
     */
    function valid(req, data) {
        let rules = new Components.ModelRulesC();
        // =======================================
        // логин
        rules.set(rules.rule('login')
            .type(Components.ModelRulesT.text)
            .require()
            .minLen(3)
            .maxLen(100)
            .errorEx('login', 'login'));
        // email
        rules.set(rules.rule('email')
            .type(Components.ModelRulesT.str)
            .require()
            .if('.+@.+\..+')
            .minLen(3)
            .maxLen(100)
            .errorEx('email', 'email'));
        // пароль
        rules.set(rules.rule('pswd')
            .type(Components.ModelRulesT.text)
            .require()
            .minLen(6)
            .maxLen(100)
            .errorEx('pswd', 'pswd'));
        // =======================================
        let validator = new Components.ModelValidatorSys(req.sys.errorSys);
        validator.fValid(rules.get(), data);
        return validator.getResult();
    }
    save.valid = valid;
})(save = exports.save || (exports.save = {}));
//# sourceMappingURL=UserV.js.map