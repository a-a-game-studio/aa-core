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
exports.saveUser = exports.delUser = exports.addUser = exports.delUserFromGroup = exports.addUserToGroup = exports.selectGroup = exports.selectUser = exports.init = void 0;
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
    // ---------------------------------------
    let validator = new Components.ModelValidatorSys(req.sys.errorSys);
    validator.fValid(rules.get(), data);
    return validator.getResult();
}
exports.init = init;
// =======================================================
/**
 * Выбрать пользователя
 *
 * @param req MainRequest
 * @param data RequestI
 */
function selectUser(req, data) {
    let rules = new Components.ModelRulesC();
    // ---------------------------------------
    // Сколько записей получать
    rules.set(rules.rule('id_user')
        .type(Components.ModelRulesT.int)
        .require()
        .moreOrEq(0)
        .errorEx('id_user', 'id_user'));
    // ---------------------------------------
    let validator = new Components.ModelValidatorSys(req.sys.errorSys);
    validator.fValid(rules.get(), data);
    return validator.getResult();
}
exports.selectUser = selectUser;
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
    // ID Группа пользователей
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
 * Добавить пользователя к группе
 *
 * @param req MainRequest
 * @param data RequestI
 */
function addUserToGroup(req, data) {
    let rules = new Components.ModelRulesC();
    // ---------------------------------------
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
    // ---------------------------------------
    let validator = new Components.ModelValidatorSys(req.sys.errorSys);
    validator.fValid(rules.get(), data);
    return validator.getResult();
}
exports.addUserToGroup = addUserToGroup;
// =======================================================
/**
 * Удалить пользователя из группы
 *
 * @param req MainRequest
 * @param data RequestI
 */
function delUserFromGroup(req, data) {
    let rules = new Components.ModelRulesC();
    // ---------------------------------------
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
    // ---------------------------------------
    let validator = new Components.ModelValidatorSys(req.sys.errorSys);
    validator.fValid(rules.get(), data);
    return validator.getResult();
}
exports.delUserFromGroup = delUserFromGroup;
// =======================================================
/**
 * Добавить пользователя
 *
 * @param req MainRequest
 * @param data RequestI
 */
function addUser(req, data) {
    let rules = new Components.ModelRulesC();
    // ---------------------------------------
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
    // ---------------------------------------
    let validator = new Components.ModelValidatorSys(req.sys.errorSys);
    validator.fValid(rules.get(), data);
    return validator.getResult();
}
exports.addUser = addUser;
// =======================================================
/**
 * Удалить пользователя
 *
 * @param req MainRequest
 * @param data RequestI
 */
function delUser(req, data) {
    let rules = new Components.ModelRulesC();
    // ---------------------------------------
    // ID пользователя
    rules.set(rules.rule('id_user')
        .type(Components.ModelRulesT.int)
        .require()
        .more(0)
        .errorEx('id_user', 'id_user'));
    // ---------------------------------------
    let validator = new Components.ModelValidatorSys(req.sys.errorSys);
    validator.fValid(rules.get(), data);
    return validator.getResult();
}
exports.delUser = delUser;
/**
 * Сохранить данные о пользователе
 *
 * @param req MainRequest
 * @param data RequestI
 */
function saveUser(req, data) {
    let rules = new Components.ModelRulesC();
    // ---------------------------------------
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
    // ---------------------------------------
    let validator = new Components.ModelValidatorSys(req.sys.errorSys);
    validator.fValid(rules.get(), data);
    return validator.getResult();
}
exports.saveUser = saveUser;
//# sourceMappingURL=AdminEditUserV.js.map