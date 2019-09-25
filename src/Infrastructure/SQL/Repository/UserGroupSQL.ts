
// Глобальные сервисы

import * as redisSys  from '../../../System/RedisSys';
import { MainRequest } from '../../../System/MainRequest';

// Системные сервисы
import BaseSQL from '../../../System/BaseSQL';
import { UserGroupE } from '../Entity/UserGroupE';
import { GroupsE } from '../Entity/GroupsE';

/**
 * Здесь методы для SQL запросов
 * - Управление группами пользователей
 */
export class UserGroupSQL extends BaseSQL
{
    constructor(req:MainRequest) {
        super(req);
    }

    // ========================================
    // SELECT
    // ========================================

    /**
     * Получить Группы/Роли пользователя по user_id
     *
     * @param integer idUser
     * @return array|null
     */
    public async getUserGroupsByUserID(idUser:number): Promise<any>{
        let ok = this.errorSys.isOk();

        // Декларация ошибок
        this.errorSys.declareEx({
            'get_role':'Не удалось группы пользователя'
        });

        let aUserGroups = null; 
        if( ok ){ 
            aUserGroups = await this.autoCache(`UserGroupSQL.getUserGroupsByUserID(${idUser})`, 3600, async () =>{

                let aUserGroups = null;
                let sql = `
                    SELECT
                        DISTINCT ug.group_id,
                        g.alias,
                        g.name
                    FROM ${UserGroupE.NAME} ug
                    JOIN ${GroupsE.NAME} g ON g.id = ug.group_id
                    WHERE
                        ug.user_id = :user_id;
                    ;
                `;

                try{
                    aUserGroups = (await this.db.raw(sql, {
                        user_id: idUser
                    }))[0];

                } catch (e){
                    ok = false;

                    this.errorSys.errorEx(e, 'get_role', 'Не удалось группы пользователя');
                }

                return aUserGroups;

            })
        }

        return aUserGroups;
    }

    // ========================================
    // INSERT
    // ========================================

    /**
     * Добавить пользователя в группу - дать Роль
     * Группа/Роль
     *
     * @param idUser - ID Пользователя
     * @param idGroup - ID Группы
     */
    public async addUserToGroup(idUser:number, idGroup:number): Promise<number>{
        let ok = this.errorSys.isOk();

        // Декларация ошибок
        this.errorSys.declare([
            'ctrl_user_in_group',
            'user_in_group',
            'add_role'
        ]);

        let iCountUserInGroup = 0;
        if( ok ){ // Проверяем имеется ли пользователь в группе
            let sql = `
                SELECT
                    count(*) cnt
                FROM ${UserGroupE.NAME} ug
                WHERE
                    ug.user_id = :user_id
                AND
                    ug.group_id = :group_id
                LIMIT 1
                ;

            `;

            try{

                iCountUserInGroup = (await this.db.raw(sql, {
                    user_id: idUser,
                    group_id: idGroup
                }))[0][0]['cnt'];

            } catch (e){
                ok = false;
                this.errorSys.errorEx(e, 'ctrl_user_in_group', 'Не удалось проверить наличия пользователя в группе');
            }

        }

        if( ok && iCountUserInGroup > 0 ){ // Проверяем имеется ли пользователь в группе
            ok = false;
            this.errorSys.error('user_in_group', 'Пользователь уже состоит в группе');
        }


        let idUserGroup = 0;
        if( ok ){ // Если пользователя в группе нет добавляем его в группу

            try{
                idUserGroup = (await this.db(UserGroupE.NAME)
                    .insert({
                        user_id: idUser,
                        group_id: idGroup
                    })
                )[0];

            } catch (e){
                ok = false;
                this.errorSys.errorEx(e,'add_role', 'Не удалось добавить роль');
            }

        }

        if( ok ){ // Очищаем связный кеш
            this.clearCache('UserGroupSQL*');
        }

        // Формирование ответа
        return idUserGroup;
    }

    // ========================================
    // DELETE
    // ========================================

    /**
     * Удалить пользователя из группы - убрать Роль
     * Группа/Роль
     *
     * @param integer idUser
     * @param integer idGroup
     * @return array|null
     */
    public async delUserFromGroup(idUser:number, idGroup:number): Promise<boolean>{
        let ok = this.errorSys.isOk();

        // Декларация ошибок
        this.errorSys.declare([
            'ctrl_user_in_group',
            'user_in_group',
            'del_role'
        ]);

        let iCountUserInGroup = 0;
        if( ok ){ // Проверяем имеется ли пользователь в группе
            let sql = `
                SELECT
                    count(*) cnt
                FROM ${UserGroupE.NAME} pug
                WHERE
                    pug.user_id = :user_id
                AND
                    pug.group_id = :group_id
                LIMIT 1
                ;

            `;

            try{
                let resp = (await this.db.raw(sql, {
                    user_id: idUser,
                    group_id: idGroup
                }))[0];

                iCountUserInGroup = resp[0]['cnt'];
            } catch (e){
                ok = false;
                this.errorSys.error('ctrl_user_in_group', 'Не удалось проверить наличия пользователя в группе');
            }

        }

        if( ok && iCountUserInGroup < 1 ){ // Проверяем имеется ли пользователь в группе
            ok = false;
            this.errorSys.error('user_in_group', 'Пользователя нет в группе');
        }


        if( ok ){ // Если пользователя в группе есть удаляем его из группы
            let sql = `
                DELETE FROM ${UserGroupE.NAME}
                WHERE
                    user_id = :user_id
                AND
                    group_id = :group_id
                ;
            `;

            let resp = null;
            try{
                resp = await this.db(UserGroupE.NAME)
                    .where({
                        user_id: idUser,
                        group_id: idGroup
                    })
                    .del();

            } catch (e){
                ok = false;
                this.errorSys.error('del_role', 'Не удалось удалить роль');
            }

        }

        let aRelatedKeyRedis = [];
        if( ok ){ // Удалить связанный кеш
            aRelatedKeyRedis = await this.redisSys.keys('UserGroupSQL*');
            this.redisSys.del(aRelatedKeyRedis);
        }

        // Формирование ответа
        return ok
    }

}
