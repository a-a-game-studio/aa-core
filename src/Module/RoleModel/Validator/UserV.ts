
import * as Components from '@a-a-game-studio/aa-components/lib';
import { UserI } from '../../../Infrastructure/SQL/Entity/UserE';
import { MainRequest } from '../../../Namespace/System';
import { GroupI } from '../../../Infrastructure/SQL/Entity/GroupE';
import { System } from '../../..';

// =======================================================
/** Получить Список пользователей */
export namespace getUserList {

    export const route = '/api/admin/user/get-users';

    /** Параметры api запроса */
    export interface RequestI {
        offset: number; // С какой записи получать данные
        limit: number; // Сколько записей получать
        search_surname?: string; // Поиск По Фамилии пользователя
        search_username?: string; // Поиск по Имени пользователя
    }

    /** Параметры api ответа */
    export interface ResponseI {
        list_user: UserI[]; // Список пользователей
    }

    /**
     * Валидация
     *
     * @param req MainRequest
     * @param data RequestI
     */
    export function valid(req: System.MainRequest, data: any) {
        let rules = new Components.ModelRulesC();

        // =======================================

        // Проверка с какой записи получать данные
        rules.set(rules.rule('offset')
            .type(Components.ModelRulesT.int)
            .require()
            .moreOrEq(0)
            .errorEx('offset', 'offset')
        );

        // Сколько записей получать
        rules.set(rules.rule('limit')
            .type(Components.ModelRulesT.int)
            .require()
            .moreOrEq(0)
            .lessOrEq(100)
            .errorEx('limit', 'limit')
        );

        // =======================================

        let validator = new Components.ModelValidatorSys(req.sys.errorSys);
        validator.fValid(rules.get(), data);

        return validator.getResult();
    }
}


// =======================================================
/** Получить пользователя по ID */
export namespace getUserByID {

    /** Параметры api запроса */
    export interface RequestI {
        id_user: number; // ID пользователя
    }

    /** Параметры api ответа */
    export interface ResponseI {
        one_user: UserI; // Информация о пользователе
    }

    /**
     * Валидация
     *
     * @param req MainRequest
     * @param data RequestI
     */
    export function valid(req: System.MainRequest, data: any) {
        let rules = new Components.ModelRulesC();

        // =======================================


        // Сколько записей получать
        rules.set(rules.rule('id_user')
            .type(Components.ModelRulesT.int)
            .require()
            .moreOrEq(0)
            .errorEx('id_user', 'id_user')
        );

        // =======================================

        let validator = new Components.ModelValidatorSys(req.sys.errorSys);
        validator.fValid(rules.get(), data);

        return validator.getResult();
    }
}


// =======================================================
/** Получить группы по ID пользователя*/
export namespace getUserGroupsByUserID {

    /** Параметры api запроса */
    export interface RequestI {
        id_user: number; // ID пользователя
    }

    /** Параметры api ответа */
    export interface ResponseI {
        list_group: GroupI[]; // Информация о пользователе
    }

    /**
     * Валидация
     *
     * @param req MainRequest
     * @param data RequestI
     */
    export function valid(req: System.MainRequest, data: any) {
        let rules = new Components.ModelRulesC();

        // =======================================


        // Сколько записей получать
        rules.set(rules.rule('id_user')
            .type(Components.ModelRulesT.int)
            .require()
            .moreOrEq(0)
            .errorEx('id_user', 'id_user')
        );

        // =======================================

        let validator = new Components.ModelValidatorSys(req.sys.errorSys);
        validator.fValid(rules.get(), data);

        return validator.getResult();
    }
}


// =======================================================
/** Добавить пользователя к группе */
export namespace addUserToGroup {

    /** Параметры api запроса */
    export interface RequestI {
        id_user: number; // ID пользователя
        id_group: number; // ID группы
    }

    /** Параметры api ответа */
    export interface ResponseI {
        cmd_add_user_to_group: number; // ID Связи пользователя и группы
    }

