"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Components = require("@a-a-game-studio/aa-components/lib");
// =======================================================
/** Получить информацию о группе */
var getCtrlAccessByAlias;
(function (getCtrlAccessByAlias) {
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
        rules.set(rules.rule('alias')
            .type(Components.ModelRulesT.text)
            .require()
            .minLen(3)
            .maxLen(50)
            .errorEx('group_id', 'group_id'));
        // =======================================
        let validator = new Components.ModelValidatorSys(req.sys.errorSys);
        validator.fValid(rules.get(), data);
        return validator.getResult();
    }
    getCtrlAccessByAlias.valid = valid;
})(getCtrlAccessByAlias = exports.getCtrlAccessByAlias || (exports.getCtrlAccessByAlias = {}));
// =======================================================
/** Получить все модули */
var getAllCtrlAccess;
(function (getAllCtrlAccess) {
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
    getAllCtrlAccess.valid = valid;
})(getAllCtrlAccess = exports.getAllCtrlAccess || (exports.getAllCtrlAccess = {}));
// =======================================================
/** Сохранить контроллер доступа */
var saveCtrlAccess;
(function (saveCtrlAccess) {
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
        rules.set(rules.rule('ctrl_access_id')
            .type(Components.ModelRulesT.int)
            .require()
            .errorEx('ctrl_access_id', 'ctrl_access_id'));
        // =======================================
        // Псевдоним
        rules.set(rules.rule('alias')
            .type(Components.ModelRulesT.text)
            .minLen(3)
            .maxLen(50)
            .errorEx('alias', 'alias'));
        // =======================================
        // Имя контроллера
        rules.set(rules.rule('name')
            .type(Components.ModelRulesT.text)
            .minLen(3)
            .maxLen(100)
            .errorEx('alias', 'alias'));
        // =======================================
        // Описание
        rules.set(rules.rule('descript')
            .type(Components.ModelRulesT.text)
            .errorEx('descript', 'descript'));
        // =======================================
        let validator = new Components.ModelValidatorSys(req.sys.errorSys);
        validator.fValid(rules.get(), data);
        return validator.getResult();
    }
    saveCtrlAccess.valid = valid;
})(saveCtrlAccess = exports.saveCtrlAccess || (exports.saveCtrlAccess = {}));
// =======================================================
/** Добавить контроллер доступа */
var addCtrlAccess;
(function (addCtrlAccess) {
    /**
     * Валидация
     *
     * @param req MainRequest
     * @param data RequestI
     */
    function valid(req, data) {
        let rules = new Components.ModelRulesC();
        // =======================================
        // Псевдоним
        rules.set(rules.rule('alias')
            .type(Components.ModelRulesT.text)
            .require()
            .minLen(3)
            .maxLen(50)
            .errorEx('alias', 'alias'));
        // =======================================
        // Имя контроллера
        rules.set(rules.rule('name')
            .type(Components.ModelRulesT.text)
            .minLen(3)
            .maxLen(100)
            .errorEx('alias', 'alias'));
        // =======================================
        // Описание
        rules.set(rules.rule('descript')
            .type(Components.ModelRulesT.text)
            .errorEx('descript', 'descript'));
        // =======================================
        let validator = new Components.ModelValidatorSys(req.sys.errorSys);
        validator.fValid(rules.get(), data);
        return validator.getResult();
    }
    addCtrlAccess.valid = valid;
})(addCtrlAccess = exports.addCtrlAccess || (exports.addCtrlAccess = {}));
// =======================================================
/** Добавить контроллер доступа */
var delCtrlAccess;
(function (delCtrlAccess) {
    /**
     * Валидация
     *
     * @param req MainRequest
     * @param data RequestI
     */
    function valid(req, data) {
        let rules = new Components.ModelRulesC();
        // =======================================
        // Псевдоним
        rules.set(rules.rule('alias')
            .type(Components.ModelRulesT.text)
            .require()
            .minLen(3)
            .maxLen(50)
            .errorEx('alias', 'alias'));
        // =======================================
        let validator = new Components.ModelValidatorSys(req.sys.errorSys);
        validator.fValid(rules.get(), data);
        return validator.getResult();
    }
    delCtrlAccess.valid = valid;
})(delCtrlAccess = exports.delCtrlAccess || (exports.delCtrlAccess = {}));
//# sourceMappingURL=CtrlAccessV.js.map