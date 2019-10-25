"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Components = require("@a-a-game-studio/aa-components/lib");
// =======================================================
/** Получить Список пользователей */
var getUserList;
(function (getUserList) {
    getUserList.route = '/api/admin/user/get-users';
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
        rules.set(rules.rule('offset')
            .type(Components.ModelRulesT.int)
            .require()
            .moreOrEq(0)
            .errorEx('offset', 'offset'));
        // Сколько записей получать
        rules.set(rules.rule('limit')
            .type(Components.ModelRulesT.int)
            .require()
            .moreOrEq(0)
            .lessOrEq(100)
            .errorEx('limit', 'limit'));
        // =======================================
        let validator = new Components.ModelValidatorSys(req.sys.errorSys);
        validator.fValid(rules.get(), data);
        return validator.getResult();
    }
    getUserList.valid = valid;
})(getUserList = exports.getUserList || (exports.getUserList = {}));
// =======================================================
/** Получить пользователя по ID */
var getUserByID;
(function (getUserByID) {
    /**
     * Валидация
     *
     * @param req MainRequest
     * @param data RequestI
     */
    function valid(req, data) {
        let rules = new Components.ModelRulesC();
        // =======================================
        // Сколько записей получать
        rules.set(rules.rule('id_user')
            .type(Components.ModelRulesT.int)
            .require()
            .moreOrEq(0)
            .errorEx('id_user', 'id_user'));
        // =======================================
        let validator = new Components.ModelValidatorSys(req.sys.errorSys);
        validator.fValid(rules.get(), data);
        return validator.getResult();
    }
    getUserByID.valid = valid;
})(getUserByID = exports.getUserByID || (exports.getUserByID = {}));
// =======================================================
/** Получить группы по ID пользователя*/
var getUserGroupsByUserID;
(function (getUserGroupsByUserID) {
    /**
     * Валидация
     *
     * @param req MainRequest
     * @param data RequestI
     */
    function valid(req, data) {
        let rules = new Components.ModelRulesC();
        // =======================================
        // Сколько записей получать
        rules.set(rules.rule('id_user')
            .type(Components.ModelRulesT.int)
            .require()
            .moreOrEq(0)
            .errorEx('id_user', 'id_user'));
        // =======================================
        let validator = new Components.ModelValidatorSys(req.sys.errorSys);
        validator.fValid(rules.get(), data);
        return validator.getResult();
    }
    getUserGroupsByUserID.valid = valid;
})(getUserGroupsByUserID = exports.getUserGroupsByUserID || (exports.getUserGroupsByUserID = {}));
// =======================================================
/** Добавить пользователя к группе */
var addUserToGroup;
(function (addUserToGroup) {
    /**
     * Валидация
     *
     * @param req MainRequest
     * @param data RequestI
     */
    function valid(req, data) {
        let rules = new Components.ModelRulesC();
        // =======================================
        // ID пользователя
        rules.set(rules.rule('id_user')
            .type(Components.ModelRulesT.int)
            .require()
            .more(0)
            .errorEx('id_user', 'id_user'));
        // ID группы
        rules.set(rules.rule('id_group')
            .type(Components.ModelRulesT.int)
            .require()
            .more(0)
            .errorEx('id_group', 'id_group'));
        // =======================================
        let validator = new Components.ModelValidatorSys(req.sys.errorSys);
        validator.fValid(rules.get(), data);
        return validator.getResult();
    }
    addUserToGroup.valid = valid;
})(addUserToGroup = exports.addUserToGroup || (exports.addUserToGroup = {}));
// =======================================================
/** Удалить пользователя из группы */
var delUserFromGroup;
(function (delUserFromGroup) {
    /**
     * Валидация
     *
     * @param req MainRequest
     * @param data RequestI
     */
    function valid(req, data) {
        let rules = new Components.ModelRulesC();
        // =======================================
        // ID пользователя
        rules.set(rules.rule('id_user')
            .type(Components.ModelRulesT.int)
            .require()
            .more(0)
            .errorEx('id_user', 'id_user'));
        // ID группы
        rules.set(rules.rule('id_group')
            .type(Components.ModelRulesT.int)
            .require()
            .more(0)
            .errorEx('id_group', 'id_group'));
        // =======================================
        let validator = new Components.ModelValidatorSys(req.sys.errorSys);
        validator.fValid(rules.get(), data);
        return validator.getResult();
    }
    delUserFromGroup.valid = valid;
})(delUserFromGroup = exports.delUserFromGroup || (exports.delUserFromGroup = {}));
// =======================================================
/** Получить token по телефону и СМС */
var getTokenByPhoneAndSms;
(function (getTokenByPhoneAndSms) {
    /**
     * Валидация
     *
     * @param req MainRequest
     * @param data RequestI
     */
    function valid(req, data) {
        let rules = new Components.ModelRulesC();
        // =======================================
        // Телефон
        rules.set(rules.rule('phone')
            .type(Components.ModelRulesT.int)
            .require()
            .errorEx('phone', 'phone'));
        // СМС
        rules.set(rules.rule('sms')
            .type(Components.ModelRulesT.int)
            .errorEx('sms', 'sms'));
        // =======================================
        let validator = new Components.ModelValidatorSys(req.sys.errorSys);
        validator.fValid(rules.get(), data);
        return validator.getResult();
    }
    getTokenByPhoneAndSms.valid = valid;
})(getTokenByPhoneAndSms = exports.getTokenByPhoneAndSms || (exports.getTokenByPhoneAndSms = {}));
/** Добавить пользователя */
var addUser;
(function (addUser) {
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
    addUser.valid = valid;
})(addUser = exports.addUser || (exports.addUser = {}));
//# sourceMappingURL=UserV.js.map