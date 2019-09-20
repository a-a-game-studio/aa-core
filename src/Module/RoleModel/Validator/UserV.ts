
import * as Components from '@a-a-game-studio/aa-components/lib';
import { UserI } from '../../../Infrastructure/SQL/Entity/UserE';
import { MainRequest } from '../../../Namespace/System';
import { GroupI } from '../../../Infrastructure/SQL/Entity/GroupsE';

// =======================================================
/** Получить Список пользователей */
export namespace getUserList {

    /** Параметры api запроса */
    export interface RequestI {
        offset: number; // С какой записи получать данные
        limit: number; // Сколько записей получать
        search_fullname?: string; // Поиск По ФИО
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
    export function valid(req: MainRequest.MainRequest, data: any) {
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
        user_id: number; // ID пользователя
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
    export function valid(req: MainRequest.MainRequest, data: any) {
        let rules = new Components.ModelRulesC();

        // =======================================


        // Сколько записей получать
        rules.set(rules.rule('user_id')
            .type(Components.ModelRulesT.int)
            .require()
            .moreOrEq(0)
            .errorEx('user_id', 'user_id')
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
        user_id: number; // ID пользователя
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
    export function valid(req: MainRequest.MainRequest, data: any) {
        let rules = new Components.ModelRulesC();

        // =======================================


        // Сколько записей получать
        rules.set(rules.rule('user_id')
            .type(Components.ModelRulesT.int)
            .require()
            .moreOrEq(0)
            .errorEx('user_id', 'user_id')
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
        user_id: number; // ID пользователя
        group_id: number; // ID группы
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
    export function valid(req: MainRequest.MainRequest, data: any) {
        let rules = new Components.ModelRulesC();

        // =======================================


        // ID пользователя
        rules.set(rules.rule('user_id')
            .type(Components.ModelRulesT.int)
            .require()
            .more(0)
            .errorEx('user_id', 'user_id')
        );

        // ID группы
        rules.set(rules.rule('group_id')
            .type(Components.ModelRulesT.int)
            .require()
            .more(0)
            .errorEx('group_id', 'group_id')
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
        user_id: number; // ID пользователя
        group_id: number; // ID группы
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
    export function valid(req: MainRequest.MainRequest, data: any) {
        let rules = new Components.ModelRulesC();

        // =======================================


        // ID пользователя
        rules.set(rules.rule('user_id')
            .type(Components.ModelRulesT.int)
            .require()
            .more(0)
            .errorEx('user_id', 'user_id')
        );

        // ID группы
        rules.set(rules.rule('group_id')
            .type(Components.ModelRulesT.int)
            .require()
            .more(0)
            .errorEx('group_id', 'group_id')
        );

        // =======================================

        let validator = new Components.ModelValidatorSys(req.sys.errorSys);
        validator.fValid(rules.get(), data);

        return validator.getResult();
    }
}



// =======================================================
/** Получить apikey по телефону и СМС */
export namespace getApiKeyByPhoneAndSms {

    /** Параметры api запроса */
    export interface RequestI {
        tel: number; // Номер телефона 79998887766
        sms: number; // Смс код 0000
    }

    /** Параметры api ответа */
    export interface ResponseI {
        state_apikey: string; // api key
    }

    /**
     * Валидация
     *
     * @param req MainRequest
     * @param data RequestI
     */
    export function valid(req: MainRequest.MainRequest, data: any) {
        let rules = new Components.ModelRulesC();

        // =======================================

        // Телефон
        rules.set(rules.rule('tel')
            .type(Components.ModelRulesT.int)
            .require()
            .errorEx('tel', 'tel')
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