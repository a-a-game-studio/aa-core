import { UserI } from '../../Infrastructure/SQL/Entity/UserE';
import { GroupI } from '../../Infrastructure/SQL/Entity/GroupE';
import { UserGroupI } from '../../Infrastructure/SQL/Entity/UserGroupE';
/** Модуль редактирования пользователей */
export declare namespace AdminEditUserR {
    /** Получить Список пользователей */
    namespace init {
        /** APIURL */
        const route = "/aa/admin-edit-user/init";
        /** Alias действия */
        const action = "init";
        /** Параметры api запроса */
        interface RequestI {
            offset: number;
            limit: number;
            search_surname?: string;
            search_username?: string;
        }
        /** Параметры api ответа */
        interface ResponseI {
            is_init: boolean;
            count_user: number;
            list_user: UserI[];
            list_group: GroupI[];
        }
    }
    /** Выбрать пользователя */
    namespace selectUser {
        /** APIURL */
        const route = "/aa/admin-edit-user/select-user";
        /** Alias действия */
        const action = "select-user";
        /** Параметры api запроса */
        interface RequestI {
            id_user: number;
        }
        /** Параметры api ответа */
        interface ResponseI {
            one_user: UserI;
            list_user_group: UserGroupI[];
        }
    }
    /** Выбрать группу */
    namespace selectGroup {
        /** APIURL */
        const route = "/aa/admin-edit-user/select-group";
        /** Alias действия */
        const action = "select-group";
        /** Параметры api запроса */
        interface RequestI {
            id_group: number;
        }
        /** Параметры api ответа */
        interface ResponseI {
            one_group: GroupI;
        }
    }
    /** Добавить пользователя к группе */
    namespace addUserToGroup {
        /** APIURL */
        const route = "/aa/admin-edit-user/add-user-to-group";
        /** Alias действия */
        const action = "add-user-to-group";
        /** Параметры api запроса */
        interface RequestI {
            id_user: number;
            id_group: number;
        }
        /** Параметры api ответа */
        interface ResponseI {
            add_user_to_group: number;
            list_user_group: UserGroupI[];
        }
    }
    /** Удалить пользователя из группы */
    namespace delUserFromGroup {
        /** APIURL */
        const route = "/aa/admin-edit-user/del-user-from-group";
        /** Alias действия */
        const action = "del-user-from-group";
        /** Параметры api запроса */
        interface RequestI {
            id_user: number;
            id_group: number;
        }
        /** Параметры api ответа */
        interface ResponseI {
            del_user_from_group: boolean;
            list_user_group: UserGroupI[];
        }
    }
    /** Добавить пользователя */
    namespace addUser {
        /** APIURL */
        const route = "/aa/admin-edit-user/add-user";
        /** Alias действия */
        const action = "add-user";
        /** Параметры api запроса */
        interface RequestI {
            login: string;
            name?: string;
            pswd: string;
        }
        /** Параметры api ответа */
        interface ResponseI {
            add_user: number;
            one_user: UserI;
            list_user: UserI[];
        }
    }
    /** Удалить пользователя */
    namespace delUser {
        /** APIURL */
        const route = "/aa/admin-edit-user/del-user";
        /** Alias действия */
        const action = "del-user";
        /** Параметры api запроса */
        interface RequestI {
            id_user: number;
        }
        /** Параметры api ответа */
        interface ResponseI {
            del_user: boolean;
            list_user: UserI[];
        }
    }
    /** Сохранить данные о пользователе */
    namespace saveUser {
        /** APIURL */
        const route = "/aa/admin-edit-user/save-user";
        /** Alias действия */
        const action = "save-user";
        /** Параметры api запроса */
        interface RequestI {
            id_user: number;
            name?: string;
            surname?: string;
            patronymic?: string;
            email?: string;
        }
        /** Параметры api ответа */
        interface ResponseI {
            save_user: boolean;
            one_user: UserI;
            list_user: UserI[];
        }
    }
}
