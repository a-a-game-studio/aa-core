import { UserI } from '../../../Infrastructure/SQL/Entity/UserE';
import * as System from '../../../Namespace/System';
/** Получить информацию о себе */
export declare namespace getSelfUserInfo {
    /** Параметры api запроса */
    interface RequestI {
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
/** Получить информацию о пользователе */
export declare namespace getUserInfo {
    /** Параметры api запроса */
    interface RequestI {
        id_user: number;
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
/** Сохранить данные о пользователе */
export declare namespace save {
    /** Параметры api запроса */
    interface RequestI {
        id_user: number;
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
