
import * as Components from '@a-a-game-studio/aa-components/lib';
import { UserI } from '../../../Infrastructure/SQL/Entity/UserE';
import * as System from '../../../Namespace/System';
import { GroupI } from '../../../Infrastructure/SQL/Entity/GroupE';

// =======================================================
/** Получить информацию о группе */
export namespace getGroupByID {

    /** Параметры api запроса */
    export interface RequestI {
        id_group: number; // ID группы
    }

    /** Параметры api ответа */
    export interface ResponseI {
        one_group: GroupI; // Информация по группе
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

        // ID группы
        rules.set(rules.rule('id_group')
            .type(Components.ModelRulesT.int)
            .require()
            .moreOrEq(0)
            .errorEx('id_group', 'id_group')
        );

        // =======================================

        let validator = new Components.ModelValidatorSys(req.sys.errorSys);
        validator.fValid(rules.get(), data);

        return validator.getResult();
    }
}


// =======================================================
/** Получить все группы */
export namespace getAllGroups {

    /** Параметры api запроса */
    export interface RequestI {
    }

    /** Параметры api ответа */
    export interface ResponseI {
        list_group: GroupI; // Информация по группе
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

        let validator = new Components.ModelValidatorSys(req.sys.errorSys);
        validator.fValid(rules.get(), data);

        return validator.getResult();
    }
}


// =======================================================
/** Добавить группу */
export namespace addGroup {

    /** Параметры api запроса */
    export interface RequestI {
        name: string; // Наименование группы
        alias: string; // Псевдоним
        descript?: string; // Описание
    }

    /** Параметры api ответа */
    export interface ResponseI {
        id_group: number; // Информация по группе
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

        // Имя
        rules.set(rules.rule('name')
            .type(Components.ModelRulesT.text)
            .require()
            .errorEx('name', 'name')
        );

        // Псевдоним
        rules.set(rules.rule('alias')
            .require()
            .type(Components.ModelRulesT.text)
            .errorEx('alias', 'alias')
        );

        // Описание
        rules.set(rules.rule('descript')
            .type(Components.ModelRulesT.text)
            .errorEx('descript', 'descript')
        );

        // =======================================

        let validator = new Components.ModelValidatorSys(req.sys.errorSys);
        validator.fValid(rules.get(), data);

        return validator.getResult();
    }
}

// =======================================================
/** Сохранить группу */
export namespace saveGroup {

    /** Параметры api запроса */
    export interface RequestI {
        id_group: number; // ID группы
        name?: string; // Наименование группы
        alias?: string; // Псевдоним
        descript?: string; // Описание
    }

    /** Параметры api ответа */
    export interface ResponseI {
        cmd_save_group: boolean; // Информация по группе
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

        // ID группы
        rules.set(rules.rule('id_group')
            .type(Components.ModelRulesT.int)
            .require()
            .moreOrEq(0)
            .errorEx('id_group', 'id_group')
        );

        // Имя
        rules.set(rules.rule('name')
            .type(Components.ModelRulesT.text)
            .errorEx('name', 'name')
        );

        // Псевдоним
        rules.set(rules.rule('alias')
            .type(Components.ModelRulesT.text)
            .errorEx('alias', 'alias')
        );

        // Описание
        rules.set(rules.rule('descript')
            .type(Components.ModelRulesT.text)
            .errorEx('descript', 'descript')
        );

        // =======================================

        let validator = new Components.ModelValidatorSys(req.sys.errorSys);
        validator.fValid(rules.get(), data);

        return validator.getResult();
    }
}

// =======================================================
/** Удалить группу */
export namespace delGroup {

    /** Параметры api запроса */
    export interface RequestI {
        id_group: number; // ID группы
    }

    /** Параметры api ответа */
    export interface ResponseI {
        del_group: boolean; // Информация по группе
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

        // ID группы
        rules.set(rules.rule('id_group')
            .type(Components.ModelRulesT.int)
            .require()
            .moreOrEq(0)
            .errorEx('id_group', 'id_group')
        );

        // =======================================

        let validator = new Components.ModelValidatorSys(req.sys.errorSys);
        validator.fValid(rules.get(), data);

        return validator.getResult();
    }
}