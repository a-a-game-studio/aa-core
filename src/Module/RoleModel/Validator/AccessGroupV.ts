
import * as Components from '@a-a-game-studio/aa-components/lib';
import { UserI } from '../../../Infrastructure/SQL/Entity/UserE';
import { MainRequest } from '../../../Namespace/System';
import { GroupI } from '../../../Infrastructure/SQL/Entity/GroupsE';
import { AccessGroupI } from '../../../Infrastructure/SQL/Entity/AccessGroupE';
import { CtrlAccessI } from '../../../Infrastructure/SQL/Entity/CtrlAccessE';

// =======================================================
/** Получить Список пользователей */
export namespace getCtrlAccessOfGroupByID {

    /** Параметры api запроса */
    export interface RequestI {
        group_id:number; // ID группы
    }

    /** Параметры api ответа */
    export interface ResponseI {
        list_ctrl_access:AccessGroupI[]; // Список пользователей
    }

    /**
     * Валидация
     *
     * @param req MainRequest
     * @param data RequestI
     */
    export function valid(req:MainRequest, data:any){
        let rules = new Components.ModelRulesC();

        // =======================================

        // Проверка с какой записи получать данные
        rules.set(rules.rule('group_id')
            .type(Components.ModelRulesT.int)
            .require()
            .moreOrEq(0)
            .errorEx('group_id', 'group_id')
        );


        // =======================================

        let validator =  new Components.ModelValidatorSys(req.sys.errorSys);
        validator.fValid(rules.get(), data);

        return validator.getResult();
    }
}


// =======================================================
/** Получить пользователя по ID */
export namespace getUserByID {

    /** Параметры api запроса */
    export interface RequestI {
        user_id:number; // ID пользователя
    }

    /** Параметры api ответа */
    export interface ResponseI {
        one_user:UserI; // Информация о пользователе
    }

    /**
     * Валидация
     *
     * @param req MainRequest
     * @param data RequestI
     */
    export function valid(req:MainRequest, data:any){
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

        let validator =  new Components.ModelValidatorSys(req.sys.errorSys);
        validator.fValid(rules.get(), data);

        return validator.getResult();
    }
}


// =======================================================
/** Получить группы по ID пользователя*/
export namespace getUserGroupsByUserID {

    /** Параметры api запроса */
    export interface RequestI {
        user_id:number; // ID пользователя
    }

    /** Параметры api ответа */
    export interface ResponseI {
        list_group:GroupI[]; // Информация о пользователе
    }

    /**
     * Валидация
     *
     * @param req MainRequest
     * @param data RequestI
     */
    export function valid(req:MainRequest, data:any){
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

        let validator =  new Components.ModelValidatorSys(req.sys.errorSys);
        validator.fValid(rules.get(), data);

        return validator.getResult();
    }
}


