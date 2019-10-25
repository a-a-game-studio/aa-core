import * as System from '../../../Namespace/System';
import { GroupI } from '../../../Infrastructure/SQL/Entity/GroupE';
/** Получить информацию о группе */
export declare namespace getGroupByID {
    /** Параметры api запроса */
    interface RequestI {
        id_group: number;
    }
    /** Параметры api ответа */
    interface ResponseI {
        one_group: GroupI;
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
/** Получить все группы */
export declare namespace getAllGroups {
    /** Параметры api запроса */
    interface RequestI {
    }
    /** Параметры api ответа */
    interface ResponseI {
        list_group: GroupI;
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
/** Добавить группу */
export declare namespace addGroup {
    /** Параметры api запроса */
    interface RequestI {
        name: string;
        alias: string;
        descript?: string;
    }
    /** Параметры api ответа */
    interface ResponseI {
        id_group: number;
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
/** Сохранить группу */
export declare namespace saveGroup {
    /** Параметры api запроса */
    interface RequestI {
        id_group: number;
        name?: string;
        alias?: string;
        descript?: string;
    }
    /** Параметры api ответа */
    interface ResponseI {
        cmd_save_group: boolean;
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
    /** Параметры api запроса */
    interface RequestI {
        id_group: number;
    }
    /** Параметры api ответа */
    interface ResponseI {
        del_group: boolean;
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
