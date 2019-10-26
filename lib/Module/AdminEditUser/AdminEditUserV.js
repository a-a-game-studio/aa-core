"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Components = require("@a-a-game-studio/aa-components/lib");
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