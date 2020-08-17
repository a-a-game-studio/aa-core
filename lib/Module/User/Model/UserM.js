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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserM = void 0;
// Системные классы
const BaseM_1 = __importDefault(require("../../../System/BaseM"));
// Классы SQL Запросов
const UserSQL_1 = require("../../../Infrastructure/SQL/Repository/UserSQL");
const UserTokenSQL_1 = require("../../../Infrastructure/SQL/Repository/UserTokenSQL");
const UserSMSCodeSQL_1 = require("../../../Infrastructure/SQL/Repository/UserSMSCodeSQL");
const UserGroupSQL_1 = require("../../../Infrastructure/SQL/Repository/UserGroupSQL");
// Валидация
const V = __importStar(require("../Validator/UserV"));
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
        let idUser = data.id_user;
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
    // =====================================
    /**
     * Сохранить
     * @param data
     */
    async save(data) {
        data = V.save.valid(this.req, data);
        let ok = this.errorSys.isOk();
        let idUser = data.id_user;
        // --------------------------
        let bSave = false;
        if (ok) { // Сохранить данных о пользователе
            bSave = await this.userSQL.faUpdate(idUser, data);
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