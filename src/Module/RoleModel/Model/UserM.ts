
// Системные классы
import BaseM from '../../../System/BaseM';

// Классы SQL Запросов
import { UserSQL } from '../../../Infrastructure/SQL/Repository/UserSQL';
import { UserTokenSQL } from '../../../Infrastructure/SQL/Repository/UserTokenSQL';
import { UserSMSCodeSQL } from '../../../Infrastructure/SQL/Repository/UserSMSCodeSQL';
import { UserGroupSQL } from '../../../Infrastructure/SQL/Repository/UserGroupSQL';

// Валидация
import * as V from '../Validator/UserV';

// Интерфейсы и сущьности
import { UserI, UserIDs } from '../../../Infrastructure/SQL/Entity/UserE';

/**
 * Бизнес модель пользователя суда мы нас проксирует контроллер 1 url = 1 метод модели
 * Внутри метода делаем нужную бизнес логику
 */
export class UserM extends BaseM
{

    private userSQL: UserSQL;
    private userSMSCode: UserSMSCodeSQL;
    private userTokenSQL: UserTokenSQL;
    private userGroupSQL: UserGroupSQL;

    constructor(req:any) {
        super(req);

        this.userSQL = new UserSQL(req);
        this.userTokenSQL = new UserTokenSQL(req);
        this.userSMSCode = new UserSMSCodeSQL(req);
        this.userGroupSQL = new UserGroupSQL(req);
    }