    /**
     * Валидация
     *
     * @param req MainRequest
     * @param data RequestI
     */
    export function valid(req: System.MainRequest, data: any) {
        let rules = new Components.ModelRulesC();

        // =======================================


        // ID пользователя
        rules.set(rules.rule('id_user')
            .type(Components.ModelRulesT.int)
            .require()
            .more(0)
            .errorEx('id_user', 'id_user')
        );

        // ID группы
        rules.set(rules.rule('id_group')
            .type(Components.ModelRulesT.int)
            .require()
            .more(0)
            .errorEx('id_group', 'id_group')
        );

        // =======================================

        let validator = new Components.ModelValidatorSys(req.sys.errorSys);
        validator.fValid(rules.get(), data);

        return validator.getResult();
    }
}


// =======================================================
/** Удалить пользователя из группы */
export namespace delUserFromGroup {

    /** Параметры api запроса */
    export interface RequestI {
        id_user: number; // ID пользователя
        id_group: number; // ID группы
    }

    /** Параметры api ответа */
    export interface ResponseI {
        cmd_del_user_from_group: boolean; // Статус операции
    }

    /**
     * Валидация
     *
     * @param req MainRequest
     * @param data RequestI
     */
    export function valid(req: System.MainRequest, data: any) {
        let rules = new Components.ModelRulesC();

        // =======================================


        // ID пользователя
        rules.set(rules.rule('id_user')
            .type(Components.ModelRulesT.int)
            .require()
            .more(0)
            .errorEx('id_user', 'id_user')
        );

        // ID группы
        rules.set(rules.rule('id_group')
            .type(Components.ModelRulesT.int)
            .require()
            .more(0)
            .errorEx('id_group', 'id_group')
        );

        // =======================================

        let validator = new Components.ModelValidatorSys(req.sys.errorSys);
        validator.fValid(rules.get(), data);

        return validator.getResult();
    }
}



// =======================================================
/** Получить token по телефону и СМС */
export namespace getTokenByPhoneAndSms {

    /** Параметры api запроса */
    export interface RequestI {
        phone: number; // Номер телефона 79998887766
        sms: number; // Смс код 0000
    }

    /** Параметры api ответа */
    export interface ResponseI {
        state_token: string; // api key
    }

    /**
     * Валидация
     *
     * @param req MainRequest
     * @param data RequestI
     */
    export function valid(req: System.MainRequest, data: any) {
        let rules = new Components.ModelRulesC();

        // =======================================

        // Телефон
        rules.set(rules.rule('phone')
            .type(Components.ModelRulesT.int)
            .require()
            .errorEx('phone', 'phone')
        );

        // СМС
        rules.set(rules.rule('sms')
            .type(Components.ModelRulesT.int)
            .errorEx('sms', 'sms')
        );

        // =======================================

        let validator = new Components.ModelValidatorSys(req.sys.errorSys);
        validator.fValid(rules.get(), data);

        return validator.getResult();
    }
}


/** Добавить пользователя */
export namespace addUser {

    /** Параметры api запроса */
    export interface RequestI {
        login:string; // Псевдоним пользователя
        name?:string; // Имя пользователя не обызательный параметр
        pswd:string; // Пароль
    }

    /** Параметры api ответа */
    export interface ResponseI {
        cmd_confirm_register:boolean; // Подтвердить регистрацию
        list_user:UserI[]; // Вернуть обновленный список пользователей
    }

    /**
     * Валидация
     *
     * @param req MainRequest
     * @param data RequestI
     */
    export function valid(req: System.MainRequest, data: any) {
        let rules = new Components.ModelRulesC();

        // =======================================

        // логин
        rules.set(rules.rule('login')
            .type(Components.ModelRulesT.text)
            .require()
            .minLen(3)
            .maxLen(100)
            .errorEx('login', 'login')
        );

        // пароль
        rules.set(rules.rule('pswd')
            .type(Components.ModelRulesT.text)
            .require()
            .minLen(6)
            .maxLen(100)
            .errorEx('pswd', 'pswd')
        );

        // =======================================

        let validator = new Components.ModelValidatorSys(req.sys.errorSys);
        validator.fValid(rules.get(), data);

        return validator.getResult();
    }
}