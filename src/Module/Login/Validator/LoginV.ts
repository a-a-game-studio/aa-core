
import * as Components from '@a-a-game-studio/aa-components/lib';
import { UserI } from '../../../Infrastructure/SQL/Entity/UserE';
import * as System from '../../../Namespace/System';
import { router } from '../Controller/LoginController';

// =======================================================
/** Начальные данные */
export namespace init {

    /** APIURL */
    export const route = '/aa/login/init';

    /** Alias действия */
    export const action = 'init';

    /** Параметры api запроса */
    export interface RequestI {
    }

    /** Параметры api ответа */
    export interface ResponseI {
        is_login:boolean;
        one_user_info: UserI; // пользователь
        id_user:number;
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
/** Залогиниться */
export namespace login {

    /** APIURL */
    export const route = '/aa/login/login';

    /** Alias действия */
    export const action = 'login';

    /** Параметры api запроса */
    export interface RequestI {
        login:string; // Псевдоним пользователя
        pswd:string; // Пароль
    }

    /** Параметры api ответа */
    export interface ResponseI {
        is_login: boolean; // Статус авторизирован пользователь или нет
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
            .type(Components.ModelRulesT.text)
            .require()
            .minLen(3)
            .maxLen(100)
            .errorEx('login', 'login')
        );

        // Сколько записей получать
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

/** Зарегистрироваться */
export namespace register {

    /** APIURL */
    export const route = '/aa/login/register';

    /** Alias действия */
    export const action = 'register';

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


