import { UserI } from '../../../Infrastructure/SQL/Entity/UserE';
import { MainRequest } from '../../../Namespace/System';
import { GroupI } from '../../../Infrastructure/SQL/Entity/GroupsE';
import { AccessGroupI } from '../../../Infrastructure/SQL/Entity/AccessGroupE';
/** Получить Список пользователей */
export declare namespace getCtrlAccessOfGroupByID {
    /** Параметры api запроса */
    interface RequestI {
        group_id: number;
    }
    /** Параметры api ответа */
    interface ResponseI {
        list_ctrl_access: AccessGroupI[];
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
/** Сохранить разрешения на греппе на контроллер */
export declare namespace saveAccessGroup {
    /** Параметры api запроса */
    interface RequestI {
        access_group_id: number;
        create_access: boolean;
        read_access: boolean;
        update_access: boolean;
        delete_access: boolean;
    }
    /** Параметры api ответа */
    interface ResponseI {
        cmd_save_access_group: boolean;
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
/** Добавить контроллер доступа к группе */
export declare namespace addCtrlAccessToGroup {
    /** Параметры api запроса */
    interface RequestI {
        ctrl_access_id: number;
        group_id: number;
    }
    /** Параметры api ответа */
    interface ResponseI {
        cmd_add_ctrl_access_to_group: number;
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
/** Удалить контроллер доступа у группы */
export declare namespace delCtrlAccessFromGroup {
    /** Параметры api запроса */
    interface RequestI {
        ctrl_access_id: number;
        group_id: number;
    }
    /** Параметры api ответа */
    interface ResponseI {
        cmd_del_ctrl_access_from_group: boolean;
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
