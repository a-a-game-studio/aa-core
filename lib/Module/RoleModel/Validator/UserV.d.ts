import { UserI } from '../../../Infrastructure/SQL/Entity/UserE';
import { MainRequest } from '../../../Namespace/System';
import { GroupI } from '../../../Infrastructure/SQL/Entity/GroupsE';
/** Получить Список пользователей */
export declare namespace getUserList {
    /** Параметры api запроса */
    interface RequestI {
        offset: number;
        limit: number;
        search_fullname?: string;
        search_username?: string;
    }
    /** Параметры api ответа */
    interface ResponseI {
        list_user: UserI[];
    }
    /**
     * Валидация
     *
     * @param req MainRequest
     * @param data RequestI
     */
    function valid(req: MainRequest, data: any): {
        [key: string]: any;
    };
}
/** Получить пользователя по ID */
export declare namespace getUserByID {
    /** Параметры api запроса */
    interface RequestI {
        user_id: number;
    }
    /** Параметры api ответа */
    interface ResponseI {
        one_user: UserI;
    }
    /**
     * Валидация
     *
     * @param req MainRequest
     * @param data RequestI
     */
    function valid(req: MainRequest, data: any): {
        [key: string]: any;
    };
}
/** Получить группы по ID пользователя*/
export declare namespace getUserGroupsByUserID {
    /** Параметры api запроса */
    interface RequestI {
        user_id: number;
    }
    /** Параметры api ответа */
    interface ResponseI {
        list_group: GroupI[];
    }
    /**
     * Валидация
     *
     * @param req MainRequest
     * @param data RequestI
     */
    function valid(req: MainRequest, data: any): {
        [key: string]: any;
    };
}
/** Добавить пользователя к группе */
export declare namespace addUserToGroup {
    /** Параметры api запроса */
    interface RequestI {
        user_id: number;
        group_id: number;
    }
    /** Параметры api ответа */
    interface ResponseI {
        cmd_add_user_to_group: number;
    }
    /**
     * Валидация
     *
     * @param req MainRequest
     * @param data RequestI
     */
    function valid(req: MainRequest, data: any): {
        [key: string]: any;
    };
}
/** Удалить пользователя из группы */
export declare namespace delUserFromGroup {
    /** Параметры api запроса */
    interface RequestI {
        user_id: number;
        group_id: number;
    }
    /** Параметры api ответа */
    interface ResponseI {
        cmd_del_user_from_group: boolean;
    }
    /**
     * Валидация
     *
     * @param req MainRequest
     * @param data RequestI
     */
    function valid(req: MainRequest, data: any): {
        [key: string]: any;
    };
}
/** Получить apikey по телефону и СМС */
export declare namespace getApiKeyByPhoneAndSms {
    /** Параметры api запроса */
    interface RequestI {
        tel: number;
        sms: number;
    }
    /** Параметры api ответа */
    interface ResponseI {
        state_apikey: string;
    }
    /**
     * Валидация
     *
     * @param req MainRequest
     * @param data RequestI
     */
    function valid(req: MainRequest, data: any): {
        [key: string]: any;
    };
}
