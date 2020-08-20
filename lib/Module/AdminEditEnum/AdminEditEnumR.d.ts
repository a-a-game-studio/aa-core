import { EnumI } from '../../Infrastructure/SQL/Entity/EnumE';
import { EnumParamI } from '../../Infrastructure/SQL/Entity/EnumParamE';
export declare namespace AdminEditEnumR {
    /** Получить дерево типов */
    namespace getEnumTreeType {
        /** APIURL */
        const route = "/aa/admin-edit-enum/get-enum-tree-type";
        /** Alias действия */
        const action = "get-enum-tree-type";
        /** Параметры api запроса */
        interface RequestI {
        }
        /** Параметры api ответа */
        interface ResponseI {
        }
    }
    /** Получить Список пользователей */
    namespace init {
        /** APIURL */
        const route = "/aa/admin-edit-enum/init";
        /** Alias действия */
        const action = "init";
        /** Параметры api запроса */
        interface RequestI {
        }
        /** Параметры api ответа */
        interface ResponseI {
            is_init: boolean;
            list_enum: EnumI[];
        }
    }
    /** Выбрать enumу */
    namespace selectEnum {
        /** APIURL */
        const route = "/aa/admin-edit-enum/select-enum";
        /** Alias действия */
        const action = "select-enum";
        /** Параметры api запроса */
        interface RequestI {
            id_enum: number;
        }
        /** Параметры api ответа */
        interface ResponseI {
            one_enum: EnumI;
            list_enum_param: EnumParamI[];
        }
    }
    /** Выбрать enumу */
    namespace selectEnumParam {
        /** APIURL */
        const route = "/aa/admin-edit-enum/select-enum-param";
        /** Alias действия */
        const action = "select-enum-param";
        /** Параметры api запроса */
        interface RequestI {
            id_enum_param: number;
        }
        /** Параметры api ответа */
        interface ResponseI {
            one_enum_param: EnumParamI;
        }
    }
    /** Удалить пользователя из enumы */
    namespace delEnumParam {
        /** APIURL */
        const route = "/aa/admin-edit-enum/del-enum-param";
        /** Alias действия */
        const action = "del-enum-param";
        /** Параметры api запроса */
        interface RequestI {
            id_enum_param: number;
            id_enum: number;
        }
        /** Параметры api ответа */
        interface ResponseI {
            del_enum_param_from_enum: boolean;
            list_enum_param: EnumParamI[];
        }
    }
    /** Добавить enumу пользователей */
    namespace addEnum {
        /** APIURL */
        const route = "/aa/admin-edit-enum/add-enum";
        /** Alias действия */
        const action = "add-enum";
        /** Параметры api запроса */
        interface RequestI {
        }
        /** Параметры api ответа */
        interface ResponseI {
            id_enum: number;
            one_enum: EnumI;
            list_enum: EnumI[];
        }
    }
    /** Добавить enumу контроллер доступа*/
    namespace addEnumParam {
        /** APIURL */
        const route = "/aa/admin-edit-enum/add-enum-param";
        /** Alias действия */
        const action = "add-enum-param";
        /** Параметры api запроса */
        interface RequestI {
            id_enum: number;
        }
        /** Параметры api ответа */
        interface ResponseI {
            id_enum_param: number;
            one_enum_param: EnumParamI;
            list_enum_param: EnumParamI[];
        }
    }
    /** Удалить enumу */
    namespace delEnum {
        /** APIURL */
        const route = "/aa/admin-edit-enum/del-enum";
        /** Alias действия */
        const action = "del-enum";
        /** Параметры api запроса */
        interface RequestI {
            id_enum: number;
        }
        /** Параметры api ответа */
        interface ResponseI {
            del_enum: boolean;
            list_enum: EnumI[];
        }
    }
    /** Сохранить данные о enumу */
    namespace saveEnum {
        /** APIURL */
        const route = "/aa/admin-edit-enum/save-enum";
        /** Alias действия */
        const action = "save-enum";
        /** Параметры api запроса */
        interface RequestI {
            id_enum: number;
            alias: string;
            name: string;
            descript: string;
        }
        /** Параметры api ответа */
        interface ResponseI {
            one_enum: EnumI;
            list_enum: EnumI[];
        }
    }
    /** Сохранить контроллер доступа */
    namespace saveEnumParam {
        /** APIURL */
        const route = "/aa/admin-edit-enum/save-enum-param";
        /** Alias действия */
        const action = "save-enum-param";
        /** Параметры api запроса */
        interface RequestI {
            id_enum_param: number;
            k?: string;
            name?: string;
            val?: number;
            descript?: string;
            type?: string;
            arg1?: string;
            arg2?: string;
            arg3?: string;
        }
        /** Параметры api ответа */
        interface ResponseI {
            one_enum_param: EnumParamI;
            list_enum_param: EnumParamI[];
        }
    }
}
