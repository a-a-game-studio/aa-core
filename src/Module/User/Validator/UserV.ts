
import * as Components from '@a-a-game-studio/aa-components/lib';
import { UserI } from '../../../Infrastructure/SQL/Entity/UserE';
import * as System from '../../../Namespace/System';

// =======================================================
/** Получить информацию о пользователе */
export namespace getUserInfo {

    /** Параметры api запроса */
    export interface RequestI {
        user_id:number; // ID пользователя
    }

    /** Параметры api ответа */
    export interface ResponseI {
        one_user_info: UserI; // пользователь
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
        rules.set(rules.rule('login')
            .type(Components.ModelRulesT.int)
            .require()
            .minLen(3)
            .maxLen(100)
            .errorEx('login', 'login')
        );

        // Сколько записей получать
        rules.set(rules.rule('pswd')
            .type(Components.ModelRulesT.int)
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
/** Залогиниться */
export namespace login {

    /** Параметры api запроса */
    export interface RequestI {
        login:string; // Псевдоним пользователя
        pswd:string; // Пароль
    }

    /** Параметры api ответа */
    export interface ResponseI {
        one_user: UserI; // пользователь
        token:string; // Токен
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
        rules.set(rules.rule('login')
            .type(Components.ModelRulesT.int)
            .require()
            .minLen(3)
            .maxLen(100)
            .errorEx('login', 'login')
        );

        // Сколько записей получать
        rules.set(rules.rule('pswd')
            .type(Components.ModelRulesT.int)
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

/** Зарегистрироваться */
export namespace register {

    /** Параметры api запроса */
    export interface RequestI {
        login:string; // Псевдоним пользователя
        name?:string; // Имя пользователя не обызательный параметр
        email:string; // email
        pswd:string; // Пароль
    }

    /** Параметры api ответа */
    export interface ResponseI {
        token:string; // Токен
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

/** Сохранить данные о пользователе */
export namespace save {

    /** Параметры api запроса */
    export interface RequestI {
        user_id:number; // email
        name:string; // Пароль
        surname:string; // Фамилия
        patronymic:string; // Отчество
        email:string; // Изменить email
    }

    /** Параметры api ответа */
    export interface ResponseI {
        save_user:boolean; // команда сохранения пользователя
        one_user: UserI; // пользователь
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
