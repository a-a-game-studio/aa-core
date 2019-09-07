
import * as Components from '@a-a-game-studio/aa-components/lib';
import { MainRequest } from '../../../Namespace/System';

import { CtrlAccessI } from '../../../Infrastructure/SQL/Entity/CtrlAccessE';

// =======================================================
/** Получить информацию о группе */
export namespace getCtrlAccessByAlias {

    /** Параметры api запроса */
    export interface RequestI {
        alias:string; // Псевдоним контроллера доступа
    }

    /** Параметры api ответа */
    export interface ResponseI {
        one_ctrl_access:CtrlAccessI; // Информация по группе
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
        // ID группы
        rules.set(rules.rule('alias')
            .type(Components.ModelRulesT.text)
            .require()
            .minLen(3)
            .maxLen(50)
            .errorEx('group_id', 'group_id')
        );

        // =======================================

        let validator =  new Components.ModelValidatorSys(req.sys.errorSys);
        validator.fValid(rules.get(), data);

        return validator.getResult();
    }
}

// =======================================================
/** Получить все модули */
export namespace getAllCtrlAccess {

    /** Параметры api запроса */
    export interface RequestI {
    }

    /** Параметры api ответа */
    export interface ResponseI {
        list_ctrl_access:CtrlAccessI[]; // список модулей
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

        let validator =  new Components.ModelValidatorSys(req.sys.errorSys);
        validator.fValid(rules.get(), data);

        return validator.getResult();
    }
}


// =======================================================
/** Сохранить контроллер доступа */
export namespace saveCtrlAccess {

    /** Параметры api запроса */
    export interface RequestI {
        ctrl_access_id:number; // ID контроллера доступа - который обновляем
        alias?:string; // Псевдоним
        name?:string; // Имя контроллера
        descript?:string; // Описание
    }

    /** Параметры api ответа */
    export interface ResponseI {
        cmd_save_ctrl_access:boolean;
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
        // ID группы
        rules.set(rules.rule('ctrl_access_id')
            .type(Components.ModelRulesT.int)
            .require()
            .errorEx('ctrl_access_id', 'ctrl_access_id')
        );

        // =======================================
        // Псевдоним
        rules.set(rules.rule('alias')
            .type(Components.ModelRulesT.text)
            .minLen(3)
            .maxLen(50)
            .errorEx('alias', 'alias')
        );

        // =======================================
        // Имя контроллера
        rules.set(rules.rule('name')
            .type(Components.ModelRulesT.text)
            .minLen(3)
            .maxLen(100)
            .errorEx('alias', 'alias')
        );

        // =======================================
        // Описание
        rules.set(rules.rule('descript')
            .type(Components.ModelRulesT.text)
            .errorEx('descript', 'descript')
        );

        // =======================================

        let validator =  new Components.ModelValidatorSys(req.sys.errorSys);
        validator.fValid(rules.get(), data);

        return validator.getResult();
    }
}


// =======================================================
/** Добавить контроллер доступа */
export namespace addCtrlAccess {

    /** Параметры api запроса */
    export interface RequestI {
        alias:string; // Псевдоним
        name?:string; // Имя контроллера
        descript?:string; // Описание
    }

    /** Параметры api ответа */
    export interface ResponseI {
        cmd_add_ctrl_access:number; // ID нового контроллера доступа
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
        // Псевдоним
        rules.set(rules.rule('alias')
            .type(Components.ModelRulesT.text)
            .require()
            .minLen(3)
            .maxLen(50)
            .errorEx('alias', 'alias')
        );

        // =======================================
        // Имя контроллера
        rules.set(rules.rule('name')
            .type(Components.ModelRulesT.text)
            .minLen(3)
            .maxLen(100)
            .errorEx('alias', 'alias')
        );

        // =======================================
        // Описание
        rules.set(rules.rule('descript')
            .type(Components.ModelRulesT.text)
            .errorEx('descript', 'descript')
        );

        // =======================================

        let validator =  new Components.ModelValidatorSys(req.sys.errorSys);
        validator.fValid(rules.get(), data);

        return validator.getResult();
    }
}

