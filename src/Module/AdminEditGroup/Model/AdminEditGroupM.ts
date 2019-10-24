
// Системные классы
import BaseM from '../../../System/BaseM';

// Классы SQL Запросов
import { CtrlAccessSQL } from '../../../Infrastructure/SQL/Repository/CtrlAccessSQL';
import { AccessGroupSQL } from '../../../Infrastructure/SQL/Repository/AccessGroupSQL';

// Валидация
import * as V from '../Validator/AdminEditGroupV';

// Интерфейсы и сущьности
import { CtrlAccessI } from '../../../Infrastructure/SQL/Entity/CtrlAccessE';
import { AccessGroupI } from '../../../Infrastructure/SQL/Entity/AccessGroupE';
import { GroupSQL } from '../../../Infrastructure/SQL/Repository/GroupSQL';
import { GroupI } from '../../../Infrastructure/SQL/Entity/GroupE';

/**
 * Бизнес модель пользователя суда мы нас проксирует контроллер 1 url = 1 метод модели
 * Внутри метода делаем нужную бизнес логику
 */
export class AdminEditGroupM extends BaseM
{

    private ctrlAccessSQL: CtrlAccessSQL;
    private groupSQL: GroupSQL;
    private accessGroupSQL: AccessGroupSQL;

    constructor(req:any) {
        super(req);

        this.ctrlAccessSQL = new CtrlAccessSQL(req);
        this.groupSQL = new GroupSQL(req);
        this.accessGroupSQL = new AccessGroupSQL(req);
    }


    /**
     * Получить стартовые данные для работы страницы
     * @param data 
     */
    public async init(data:V.init.RequestI): Promise<V.init.ResponseI> {

        data = <V.init.RequestI>V.init.valid(this.req, data);    

        let ok = this.errorSys.isOk();

        let aAccessCtrlList = null;
        if (ok) { // Получить список пользователей
            aAccessCtrlList = await this.ctrlAccessSQL.getAllCtrlAccess();
        }

        let aGroupList = null;
        if (ok) { // Получить список пользователей
            aGroupList = await this.groupSQL.getAllGroups();
        }

        let out:V.init.ResponseI = null;
        if (ok) { // Формирование ответа
            out = {
                is_init:true,
                list_ctrl_access:aAccessCtrlList, // Список пользователей
                list_group:aGroupList // Список всех групп
            };
        }

        return out;
    }

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

        let vGroup:GroupI = null;
        if (ok) { // Получить список групп
            vGroup = await this.groupSQL.getGroupByID(idGroup);
        }

        let aAccessGroups:AccessGroupI[] = null;
        if (ok) { // Получить список ролей пользователя
            aAccessGroups = await this.accessGroupSQL.getCtrlAccessOfGroupByID(idGroup);
        }

        let out:V.selectGroup.ResponseI = null;
        if (ok) { // Формирование ответа
            out = {
                one_group:vGroup,
                list_access_group:aAccessGroups
            };
        }

