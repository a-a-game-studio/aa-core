"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Системные классы
const BaseM_1 = require("../../../System/BaseM");
// Классы SQL Запросов
const UserSQL_1 = require("../../../Infrastructure/SQL/Repository/UserSQL");
const UserTokenSQL_1 = require("../../../Infrastructure/SQL/Repository/UserTokenSQL");
const UserSMSCodeSQL_1 = require("../../../Infrastructure/SQL/Repository/UserSMSCodeSQL");
const UserGroupSQL_1 = require("../../../Infrastructure/SQL/Repository/UserGroupSQL");
// Валидация
const V = require("../Validator/UserV");
/**
 * Бизнес модель пользователя суда мы нас проксирует контроллер 1 url = 1 метод модели
 * Внутри метода делаем нужную бизнес логику
 */
class UserM extends BaseM_1.default {
    constructor(req) {
        super(req);
        this.userSQL = new UserSQL_1.UserSQL(req);
        this.userTokenSQL = new UserTokenSQL_1.UserTokenSQL(req);
        this.userSMSCode = new UserSMSCodeSQL_1.UserSMSCodeSQL(req);
        this.userGroupSQL = new UserGroupSQL_1.UserGroupSQL(req);
    }
    async getSelfUserInfo(data) {
        data = V.getSelfUserInfo.valid(this.req, data);
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
                one_user_info: vUser,
            };
        }
        return out;
    }
    async getUserInfo(data) {
        data = V.getUserInfo.valid(this.req, data);
        let ok = this.errorSys.isOk();
        let idUser = data.user_id;
        // --------------------------
        let vUser = null;
        if (ok) { // Получить пользователя по токену
            vUser = await this.userSQL.fGetUserInfoById(idUser);
            if (!vUser) {
                this.errorSys.error('get_user_by_token', 'Не удалось получить пользователя по токену');
            }
        }
        // --------------------------
        let out = null;
        if (ok) { // Формирование ответа
            out = {
                one_user_info: vUser,
            };
        }
        return out;
    }
    async login(data) {
        data = V.login.valid(this.req, data);
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
                one_user: vUser,
                token: sToken // Токен
            };
        }
        return out;
    }
    // =========================================
    async register(data) {
        data = V.register.valid(this.req, data);
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
    // =====================================
    /**
     * Сохранить
     * @param data
     */
    async save(data) {
        data = V.save.valid(this.req, data);
        let ok = this.errorSys.isOk();
        let idUser = data.user_id;
        // --------------------------
        let bSave = false;
        if (ok) { // Сохранить данных о пользователе
            bSave = await this.userSQL.faUpdate(data);
        }
        // --------------------------
        let vUser = null;
        if (ok) { // Получить пользователя по ID
            vUser = await this.userSQL.getUserByID(idUser);
            if (!vUser) {
                this.errorSys.error('get_user_by_token', 'Не удалось получить пользователя по токену');
            }
        }
        // --------------------------
        let out = null;
        if (ok) { // Формирование ответа
            out = {
                save_user: bSave,
                one_user: vUser // Список пользователей
            };
        }
        return out;
    }
}
exports.UserM = UserM;
//# sourceMappingURL=UserM.js.map