"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Системные классы
const BaseM_1 = require("../../../System/BaseM");
// Классы SQL Запросов
const UserSQL_1 = require("../../../Infrastructure/SQL/Repository/UserSQL");
const UserGroupSQL_1 = require("../../../Infrastructure/SQL/Repository/UserGroupSQL");
/**
 * Бизнес модель пользователя суда мы нас проксирует контроллер 1 url = 1 метод модели
 * Внутри метода делаем нужную бизнес логику
 */
class UserM extends BaseM_1.default {
    constructor(req) {
        super(req);
        this.userSQL = new UserSQL_1.UserSQL(req);
        this.userGroupSQL = new UserGroupSQL_1.UserGroupSQL(req);
    }
    async getUserList(data) {
        let ok = this.errorSys.isOk();
        // Декларирование ошибок
        this.errorSys.declare([
            'offset',
            'limit',
            'limit_big',
        ]);
        let iOffset = 0;
        if (!data['offset']) {
            ok = false;
            this.errorSys.error('offset', 'offset отсутствует');
        }
        else {
            iOffset = Number(data['offset']);
        }
        let iLimit = 20;
        if (!data['limit']) {
            ok = false;
            this.errorSys.error('limit', 'limit отсутствует');
        }
        else {
            iLimit = Number(data['limit']);
        }
        let aFilter = {};
        if (ok) { // Формируем параметры фильтрации
            if (data['search_fullname']) {
                aFilter['search_fullname'] = String(data['search_fullname']);
            }
            else {
                this.errorSys.devNotice('search_fullname', 'Поиск по ФИО отсутствует');
            }
            if (data['search_username']) {
                aFilter['search_username'] = String(data['search_username']);
            }
            else {
                this.errorSys.devNotice('search_username', 'Поиск по логину отсутствует');
            }
        }
        if (ok && iLimit > 100) { // Проверяем чтобы лимит был не больше 100
            ok = false;
            this.errorSys.error('limit_big', 'размер страницы слишком большой');
        }
        let aUserList = [];
        if (ok) { // Получить список пользователей
            aUserList = await this.userSQL.getUserList(iOffset, iLimit, aFilter);
        }
        let out = null;
        if (ok) { // Формирование ответа
            out = aUserList;
        }
        else {
            out = [];
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
        let ok = this.errorSys.isOk();
        // Декларирование ошибок
        this.errorSys.declare([
            'user_id' // Отсутствует ID пользователя
        ]);
        let idUser = 0;
        if (!data['user_id']) {
            ok = false;
            this.errorSys.error('user_id', 'Отсутствует ID пользователя');
        }
        else {
            idUser = Number(data['user_id']);
        }
        let aUser = [];
        if (ok) { // Получить список пользователей
            aUser = await this.userSQL.getUserByID(idUser);
        }
        let out = null;
        if (ok) { // Формирование ответа
            out = aUser;
        }
        else {
            out = [];
        }
        return out;
    }
    /**
     * Получить список ролей пользователя
     *
     * @param array data
     * @return array|null
     */
    async getUserGroupsByUserID(data) {
        let ok = this.errorSys.isOk(); // Статус выполнения
        // Декларирование ошибок
        this.errorSys.declare([
            'user_id' // Отсутствует ID пользователя
        ]);
        let idUser = 0;
        if (!data['user_id']) {
            ok = false;
            this.errorSys.error('user_id', 'Отсутствует ID пользователя');
        }
        else {
            idUser = Number(data['user_id']);
        }
        let aUserGroups = [];
        if (ok) { // Получить список ролей пользователя
            aUserGroups = await this.userGroupSQL.getUserGroupsByUserID(idUser);
        }
        let out = null;
        if (ok) { // Формирование ответа
            out = aUserGroups;
        }
        else {
            out = [];
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
        let ok = this.errorSys.isOk(); // Статус выполнения
        // Декларирование ошибок
        this.errorSys.declare([
            'group_id',
            'add_role_to_user' // Не удалось добавить роль пользователю
        ]);
        let idUser = 0;
        if (!data['user_id']) {
            ok = false;
            this.errorSys.error('user_id', 'Отсутствует ID пользователя');
        }
        else {
            idUser = Number(data['user_id']);
        }
        let idGroup = 0;
        if (!data['group_id']) {
            ok = false;
            this.errorSys.error('group_id', 'Отсутствует ID группы');
        }
        else {
            idGroup = Number(data['group_id']);
        }
        let bAddUserToGroup = false;
        if (ok) { // Получить список ролей пользователя
            bAddUserToGroup = await this.userGroupSQL.addUserToGroup(idUser, idGroup);
            if (!bAddUserToGroup) {
                ok = false;
                this.errorSys.error('add_role_to_user', 'Не удалось добавить роль пользователю');
            }
        }
        // Не возвращаем никаких данных
        return null;
    }
    /**
     * Удалить пользователя из группы - Убрать Роль
     *
     * @param array data
     * @return array|null
     */
    async delUserFromGroup(data) {
        let ok = this.errorSys.isOk(); // Статус выполнения
        // Декларирование ошибок
        this.errorSys.declare([
            'user_id',
            'group_id',
            'del_role_to_user' // Не удалось убрать роль пользователю
        ]);
        let idUser = 0;
        if (!data['user_id']) {
            ok = false;
            this.errorSys.error('user_id', 'Отсутствует ID пользователя');
        }
        else {
            idUser = Number(data['user_id']);
        }
        let idGroup = 0;
        if (!data['group_id']) {
            ok = false;
            this.errorSys.error('group_id', 'Отсутствует ID группы');
        }
        else {
            idGroup = Number(data['group_id']);
        }
        let bDelUserFromGroup = false;
        if (ok) { // Получить список ролей пользователя
            bDelUserFromGroup = await this.userGroupSQL.delUserFromGroup(idUser, idGroup);
            if (!bDelUserFromGroup) {
                ok = false;
                this.errorSys.error('del_role_to_user', 'Не удалось убрать роль пользователю');
            }
        }
        // Не возвращаем никаких данных
        return null;
    }
    /* выдает инфу по юзеру по apikey */
    async fGetUserInfoByApiKey(apikey = '') {
        let resp;
        // Декларирование ошибок
        this.errorSys.declare([
            'invalid_apikey',
            'invalid_user',
        ]);
        try {
            if (apikey.length < 4) {
                this.errorSys.error('invalid_apikey', 'Что-то не так с длиной ключа');
                throw "invalid_apikey";
            }
            resp = await this.userSQL.fGetUserInfoByApiKey(apikey);
            if (!resp) {
                this.errorSys.error('invalid_user', 'Пользователь не найден');
                throw "invalid_user";
            }
        }
        catch (e) {
        }
        return resp;
    }
    /* выдает ключ по теелфону и смс паролю */
    /*
        request {
            phone: string
            sms: string
        }
        response {
            error: {
                phone: boolean //ошибка в логине
                sms: boolean //ошибка в пароле
                auth: boolean //ошибка в авторизации
        },
        apiKey: string
        }
     */
    async getApiKeyByPhoneAndSms(body) {
        let ok = true;
        let apikey;
        // Декларирование ошибок
        this.errorSys.declare([
            'phone',
            'sms',
            'reg',
        ]);
        try {
            if (!body) {
                this.errorSys.error('phone', 'Не заполнено поле телефон');
                this.errorSys.error('sms', 'Не заполнено поле sms');
                throw "erro body";
            }
            /* если нету телефона */
            if (!body.phone) {
                this.errorSys.error('phone', 'Не заполнено поле телефон');
                ok = false;
            }
            /* если нету sms */
            if (!body.sms) {
                this.errorSys.error('sms', 'Не заполнено поле sms');
                ok = false;
            }
            /* пытаемся получить apiKey моделью */
            let userId = await this.userSQL.getUserIdByPhoneAndSms(body.phone, body.sms);
            /* если нету такого юзера  */
            if (!userId) {
                this.errorSys.error('sms', 'Такой пользователь отсутствует');
                ok = false;
            }
            if (!ok) {
                throw "erro body";
            }
            /* проверяем есть ли уже такой юзера с ключем */
            apikey = await this.userSQL.getUserApiKey(userId);
            if (!apikey) {
                /* если в первый раз */
                /* юзер есть генерим ему apiKey тк это действие делается после регистрации */
                apikey = await this.userSQL.insertUserApiKey(userId);
            }
            /* response.setStatusCode(200); */
        }
        catch (e) {
            /* что-то не так */
        }
        return apikey;
    }
}
exports.UserM = UserM;
//# sourceMappingURL=UserM.js.map