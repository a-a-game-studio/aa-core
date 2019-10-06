"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Components = require("@a-a-game-studio/aa-components/lib");
// =======================================================
/** Получить информацию о группе */
var getGroupByID;
(function (getGroupByID) {
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
    getGroupByID.valid = valid;
})(getGroupByID = exports.getGroupByID || (exports.getGroupByID = {}));
// =======================================================
/** Получить все группы */
var getAllGroups;
(function (getAllGroups) {
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
    getAllGroups.valid = valid;
})(getAllGroups = exports.getAllGroups || (exports.getAllGroups = {}));
// =======================================================
/** Добавить группу */
var addGroup;
(function (addGroup) {
    /**
     * Валидация
     *
     * @param req MainRequest
     * @param data RequestI
     */
    function valid(req, data) {
        let rules = new Components.ModelRulesC();
        // =======================================
        // Имя
        rules.set(rules.rule('name')
            .type(Components.ModelRulesT.text)
            .require()
            .errorEx('name', 'name'));
        // Псевдоним
        rules.set(rules.rule('alias')
            .require()
            .type(Components.ModelRulesT.text)
            .errorEx('alias', 'alias'));
        // Описание
        rules.set(rules.rule('descript')
            .type(Components.ModelRulesT.text)
            .errorEx('descript', 'descript'));
        // =======================================
        let validator = new Components.ModelValidatorSys(req.sys.errorSys);
        validator.fValid(rules.get(), data);
        return validator.getResult();
    }
    addGroup.valid = valid;
})(addGroup = exports.addGroup || (exports.addGroup = {}));
// =======================================================
/** Сохранить группу */
var saveGroup;
(function (saveGroup) {
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
        rules.set(rules.rule('group_id')
            .type(Components.ModelRulesT.int)
            .require()
            .moreOrEq(0)
            .errorEx('group_id', 'group_id'));
        // Имя
        rules.set(rules.rule('name')
            .type(Components.ModelRulesT.text)
            .errorEx('name', 'name'));
        // Псевдоним
        rules.set(rules.rule('alias')
            .type(Components.ModelRulesT.text)
            .errorEx('alias', 'alias'));
        // Описание
        rules.set(rules.rule('descript')
            .type(Components.ModelRulesT.text)
            .errorEx('descript', 'descript'));
        // =======================================
        let validator = new Components.ModelValidatorSys(req.sys.errorSys);
        validator.fValid(rules.get(), data);
        return validator.getResult();
    }
    saveGroup.valid = valid;
})(saveGroup = exports.saveGroup || (exports.saveGroup = {}));
// =======================================================
/** Удалить группу */
var delGroup;
(function (delGroup) {
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
    delGroup.valid = valid;
})(delGroup = exports.delGroup || (exports.delGroup = {}));
//# sourceMappingURL=GroupV.js.map