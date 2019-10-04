import * as System from '../../../Namespace/System';
import { GroupI } from '../../../Infrastructure/SQL/Entity/GroupsE';
/** Получить информацию о группе */
export declare namespace getGroupByID {
    /** Параметры api запроса */
    interface RequestI {
        group_id: number;
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
/** Сохранить группу */
export declare namespace saveGroup {
    /** Параметры api запроса */
    interface RequestI {
        group_id: number;
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
