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
    async getUserList(data) {
        data = V.getUserList.valid(this.req, data);
        let ok = this.errorSys.isOk();
        let iOffset = data.offset;
        let iLimit = data.limit;
        let aFilter = {};
        if (ok) { // Формируем параметры фильтрации
            if (data.search_fullname) {
                aFilter.search_fullname = data.search_fullname;
            }
            else {
                this.errorSys.devNotice('search_fullname', 'Поиск по ФИО отсутствует');
            }
            if (data.search_username) {
                aFilter.search_username = data.search_username;
            }
            else {
                this.errorSys.devNotice('search_username', 'Поиск по логину отсутствует');
            }
        }
        let aUserList = [];
        if (ok) { // Получить список пользователей
            aUserList = await this.userSQL.getUserList(iOffset, iLimit, aFilter);
        }
        let out = null;
        if (ok) { // Формирование ответа
            out = {
                list_user: aUserList // Список пользователей
            };
        }
        return out;
    }
    /**
     * Получить пользователя по ID
     *
     * @param array data
     * @return array|null
     */
    async getUserByID(data) {
        data = V.getUserByID.valid(this.req, data);
        let ok = this.errorSys.isOk();
        let idUser = data.user_id;
        let vUser = null;
        if (ok) { // Получить список пользователей
            vUser = await this.userSQL.getUserByID(idUser);
        }
        let out = null;
        if (ok) { // Формирование ответа
            out = {
                one_user: vUser
            };
        }
        return out;
    }
    // =======================================
    /**
     * Получить список ролей пользователя
     *
     * @param array data
     * @return array|null
     */
    async getUserGroupsByUserID(data) {
        data = V.getUserGroupsByUserID.valid(this.req, data);
        let ok = this.errorSys.isOk();
        let idUser = data.user_id;
        let aUserGroups = [];
        if (ok) { // Получить список ролей пользователя
            aUserGroups = await this.userGroupSQL.getUserGroupsByUserID(idUser);
        }
        let out = null;
        if (ok) { // Формирование ответа
            out = {
                list_group: aUserGroups
            };
        }
        return out;
    }
    /**
     * Добавить пользователя в группу - Добавить Роль
     *
     * @param array data
     * @return array|null
     */
    async addUserToGroup(data) {
        data = V.addUserToGroup.valid(this.req, data);
        let ok = this.errorSys.isOk();
        // Декларирование ошибок
        this.errorSys.declareEx({
            'add_role_to_user': 'Не удалось добавить роль пользователю'
        });
        let idUser = data.user_id;
        let idGroup = data.group_id;
        let idAddUserToGroup = 0; // ID Связи между пользователем и группой
        if (ok) { // Получить список ролей пользователя
            idAddUserToGroup = await this.userGroupSQL.addUserToGroup(idUser, idGroup);
            if (!idAddUserToGroup) {
                ok = false;
                this.errorSys.err('add_role_to_user');
            }
        }
        let out = null;
        if (ok) { // Формирование ответа
            out = {
                cmd_add_user_to_group: idAddUserToGroup
            };
        }
        return out;
    }
    /**
     * Удалить пользователя из группы - Убрать Роль
     *
     * @param array data
     * @return array|null
     */
    async delUserFromGroup(data) {
        data = V.delUserFromGroup.valid(this.req, data);
        let ok = this.errorSys.isOk();
        // Декларирование ошибок
        this.errorSys.declareEx({
            'del_role_to_user': 'Не удалось убрать роль пользователю'
        });
        let idUser = data.user_id;
        let idGroup = data.group_id;
        let bDelUserFromGroup = false;
        if (ok) { // Получить список ролей пользователя
            bDelUserFromGroup = await this.userGroupSQL.delUserFromGroup(idUser, idGroup);
            if (!bDelUserFromGroup) {
                ok = false;
                this.errorSys.error('del_role_to_user', 'Не удалось убрать роль пользователю');
            }
        }
        let out = null;
        if (ok) { // Формирование ответа
            out = {
                cmd_del_user_from_group: bDelUserFromGroup
            };
        }
        return out;
    }
    /**
     *  выдает инфу по юзеру по token
     */
    async fGetUserInfoByToken(token = '') {
        let resp;
        // Декларирование ошибок
        this.errorSys.declare([
            'invalid_token',
            'invalid_user',
        ]);
        try {
            if (token.length < 4) {
                this.errorSys.error('invalid_token', 'Что-то не так с длиной ключа');
                throw "invalid_token";
            }
            resp = await this.userSQL.fGetUserInfoByToken(token);
            if (!resp) {
                this.errorSys.error('invalid_user', 'Пользователь не найден');
                throw "invalid_user";
            }
        }
        catch (e) {
        }
        return resp;
    }
    /**
     * Получить apikey по номеру телефона или SMS
     * @param data
     */
    async getTokenByPhoneAndSms(data) {
        data = V.getTokenByPhoneAndSms.valid(this.req, data);
        let ok = this.errorSys.isOk();
        // Декларирование ошибок
        this.errorSys.declareEx({
            'get_user_by_phone_and_sms': 'Не удалось найти пользователя'
        });
        let idUser = 0;
        if (ok) { /* пытаемся получить apiKey моделью */
            idUser = await this.userSMSCode.getUserIdByPhoneAndSms(data.phone, data.sms);
            if (!idUser) {
                ok = false;
                this.errorSys.error('sms', 'Не удалось найти пользователя');
            }
        }
        let apikey = null;
        if (ok) { // Получить token пользователя
            /* проверяем есть ли уже такой юзера с ключем */
            apikey = await this.userTokenSQL.getUserApiKey(idUser);
            if (!apikey) {
                /* если в первый раз */
                /* юзер есть генерим ему apiKey тк это действие делается после регистрации */
                apikey = await this.userTokenSQL.insertUserApiKey(idUser);
            }
        }
        let out = null;
        if (ok) { // Формирование ответа
            out = {
                state_token: apikey
            };
        }
        return out;
    }
    async addUser(data) {
        data = V.addUser.valid(this.req, data);
        let ok = this.errorSys.isOk();
        // --------------------------
        let sToken = null;
        if (ok) { // Регистрируем пользователя
            sToken = await this.userSQL.faRegister(data);
            if (!sToken) {
                this.errorSys.error('register', 'Не удалось зарегистрировать пользователя');
            }
        }
        // --------------------------
        let vUserIDs = null;
        if (ok) { // Получить идентификаторы пользователя
            vUserIDs = await this.userSQL.getUserIDsByToken(sToken);
            if (!vUserIDs) {
                ok = false;
                this.errorSys.error('user_ids', 'Не удалось получить идентификаторы пользователя');
            }
        }
        // --------------------------
        let bConfirmRegister = false;
        if (ok) { // Подтвердить регистрацию
            bConfirmRegister = await this.userSQL.faConfirmRegisterByID(vUserIDs.user_id);
            if (!bConfirmRegister) {
                ok = false;
                this.errorSys.error('confirm_user', 'Не удалось получить подтвердить регистрацию');
            }
        }
        let listUser = null;
        if (ok) { // Получить список пользователей
            listUser = await this.userSQL.getUserList(0, 100, {});
        }
        // --------------------------
        let out = null;
        if (ok) { // Формирование ответа
            out = {
                cmd_confirm_register: bConfirmRegister,
                list_user: listUser // Список пользователей
            };
        }
        return out;
    }
}
exports.UserM = UserM;
//# sourceMappingURL=UserM.js.map