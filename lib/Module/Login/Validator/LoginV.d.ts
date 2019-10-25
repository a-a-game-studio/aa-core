import { UserI } from '../../../Infrastructure/SQL/Entity/UserE';
import * as System from '../../../Namespace/System';
/** Начальные данные */
export declare namespace init {
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
    /**
     * Валидация
     *
     * @param req MainRequest
     * @param data RequestI
     */
    function valid(req: System.MainRequest, data: any): {
        [key: string]: any;
    };
}
/** Залогиниться */
export declare namespace login {
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
    /**
     * Валидация
     *
     * @param req MainRequest
     * @param data RequestI
     */
    function valid(req: System.MainRequest, data: any): {
        [key: string]: any;
    };
}
/** Зарегистрироваться */
export declare namespace register {
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
    /**
     * Валидация
     *
     * @param req MainRequest
     * @param data RequestI
     */
    function valid(req: System.MainRequest, data: any): {
        [key: string]: any;
    };
}
