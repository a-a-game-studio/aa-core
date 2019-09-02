
// Библиотеки
const utf8 = require('utf8');
const uniqid = require('uniqid');
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
    public async getUserList(iOffset:number, iLimit:number, aFilter:{ [key: string]: any }): Promise<any>{
        let ok = this.errorSys.isOk();
        let resp = null;
        let sql = '';

        // Декларирование ошибок
        this.errorSys.declare([
            'get_user' // получение пользователей
        ]);

        let sSearchFIO = "";
        if( aFilter['search_fullname']  ){
            sSearchFIO = aFilter['search_fullname'];
        }

        let sSearchUserName = "";
        if( aFilter['search_username']  ){
            sSearchUserName = aFilter['search_username'];
        }

        let bSearchUserName = false;
        if(sSearchUserName){
            bSearchUserName = true;
        }

        let bSearchFIO = false;
        if(sSearchFIO){
            bSearchFIO = true;
        }

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

        console.log(sql);

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
                u.user_id,
                u.group_id,
                u.name,
                u.email,
                u.avatar,
                u.fullname
            FROM ${UserE.NAME} u
            WHERE u.user_id = :user_id
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
            this.errorSys.error('get_user', 'Не удалось получить пользователя');
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

    /**
     * проверка на то что есть apikey в базе
     */
    public async isAuth(apikey:string = ''): Promise<boolean>{

        let bResp = false;
        let sql = '';
        let ok = true;
        let resp:any[] = null;

        // Декларация ошибок
        this.errorSys.declare([
            'api_key_in_db'
        ]);

        

        /* если ключ больше 4 */
        if( apikey.length > 4) {

            if ( await this.redisSys.get('is_auth_' + apikey)  ) {
                bResp = true;
                this.errorSys.devNotice(`cache:UserSQL.isAuth(${apikey})`, 'Взято из кеша');
            } else {
                //Получаем одного пользователя
                sql = `
                    select ut.token from ${UserTokenE.NAME} ut

                    where ut.token= :token order by ut.token desc

                    limit 1;
                `;
                
                try{
                    resp = (await this.db.raw(sql, {
                        'token': apikey
                    }))[0];


                    if (resp.length > 0) {
                        bResp = true;
                        this.redisSys.set('is_auth_' + apikey, 1, 3600);
                    }

                } catch (e){
                    ok = false;
                    this.errorSys.error('api_key_in_db', 'Не удалось проверить apikey');
                }

            }

        }

        return bResp;
    }

    /* выдает id юзера по телефону и смс из таблицы user_sms_code*/
    public async getUserIdByPhoneAndSms(phone:string, sms:string): Promise<number>{
        let ok = true;
        let resp:any[] = null;
        let idUser:number = 0;

        // Декларация ошибок
        this.errorSys.declare([
            'api_key_in_db'
        ]);


		/* дата создания смски сегодня или никогда */
        let sql = `
            select um.user_id from ${UserSmsCodeE.NAME} um

            where
            (um.tel= :phone)
            AND(um.code= :sms)
            AND ((um.created_at + INTERVAL 1 DAY) between NOW() and (NOW() + INTERVAL 1 DAY) )

            limit 1
        `;

        try{
            resp = (await this.db.raw(sql, {
                'phone': phone,
                'sms': sms
            }))[0];

            if (resp.length > 0) {
                idUser = resp[0]['user_id'];
            } else {
                resp = null;
            }

        } catch (e){
            ok = false;
            this.errorSys.error('api_key_in_db', 'Не удалось проверить apikey');
        }

        return idUser;

    }

      /* выдает строчку инфы из базы по логину об юзере */
    public async getUserByUsername(username:string)
    {
        let ok = true;
        let resp:any[] = null;

        // Декларация ошибок
        this.errorSys.declare([
            'api_key_in_db'
        ]);

        if( ok ){
            /* todo прикрутить reddis */
            let sql = `
                SELECT *
                FROM ${UserE.NAME}
                WHERE username_clean = :username limit 1
                ;
            `;

            try{
                resp = (await this.db.raw(sql, {
                    'username': utf8.encode(username),
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
        }

        return resp;
    }

	/* выдает apikey по user_id */
    public async getUserApiKey(user_id:number):Promise<string>{

        let ok = true;
        let resp:any[] = null;

        // Декларация ошибок
        this.errorSys.declare([
            'api_key_in_db'
        ]);

        let token:string = null;
		if( ok ){ /* выбираем последний из вставленных */
            let sql = `
                select * from ${UserTokenE.NAME} ut
                where ut.user_id = :user_id
                order by ut.user_token_id desc
                limit 1
                ;
            `;

            try{
                resp = (await this.db.raw(sql, {
                    'user_id': user_id,
                }))[0];

                if (resp.length > 0) {
                    token = resp[0]['token'];
                } else {
                    token = null;
                }

            } catch (e){
                ok = false;
                this.errorSys.error('api_key_in_db', 'Не удалось проверить apikey');
            }
        }

        return token;

    }

	/* вставляет ключ для юзера */
	/* ничего не проверяет только вставляет */
    public async insertUserApiKey(user_id:number): Promise<string>{
        let ok = true;
        let sql = '';
        let apikey = this.generateApiKey();

        // Декларация ошибок
        this.errorSys.declare([
            'inser_key_for_user'
        ]);

        user_id = Number(user_id);
        sql = `INSERT INTO ${UserTokenE.NAME} (\`user_id\`, \`token\`) VALUES (:user_id, :api_key)`;

        let resp = null;
        try{
            resp = await this.db('user_token').insert({
                api_key: apikey,
                user_id: user_id,
            });

        } catch (e){
            ok = false;
            this.errorSys.error('inser_key_for_user', 'Не удалось вставить ключ пользователя');
        }

        if ( ok ) {
            return apikey;
        } else {
            return null;
        }

    }


	/* генерирует apikey */
    public generateApiKey(max:number = 20)
    {
		/* md5 от текущей даты-вермени + рандом */
        return uniqid(md5(new Date().getTime()));
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
            select u.* from ${UserE.NAME} u

            where u.user_id= :user_id

            limit 1
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
