
// Библиотеки
import * as _ from 'lodash';

// Системные сервисы
import { MainRequest } from '../../../System/MainRequest';

// Сущьности и правила валидации
import {AccessGroupE} from '../Entity/AccessGroupE';
import BaseSQL from '../../../System/BaseSQL';
import { CtrlAccessE } from '../Entity/CtrlAccessE';

/**
 * Здесь методы для SQL запросов
 * - Связка Групп пользователей с модулями
 */
export class AccessGroupSQL extends BaseSQL
{

    constructor(req:MainRequest) {
        super(req);
    }

    // ==================================
    // SELECT
    // ==================================

    /**
     * Получить список модулей доступных группе по ID Группы
     *
     * @param integer idGroup
     * @return array|null
     */
    public async getCtrlAccessOfGroupByID(idGroup:number): Promise<any>{
        let ok = this.errorSys.isOk();

        this.errorSys.declare([
            'get_ctrl_access',
        ]);

        let resp = null;

        if( ok ){ // Получить список модулей доступных группе по ID Группы
            let sql = `
                SELECT
                    ag.id id_access_group,
                    ag.id_group,
                    ag.id_ctrl_access,
                    ag.create_access,
                    ag.read_access,
                    ag.update_access,
                    ag.delete_access,
                    ag.id id_access_group,
                    ca.alias,
                    ca.name,
                    ca.descript
                FROM ${AccessGroupE.NAME} ag
                JOIN ${CtrlAccessE.NAME} ca ON ca.id = ag.id_ctrl_access
                WHERE ag.id_group = :id_group
                ;
            `;

            try{
                resp = (await this.db.raw(sql, {
                    'id_group': idGroup
                }))[0];
            } catch (e){
                ok = false;
                this.errorSys.error('get_ctrl_access', 'Не удалось получить контроль доступа');
            }
        }

        return resp;
    }

    /**
     * Получить права CRUD по конкретному модулю
     * на основе групп к которым принадлежит пользователь
     *
     * @param array aIdGroup
     * @param integer idCtrlAccess
     * @return array|null
     */
    public async getAccessCRUD(aIdsGroup:number[], idCtrlAccess:number): Promise<any>{
        let ok = this.errorSys.isOk();
        let sql:string = '';

        // Декларация ошибок
        this.errorSys.declare([
            'user_no_has_group',
            'get_access_crud'
        ]);

        if( aIdsGroup.length < 1){ // Если пользователь не имеет групп - значит у него нет прав
            ok = false;
            this.errorSys.error('user_no_has_group', 'Пользователь не состоит в группе');
        }

        // Превращаем массив Ids в строку
        let sIdsGroup = aIdsGroup.join(',');

        let aAccessCRUD:any = {};
        if( ok ){ // Получаем права CRUD
            sql = `
                SELECT
                    SUM(ag.create_access) 'create',
                    SUM(ag.read_access) 'read',
                    SUM(ag.update_access) 'update',
                    SUM(ag.delete_access) 'delete'
                FROM ${AccessGroupE.NAME} ag
                JOIN ${CtrlAccessE.NAME} ca ON ca.id = ag.id_ctrl_access
                WHERE
                    ag.id_group IN (${sIdsGroup})
                AND
                    ag.id_ctrl_access = :id_ctrl_access
                ;
            `;


            try{
                aAccessCRUD = (await this.db.raw(sql, {
                    'id_ctrl_access': idCtrlAccess
                }))[0];

                aAccessCRUD = aAccessCRUD[0];

            } catch (e){
                ok = false;
                this.errorSys.error('get_access_crud', 'Не удалось получить доступы к модулю');
            }

        }


        let a:{[key:string]:any} = {};
        _.forEach(aAccessCRUD, (v, k) => {
            a[k] = Boolean(v);
        });
        aAccessCRUD = a;

        return aAccessCRUD;
    }

    /**
     * Получить права на доступ к модулю
     * на основе групп к которым принадлежит пользователь
     *
     * @param array aIdGroup
     * @param integer idCtrlAccess
     * @return array|null
     */
    public async getAccess(aIdsGroup:number[], idCtrlAccess:number): Promise<boolean>{
        let ok = this.errorSys.isOk();

        // Декларация ошибок
        this.errorSys.declare([
            'user_no_has_group',
            'get_access_to_ctrl'
        ]);

        let sql: string = '';

        if( aIdsGroup.length < 1){ // Если пользователь не имеет групп - значит у него нет прав
            ok = false;
            this.errorSys.error('user_no_has_group', 'Пользователь не состоит в группе');
        }

        // Превращаем массив Ids в строку
        let sIdsGroup = aIdsGroup.join(',');

        let bAccess = false;
        if( ok ){
            sql = `
                SELECT
                    count(*) cnt
                FROM ${AccessGroupE.NAME} ag
                JOIN ${CtrlAccessE.NAME} ca ON ca.id = ag.id_ctrl_access
                WHERE
                    ag.id_group IN (${sIdsGroup})
                AND
                    ag.id_ctrl_access = :id_ctrl_access
                LIMIT 1
                ;
            `;

            let resp = [];
            try{
                resp = (await this.db.raw(sql, {
                    'id_ctrl_access': idCtrlAccess
                }))[0];

                bAccess = Boolean(resp[0]['cnt']);
            } catch (e){
                ok = false;
                this.errorSys.error('get_access_to_ctrl', 'Не удалось получить доступы к модулю');
            }

        }

        return bAccess;
    }



