"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Components = require("@a-a-game-studio/aa-components/lib");
// =======================================================
/** Получить Список пользователей */
var getUserList;
(function (getUserList) {
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
        rules.set(rules.rule('user_id')
            .type(Components.ModelRulesT.int)
            .require()
            .moreOrEq(0)
            .errorEx('user_id', 'user_id'));
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
        rules.set(rules.rule('user_id')
            .type(Components.ModelRulesT.int)
            .require()
            .moreOrEq(0)
            .errorEx('user_id', 'user_id'));
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
        rules.set(rules.rule('user_id')
            .type(Components.ModelRulesT.int)
            .require()
            .more(0)
            .errorEx('user_id', 'user_id'));
        // ID группы
        rules.set(rules.rule('group_id')
            .type(Components.ModelRulesT.int)
            .require()
            .more(0)
            .errorEx('group_id', 'group_id'));
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
        rules.set(rules.rule('user_id')
            .type(Components.ModelRulesT.int)
            .require()
            .more(0)
            .errorEx('user_id', 'user_id'));
        // ID группы
        rules.set(rules.rule('group_id')
            .type(Components.ModelRulesT.int)
            .require()
            .more(0)
            .errorEx('group_id', 'group_id'));
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
        rules.set(rules.rule('tel')
            .type(Components.ModelRulesT.int)
            .require()
            .errorEx('tel', 'tel'));
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
//# sourceMappingURL=UserV.js.map