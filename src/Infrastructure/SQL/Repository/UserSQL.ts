
// Библиотеки
const utf8 = require('utf8');
const uniqid = require('uniqid');
const uuidv4 = require('uuid/v4');
var md5 = require('md5');

// Системные сервисыW
import MainRequest from '../../../System/MainRequest';
import BaseSQL from '../../../System/BaseSQL';
import { UserE } from '../Entity/UserE';
import { UserTokenE } from '../Entity/UserTokenE';
import { UserSmsCodeE } from '../Entity/UserSmsCodeE';


/**
 * Здесь методы для SQL запросов
 */
export class UserSQL extends BaseSQL
{

    constructor(req:MainRequest) {
        super(req);
    }


    /**
     * Получить список пользователей
     *
     * @param integer iOffset
     * @param integer iLimit
     * @param array sSearchFIO
     * @return array|null
     */
    public async getUserList(iOffset:number, iLimit:number, aFilter:{
        search_fullname?:string; // ФИО пользователя
        search_username?:string; // Имя пользователя
    }): Promise<any>{
        let ok = this.errorSys.isOk();
        
        let sql = '';

        // Декларирование ошибок
        this.errorSys.declare([
            'get_user' // получение пользователей
        ]);

        let sSearchFIO = "";
        if( aFilter.search_fullname  ){
            sSearchFIO = aFilter.search_fullname;
        }

        let sSearchUserName = "";
        if( aFilter.search_username  ){
            sSearchUserName = aFilter.search_username;
        }

        let bSearchUserName = false; // Использовать поиск по имени или нет
        if(sSearchUserName){
            bSearchUserName = true;
        }

        let bSearchFIO = false; // Использовать поиск по ФИО или нет
        if(sSearchFIO){
            bSearchFIO = true;
        }

        let resp = null;
        if(ok){
            sql = `
                SELECT
                    u.id,
                    u.name,
                    u.fullname,
                    u.login,
                    u.email,
                    u.avatar
                FROM ${UserE.NAME} u
                WHERE
                    CASE WHEN :if_search_username THEN u.name LIKE :search_username ELSE true END
                AND
                    CASE WHEN :if_search_fullname THEN u.fullname LIKE :search_fullname ELSE true END
                LIMIT :limit
                OFFSET :offset
                ;
            `;

            try{
                resp = (await this.db.raw(sql, {
                    'offset': iOffset,
                    'limit': iLimit,
                    'if_search_username':bSearchUserName,
                    'if_search_fullname':bSearchFIO,
                    'search_username': '%'+sSearchUserName+'%',
                    'search_fullname': '%'+sSearchFIO+'%'
                }))[0];

            } catch (e){
                ok = false;
                this.errorSys.errorEx(e, 'get_user', 'Не удалось получить пользователя');
            }
        }

        return resp;
    }


    /**
     * Получить пользователя по ID
     *
     * @param integer idUser
     * @return array|null
     */
    public async getUserByID(idUser:number): Promise<any>{
        let ok = this.errorSys.isOk();
        let resp = null;
        let sql = '';

        // Декларация ошибок
        this.errorSys.declare([
            'get_user'
        ]);

        sql = `
            SELECT
                u.id,
                u.name,
                u.email,
                u.avatar,
                u.fullname
            FROM ${UserE.NAME} u
            WHERE u.id = :user_id
            LIMIT 1
        `;

        try{
            resp = (await this.db.raw(sql, {
                'user_id': idUser
            }))[0];

            if (resp.length > 0) {
                resp = resp[0];
            } else {
                resp = null;
            }

        } catch (e){
            ok = false;
            this.errorSys.errorEx(e, 'get_user', 'Не удалось получить пользователя');
        }

        return resp;
    }


    /* выдает инфу по юзеру по apikey */
    public async fGetUserInfoByApiKey(apikey = ''):Promise<any>{
        let ok = true;
        let resp:{[key:string]:any} = null;

        // Декларация ошибок
        this.errorSys.declare([
            'user_info_by_apikey'
        ]);

        if( ok ){
            let sql = `
                SELECT  
                    u.id,
                    u.name,
                    u.email,
                    u.avatar
                FROM ${UserE.NAME} u
                JOIN ${UserTokenE.NAME} ut ON ut.user_id = u.id

                where ut.token= :token

                limit 1
            `;

            try{
                resp = (await this.db.raw(sql,{
                    'token': apikey
                }))[0];


                if (resp.length > 0) {
                    resp = resp[0];
                } else {
                    resp = null;
                }

            } catch (e){
                ok = false;
                this.errorSys.error('user_info_by_apikey', 'Не удалось получить информацию о пользователе');
            }
        }

        return resp;
    }
    

    /* выдает инфу по юзеру по id */
    public async fGetUserInfoById(userId:number)
    {
        let ok = true;
        let resp:any[] = null;

        // Декларация ошибок
        this.errorSys.declare([
            'api_key_in_db'
        ]);

        let sql = `
            SELECT 
                u.*
            FROM ${UserE.NAME} u
            WHERE u.user_id= :user_id
            LIMIT 1
        `;

        try{
            resp = (await this.db.raw(sql, {
                'user_id': userId,
            }))[0];

            if (resp.length > 0) {
                resp = resp[0];
            } else {
                resp = null;
            }

        } catch (e){
            ok = false;
            this.errorSys.error('api_key_in_db', 'Не удалось проверить apikey');
        }

        return resp;
    }

}
