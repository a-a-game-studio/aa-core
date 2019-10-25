import { UserI } from '../../../Infrastructure/SQL/Entity/UserE';
import { GroupI } from '../../../Infrastructure/SQL/Entity/GroupE';
import { System } from '../../..';
/** Получить Список пользователей */
export declare namespace getUserList {
    const route = "/api/admin/user/get-users";
    /** Параметры api запроса */
    interface RequestI {
        offset: number;
        limit: number;
        search_surname?: string;
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
    function valid(req: System.MainRequest, data: any): {
        [key: string]: any;
    };
}
/** Получить пользователя по ID */
export declare namespace getUserByID {
    /** Параметры api запроса */
    interface RequestI {
        id_user: number;
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
    function valid(req: System.MainRequest, data: any): {
        [key: string]: any;
    };
}
/** Получить группы по ID пользователя*/
export declare namespace getUserGroupsByUserID {
    /** Параметры api запроса */
    interface RequestI {
        id_user: number;
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
    function valid(req: System.MainRequest, data: any): {
        [key: string]: any;
    };
}
/** Добавить пользователя к группе */
export declare namespace addUserToGroup {
    /** Параметры api запроса */
    interface RequestI {
        id_user: number;
        id_group: number;
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
    function valid(req: System.MainRequest, data: any): {
        [key: string]: any;
    };
}
/** Удалить пользователя из группы */
export declare namespace delUserFromGroup {
    /** Параметры api запроса */
    interface RequestI {
        id_user: number;
        id_group: number;
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
    function valid(req: System.MainRequest, data: any): {
        [key: string]: any;
    };
}
/** Получить token по телефону и СМС */
export declare namespace getTokenByPhoneAndSms {
    /** Параметры api запроса */
    interface RequestI {
        phone: number;
        sms: number;
    }
    /** Параметры api ответа */
    interface ResponseI {
        state_token: string;
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
/** Добавить пользователя */
export declare namespace addUser {
    /** Параметры api запроса */
    interface RequestI {
        login: string;
        name?: string;
        pswd: string;
    }
    /** Параметры api ответа */
    interface ResponseI {
        cmd_confirm_register: boolean;
        list_user: UserI[];
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