        return out;
    }

    // =======================================

    /**
     * Выбрать контроллер доступа
     *
     * @param array data
     * @return array|null
     */
    public async selectCtrlAccess(data:V.selectCtrlAccess.RequestI): Promise<V.selectCtrlAccess.ResponseI> {

        data = <V.selectCtrlAccess.RequestI>V.selectCtrlAccess.valid(this.req, data);

        let ok = this.errorSys.isOk();

        let idCtrlAccess = data.id_ctrl_access;

        let oneCtrlAccess = [];
        if (ok) { // Получить список ролей пользователя
            oneCtrlAccess = await this.ctrlAccessSQL.getCtrlAccessByID(idCtrlAccess);
        }

        let out:V.selectCtrlAccess.ResponseI = null;
        if (ok) { // Формирование ответа
            out = {
                one_ctrl_access:oneCtrlAccess
            }
        }

        return out;
    }

    /**
     * Добавить добавить контроллер доступа группе
     *
     * @param array data
     */
    public async addCtrlAccessToGroup(data:V.addCtrlAccessToGroup.RequestI): Promise<V.addCtrlAccessToGroup.ResponseI> {

        data = <V.addCtrlAccessToGroup.RequestI>V.addCtrlAccessToGroup.valid(this.req, data);

        let ok = this.errorSys.isOk();

        let idCtrlAccess = data.id_ctrl_access;
        let idGroup = data.id_group;

        let idAddCtrlAccessToGroup = 0; // ID Связи между контроллером доступа и группой
        if (ok) { // Дать права группе на контроллер/модуль
            idAddCtrlAccessToGroup = await this.accessGroupSQL.addCtrlAccessToGroup(idCtrlAccess, idGroup);
        }

        let aAccessGroups:AccessGroupI[] = null;
        if (ok) { // Получить список модулей доступных группе
            aAccessGroups = await this.accessGroupSQL.getCtrlAccessOfGroupByID(idGroup);
        }

        let out:V.addCtrlAccessToGroup.ResponseI = null;
        if (ok) { // Формирование ответа
            out = {
                add_ctrl_access_to_group:idAddCtrlAccessToGroup,
                list_access_group:aAccessGroups
            };
        }

        return out;
    }

    /**
     * Удалить права группы на контроллер/модуль
     *
     * @param array data
     */
    public async delCtrlAccessFromGroup(data:V.delCtrlAccessFromGroup.RequestI): Promise<V.delCtrlAccessFromGroup.ResponseI> {

        data = <V.delCtrlAccessFromGroup.RequestI>V.delCtrlAccessFromGroup.valid(this.req, data);

        let ok = this.errorSys.isOk();

        let idCtrlAccess = data.id_ctrl_access;
        let idGroup = data.id_group;

        let bDelCtrlAccessFromGroup = false;
        if (ok) { // Удалить права на модуль у группы
            bDelCtrlAccessFromGroup = await this.accessGroupSQL.delCtrlAccessFromGroup(idCtrlAccess, idGroup);
        }

        let aAccessGroups:AccessGroupI[] = null;
        if (ok) { // Получить список модулей группы
            aAccessGroups = await this.accessGroupSQL.getCtrlAccessOfGroupByID(idGroup);
        }

        let out:V.delCtrlAccessFromGroup.ResponseI = null;
        if (ok) { // Формирование ответа
            out = {
                del_ctrl_access_from_group:bDelCtrlAccessFromGroup,
                list_access_group:aAccessGroups
            };
        }

        return out;
    }

    /**
     * Добавить группу пользователей
     * @param data 
     */
    public async addGroup(data:V.addGroup.RequestI): Promise<V.addGroup.ResponseI> {

        data = <V.addGroup.RequestI>V.addGroup.valid(this.req, data);

        let ok = this.errorSys.isOk();

        // --------------------------

        let idGroup:number = null;
        if(ok){ // Регистрируем пользователя
            idGroup = await this.groupSQL.addGroup(data);
            if(!idGroup){
                this.errorSys.error('add_group', 'Не удалось создать группу');
            }
        }

        // --------------------------

        let listGroup:GroupI[] = null;
        if(ok){ // Получить список групп
            listGroup = await this.groupSQL.getAllGroups();
        }

        // --------------------------

        let vGroup:GroupI = null;
        if (ok) { // Получить список пользователей
            vGroup = await this.groupSQL.getGroupByID(idGroup);
        }

        // --------------------------

        let out:V.addGroup.ResponseI = null;
        if (ok) { // Формирование ответа
            out = {
                add_group:idGroup, 
                one_group:vGroup,
                list_group:listGroup // Список пользователей
            };
        }

        return out;
    }

    /**
     * Сохранить группу
     * @param data данные
     */
    public async saveGroup(data:V.saveGroup.RequestI): Promise<V.saveGroup.ResponseI> {

        data = <V.saveGroup.RequestI>V.saveGroup.valid(this.req, data);

        let ok = this.errorSys.isOk();

        let idGroup = data.id_group;

        let bSaveGroup = false;
        if(ok){ // Сохранить группу
            bSaveGroup = await this.groupSQL.saveGroup(idGroup, data);
        }

        // --------------------------

        let vGroup:GroupI = null;
        if (ok) { // Получить информация по группу
            vGroup = await this.groupSQL.getGroupByID(idGroup);
        }

        // --------------------------

        let listGroup:GroupI[] = null;
        if(ok){ // Получить список групп
            listGroup = await this.groupSQL.getAllGroups();
        }
        // --------------------------

        let out:V.saveGroup.ResponseI = null;
        if (ok) { // Формирование ответа
            out = {
                save_group:bSaveGroup, // Подтверждение регистрации
                one_group:vGroup, // Измененный пользователь
                list_group:listGroup // Список пользователей
            };
        }

        return out;
    }

    /**
     * Удалить группу
     * @param data 
     */
    public async delGroup(data:V.delGroup.RequestI): Promise<V.delGroup.ResponseI> {

        data = <V.delGroup.RequestI>V.delGroup.valid(this.req, data);

        let ok = this.errorSys.isOk();

        let idGroup = data.id_group;

        let bDelGroup = false;
        if(ok){ // Подтвердить регистрацию
            bDelGroup = await this.groupSQL.delGroupByID(idGroup);
        }

        // --------------------------

        let listGroup:GroupI[] = null;
        if(ok){ // Получить список пользователей
            listGroup = await this.groupSQL.getAllGroups();
        }
        // --------------------------

        let out:V.delGroup.ResponseI = null;
        if (ok) { // Формирование ответа
            out = {
                del_group:bDelGroup, // Подтверждение регистрации
                list_group:listGroup // Список пользователей
            };
        }

        return out;
    }

}
