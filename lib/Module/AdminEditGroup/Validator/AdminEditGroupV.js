"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Components = require("@a-a-game-studio/aa-components/lib");
// =======================================================
/** Получить Список пользователей */
var init;
(function (init) {
    /** APIURL */
    init.route = '/aa/admin-edit-group/init';
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
        // =======================================
        let validator = new Components.ModelValidatorSys(req.sys.errorSys);
        validator.fValid(rules.get(), data);
        return validator.getResult();
    }
    init.valid = valid;
})(init = exports.init || (exports.init = {}));
// =======================================================
/** Выбрать группу */
var selectGroup;
(function (selectGroup) {
    /** APIURL */
    selectGroup.route = '/aa/admin-edit-group/select-group';
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
        // Сколько записей получать
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
/** Выбрать группу */
var selectCtrlAccess;
(function (selectCtrlAccess) {
    /** APIURL */
    selectCtrlAccess.route = '/aa/admin-edit-group/select-ctrl-access';
    /** Alias действия */
    selectCtrlAccess.action = 'select-ctrl-access';
    /**
     * Валидация
     *
     * @param req MainRequest
     * @param data RequestI
     */
    function valid(req, data) {
        let rules = new Components.ModelRulesC();
        // =======================================
        // ID контроллера доступа
        rules.set(rules.rule('id_ctrl_access')
            .type(Components.ModelRulesT.int)
            .require()
            .moreOrEq(0)
            .errorEx('id_ctrl_access', 'id_ctrl_access'));
        // =======================================
        let validator = new Components.ModelValidatorSys(req.sys.errorSys);
        validator.fValid(rules.get(), data);
        return validator.getResult();
    }
    selectCtrlAccess.valid = valid;
})(selectCtrlAccess = exports.selectCtrlAccess || (exports.selectCtrlAccess = {}));
// =======================================================
/** Добавить права группе на контроллер */
var addCtrlAccessToGroup;
(function (addCtrlAccessToGroup) {
    /** APIURL */
    addCtrlAccessToGroup.route = '/aa/admin-edit-group/add-ctrl-access-to-group';
    /** Alias действия */
    addCtrlAccessToGroup.action = 'add-ctrl-access-to-group';
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
        rules.set(rules.rule('id_ctrl_access')
            .type(Components.ModelRulesT.int)
            .require()
            .more(0)
            .errorEx('id_ctrl_access', 'id_ctrl_access'));
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
    addCtrlAccessToGroup.valid = valid;
})(addCtrlAccessToGroup = exports.addCtrlAccessToGroup || (exports.addCtrlAccessToGroup = {}));
// =======================================================
/** Удалить пользователя из группы */
var delCtrlAccessFromGroup;
(function (delCtrlAccessFromGroup) {
    /** APIURL */
    delCtrlAccessFromGroup.route = '/aa/admin-edit-group/del-ctrl-access-from-group';
    /** Alias действия */
    delCtrlAccessFromGroup.action = 'del-ctrl-access-from-group';
    /**
     * Валидация
     *
     * @param req MainRequest
     * @param data RequestI
     */
    function valid(req, data) {
        let rules = new Components.ModelRulesC();
        // =======================================
        // ID контроллера доступа
        rules.set(rules.rule('id_ctrl_access')
            .type(Components.ModelRulesT.int)
            .require()
            .more(0)
            .errorEx('id_ctrl_access', 'id_ctrl_access'));
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
    delCtrlAccessFromGroup.valid = valid;
})(delCtrlAccessFromGroup = exports.delCtrlAccessFromGroup || (exports.delCtrlAccessFromGroup = {}));
/** Добавить группу пользователей */
var addGroup;
(function (addGroup) {
    /** APIURL */
    addGroup.route = '/aa/admin-edit-group/add-group';
    /** Alias действия */
    addGroup.action = 'add-group';
    /**
     * Валидация
     *
     * @param req MainRequest
     * @param data RequestI
     */
    function valid(req, data) {
        let rules = new Components.ModelRulesC();
        // =======================================
        // псевдоним
        rules.set(rules.rule('alias')
            .type(Components.ModelRulesT.text)
            .require()
            .minLen(3)
            .maxLen(100)
            .errorEx('alias', 'alias'));
        // Наименование
        rules.set(rules.rule('name')
            .type(Components.ModelRulesT.text)
            .minLen(3)
            .maxLen(100)
            .errorEx('name', 'name'));
        // Описание
        rules.set(rules.rule('descript')
            .type(Components.ModelRulesT.text)
            .require()
            .minLen(6)
            .maxLen(100)
            .errorEx('descript', 'descript'));
        // =======================================
        let validator = new Components.ModelValidatorSys(req.sys.errorSys);
        validator.fValid(rules.get(), data);
        return validator.getResult();
    }
    addGroup.valid = valid;
})(addGroup = exports.addGroup || (exports.addGroup = {}));
// =======================================================
/** Удалить группу */
var delGroup;
(function (delGroup) {
    /** APIURL */
    delGroup.route = '/aa/admin-edit-group/del-group';
    /** Alias действия */
    delGroup.action = 'del-group';
    /**
     * Валидация
     *
     * @param req MainRequest
     * @param data RequestI
     */
    function valid(req, data) {
        let rules = new Components.ModelRulesC();
        // =======================================
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
    delGroup.valid = valid;
})(delGroup = exports.delGroup || (exports.delGroup = {}));
/** Сохранить данные о группу */
var saveGroup;
(function (saveGroup) {
    /** APIURL */
    saveGroup.route = '/aa/admin-edit-group/save-group';
    /** Alias действия */
    saveGroup.action = 'save-group';
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
        rules.set(rules.rule('id_group')
            .type(Components.ModelRulesT.int)
            .more(0)
            .errorEx('id_group', 'id_group'));
        // Имя
        rules.set(rules.rule('name')
            .type(Components.ModelRulesT.text)
            .minLen(3)
            .maxLen(100)
            .errorEx('name', 'name'));
        // Описание
        rules.set(rules.rule('descript')
            .type(Components.ModelRulesT.text)
            .minLen(3)
            .maxLen(100)
            .errorEx('descript', 'descript'));
        // =======================================
        let validator = new Components.ModelValidatorSys(req.sys.errorSys);
        validator.fValid(rules.get(), data);
        return validator.getResult();
    }
    saveGroup.valid = valid;
})(saveGroup = exports.saveGroup || (exports.saveGroup = {}));
/** Сохранить контроллер доступа */
var saveCtrlAccess;
(function (saveCtrlAccess) {
    /** APIURL */
    saveCtrlAccess.route = '/aa/admin-edit-group/save-ctrl-access';
    /** Alias действия */
    saveCtrlAccess.action = 'save-ctrl-access';
    /**
     * Валидация
     *
     * @param req MainRequest
     * @param data RequestI
     */
    function valid(req, data) {
        let rules = new Components.ModelRulesC();
        // =======================================
        // ID контроллера доступа
        rules.set(rules.rule('id_ctrl_access')
            .type(Components.ModelRulesT.int)
            .more(0)
            .errorEx('id_ctrl_access', 'id_ctrl_access'));
        // Имя
        rules.set(rules.rule('name')
            .type(Components.ModelRulesT.text)
            .minLen(3)
            .maxLen(100)
            .errorEx('name', 'name'));
        // Описание
        rules.set(rules.rule('descript')
            .type(Components.ModelRulesT.text)
            .minLen(3)
            .maxLen(100)
            .errorEx('descript', 'descript'));
        // =======================================
        let validator = new Components.ModelValidatorSys(req.sys.errorSys);
        validator.fValid(rules.get(), data);
        return validator.getResult();
    }
    saveCtrlAccess.valid = valid;
})(saveCtrlAccess = exports.saveCtrlAccess || (exports.saveCtrlAccess = {}));
//# sourceMappingURL=AdminEditGroupV.js.map