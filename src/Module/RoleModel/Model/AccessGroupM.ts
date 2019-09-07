
// Системные классы
import BaseM from '../../../System/BaseM';

// Классы SQL Запросов
import {UserSQL} from '../../../Infrastructure/SQL/Repository/UserSQL';
import {CtrlAccessSQL} from '../../../Infrastructure/SQL/Repository/CtrlAccessSQL';
import {AccessGroupSQL} from '../../../Infrastructure/SQL/Repository/AccessGroupSQL';

// Валидация
import * as V from '../Validator/AccessGroupV';

/**
 * Контроллеры доступа по модулям
 * Внутри метода делаем нужную бизнес логику
 */
export class AccessGroupM extends BaseM
{

    private userSQL:UserSQL;
    private ctrlAccessSQL:CtrlAccessSQL;
    private accessGroupSQL:AccessGroupSQL;

    public constructor(req:any) {
        super(req);

        this.userSQL = new UserSQL(req);
        this.ctrlAccessSQL = new CtrlAccessSQL(req);
        this.accessGroupSQL = new AccessGroupSQL(req);
    }


    /**
     * Получить иформацию по контроллеру
     *
     * @param array data
     * @return array|null
     */
    public async getCtrlAccessOfGroupByID(data:V.getCtrlAccessOfGroupByID.RequestI): Promise<V.getCtrlAccessOfGroupByID.ResponseI> {

        data = <V.getCtrlAccessOfGroupByID.RequestI>V.getCtrlAccessOfGroupByID.valid(this.req, data);

        let ok = this.errorSys.isOk();

        let idGroup = data.group_id;

        let ctrlAccessList = null;
        if( ok ){ // Получить список модулей доступных группе
            ctrlAccessList = await this.accessGroupSQL.getCtrlAccessOfGroupByID(idGroup);

            if( !ctrlAccessList ){
                this.errorSys.devWarning('group_no_has_ctrl_access','Группа не имеет доступных ей модулей');
            }
        }

        let out:V.getCtrlAccessOfGroupByID.ResponseI = null;
        if( ok ){ // Формирование ответа
            out = {
                list_ctrl_access:ctrlAccessList
            };
        }

        return out;
    }

    /**
     * Добавить разрешения на модуль в группу
     *
     * @param array data
     * @return array|null
     */
    public async addCtrlAccessToGroup(data:V.addCtrlAccessToGroup.RequestI): Promise<V.addCtrlAccessToGroup.ResponseI> {

        data = <V.addCtrlAccessToGroup.RequestI>V.addCtrlAccessToGroup.valid(this.req, data);

        let ok = this.errorSys.isOk();

        this.errorSys.declareEx({
            'is_exist_ctrl_access':'Проверка на существование доступа',
            'cnt_access_group':'Группа уже имеет доступ к этому модулю',
            'add_ctrl_access_to_group':'Не удалось добавить доступ на модуль группе',
        });

        let idCtrlAccess = data.ctrl_access_id;
        let idGroup = data.group_id;

        let cntAccessGroup:number = 0;
        if( ok ){ // Проверить существуют ли связь модуля и группы
            cntAccessGroup = await this.accessGroupSQL.cntAccessGroup(idCtrlAccess, idGroup);
            if( cntAccessGroup < 0 ){
                ok = false;
                this.errorSys.error('is_exist_ctrl_access','Проверка на существования доступа провалилась');
            }
        }

        if( ok && cntAccessGroup > 0 ){ // Если связь уже существует - говорим об ошибке
            ok = false;
            this.errorSys.error('cnt_access_group','Группа уже имеет доступ к этому модулю');
        }

        let idAccessGroup:number = 0;
        if( ok ){ // Получить список ролей пользователя
            idAccessGroup = await this.accessGroupSQL.addCtrlAccessToGroup(idCtrlAccess, idGroup);

            if( idAccessGroup < 1){
                ok = false;
                this.errorSys.error('add_ctrl_access_to_group','Не удалось добавить доступ на модуль группе');
            }
        }

        let out:V.addCtrlAccessToGroup.ResponseI = null;
        if( ok ){ // Формирование ответа
            out = {
                cmd_add_ctrl_access_to_group:idAccessGroup
            };
        }

        return out;
    }


    /**
     * Изменить данные доступа группе
     *
     * @param array data
     * @return null
     */
    public async saveAccessGroup(data:V.saveAccessGroup.RequestI): Promise<V.saveAccessGroup.ResponseI> {

        data = <V.saveAccessGroup.RequestI>V.saveAccessGroup.valid(this.req, data);

        let ok = this.errorSys.isOk();

        this.errorSys.declareEx({
            'save_access_group':'Не удалось изменить параметры доступа'
        });

        let idAccessGroup = data.access_group_id;

        let bAccessGroup = false;
        if( ok ){ // Изменить параметры доступа
            bAccessGroup = await this.accessGroupSQL.saveAccessGroup(idAccessGroup, data);

            if( !bAccessGroup ){
                ok = false;
                this.errorSys.error('save_access_group','Не удалось изменить параметры доступа');
            }
        }

        let out:V.saveAccessGroup.ResponseI = null;
        if( ok ){ // Формирование ответа
            out = {
                cmd_save_access_group:bAccessGroup
            };
        }

        return out;
    }

    /**
     * Удалить доступ к модулю из группы
     *
     * @param array data
     * @return null
     */
    public async delCtrlAccessFromGroup( data:any ): Promise<void>{
        let ok = this.errorSys.isOk(); // Статус выполнения

        this.errorSys.declare([
            'ctrl_access_id', // Отсутствует ID модуля
            'group_id', // Отсутствует ID группы
            'is_exist_ctrl_access', // Проверка на существования доступа провалилась
            'cnt_access_group', // Группа не имеет доступ к этому модулю
            'del_ctrl_access_to_group' // Не удалось убрать права на модуль у группы
        ]);


        let idCtrlAccess = 0;
        if( !data['ctrl_access_id'] ){
            ok = false;
            this.errorSys.error('ctrl_access_id','Отсутствует ID модуля');
        } else {
            idCtrlAccess = Number(data['ctrl_access_id']);
        }

        let idGroup = 0;
        if( !data['group_id'] ){
            ok = false;
            this.errorSys.error('group_id','Отсутствует ID группы');
        } else {
            idGroup = Number(data['group_id']);
        }

        let cntAccessGroup = 0;
        if( ok ){ // Проверить существуют ли связь модуля и группы
            cntAccessGroup = await this.accessGroupSQL.cntAccessGroup(idCtrlAccess, idGroup);
            if( cntAccessGroup < 0 ){
                ok = false;
                this.errorSys.error('is_exist_ctrl_access','Проверка на существования доступа провалилась');
            }
        }

        if( ok && cntAccessGroup < 1){ // Если связь не существует - говорим об ошибке
            ok = false;
            this.errorSys.error('cnt_access_group','Группа не имеет доступ к этому модулю');
        }

        let delCtrlAccessFromGroup = false;
        if( ok ){ // Удалить права на модуль из группы
            delCtrlAccessFromGroup = await this.accessGroupSQL.delCtrlAccessFromGroup(idCtrlAccess, idGroup);

            if( !delCtrlAccessFromGroup ){
                ok = false;
                this.errorSys.error('del_ctrl_access_to_group','Не удалось убрать права на модуль у группы');
            }
        }

        // Не возвращаем никаких данных
        return null;
    }

}


// export {AccessGroupM};