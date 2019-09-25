
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
import { UserI } from '../../../Infrastructure/SQL/Entity/UserE';

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
     *  выдает инфу по юзеру по apikey 
     */
    public async fGetUserInfoByApiKey(apikey = '') {
        let resp;
        // Декларирование ошибок
        this.errorSys.declare([
            'invalid_apikey', // Что-то не так с длиной ключа
            'invalid_user', //Пользователь не найден
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

        } catch (e) {

        }

        return resp;

    }


    /**
     * Получить apikey по номеру телефона или SMS
     * @param data 
     */
    public async getApiKeyByPhoneAndSms(data:V.getApiKeyByPhoneAndSms.RequestI): Promise<V.getApiKeyByPhoneAndSms.ResponseI> {

        data = <V.getApiKeyByPhoneAndSms.RequestI>V.getApiKeyByPhoneAndSms.valid(this.req, data);

        let ok = this.errorSys.isOk();

        // Декларирование ошибок
        this.errorSys.declareEx({
            'get_user_by_tel_and_sms':'Не удалось найти пользователя'
        });

        let idUser = 0;
        if( ok ){ /* пытаемся получить apiKey моделью */

            idUser = await this.userSMSCode.getUserIdByPhoneAndSms(data.tel, data.sms);

            if(!idUser){
                ok = false;
                this.errorSys.error('sms', 'Не удалось найти пользователя');
            }
        }

        let apikey = null;
        if( ok ){ // Получить apikey пользователя
            /* проверяем есть ли уже такой юзера с ключем */
            apikey = await this.userTokenSQL.getUserApiKey(idUser);

            if (!apikey) {
                /* если в первый раз */
                /* юзер есть генерим ему apiKey тк это действие делается после регистрации */
                apikey = await this.userTokenSQL.insertUserApiKey(idUser);
            }
        }


        let out:V.getApiKeyByPhoneAndSms.ResponseI = null;
        if (ok) { // Формирование ответа
            out = {
                state_apikey:apikey
            };
        }

        return out;

    }


}
