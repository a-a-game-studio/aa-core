import { MainRequest } from '../../../Namespace/System';
import { CtrlAccessI } from '../../../Infrastructure/SQL/Entity/CtrlAccessE';
/** Получить информацию о группе */
export declare namespace getCtrlAccessByAlias {
    /** Параметры api запроса */
    interface RequestI {
        alias: string;
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
    function valid(req: MainRequest, data: any): {
        [key: string]: any;
    };
}
/** Получить все модули */
export declare namespace getAllCtrlAccess {
    /** Параметры api запроса */
    interface RequestI {
    }
    /** Параметры api ответа */
    interface ResponseI {
        list_ctrl_access: CtrlAccessI[];
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
/** Сохранить контроллер доступа */
export declare namespace saveCtrlAccess {
    /** Параметры api запроса */
    interface RequestI {
        ctrl_access_id: number;
        alias?: string;
        name?: string;
        descript?: string;
    }
    /** Параметры api ответа */
    interface ResponseI {
        cmd_save_ctrl_access: boolean;
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
/** Добавить контроллер доступа */
export declare namespace addCtrlAccess {
    /** Параметры api запроса */
    interface RequestI {
        alias: string;
        name?: string;
        descript?: string;
    }
    /** Параметры api ответа */
    interface ResponseI {
        cmd_add_ctrl_access: number;
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
/** Добавить контроллер доступа */
export declare namespace delCtrlAccess {
    /** Параметры api запроса */
    interface RequestI {
        alias: string;
    }
    /** Параметры api ответа */
    interface ResponseI {
        cmd_del_ctrl_access: boolean;
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
