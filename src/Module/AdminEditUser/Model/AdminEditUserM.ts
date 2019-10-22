
// Системные классы
import BaseM from '../../../System/BaseM';

// Классы SQL Запросов
import { UserSQL } from '../../../Infrastructure/SQL/Repository/UserSQL';
import { UserGroupSQL } from '../../../Infrastructure/SQL/Repository/UserGroupSQL';

// Валидация
import * as V from '../Validator/AdminEditUserV';

// Интерфейсы и сущьности
import { UserI, UserIDs } from '../../../Infrastructure/SQL/Entity/UserE';
import { UserGroupI } from '../../../Infrastructure/SQL/Entity/UserGroupE';
import { GroupSQL } from '../../../Infrastructure/SQL/Repository/GroupSQL';

/**
 * Бизнес модель пользователя суда мы нас проксирует контроллер 1 url = 1 метод модели
 * Внутри метода делаем нужную бизнес логику
 */
export class AdminEditUserM extends BaseM
{

    private userSQL: UserSQL;
    private groupSQL: GroupSQL;
    private userGroupSQL: UserGroupSQL;

    constructor(req:any) {
        super(req);

        this.userSQL = new UserSQL(req);
        this.groupSQL = new GroupSQL(req);
        this.userGroupSQL = new UserGroupSQL(req);
    }


    /**
     * Получить стартовые данные для работы страницы
     * @param data 
     */
    public async init(data:V.init.RequestI): Promise<V.init.ResponseI> {

        data = <V.init.RequestI>V.init.valid(this.req, data);    

        let ok = this.errorSys.isOk();


        let iOffset = data.offset;

        let iLimit = data.limit;

        
        let aFilter:{
            search_surname?:string; // ФИО пользователя
            search_username?:string; // Имя пользователя
        } = {};
        if (ok) { // Формируем параметры фильтрации
            if (data.search_surname) {
                aFilter.search_surname = data.search_surname;
            } else {
                this.errorSys.devNotice('search_surname', 'Поиск по ФИО отсутствует');
            }

            if (data.search_username) {
                aFilter.search_username = data.search_username;
            } else {
                this.errorSys.devNotice('search_username', 'Поиск по логину отсутствует');
            }
        }

        let aUserList = null;
        if (ok) { // Получить список пользователей
            aUserList = await this.userSQL.getUserList(iOffset, iLimit, aFilter);
        }

        let aGroupList = null;
        if (ok) { // Получить список пользователей
            aGroupList = await this.groupSQL.getAllGroups();
        }

        let out:V.init.ResponseI = null;
        if (ok) { // Формирование ответа
            out = {
                is_init:true,
                count_user:100,
                list_user:aUserList, // Список пользователей
                list_group:aGroupList // Список всех групп
            };
        }

        return out;
    }

    /**
     * Выбрать пользователя
     *
     * @param array data
     * @return array|null
     */
    public async selectUser(data:V.selectUser.RequestI): Promise<V.selectUser.ResponseI> {

        data = <V.selectUser.RequestI>V.selectUser.valid(this.req, data);

        let ok = this.errorSys.isOk();

        let idUser = data.id_user;

        let vUser:UserI = null;
        if (ok) { // Получить список пользователей
            vUser = await this.userSQL.getUserByID(idUser);
        }

        let aUserGroups:UserGroupI[] = null;
        if (ok) { // Получить список ролей пользователя
            aUserGroups = await this.userGroupSQL.getUserGroupsByUserID(idUser);
        }

        let out:V.selectUser.ResponseI = null;
        if (ok) { // Формирование ответа
            out = {
                one_user:vUser,
                list_user_group:aUserGroups
            };
        }

        return out;
    }

    // =======================================

