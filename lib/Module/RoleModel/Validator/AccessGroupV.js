"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Components = require("@a-a-game-studio/aa-components/lib");
// =======================================================
/** Получить Список пользователей */
var getCtrlAccessOfGroupByID;
(function (getCtrlAccessOfGroupByID) {
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
        rules.set(rules.rule('group_id')
            .type(Components.ModelRulesT.int)
            .require()
            .moreOrEq(0)
            .errorEx('group_id', 'group_id'));
        // =======================================
        let validator = new Components.ModelValidatorSys(req.sys.errorSys);
        validator.fValid(rules.get(), data);
        return validator.getResult();
    }
    getCtrlAccessOfGroupByID.valid = valid;
})(getCtrlAccessOfGroupByID = exports.getCtrlAccessOfGroupByID || (exports.getCtrlAccessOfGroupByID = {}));
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
/** Сохранить разрешения на греппе на контроллер */
var saveAccessGroup;
(function (saveAccessGroup) {
    /**
     * Валидация
     *
     * @param req MainRequest
     * @param data RequestI
     */
    function valid(req, data) {
        let rules = new Components.ModelRulesC();
        // =======================================
        // ID параметров доступа
        rules.set(rules.rule('access_group_id')
            .type(Components.ModelRulesT.int)
            .require()
            .moreOrEq(0)
            .errorEx('access_group_id', 'access_group_id'));
        // Разрешение на создание
        rules.set(rules.rule('create_access')
            .type(Components.ModelRulesT.boolean)
            .errorEx('create_access', 'create_access'));
        // Разрешение на чтение
        rules.set(rules.rule('read_access')
            .type(Components.ModelRulesT.boolean)
            .errorEx('read_access', 'read_access'));
        // Разрешение на обновление
        rules.set(rules.rule('update_access')
            .type(Components.ModelRulesT.boolean)
            .errorEx('update_access', 'update_access'));
        // Разрешение на удаление
        rules.set(rules.rule('delete_access')
            .type(Components.ModelRulesT.boolean)
            .errorEx('delete_access', 'delete_access'));
        // =======================================
        let validator = new Components.ModelValidatorSys(req.sys.errorSys);
        validator.fValid(rules.get(), data);
        return validator.getResult();
    }
    saveAccessGroup.valid = valid;
})(saveAccessGroup = exports.saveAccessGroup || (exports.saveAccessGroup = {}));
// =======================================================
/** Добавить контроллер доступа к группе */
var addCtrlAccessToGroup;
(function (addCtrlAccessToGroup) {
    /**
     * Валидация
     *
     * @param req MainRequest
     * @param data RequestI
     */
    function valid(req, data) {
        let rules = new Components.ModelRulesC();
        // =======================================
        // ID контроллера
        rules.set(rules.rule('ctrl_access_id')
            .type(Components.ModelRulesT.int)
            .require()
            .more(0)
            .errorEx('ctrl_access_id', 'ctrl_access_id'));
        // =======================================
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
    addCtrlAccessToGroup.valid = valid;
})(addCtrlAccessToGroup = exports.addCtrlAccessToGroup || (exports.addCtrlAccessToGroup = {}));
// =======================================================
/** Удалить контроллер доступа у группы */
var delCtrlAccessFromGroup;
(function (delCtrlAccessFromGroup) {
    /**
     * Валидация
     *
     * @param req MainRequest
     * @param data RequestI
     */
    function valid(req, data) {
        let rules = new Components.ModelRulesC();
        // =======================================
        // ID контроллера
        rules.set(rules.rule('ctrl_access_id')
            .type(Components.ModelRulesT.int)
            .require()
            .more(0)
            .errorEx('ctrl_access_id', 'ctrl_access_id'));
        // =======================================
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
    delCtrlAccessFromGroup.valid = valid;
})(delCtrlAccessFromGroup = exports.delCtrlAccessFromGroup || (exports.delCtrlAccessFromGroup = {}));
//# sourceMappingURL=AccessGroupV.js.map