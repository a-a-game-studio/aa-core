import { UserI } from '../../Infrastructure/SQL/Entity/UserE';
/** Модуль логина/авторизации */
export declare namespace LoginR {
    /** Начальные данные */
    namespace init {
        /** APIURL */
        const route = "/aa/login/init";
        /** Alias действия */
        const action = "init";
        /** Параметры api запроса */
        interface RequestI {
        }
        /** Параметры api ответа */
        interface ResponseI {
            is_login: boolean;
            one_user_info: UserI;
            id_user: number;
        }
    }
    /** Залогиниться */
    namespace login {
        /** APIURL */
        const route = "/aa/login/login";
        /** Alias действия */
        const action = "login";
        /** Параметры api запроса */
        interface RequestI {
            login: string;
            pswd: string;
        }
        /** Параметры api ответа */
        interface ResponseI {
            is_login: boolean;
            one_user: UserI;
            token: string;
        }
    }
    /** Зарегистрироваться */
    namespace register {
        /** APIURL */
        const route = "/aa/login/register";
        /** Alias действия */
        const action = "register";
        /** Параметры api запроса */
        interface RequestI {
            login: string;
            name?: string;
            email: string;
            pswd: string;
        }
        /** Параметры api ответа */
        interface ResponseI {
            token: string;
        }
    }
}
