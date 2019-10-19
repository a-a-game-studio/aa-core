
import * as Components from '@a-a-game-studio/aa-components/lib';
import { UserI } from '../../../Infrastructure/SQL/Entity/UserE';
import { MainRequest } from '../../../Namespace/System';
import { GroupI } from '../../../Infrastructure/SQL/Entity/GroupE';
import { System } from '../../..';
import { UserGroupI } from '../../../Infrastructure/SQL/Entity/UserGroupE';

// =======================================================
/** Получить Список пользователей */
export namespace init {

    /** APIURL */
    export const route = '/aa/admin-edit-user/init';

    /** Alias действия */
    export const action = 'init';

    /** Параметры api запроса */
    export interface RequestI {
        offset: number; // С какой записи получать данные
        limit: number; // Сколько записей получать
        search_surname?: string; // Поиск По Фамилии пользователя
        search_username?: string; // Поиск по Имени пользователя
    }

    /** Параметры api ответа */
    export interface ResponseI {
        is_admin:boolean; // Является ли пользователь администратором
        count_user: number; // Количество пользователей
        list_user: UserI[]; // Список пользователей
        list_group: GroupI[]; // Список всех групп
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
/** Выбрать пользователя */
export namespace selectUser {

    /** APIURL */
    export const route = '/aa/admin-edit-user/select-user';

    /** Alias действия */
    export const action = 'select-user';

    /** Параметры api запроса */
    export interface RequestI {
        id_user: number; // ID пользователя
    }

    /** Параметры api ответа */
    export interface ResponseI {
        one_user: UserI; // Информация о пользователе
        list_user_group: UserGroupI[]; // Список всех групп в которых состоит пользователь
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
/** Выбрать группу */
export namespace selectGroup {

    /** APIURL */
    export const route = '/aa/admin-edit-user/select-group';

    /** Alias действия */
    export const action = 'select-group';

    /** Параметры api запроса */
    export interface RequestI {
        id_group: number; // ID Группы
    }

    /** Параметры api ответа */
    export interface ResponseI {
        one_group: GroupI; // Информация о группе
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

    /** APIURL */
    export const route = '/aa/admin-edit-user/add-user-to-group';

    /** Alias действия */
    export const action = 'add-user-to-group';

    /** Параметры api запроса */
    export interface RequestI {
        id_user: number; // ID пользователя
        id_group: number; // ID группы
    }

    /** Параметры api ответа */
    export interface ResponseI {
        add_user_to_group: number; // ID Связи пользователя и группы
        list_user_group: UserGroupI[]; // Список всех групп в которых состоит пользователь
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

    /** APIURL */
    export const route = '/aa/admin-edit-user/del-user-from-group';

    /** Alias действия */
    export const action = 'del-user-from-group';

    /** Параметры api запроса */
    export interface RequestI {
        id_user: number; // ID пользователя
        id_group: number; // ID группы
    }

    /** Параметры api ответа */
    export interface ResponseI {
        del_user_from_group: boolean; // Статус операции
        list_user_group: UserGroupI[]; // Список всех групп в которых состоит пользователь
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

/** Добавить пользователя */
export namespace addUser {

    /** APIURL */
    export const route = '/aa/admin-edit-user/add-user';

    /** Alias действия */
    export const action = 'add-user';

    /** Параметры api запроса */
    export interface RequestI {
        login:string; // Псевдоним пользователя
        name?:string; // Имя пользователя не обызательный параметр
        pswd:string; // Пароль
    }

    /** Параметры api ответа */
    export interface ResponseI {
        add_user:boolean; // ID Нового пользователя
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

// =======================================================
/** Удалить пользователя */
export namespace delUser {

    /** APIURL */
    export const route = '/aa/admin-edit-user/del-user';

    /** Alias действия */
    export const action = 'del-user';

    /** Параметры api запроса */
    export interface RequestI {
        id_user: number; // ID пользователя
    }

    /** Параметры api ответа */
    export interface ResponseI {
        del_user: boolean; // Статус операции
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

        // =======================================

        let validator = new Components.ModelValidatorSys(req.sys.errorSys);
        validator.fValid(rules.get(), data);

        return validator.getResult();
    }
}

/** Сохранить данные о пользователе */
export namespace saveUser {

    /** APIURL */
    export const route = '/aa/admin-edit-user/save-user';

    /** Alias действия */
    export const action = 'save-user';

    /** Параметры api запроса */
    export interface RequestI {
        id_user:number; // email
        name:string; // Пароль
        surname:string; // Фамилия
        patronymic:string; // Отчество
        email:string; // Изменить email
    }

    /** Параметры api ответа */
    export interface ResponseI {
        save_user:boolean; // команда сохранения пользователя
        one_user: UserI; // пользователь
        list_user: UserI[]; // 
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

        // email
        rules.set(rules.rule('email')
            .type(Components.ModelRulesT.str)
            .require()
            .if('.+@.+\..+')
            .minLen(3)
            .maxLen(100)
            .errorEx('email', 'email')
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