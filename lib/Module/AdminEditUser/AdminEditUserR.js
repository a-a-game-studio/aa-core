"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminEditUserR = void 0;
/** Модуль редактирования пользователей */
var AdminEditUserR;
(function (AdminEditUserR) {
    // =======================================================
    /** Получить Список пользователей */
    let init;
    (function (init) {
        /** APIURL */
        init.route = '/aa/admin-edit-user/init';
        /** Alias действия */
        init.action = 'init';
    })(init = AdminEditUserR.init || (AdminEditUserR.init = {}));
    // =======================================================
    /** Выбрать пользователя */
    let selectUser;
    (function (selectUser) {
        /** APIURL */
        selectUser.route = '/aa/admin-edit-user/select-user';
        /** Alias действия */
        selectUser.action = 'select-user';
    })(selectUser = AdminEditUserR.selectUser || (AdminEditUserR.selectUser = {}));
    // =======================================================
    /** Выбрать группу */
    let selectGroup;
    (function (selectGroup) {
        /** APIURL */
        selectGroup.route = '/aa/admin-edit-user/select-group';
        /** Alias действия */
        selectGroup.action = 'select-group';
    })(selectGroup = AdminEditUserR.selectGroup || (AdminEditUserR.selectGroup = {}));
    // =======================================================
    /** Добавить пользователя к группе */
    let addUserToGroup;
    (function (addUserToGroup) {
        /** APIURL */
        addUserToGroup.route = '/aa/admin-edit-user/add-user-to-group';
        /** Alias действия */
        addUserToGroup.action = 'add-user-to-group';
    })(addUserToGroup = AdminEditUserR.addUserToGroup || (AdminEditUserR.addUserToGroup = {}));
    // =======================================================
    /** Удалить пользователя из группы */
    let delUserFromGroup;
    (function (delUserFromGroup) {
        /** APIURL */
        delUserFromGroup.route = '/aa/admin-edit-user/del-user-from-group';
        /** Alias действия */
        delUserFromGroup.action = 'del-user-from-group';
    })(delUserFromGroup = AdminEditUserR.delUserFromGroup || (AdminEditUserR.delUserFromGroup = {}));
    /** Добавить пользователя */
    let addUser;
    (function (addUser) {
        /** APIURL */
        addUser.route = '/aa/admin-edit-user/add-user';
        /** Alias действия */
        addUser.action = 'add-user';
    })(addUser = AdminEditUserR.addUser || (AdminEditUserR.addUser = {}));
    // =======================================================
    /** Удалить пользователя */
    let delUser;
    (function (delUser) {
        /** APIURL */
        delUser.route = '/aa/admin-edit-user/del-user';
        /** Alias действия */
        delUser.action = 'del-user';
    })(delUser = AdminEditUserR.delUser || (AdminEditUserR.delUser = {}));
    /** Сохранить данные о пользователе */
    let saveUser;
    (function (saveUser) {
        /** APIURL */
        saveUser.route = '/aa/admin-edit-user/save-user';
        /** Alias действия */
        saveUser.action = 'save-user';
    })(saveUser = AdminEditUserR.saveUser || (AdminEditUserR.saveUser = {}));
})(AdminEditUserR = exports.AdminEditUserR || (exports.AdminEditUserR = {}));
//# sourceMappingURL=AdminEditUserR.js.map