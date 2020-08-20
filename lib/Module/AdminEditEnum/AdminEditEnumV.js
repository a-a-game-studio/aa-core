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
exports.saveEnumParam = exports.saveEnum = exports.delEnumParam = exports.delEnum = exports.addEnumParam = exports.addEnum = exports.selectEnumParam = exports.selectEnum = exports.getEnumTreeType = exports.init = void 0;
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
 * Получить Список пользователей
 *
 * @param req MainRequest
 * @param data RequestI
 */
function getEnumTreeType(req, data) {
    let rules = new Components.ModelRulesC();
    // ---------------------------------------
    // ---------------------------------------
    let validator = new Components.ModelValidatorSys(req.sys.errorSys);
    validator.fValid(rules.get(), data);
    return validator.getResult();
}
exports.getEnumTreeType = getEnumTreeType;
// =======================================================
/**
 * Выбрать группу
 *
 * @param req MainRequest
 * @param data RequestI
 */
function selectEnum(req, data) {
    let rules = new Components.ModelRulesC();
    // ---------------------------------------
    // Сколько записей получать
    rules.set(rules.rule('id_enum')
        .type(Components.ModelRulesT.int)
        .require()
        .moreOrEq(0)
        .errorEx('id_enum', 'id_enum'));
    // ---------------------------------------
    let validator = new Components.ModelValidatorSys(req.sys.errorSys);
    validator.fValid(rules.get(), data);
    return validator.getResult();
}
exports.selectEnum = selectEnum;
// =======================================================
/**
 * Выбрать контроллер доступа
 *
 * @param req MainRequest
 * @param data RequestI
 */
function selectEnumParam(req, data) {
    let rules = new Components.ModelRulesC();
    // ---------------------------------------
    // ID контроллера доступа
    rules.set(rules.rule('id_enum_param')
        .type(Components.ModelRulesT.int)
        .require()
        .moreOrEq(0)
        .errorEx('id_enum_param', 'id_enum_param'));
    // ---------------------------------------
    let validator = new Components.ModelValidatorSys(req.sys.errorSys);
    validator.fValid(rules.get(), data);
    return validator.getResult();
}
exports.selectEnumParam = selectEnumParam;
// =======================================================
/**
 * Добавить enum
 *
 * @param req MainRequest
 * @param data RequestI
 */
function addEnum(req, data) {
    let rules = new Components.ModelRulesC();
    // ---------------------------------------
    // ---------------------------------------
    let validator = new Components.ModelValidatorSys(req.sys.errorSys);
    validator.fValid(rules.get(), data);
    return validator.getResult();
}
exports.addEnum = addEnum;
// =======================================================
/**
 * Добавить группу контроллер доступа
 *
 * @param req MainRequest
 * @param data RequestI
 */
function addEnumParam(req, data) {
    let rules = new Components.ModelRulesC();
    // ---------------------------------------
    // ID контроллера доступа
    rules.set(rules.rule('id_enum')
        .type(Components.ModelRulesT.int)
        .require()
        .moreOrEq(0)
        .errorEx('id_enum', 'id_enum'));
    // ---------------------------------------
    let validator = new Components.ModelValidatorSys(req.sys.errorSys);
    validator.fValid(rules.get(), data);
    return validator.getResult();
}
exports.addEnumParam = addEnumParam;
// =======================================================
/**
 * Удалить группу
 *
 * @param req MainRequest
 * @param data RequestI
 */
function delEnum(req, data) {
    let rules = new Components.ModelRulesC();
    // ---------------------------------------
    // ID группы
    rules.set(rules.rule('id_enum')
        .type(Components.ModelRulesT.int)
        .require()
        .more(0)
        .errorEx('id_enum', 'id_enum'));
    // ---------------------------------------
    let validator = new Components.ModelValidatorSys(req.sys.errorSys);
    validator.fValid(rules.get(), data);
    return validator.getResult();
}
exports.delEnum = delEnum;
// =======================================================
/**
 * Удалить группу
 *
 * @param req MainRequest
 * @param data RequestI
 */
