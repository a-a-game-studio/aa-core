"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Components = require("@a-a-game-studio/aa-components/lib");
// =======================================================
/** Получить Список пользователей */
var init;
(function (init) {
    /** APIURL */
    init.route = '/aa/admin-edit-user/init';
    /** Alias действия */
    init.action = 'init';
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
    init.valid = valid;
})(init = exports.init || (exports.init = {}));
// =======================================================
/** Выбрать пользователя */
var selectUser;
(function (selectUser) {
    /** APIURL */
    selectUser.route = '/aa/admin-edit-user/select-user';
    /** Alias действия */
    selectUser.action = 'select-user';
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
    selectUser.valid = valid;
})(selectUser = exports.selectUser || (exports.selectUser = {}));
// =======================================================
/** Выбрать группу */
var selectGroup;
(function (selectGroup) {
    /** APIURL */
    selectGroup.route = '/aa/admin-edit-user/select-group';
    /** Alias действия */
    selectGroup.action = 'select-group';
    /**
     * Валидация
     *
     * @param req MainRequest
     * @param data RequestI
     */
    function valid(req, data) {
        let rules = new Components.ModelRulesC();
        // =======================================
        // ID Группа пользователей
        rules.set(rules.rule('id_group')
            .type(Components.ModelRulesT.int)
            .require()
            .moreOrEq(0)
            .errorEx('id_group', 'id_group'));
        // =======================================
        let validator = new Components.ModelValidatorSys(req.sys.errorSys);
        validator.fValid(rules.get(), data);
        return validator.getResult();
    }
    selectGroup.valid = valid;
})(selectGroup = exports.selectGroup || (exports.selectGroup = {}));
// =======================================================
/** Добавить пользователя к группе */
var addUserToGroup;
(function (addUserToGroup) {
    /** APIURL */
    addUserToGroup.route = '/aa/admin-edit-user/add-user-to-group';
    /** Alias действия */
    addUserToGroup.action = 'add-user-to-group';
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
    /** APIURL */
    delUserFromGroup.route = '/aa/admin-edit-user/del-user-from-group';
    /** Alias действия */
    delUserFromGroup.action = 'del-user-from-group';
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
/** Добавить пользователя */
var addUser;
(function (addUser) {
    /** APIURL */
    addUser.route = '/aa/admin-edit-user/add-user';
    /** Alias действия */
    addUser.action = 'add-user';
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
        // логин
        rules.set(rules.rule('name')
            .type(Components.ModelRulesT.text)
            .minLen(3)
            .maxLen(100)
            .errorEx('name', 'name'));
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
// =======================================================
/** Удалить пользователя */
var delUser;
(function (delUser) {
    /** APIURL */
    delUser.route = '/aa/admin-edit-user/del-user';
    /** Alias действия */
    delUser.action = 'del-user';
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
        // =======================================
        let validator = new Components.ModelValidatorSys(req.sys.errorSys);
        validator.fValid(rules.get(), data);
        return validator.getResult();
    }
    delUser.valid = valid;
})(delUser = exports.delUser || (exports.delUser = {}));
/** Сохранить данные о пользователе */
var saveUser;
(function (saveUser) {
    /** APIURL */
    saveUser.route = '/aa/admin-edit-user/save-user';
    /** Alias действия */
    saveUser.action = 'save-user';
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
            .more(0)
            .errorEx('id_user', 'id_user'));
        // Имя
        rules.set(rules.rule('name')
            .type(Components.ModelRulesT.text)
            .minLen(3)
            .maxLen(100)
            .errorEx('name', 'name'));
        // email
        rules.set(rules.rule('email')
            .type(Components.ModelRulesT.str)
            .if('.+@.+\..+')
            .minLen(3)
            .maxLen(100)
            .errorEx('email', 'email'));
        // =======================================
        let validator = new Components.ModelValidatorSys(req.sys.errorSys);
        validator.fValid(rules.get(), data);
        return validator.getResult();
    }
    saveUser.valid = valid;
})(saveUser = exports.saveUser || (exports.saveUser = {}));
//# sourceMappingURL=AdminEditUserV.js.map