    public async getUserList(data:V.getUserList.RequestI): Promise<V.getUserList.ResponseI> {

        data = <V.getUserList.RequestI>V.getUserList.valid(this.req, data);    

        let ok = this.errorSys.isOk();


        let iOffset = data.offset;

        let iLimit = data.limit;

        
        let aFilter:{
            search_fullname?:string; // ФИО пользователя
            search_username?:string; // Имя пользователя
        } = {};
        if (ok) { // Формируем параметры фильтрации
            if (data.search_fullname) {
                aFilter.search_fullname = data.search_fullname;
            } else {
                this.errorSys.devNotice('search_fullname', 'Поиск по ФИО отсутствует');
            }

            if (data.search_username) {
                aFilter.search_username = data.search_username;
            } else {
                this.errorSys.devNotice('search_username', 'Поиск по логину отсутствует');
            }
        }

        let aUserList = [];
        if (ok) { // Получить список пользователей
            aUserList = await this.userSQL.getUserList(iOffset, iLimit, aFilter);
        }

        

        let out:V.getUserList.ResponseI = null;
        if (ok) { // Формирование ответа
            out = {
                list_user:aUserList // Список пользователей
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
    public async getUserByID(data:V.getUserByID.RequestI): Promise<V.getUserByID.ResponseI> {

        data = <V.getUserByID.RequestI>V.getUserByID.valid(this.req, data);

        let ok = this.errorSys.isOk();

        let idUser = data.user_id;

        let vUser:UserI = null;
        if (ok) { // Получить список пользователей
            vUser = await this.userSQL.getUserByID(idUser);
        }

        let out:V.getUserByID.ResponseI = null;
        if (ok) { // Формирование ответа
            out = {
                one_user:vUser
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
    public async getUserGroupsByUserID(data:V.getUserGroupsByUserID.RequestI): Promise<V.getUserGroupsByUserID.ResponseI> {

        data = <V.getUserGroupsByUserID.RequestI>V.getUserGroupsByUserID.valid(this.req, data);

        let ok = this.errorSys.isOk();

        let idUser = data.user_id

        let aUserGroups = [];
        if (ok) { // Получить список ролей пользователя

            aUserGroups = await this.userGroupSQL.getUserGroupsByUserID(idUser);

        }

        let out:V.getUserGroupsByUserID.ResponseI = null;
        if (ok) { // Формирование ответа
            out = {
                list_group:aUserGroups
            }
        }

        return out;
    }

    /**
     * Добавить пользователя в группу - Добавить Роль
     *
     * @param array data
     * @return array|null
     */
    public async addUserToGroup(data:V.addUserToGroup.RequestI): Promise<V.addUserToGroup.ResponseI> {

        data = <V.addUserToGroup.RequestI>V.addUserToGroup.valid(this.req, data);

        let ok = this.errorSys.isOk();

        // Декларирование ошибок
        this.errorSys.declareEx({
            'add_role_to_user':'Не удалось добавить роль пользователю'
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

        let out:V.addUserToGroup.ResponseI = null;
        if (ok) { // Формирование ответа
            out = {
                cmd_add_user_to_group:idAddUserToGroup
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
    public async delUserFromGroup(data:V.delUserFromGroup.RequestI): Promise<V.delUserFromGroup.ResponseI> {

        data = <V.delUserFromGroup.RequestI>V.delUserFromGroup.valid(this.req, data);

        let ok = this.errorSys.isOk();

        // Декларирование ошибок
        this.errorSys.declareEx({
            'del_role_to_user':'Не удалось убрать роль пользователю'
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

        let out:V.delUserFromGroup.ResponseI = null;
        if (ok) { // Формирование ответа
            out = {
                cmd_del_user_from_group:bDelUserFromGroup
            };
        }

        return out;
    }


    /**
     *  выдает инфу по юзеру по token 
     */
    public async fGetUserInfoByToken(token = '') {
        let resp;
        // Декларирование ошибок
        this.errorSys.declare([
            'invalid_token', // Что-то не так с длиной ключа
            'invalid_user', //Пользователь не найден
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

        } catch (e) {

        }

        return resp;

    }


    /**
     * Получить apikey по номеру телефона или SMS
     * @param data 
     */
    public async getTokenByPhoneAndSms(data:V.getTokenByPhoneAndSms.RequestI): Promise<V.getTokenByPhoneAndSms.ResponseI> {

        data = <V.getTokenByPhoneAndSms.RequestI>V.getTokenByPhoneAndSms.valid(this.req, data);

        let ok = this.errorSys.isOk();

        // Декларирование ошибок
        this.errorSys.declareEx({
            'get_user_by_phone_and_sms':'Не удалось найти пользователя'
        });

        let idUser = 0;
        if( ok ){ /* пытаемся получить apiKey моделью */

            idUser = await this.userSMSCode.getUserIdByPhoneAndSms(data.phone, data.sms);

            if(!idUser){
                ok = false;
                this.errorSys.error('sms', 'Не удалось найти пользователя');
            }
        }

        let apikey = null;
        if( ok ){ // Получить token пользователя
            /* проверяем есть ли уже такой юзера с ключем */
            apikey = await this.userTokenSQL.getUserApiKey(idUser);

            if (!apikey) {
                /* если в первый раз */
                /* юзер есть генерим ему apiKey тк это действие делается после регистрации */
                apikey = await this.userTokenSQL.insertUserApiKey(idUser);
            }
        }


        let out:V.getTokenByPhoneAndSms.ResponseI = null;
        if (ok) { // Формирование ответа
            out = {
                state_token:apikey
            };
        }

        return out;

    }

    public async addUser(data:V.addUser.RequestI): Promise<V.addUser.ResponseI> {

        data = <V.addUser.RequestI>V.addUser.valid(this.req, data);

        let ok = this.errorSys.isOk();

        // --------------------------

        let sToken:string = null;
        if(ok){ // Регистрируем пользователя
            sToken = await this.userSQL.faRegister(data);
            if(!sToken){
                this.errorSys.error('register', 'Не удалось зарегистрировать пользователя');
            }
        }

        // --------------------------

        let vUserIDs:UserIDs = null;
        if(ok){ // Получить идентификаторы пользователя
            vUserIDs = await this.userSQL.getUserIDsByToken(sToken);
            if(!vUserIDs){
                ok = false;
                this.errorSys.error('user_ids', 'Не удалось получить идентификаторы пользователя');
            }
        }

        // --------------------------

        let bConfirmRegister = false;
        if(ok){ // Подтвердить регистрацию
            bConfirmRegister = await this.userSQL.faConfirmRegisterByID(vUserIDs.user_id);
            if(!bConfirmRegister){
                ok = false;
                this.errorSys.error('confirm_user', 'Не удалось получить подтвердить регистрацию');
            }
        }

        let listUser:UserI[] = null;
        if(ok){ // Получить список пользователей
            listUser = await this.userSQL.getUserList(0,100, {});
        }

        // --------------------------

        let out:V.addUser.ResponseI = null;
        if (ok) { // Формирование ответа
            out = {
                cmd_confirm_register:bConfirmRegister, // Подтверждение регистрации
                list_user:listUser // Список пользователей
            };
        }

        return out;
    }

}
