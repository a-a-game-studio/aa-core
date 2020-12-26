"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
// Системные классы
const BaseM_1 = __importDefault(require("../../System/BaseM"));
// Классы SQL Запросов
const UserSQL_1 = require("../../Infrastructure/SQL/Repository/UserSQL");
// Валидация
const V = __importStar(require("./LoginV"));
/**
 * Бизнес модель пользователя суда мы нас проксирует контроллер 1 url = 1 метод модели
 * Внутри метода делаем нужную бизнес логику
 */
class LoginM extends BaseM_1.default {
    constructor(req) {
        super(req);
        this.userSQL = new UserSQL_1.UserSQL(req);
    }
    async init(data) {
        data = V.init(this.req, data);
        let ok = this.errorSys.isOk();
        let idUser = this.userSys.getIdUser();
        // --------------------------
        let vUser = null;
        if (ok) { // Получить пользователя по токену
            vUser = await this.userSQL.fGetUserInfoById(idUser);
        }
        console.log(vUser);
        // --------------------------
        let out = null;
        if (ok) { // Формирование ответа
            out = {
                is_login: this.userSys.ifAuth(),
                one_user_info: vUser,
                id_user: vUser.id_user
            };
        }
        return out;
    }
    async login(data) {
        data = V.login(this.req, data);
        let ok = this.errorSys.isOk();
        let sLogin = data.login;
        let sPswd = data.pswd;
        // --------------------------
        let sToken = null;
        if (ok) { // Получить токен по логину и паролю
            sToken = await this.userSQL.faGetTokenByLoginAndPass(sLogin, sPswd);
            if (!sToken) {
                this.errorSys.error('get_token', 'Не удалось получить токен');
            }
        }
        // --------------------------
        let vUser = null;
        if (ok) { // Получить пользователя по токену
            vUser = await this.userSQL.fGetUserInfoByToken(sToken);
            if (!vUser) {
                this.errorSys.error('get_user_by_token', 'Не удалось получить пользователя по токену');
            }
        }
        // --------------------------
        let out = null;
        if (ok) { // Формирование ответа
            out = {
                is_login: true,
                one_user: vUser,
                token: sToken // Токен
            };
        }
        return out;
    }
    // =========================================
    async register(data) {
        data = V.register(this.req, data);
        let ok = this.errorSys.isOk();
        // --------------------------
        let sToken = null;
        if (ok) { // регистрируем пользователя
            sToken = await this.userSQL.faRegister(data);
            if (!sToken) {
                this.errorSys.error('get_token', 'Не удалось получить токен');
            }
        }
        // --------------------------
        let out = null;
        if (ok) { // Формирование ответа
            out = {
                token: sToken // Токен
            };
        }
        return out;
    }
}
exports.LoginM = LoginM;
//# sourceMappingURL=LoginM.js.map