import { UserI } from '../../../Infrastructure/SQL/Entity/UserE';
import { GroupI } from '../../../Infrastructure/SQL/Entity/GroupE';
import { System } from '../../..';
import { UserGroupI } from '../../../Infrastructure/SQL/Entity/UserGroupE';
import { CtrlAccessI } from '../../../Infrastructure/SQL/Entity/CtrlAccessE';
import { AccessGroupI } from '../../../Infrastructure/SQL/Entity/AccessGroupE';
/** Получить Список пользователей */
export declare namespace init {
    /** APIURL */
    const route = "/aa/admin-edit-group/init";
    /** Alias действия */
    const action = "init";
    /** Параметры api запроса */
    interface RequestI {
    }
    /** Параметры api ответа */
    interface ResponseI {
        is_init: boolean;
        list_group: GroupI[];
        list_ctrl_access: CtrlAccessI[];
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
/** Выбрать группу */
export declare namespace selectGroup {
    /** APIURL */
    const route = "/aa/admin-edit-group/select-group";
    /** Alias действия */
    const action = "select-group";
    /** Параметры api запроса */
    interface RequestI {
        id_group: number;
    }
    /** Параметры api ответа */
    interface ResponseI {
        one_group: UserI;
        list_access_group: UserGroupI[];
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
/** Выбрать группу */
export declare namespace selectCtrlAccess {
    /** APIURL */
    const route = "/aa/admin-edit-group/select-ctrl-access";
    /** Alias действия */
    const action = "select-ctrl-access";
    /** Параметры api запроса */
    interface RequestI {
        id_ctrl_access: number;
    }
    /** Параметры api ответа */
    interface ResponseI {
        one_ctrl_access: CtrlAccessI;
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
/** Добавить права группе на контроллер */
export declare namespace addCtrlAccessToGroup {
    /** APIURL */
    const route = "/aa/admin-edit-group/add-ctrl-access-to-group";
    /** Alias действия */
    const action = "add-ctrl-access-to-group";
    /** Параметры api запроса */
    interface RequestI {
        id_ctrl_access: number;
        id_group: number;
    }
    /** Параметры api ответа */
    interface ResponseI {
        add_ctrl_access_to_group: number;
        list_access_group: AccessGroupI[];
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
export declare namespace delCtrlAccessFromGroup {
    /** APIURL */
    const route = "/aa/admin-edit-group/del-ctrl-access-from-group";
    /** Alias действия */
    const action = "del-ctrl-access-from-group";
    /** Параметры api запроса */
    interface RequestI {
        id_ctrl_access: number;
        id_group: number;
    }
    /** Параметры api ответа */
    interface ResponseI {
        del_ctrl_access_from_group: boolean;
        list_access_group: AccessGroupI[];
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
/** Добавить группу пользователей */
export declare namespace addGroup {
    /** APIURL */
    const route = "/aa/admin-edit-group/add-group";
    /** Alias действия */
    const action = "add-group";
    /** Параметры api запроса */
    interface RequestI {
        alias: string;
        name: string;
        group: string;
    }
    /** Параметры api ответа */
    interface ResponseI {
        add_group: number;
        one_group: UserI;
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
/** Удалить группу */
export declare namespace delGroup {
    /** APIURL */
    const route = "/aa/admin-edit-group/del-group";
    /** Alias действия */
    const action = "del-group";
    /** Параметры api запроса */
    interface RequestI {
        id_group: number;
    }
    /** Параметры api ответа */
    interface ResponseI {
        del_group: boolean;
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
/** Сохранить данные о группу */
export declare namespace saveGroup {
    /** APIURL */
    const route = "/aa/admin-edit-group/save-group";
    /** Alias действия */
    const action = "save-group";
    /** Параметры api запроса */
    interface RequestI {
        id_group: number;
        alias: string;
        name: string;
        descript: string;
    }
    /** Параметры api ответа */
    interface ResponseI {
        save_group: boolean;
        one_group: GroupI;
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
/** Сохранить контроллер доступа */
export declare namespace saveCtrlAccess {
    /** APIURL */
    const route = "/aa/admin-edit-group/save-ctrl-access";
    /** Alias действия */
    const action = "save-ctrl-access";
    /** Параметры api запроса */
    interface RequestI {
        id_ctrl_access: number;
        alias: string;
        name: string;
        descript: string;
    }
    /** Параметры api ответа */
    interface ResponseI {
        save_ctrl_access: boolean;
        one_ctrl_access: CtrlAccessI;
        list_ctrl_access: CtrlAccessI[];
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