    /**
     * Выбрать группу
     *
     * @param array data
     * @return array|null
     */
    public async selectGroup(data:V.selectGroup.RequestI): Promise<V.selectGroup.ResponseI> {

        data = <V.selectGroup.RequestI>V.selectGroup.valid(this.req, data);

        let ok = this.errorSys.isOk();

        let idGroup = data.id_group;

        let oneGroup = [];
        if (ok) { // Получить список ролей пользователя
            oneGroup = await this.groupSQL.getGroupByID(idGroup);
        }

        let out:V.selectGroup.ResponseI = null;
        if (ok) { // Формирование ответа
            out = {
                one_group:oneGroup
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

        let idUser = data.id_user;
        let idGroup = data.id_group;

        let idAddUserToGroup = 0; // ID Связи между пользователем и группой
        if (ok) { // Получить список ролей пользователя
            idAddUserToGroup = await this.userGroupSQL.addUserToGroup(idUser, idGroup);
        }

        let aUserGroups:UserGroupI[] = null;
        if (ok) { // Получить список ролей пользователя
            aUserGroups = await this.userGroupSQL.getUserGroupsByUserID(idUser);
        }

        let out:V.addUserToGroup.ResponseI = null;
        if (ok) { // Формирование ответа
            out = {
                add_user_to_group:idAddUserToGroup,
                list_user_group:aUserGroups
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

        let idUser = data.id_user;
        let idGroup = data.id_group;

        let bDelUserFromGroup = false;
        if (ok) { // Получить список ролей пользователя
            bDelUserFromGroup = await this.userGroupSQL.delUserFromGroup(idUser, idGroup);
        }

        let aUserGroups:UserGroupI[] = null;
        if (ok) { // Получить список ролей пользователя
            aUserGroups = await this.userGroupSQL.getUserGroupsByUserID(idUser);
        }

        let out:V.delUserFromGroup.ResponseI = null;
        if (ok) { // Формирование ответа
            out = {
                del_user_from_group:bDelUserFromGroup,
                list_user_group:aUserGroups
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
                this.errorSys.error('id_users', 'Не удалось получить идентификаторы пользователя');
            }
        }

        // --------------------------

        let bAddUser = false;
        if(ok){ // Подтвердить регистрацию
            bAddUser = await this.userSQL.faConfirmRegisterByID(vUserIDs.id_user);
            if(!bAddUser){
                ok = false;
                this.errorSys.error('confirm_user', 'Не удалось получить подтвердить регистрацию');
            }
        }

        // --------------------------

        let listUser:UserI[] = null;
        if(ok){ // Получить список пользователей
            listUser = await this.userSQL.getUserList(0,100, {});
        }

        // --------------------------

        let vUser:UserI = null;
        if (ok) { // Получить список пользователей
            vUser = await this.userSQL.getUserByID(vUserIDs.id_user);
        }

        // --------------------------

        let out:V.addUser.ResponseI = null;
        if (ok) { // Формирование ответа
            out = {
                add_user:vUserIDs.id_user, 
                one_user:vUser,
                list_user:listUser // Список пользователей
            };
        }

        return out;
    }

        /**
     * 
     * @param data Удалить пользователя
     */
    public async saveUser(data:V.saveUser.RequestI): Promise<V.saveUser.ResponseI> {

        data = <V.saveUser.RequestI>V.saveUser.valid(this.req, data);

        let ok = this.errorSys.isOk();

        let idUser = data.id_user;

        let bSaveUser = false;
        if(ok){ // Подтвердить регистрацию
            bSaveUser = await this.userSQL.faUpdate(idUser, data);
        }

        // --------------------------

        let vUser:UserI = null;
        if (ok) { // Получить список пользователей
            vUser = await this.userSQL.getUserByID(idUser);
        }

        // --------------------------

        let listUser:UserI[] = null;
        if(ok){ // Получить список пользователей
            listUser = await this.userSQL.getUserList(0,100, {});
        }
        // --------------------------

        let out:V.saveUser.ResponseI = null;
        if (ok) { // Формирование ответа
            out = {
                save_user:bSaveUser, // Подтверждение регистрации
                one_user:vUser, // Измененный пользователь
                list_user:listUser // Список пользователей
            };
        }

        return out;
    }

    /**
     * 
     * @param data Удалить пользователя
     */
    public async delUser(data:V.delUser.RequestI): Promise<V.delUser.ResponseI> {

        data = <V.delUser.RequestI>V.delUser.valid(this.req, data);

        let ok = this.errorSys.isOk();

        let idUser = data.id_user;

        let bDelUser = false;
        if(ok){ // Подтвердить регистрацию
            bDelUser = await this.userSQL.faDelUser(idUser);
        }

        // --------------------------

        let listUser:UserI[] = null;
        if(ok){ // Получить список пользователей
            listUser = await this.userSQL.getUserList(0,100, {});
        }
        // --------------------------

        let out:V.delUser.ResponseI = null;
        if (ok) { // Формирование ответа
            out = {
                del_user:bDelUser, // Подтверждение регистрации
                list_user:listUser // Список пользователей
            };
        }

        return out;
    }

}
