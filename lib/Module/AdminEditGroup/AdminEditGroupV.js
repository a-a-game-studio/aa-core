"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.saveCtrlAccess = exports.saveGroup = exports.delGroup = exports.addCtrlAccess = exports.addGroup = exports.delCtrlAccessFromGroup = exports.addCtrlAccessToGroup = exports.selectCtrlAccess = exports.selectGroup = exports.init = void 0;
const Components = __importStar(require("@a-a-game-studio/aa-components/lib"));
// =======================================================
/**
 * Получить Список пользователей
 *
 * @param req MainRequest
 * @param data RequestI
 */
function init(req, data) {
    let rules = new Components.ModelRulesC();
    // ---------------------------------------
    // ---------------------------------------
    let validator = new Components.ModelValidatorSys(req.sys.errorSys);
    validator.fValid(rules.get(), data);
    return validator.getResult();
}
exports.init = init;
// =======================================================
/**
 * Выбрать группу
 *
 * @param req MainRequest
 * @param data RequestI
 */
function selectGroup(req, data) {
    let rules = new Components.ModelRulesC();
    // ---------------------------------------
    // Сколько записей получать
    rules.set(rules.rule('id_group')
        .type(Components.ModelRulesT.int)
        .require()
        .moreOrEq(0)
        .errorEx('id_group', 'id_group'));
    // ---------------------------------------
    let validator = new Components.ModelValidatorSys(req.sys.errorSys);
    validator.fValid(rules.get(), data);
    return validator.getResult();
}
exports.selectGroup = selectGroup;
// =======================================================
/**
 * Выбрать контроллер доступа
 *
 * @param req MainRequest
 * @param data RequestI
 */
function selectCtrlAccess(req, data) {
    let rules = new Components.ModelRulesC();
    // ---------------------------------------
    // ID контроллера доступа
    rules.set(rules.rule('id_ctrl_access')
        .type(Components.ModelRulesT.int)
        .require()
        .moreOrEq(0)
        .errorEx('id_ctrl_access', 'id_ctrl_access'));
    // ---------------------------------------
    let validator = new Components.ModelValidatorSys(req.sys.errorSys);
    validator.fValid(rules.get(), data);
    return validator.getResult();
}
exports.selectCtrlAccess = selectCtrlAccess;
// =======================================================
/**
 * Добавить права группе на контроллер
 *
 * @param req MainRequest
 * @param data RequestI
 */
function addCtrlAccessToGroup(req, data) {
    let rules = new Components.ModelRulesC();
    // ---------------------------------------
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
    // ---------------------------------------
    let validator = new Components.ModelValidatorSys(req.sys.errorSys);
    validator.fValid(rules.get(), data);
    return validator.getResult();
}
exports.addCtrlAccessToGroup = addCtrlAccessToGroup;
// =======================================================
/**
 * Удалить права на контроллер у группы
 *
 * @param req MainRequest
 * @param data RequestI
 */
function delCtrlAccessFromGroup(req, data) {
    let rules = new Components.ModelRulesC();
    // ---------------------------------------
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
    // ---------------------------------------
    let validator = new Components.ModelValidatorSys(req.sys.errorSys);
    validator.fValid(rules.get(), data);
    return validator.getResult();
}
exports.delCtrlAccessFromGroup = delCtrlAccessFromGroup;
// =======================================================
/**
 * Добавить группу пользователей
 *
 * @param req MainRequest
 * @param data RequestI
 */
function addGroup(req, data) {
    let rules = new Components.ModelRulesC();
    // ---------------------------------------
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
    // ---------------------------------------
    let validator = new Components.ModelValidatorSys(req.sys.errorSys);
    validator.fValid(rules.get(), data);
    return validator.getResult();
}
exports.addGroup = addGroup;
// =======================================================
/**
 * Добавить группу контроллер доступа
 *
 * @param req MainRequest
 * @param data RequestI
 */
function addCtrlAccess(req, data) {
    let rules = new Components.ModelRulesC();
    // ---------------------------------------
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
    // ---------------------------------------
    let validator = new Components.ModelValidatorSys(req.sys.errorSys);
    validator.fValid(rules.get(), data);
    return validator.getResult();
}
exports.addCtrlAccess = addCtrlAccess;
// =======================================================
/**
 * Удалить группу
 *
 * @param req MainRequest
 * @param data RequestI
 */
function delGroup(req, data) {
    let rules = new Components.ModelRulesC();
    // ---------------------------------------
    // ID группы
    rules.set(rules.rule('id_group')
        .type(Components.ModelRulesT.int)
        .require()
        .more(0)
        .errorEx('id_group', 'id_group'));
    // ---------------------------------------
    let validator = new Components.ModelValidatorSys(req.sys.errorSys);
    validator.fValid(rules.get(), data);
    return validator.getResult();
}
exports.delGroup = delGroup;
// =======================================================
/**
 * Сохранить данные о группе
 *
 * @param req MainRequest
 * @param data RequestI
 */
function saveGroup(req, data) {
    let rules = new Components.ModelRulesC();
    // ---------------------------------------
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
    // ---------------------------------------
    let validator = new Components.ModelValidatorSys(req.sys.errorSys);
    validator.fValid(rules.get(), data);
    return validator.getResult();
}
exports.saveGroup = saveGroup;
/**
 * Сохранить контроллер доступа
 *
 * @param req MainRequest
 * @param data RequestI
 */
function saveCtrlAccess(req, data) {
    let rules = new Components.ModelRulesC();
    // ---------------------------------------
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
    // ---------------------------------------
    let validator = new Components.ModelValidatorSys(req.sys.errorSys);
    validator.fValid(rules.get(), data);
    return validator.getResult();
}
exports.saveCtrlAccess = saveCtrlAccess;
//# sourceMappingURL=AdminEditGroupV.js.map