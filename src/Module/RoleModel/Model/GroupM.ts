
// Системные классы
import BaseM from '../../../System/BaseM';

// Классы SQL Запросов
import {UserSQL} from '../../../Infrastructure/SQL/Repository/UserSQL';
import {GroupSQL} from '../../../Infrastructure/SQL/Repository/GroupSQL';

// Валидация
import * as V from '../Validator/GroupV';

/**
 * Группы пользователей
 * Внутри метода делаем нужную бизнес логику
 */
export class GroupM extends BaseM
{
    /** @var SQL\UserSQL userSQL */
    private userSQL: UserSQL;

    /** @var SQL\GroupSQL groupSQL */
    private groupSQL: GroupSQL;

    constructor(req:any) {
        super(req);

        this.userSQL = new UserSQL(req);
        this.groupSQL = new GroupSQL(req);
    }


    /**
     * Получить список ролей/группы
     *
     * @param array data
     * @return array|null
     */
    public async getAllGroups(data:V.getAllGroups.RequestI): Promise<V.getAllGroups.ResponseI> {

        data = <V.getAllGroups.RequestI>V.getAllGroups.valid(this.req, data);

        let ok = this.errorSys.isOk()

        this.errorSys.declare([
            'get_all_roles' // Не удалось получить группы пользователей
        ]);

        let allGroupsList = null;
        if( ok ){ // Получить список ролей
            allGroupsList = await this.groupSQL.getAllGroups();

            if( !allGroupsList ){
                ok = false;
                this.errorSys.error('get_all_roles','Не удалось получить группы пользователей');
            }

        }

        let out:V.getAllGroups.ResponseI = null;
        if( ok ){ // Формирование ответа
            out = {
                list_group:allGroupsList
            }
        }

        return out;
    }


    /**
     * Получить сокращенную иформацию группы по ID
     *
     * @param array data
     * @return array|null
     */
    public async getGroupByID(data:V.getGroupByID.RequestI): Promise<V.getGroupByID.ResponseI> {

        data = <V.getGroupByID.RequestI>V.getGroupByID.valid(this.req, data);

        let ok = this.errorSys.isOk();

        let idGroup = data.group_id;

        let groupList = null;
        if( ok ){ // Получить группу
            groupList = await this.groupSQL.getGroupByID(idGroup);

            if( !groupList ){
                ok = false;
                this.errorSys.error('get_group','Не удалось получить группы пользователей');
            }
        }

        let out = null;
        if( ok ){ // Формирование ответа
            out = groupList;
        }

        return out;
    }

    /**
     * Добавить группу
     *
     * @param array data
     * @return array|null
     */
    public async addGroup(data:V.addGroup.RequestI): Promise<V.addGroup.ResponseI> {

        data = <V.addGroup.RequestI>V.addGroup.valid(this.req, data);

        let ok = this.errorSys.isOk();


        let idAddGroup:number = 0;
        if( ok ){ // Получить группу
            idAddGroup = await this.groupSQL.addGroup(data);
            ok = this.errorSys.isOk();
        }

        let out:V.addGroup.ResponseI = null;
        if( ok ){ // Формирование ответа
            out = {
                group_id:idAddGroup,
            }
        }

        return out;
    }

    /**
     * Получить сокращенную иформацию группы по ID
     *
     * @param array data
     * @return array|null
     */
    public async saveGroup(data:V.saveGroup.RequestI): Promise<V.saveGroup.ResponseI> {

        data = <V.saveGroup.RequestI>V.saveGroup.valid(this.req, data);

        let ok = this.errorSys.isOk();

        let idGroup = data.group_id;

        let bSaveGroup = false;
        if( ok ){ // Получить группу
            bSaveGroup = await this.groupSQL.saveGroup(idGroup, data);

            if( !bSaveGroup ){
                ok = false;
                this.errorSys.error('save_group','Не удалось сохранить данные группы');
            }
        }

        let out:V.saveGroup.ResponseI = null;
        if( ok ){ // Формирование ответа
            out = {
                cmd_save_group:bSaveGroup,
            }
        }

        return out;
    }

    /**
     * Удалить группу по ID
     *
     * @param array data
     * @return array|null
     */
    public async delGroup(data:V.delGroup.RequestI): Promise<V.delGroup.ResponseI> {

        data = <V.delGroup.RequestI>V.delGroup.valid(this.req, data);

        let ok = this.errorSys.isOk();

        let idGroup = data.group_id;

        let bDelGroup = false;
        if( ok ){ // Получить группу
            bDelGroup = await this.groupSQL.delGroupByID(idGroup);
            ok = this.errorSys.isOk();
        }

        let out:V.delGroup.ResponseI = null;
        if( ok ){ // Формирование ответа
            out = {
                del_group:bDelGroup,
            }
        }

        return out;
    }

}
