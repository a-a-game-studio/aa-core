import { UserI } from '../../../Infrastructure/SQL/Entity/UserE';
import * as System from '../../../Namespace/System';
/** Получить информацию о пользователе */
export declare namespace getUserInfo {
    /** Параметры api запроса */
    interface RequestI {
        user_id: number;
    }
    /** Параметры api ответа */
    interface ResponseI {
        one_user_info: UserI;
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
    /** Параметры api запроса */
    interface RequestI {
        login: string;
        pswd: string;
    }
    /** Параметры api ответа */
    interface ResponseI {
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
/** Сохранить данные о пользователе */
export declare namespace save {
    /** Параметры api запроса */
    interface RequestI {
        user_id: number;
        name: string;
        surname: string;
        patronymic: string;
        email: string;
    }
    /** Параметры api ответа */
    interface ResponseI {
        save_user: boolean;
        one_user: UserI;
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
