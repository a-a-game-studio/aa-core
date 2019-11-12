"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const Components = __importStar(require("@a-a-game-studio/aa-components/lib"));
// =======================================================
/**
 * Начальные данные
 *
 * @param req MainRequest
 * @param data RequestI
 */
function init(req, data) {
    let rules = new Components.ModelRulesC();
    // ---------------------------------------
    let validator = new Components.ModelValidatorSys(req.sys.errorSys);
    validator.fValid(rules.get(), data);
    return validator.getResult();
}
exports.init = init;
// =======================================================
/**
 * Залогиниться
 *
 * @param req MainRequest
 * @param data RequestI
 */
function login(req, data) {
    let rules = new Components.ModelRulesC();
    // ---------------------------------------
    // Проверка с какой записи получать данные
    rules.set(rules.rule('login')
        .type(Components.ModelRulesT.text)
        .require()
        .minLen(3)
        .maxLen(100)
        .errorEx('login', 'login'));
    // Сколько записей получать
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
exports.login = login;
// =======================================================
/**
 * Зарегистрироваться
 *
 * @param req MainRequest
 * @param data RequestI
 */
function register(req, data) {
    let rules = new Components.ModelRulesC();
    // ---------------------------------------
    // логин
    rules.set(rules.rule('login')
        .type(Components.ModelRulesT.text)
        .require()
        .minLen(3)
        .maxLen(100)
        .errorEx('login', 'login'));
    // email
    rules.set(rules.rule('email')
        .type(Components.ModelRulesT.str)
        .require()
        .if('.+@.+\..+')
        .minLen(3)
        .maxLen(100)
        .errorEx('email', 'email'));
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
exports.register = register;
//# sourceMappingURL=LoginV.js.map