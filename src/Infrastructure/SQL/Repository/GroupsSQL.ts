
// Глобальные сервисы
import * as redisSys  from '../../../System/RedisSys';

// Системные сервисы

import { MainRequest } from '../../../System/MainRequest';

// Сущьности и правила валидации
import {GroupsE, GroupI} from '../Entity/GroupsE';
import BaseSQL from '../../../System/BaseSQL';

/**
 * Здесь методы для SQL запросов
 * - Группы пользователей
 */
export class GroupsSQL extends BaseSQL
{

    constructor(req:MainRequest) {
        super(req);
    }

    // ========================================
    // SELECT
    // ========================================

    /**
     * Получить группу по ID
     *
     * @param integer idGroup
     * @return array|null
     */
    public async getGroupByID(idGroup:number): Promise<any>{
        let ok = this.errorSys.isOk();
        
        let sql:string = '';

        // Декларация ошибок
        this.errorSys.declareEx({
            'get_group':'Не удалось получить группу'
        });

        sql = `
            SELECT
                g.id,
                g.alias,
                g.name,
                g.descript
            FROM ${GroupsE.NAME} g
            WHERE g.id = :id_group
            LIMIT 1
        `;

        let respGroup = null;
        try{
            respGroup = (await this.db.raw(sql, {
                id_group: idGroup
            }))[0][0];


        } catch (e){
            ok = false;
            this.errorSys.error('get_group', 'Не удалось получить группу');
        }

        return respGroup;
    }

    /**
     * Получить группы/роли
     *
     * @return array|null
     */
    public async getAllGroups(): Promise<any>{
        let ok = this.errorSys.isOk();

        let bCache = false; // Наличие кеша
        let sql:string = '';
        let resp = null;

        // Декларация ошибок
        this.errorSys.declare([
            'get_roles'
        ]);

        let groupList = null;
        if( ok && !bCache ){ // Получаем весь список групп
            groupList = await this.autoCache(`GroupsSQL.getAllGroups()`, 3600, async () => {

                let groupList = null;
                sql = `
                    SELECT
                        g.id,
                        g.name,
                        g.alias
                    FROM ${GroupsE.NAME} g
                    ;
                `;

                try{
                    groupList = (await this.db.raw(sql))[0];
                } catch (e){
                    ok = false;
                    this.errorSys.error('get_roles', 'Не удалось получить группы пользователя');
                }

                return groupList;
        
            }); // autoCache
        }


        // Формирование ответа
        return groupList;
    }

    // ========================================
    // UPDATE
    // ========================================

    /**
     * Сохранить группу по ID
     *
     * @param integer idGroup
     * @return boolean
     */
    public async saveGroup(idGroup:number, data:GroupI): Promise<boolean>{
        let ok = this.errorSys.isOk();

        // Декларация ошибок
        this.errorSys.declare([
            'save_group'
        ]);

        let vGroupsE = new GroupsE();
        if( ok && this.modelValidatorSys.fValid(vGroupsE.getRulesUpdate(), data) ){

            let resp = null;
            try{
                resp = await this.db(GroupsE.NAME)
                    .where({
                        id: idGroup
                    })
                    .update(this.modelValidatorSys.getResult())

            } catch (e){
                ok = false;
                this.errorSys.errorEx(e, 'save_group', 'Не удалось сохранить изменения в группе');
            }
        }

        let aRelatedKeyRedis = [];
        if( ok ){ // Удалить связанный кеш
            aRelatedKeyRedis = await this.redisSys.keys('GroupsSQL*');
            this.redisSys.del(aRelatedKeyRedis);
        }

        return ok;
    }

}