    // ========================================
    // INSERT
    // ========================================

    /**
     * Добавить контроль доступа к группе
     *
     * @return boolean
     */
    public async addCtrlAccessToGroup(idCtrlAccess:number, idGroup:number): Promise<number>{
        let ok = this.errorSys.isOk();
        let sql:string = '';

        // Декларация ошибок
        this.errorSys.declare([
            'add_ctrl_access'
        ]);

        let idAccessGroup = 0;
        if( ok ){

            let resp = null;
            try{
                resp = await this.db(AccessGroupE.NAME)
                    .insert({
                        id_group: idGroup,
                        id_ctrl_access: idCtrlAccess,
                    });

                idAccessGroup = resp[0];

            } catch (e){
                ok = false;
                this.errorSys.error('add_ctrl_access', 'Не удалось добавить права на модуль');
            }

        }

        if( ok ){ // Удалить связанный кеш
            this.cacheSys.clearCache('AccessGroupSQL*');
        }

        return idAccessGroup;
    }

    // ========================================
    // UPDATE
    // ========================================

    /**
     * Изменить параметры доступа
     *
     * @param integer idAccessGroup
     * @return boolean
     */
    public async saveAccessGroup(idAccessGroup:number, data:{ [key: string]: any }): Promise<boolean>{
        let ok = this.errorSys.isOk();
        let sql:string = '';

        // Декларация ошибок
        this.errorSys.declare([
            'save_access_group'
        ]);

        let vAccessGroupE = new AccessGroupE();
        if( ok && this.modelValidatorSys.fValid(vAccessGroupE.getRulesUpdate(), data) ){

            let resp = null;
            try{
                resp = await this.db(AccessGroupE.NAME)
                    .where({
                        id: idAccessGroup
                    })
                    .update(this.modelValidatorSys.getResult());

            } catch (e){
                ok = false;
                this.errorSys.error('save_access_group', 'Не удалось сохранить изменения в группе');
            }

        }

        let aRelatedKeyRedis = [];
        if( ok ){ // Удалить связанный кеш
            aRelatedKeyRedis = await this.redisSys.keys('AccessGroupSQL*');
            this.redisSys.del(aRelatedKeyRedis);
        }

        return ok;
    }

    // ========================================
    // DELETE
    // ========================================

    /**
     * удалить права на модуль у группы
     *
     * @param string idCtrlAccess
     * @param string idGroup
     * @return boolean
     */
    public async delCtrlAccessFromGroup(idCtrlAccess:number, idGroup:number): Promise<boolean>{
        let ok = this.errorSys.isOk();

        // Декларация ошибок
       /*  this.errorSys.declareEx({
            'del_ctrl_access':'Не удалось удалить права на модуль'
        }); */

        if( ok ){
            let resp = null;
            try{
                resp = await this.db(AccessGroupE.NAME)
                    .where({
                        id_group: idGroup,
                        id_ctrl_access: idCtrlAccess,
                    })
                    .limit(1)
                    .del();

            } catch (e){
                ok = false;
                this.errorSys.errorEx(e, 'del_ctrl_access', 'Не удалось удалить права на модуль');
            }
        }


        if( ok ){ // Удалить связанный кеш
            this.cacheSys.clearCache('AccessGroupSQL*');
        }

        return ok;
    }

    // ========================================
    // COUNT
    // ========================================

    /**
     * Проверить наличие связи между модулем и группой
     * связь модуля и группы должна быть только одна
     *
     * @param idCtrlAccess:number
     * @param idGroup:number
     * @return integer
     */
    public async cntAccessGroup(idCtrlAccess:number, idGroup:number): Promise<number>{
        let ok = this.errorSys.isOk();

        // Декларация ошибок
        this.errorSys.declare([
            'cnt_ctrl_access'
        ]);

        let resp = [];
        let sql = '';

        let cntAccessGroup:number = 0;
        if( ok ){ // Получить количество контроллеров доступа

            sql = `
                SELECT
                    COUNT(*) cnt
                FROM ${AccessGroupE.NAME} ag
                WHERE
                    ag.id_group = :id_group
                AND
                    ag.id_ctrl_access = :id_ctrl_access
                LIMIT 1
            `;

            try{
                resp = (await this.db.raw(sql, {
                    'id_group': idGroup,
                    'id_ctrl_access': idCtrlAccess
                }))[0];

                cntAccessGroup = Number(resp[0]['cnt']);
            } catch (e){
                ok = false;
                this.errorSys.error('cnt_ctrl_access', 'Не удалось подсчитать контроль доступа');
            }
        }

        resp = null;

        if( ok ){ // Ответ
            return cntAccessGroup;
        } else {
            return -1; // В случае если произошла SQL ошибка
        }

    }

}
