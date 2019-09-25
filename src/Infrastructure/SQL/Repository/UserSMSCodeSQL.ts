
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
export class UserSMSCodeSQL extends BaseSQL
{

    // ======================
    // SELECT
    // ======================
    
    /** 
     * выдает id юзера по телефону и смс из таблицы user_sms_code
     */
    public async getUserIdByPhoneAndSms(tel:number, sms:number): Promise<number>{
        let ok = this.errorSys.isOk();

        // Декларация ошибок
        this.errorSys.declareEx({
            'get_user_id_by_tel_and_sms':'Не удалось найти пользователя с таким телефоном'
        });
        
        let idUser:number = 0;
        if( ok ){ /* дата создания смски сегодня или никогда */
            let sql = `
                SELECT 
                    usc.user_id 
                FROM ${UserSmsCodeE.NAME} usc
                WHERE
                    usc.tel= :tel
                AND
                    usc.code= :sms
                AND 
                    (um.created_at + INTERVAL 1 DAY) between NOW() and (NOW() + INTERVAL 1 DAY) 
                LIMIT 1
            `;

            try{
                let respUserList = (await this.db.raw(sql, {
                    'tel': tel,
                    'sms': sms
                }))[0];

                if (respUserList.length > 0) {
                    idUser = respUserList[0]['user_id'];
                }

            } catch (e){
                ok = false;
                this.errorSys.errorEx(e, 'get_user_id_by_tel_and_sms', 'Не удалось найти пользователя с таким телефоном');
            }
        }

        return idUser;

    }

}
