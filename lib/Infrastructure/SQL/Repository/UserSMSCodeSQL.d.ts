import BaseSQL from '../../../System/BaseSQL';
/**
 * Здесь методы для SQL запросов
 */
export declare class UserSMSCodeSQL extends BaseSQL {
    /**
     * выдает id юзера по телефону и смс из таблицы user_sms_code
     */
    getUserIdByPhoneAndSms(tel: number, sms: number): Promise<number>;
}
