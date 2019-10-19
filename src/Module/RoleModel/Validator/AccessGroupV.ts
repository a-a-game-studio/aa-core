import * as Components from '@a-a-game-studio/aa-components/lib';
import { UserI } from '../../../Infrastructure/SQL/Entity/UserE';
import { MainRequest } from '../../../Namespace/System';
import { GroupI } from '../../../Infrastructure/SQL/Entity/GroupE';
import { AccessGroupI } from '../../../Infrastructure/SQL/Entity/AccessGroupE';
import { CtrlAccessI } from '../../../Infrastructure/SQL/Entity/CtrlAccessE';

// =======================================================
/** Получить Список пользователей */
export namespace getCtrlAccessOfGroupByID {

    /** Параметры api запроса */
    export interface RequestI {
        id_group: number; // ID группы
    }

    /** Параметры api ответа */
    export interface ResponseI {
        list_ctrl_access: AccessGroupI[]; // Список пользователей
    }

    /**
     * Валидация
     *
     * @param req MainRequest
     * @param data RequestI
     */
    export function valid(req: MainRequest, data: any) {
        let rules = new Components.ModelRulesC();

        // =======================================

        // Проверка с какой записи получать данные
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
    export function valid(req: MainRequest, data: any) {
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
    export function valid(req: MainRequest, data: any) {
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
/** Сохранить разрешения на греппе на контроллер */
export namespace saveAccessGroup {

    /** Параметры api запроса */
    export interface RequestI {
        id_access_group: number; // ID параметров доступа
        create_access: boolean; // Разрешение на создание
        read_access: boolean; // Разрешение на чтение
        update_access: boolean; // Разрешение на обнление
        delete_access: boolean; // Разрешение на удаление
    }

    /** Параметры api ответа */
    export interface ResponseI {
        cmd_save_access_group: boolean; // Успешно или нет прошло изменение доступа
    }

    /**
     * Валидация
     *
     * @param req MainRequest
     * @param data RequestI
     */
    export function valid(req: MainRequest, data: any) {
        let rules = new Components.ModelRulesC();

        // =======================================


        // ID параметров доступа
        rules.set(rules.rule('id_access_group')
            .type(Components.ModelRulesT.int)
            .require()
            .moreOrEq(0)
            .errorEx('id_access_group', 'id_access_group')
        );

        // Разрешение на создание
        rules.set(rules.rule('create_access')
            .type(Components.ModelRulesT.boolean)
            .errorEx('create_access', 'create_access')
        );

        // Разрешение на чтение
        rules.set(rules.rule('read_access')
            .type(Components.ModelRulesT.boolean)
            .errorEx('read_access', 'read_access')
        );

        // Разрешение на обновление
        rules.set(rules.rule('update_access')
            .type(Components.ModelRulesT.boolean)
            .errorEx('update_access', 'update_access')
        );

        // Разрешение на удаление
        rules.set(rules.rule('delete_access')
            .type(Components.ModelRulesT.boolean)
            .errorEx('delete_access', 'delete_access')
        );

        // =======================================

        let validator = new Components.ModelValidatorSys(req.sys.errorSys);
        validator.fValid(rules.get(), data);

        return validator.getResult();
    }
}

// =======================================================
/** Добавить контроллер доступа к группе */
export namespace addCtrlAccessToGroup {

    /** Параметры api запроса */
    export interface RequestI {
        id_ctrl_access: number;
        id_group: number;
    }

    /** Параметры api ответа */
    export interface ResponseI {
        cmd_add_ctrl_access_to_group: number; // ID связи контроллера и группы
    }

    /**
     * Валидация
     *
     * @param req MainRequest
     * @param data RequestI
     */
    export function valid(req: MainRequest, data: any) {
        let rules = new Components.ModelRulesC();

        // =======================================
        // ID контроллера
        rules.set(rules.rule('id_ctrl_access')
            .type(Components.ModelRulesT.int)
            .require()
            .more(0)
            .errorEx('id_ctrl_access', 'id_ctrl_access')
        );

        // =======================================
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
/** Удалить контроллер доступа у группы */
export namespace delCtrlAccessFromGroup {

    /** Параметры api запроса */
    export interface RequestI {
        id_ctrl_access: number;
        id_group: number;
    }

    /** Параметры api ответа */
    export interface ResponseI {
        cmd_del_ctrl_access_from_group: boolean; // Статус удаления
    }

    /**
     * Валидация
     *
     * @param req MainRequest
     * @param data RequestI
     */
    export function valid(req: MainRequest, data: any) {
        let rules = new Components.ModelRulesC();

        // =======================================
        // ID контроллера
        rules.set(rules.rule('id_ctrl_access')
            .type(Components.ModelRulesT.int)
            .require()
            .more(0)
            .errorEx('id_ctrl_access', 'id_ctrl_access')
        );

        // =======================================
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