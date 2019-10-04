"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Библиотеки
const utf8 = require('utf8');
const uniqid = require('uniqid');
const uuidv4 = require('uuid/v4');
var md5 = require('md5');
const BaseSQL_1 = require("../../../System/BaseSQL");
const UserSmsCodeE_1 = require("../Entity/UserSmsCodeE");
/**
 * Здесь методы для SQL запросов
 */
class UserSMSCodeSQL extends BaseSQL_1.default {
    // ======================
    // SELECT
    // ======================
    /**
     * выдает id юзера по телефону и смс из таблицы user_sms_code
     */
    async getUserIdByPhoneAndSms(phone, sms) {
        let ok = this.errorSys.isOk();
        // Декларация ошибок
        this.errorSys.declareEx({
            'get_user_id_by_phone_and_sms': 'Не удалось найти пользователя с таким телефоном'
        });
        let idUser = 0;
        if (ok) { /* дата создания смски сегодня или никогда */
            let sql = `
                SELECT 
                    usc.user_id 
                FROM ${UserSmsCodeE_1.UserSmsCodeE.NAME} usc
                WHERE
                    usc.phone= :phone
                AND
                    usc.code= :sms
                AND 
                    (um.created_at + INTERVAL 1 DAY) between NOW() and (NOW() + INTERVAL 1 DAY) 
                LIMIT 1
            `;
            try {
                let respUserList = (await this.db.raw(sql, {
                    'phone': phone,
                    'sms': sms
                }))[0];
                if (respUserList.length > 0) {
                    idUser = respUserList[0]['user_id'];
                }
            }
            catch (e) {
                ok = false;
                this.errorSys.errorEx(e, 'get_user_id_by_tel_and_sms', 'Не удалось найти пользователя с таким телефоном');
            }
        }
        return idUser;
    }
}
exports.UserSMSCodeSQL = UserSMSCodeSQL;
//# sourceMappingURL=UserSMSCodeSQL.js.map