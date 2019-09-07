
// Системные классы
import BaseM from '../../../System/BaseM';

// Классы SQL Запросов
import {UserSQL} from '../../../Infrastructure/SQL/Repository/UserSQL';
import {GroupsSQL} from '../../../Infrastructure/SQL/Repository/GroupsSQL';

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

    /** @var SQL\GroupsSQL groupsSQL */
    private groupsSQL: GroupsSQL;

    constructor(req:any) {
        super(req);

        this.userSQL = new UserSQL(req);
        this.groupsSQL = new GroupsSQL(req);
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
            allGroupsList = await this.groupsSQL.getAllGroups();

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
            groupList = await this.groupsSQL.getGroupByID(idGroup);

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
            bSaveGroup = await this.groupsSQL.saveGroup(idGroup, data);

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

}