function delEnumParam(req, data) {
    let rules = new Components.ModelRulesC();
    // ---------------------------------------
    // ID enum
    rules.set(rules.rule('id_enum')
        .type(Components.ModelRulesT.int)
        .require()
        .more(0)
        .errorEx('id_enum', 'id_enum'));
    // ID enum param
    rules.set(rules.rule('id_enum_param')
        .type(Components.ModelRulesT.int)
        .require()
        .more(0)
        .errorEx('id_enum_param', 'id_enum_param'));
    // ---------------------------------------
    let validator = new Components.ModelValidatorSys(req.sys.errorSys);
    validator.fValid(rules.get(), data);
    return validator.getResult();
}
exports.delEnumParam = delEnumParam;
// =======================================================
/**
 * Сохранить данные о группе
 *
 * @param req MainRequest
 * @param data RequestI
 */
function saveEnum(req, data) {
    let rules = new Components.ModelRulesC();
    // ---------------------------------------
    // ID пользователя
    rules.set(rules.rule('id_enum')
        .type(Components.ModelRulesT.int)
        .more(0)
        .errorEx('id_enum', 'id_enum'));
    // Псевдоним
    rules.set(rules.rule('k')
        .type(Components.ModelRulesT.text)
        .minLen(3)
        .maxLen(100)
        .errorEx('k', 'k'));
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
    // path1
    rules.set(rules.rule('path1')
        .type(Components.ModelRulesT.text)
        .minLen(1)
        .maxLen(50)
        .errorEx('path1', 'path1'));
    // path2
    rules.set(rules.rule('path2')
        .type(Components.ModelRulesT.text)
        .minLen(1)
        .maxLen(50)
        .errorEx('path2', 'path2'));
    // path3
    rules.set(rules.rule('path3')
        .type(Components.ModelRulesT.text)
        .minLen(1)
        .maxLen(50)
        .errorEx('path3', 'path3'));
    // ---------------------------------------
    let validator = new Components.ModelValidatorSys(req.sys.errorSys);
    validator.fValid(rules.get(), data);
    return validator.getResult();
}
exports.saveEnum = saveEnum;
/**
 * Сохранить контроллер доступа
 *
 * @param req MainRequest
 * @param data RequestI
 */
function saveEnumParam(req, data) {
    let rules = new Components.ModelRulesC();
    // ---------------------------------------
    // ID enum параметра
    rules.set(rules.rule('id_enum_param')
        .type(Components.ModelRulesT.int)
        .more(0)
        .errorEx('id_enum_param', 'id_enum_param'));
    // KEY
    rules.set(rules.rule('k')
        .type(Components.ModelRulesT.text)
        .minLen(3)
        .maxLen(100)
        .errorEx('k', 'k'));
    // Имя
    rules.set(rules.rule('name')
        .type(Components.ModelRulesT.text)
        .minLen(3)
        .maxLen(100)
        .errorEx('name', 'name'));
    // type
    rules.set(rules.rule('type')
        .type(Components.ModelRulesT.text)
        .errorEx('type', 'type'));
    // val
    rules.set(rules.rule('val')
        .type(Components.ModelRulesT.int)
        .errorEx('val', 'val'));
    // Описание
    rules.set(rules.rule('descript')
        .type(Components.ModelRulesT.text)
        .minLen(3)
        .maxLen(100)
        .errorEx('descript', 'descript'));
    // arg1
    rules.set(rules.rule('arg1')
        .type(Components.ModelRulesT.text)
        .errorEx('arg1', 'arg1'));
    // arg2
    rules.set(rules.rule('arg2')
        .type(Components.ModelRulesT.text)
        .errorEx('arg2', 'arg2'));
    // arg3
    rules.set(rules.rule('arg3')
        .type(Components.ModelRulesT.text)
        .errorEx('arg3', 'arg3'));
    // ---------------------------------------
    let validator = new Components.ModelValidatorSys(req.sys.errorSys);
    validator.fValid(rules.get(), data);
    return validator.getResult();
}
exports.saveEnumParam = saveEnumParam;
//# sourceMappingURL=AdminEditEnumV.js.map