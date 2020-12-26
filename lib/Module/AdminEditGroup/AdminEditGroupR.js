"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminEditGroupR = void 0;
var AdminEditGroupR;
(function (AdminEditGroupR) {
    // =======================================================
    /** Получить Список пользователей */
    let init;
    (function (init) {
        /** APIURL */
        init.route = '/aa/admin-edit-group/init';
        /** Alias действия */
        init.action = 'init';
    })(init = AdminEditGroupR.init || (AdminEditGroupR.init = {}));
    // =======================================================
    /** Выбрать группу */
    let selectGroup;
    (function (selectGroup) {
        /** APIURL */
        selectGroup.route = '/aa/admin-edit-group/select-group';
        /** Alias действия */
        selectGroup.action = 'select-group';
    })(selectGroup = AdminEditGroupR.selectGroup || (AdminEditGroupR.selectGroup = {}));
    // =======================================================
    /** Выбрать группу */
    let selectCtrlAccess;
    (function (selectCtrlAccess) {
        /** APIURL */
        selectCtrlAccess.route = '/aa/admin-edit-group/select-ctrl-access';
        /** Alias действия */
        selectCtrlAccess.action = 'select-ctrl-access';
    })(selectCtrlAccess = AdminEditGroupR.selectCtrlAccess || (AdminEditGroupR.selectCtrlAccess = {}));
    // =======================================================
    /** Добавить права группе на контроллер */
    let addCtrlAccessToGroup;
    (function (addCtrlAccessToGroup) {
        /** APIURL */
        addCtrlAccessToGroup.route = '/aa/admin-edit-group/add-ctrl-access-to-group';
        /** Alias действия */
        addCtrlAccessToGroup.action = 'add-ctrl-access-to-group';
    })(addCtrlAccessToGroup = AdminEditGroupR.addCtrlAccessToGroup || (AdminEditGroupR.addCtrlAccessToGroup = {}));
    // =======================================================
    /** Удалить пользователя из группы */
    let delCtrlAccessFromGroup;
    (function (delCtrlAccessFromGroup) {
        /** APIURL */
        delCtrlAccessFromGroup.route = '/aa/admin-edit-group/del-ctrl-access-from-group';
        /** Alias действия */
        delCtrlAccessFromGroup.action = 'del-ctrl-access-from-group';
    })(delCtrlAccessFromGroup = AdminEditGroupR.delCtrlAccessFromGroup || (AdminEditGroupR.delCtrlAccessFromGroup = {}));
    // =======================================================
    /** Добавить группу пользователей */
    let addGroup;
    (function (addGroup) {
        /** APIURL */
        addGroup.route = '/aa/admin-edit-group/add-group';
        /** Alias действия */
        addGroup.action = 'add-group';
    })(addGroup = AdminEditGroupR.addGroup || (AdminEditGroupR.addGroup = {}));
    // =======================================================
    /** Добавить группу контроллер доступа*/
    let addCtrlAccess;
    (function (addCtrlAccess) {
        /** APIURL */
        addCtrlAccess.route = '/aa/admin-edit-group/add-ctrl-access';
        /** Alias действия */
        addCtrlAccess.action = 'add-ctrl-access';
    })(addCtrlAccess = AdminEditGroupR.addCtrlAccess || (AdminEditGroupR.addCtrlAccess = {}));
    // =======================================================
    /** Удалить группу */
    let delGroup;
    (function (delGroup) {
        /** APIURL */
        delGroup.route = '/aa/admin-edit-group/del-group';
        /** Alias действия */
        delGroup.action = 'del-group';
    })(delGroup = AdminEditGroupR.delGroup || (AdminEditGroupR.delGroup = {}));
    /** Сохранить данные о группу */
    let saveGroup;
    (function (saveGroup) {
        /** APIURL */
        saveGroup.route = '/aa/admin-edit-group/save-group';
        /** Alias действия */
        saveGroup.action = 'save-group';
    })(saveGroup = AdminEditGroupR.saveGroup || (AdminEditGroupR.saveGroup = {}));
    /** Сохранить контроллер доступа */
    let saveCtrlAccess;
    (function (saveCtrlAccess) {
        /** APIURL */
        saveCtrlAccess.route = '/aa/admin-edit-group/save-ctrl-access';
        /** Alias действия */
        saveCtrlAccess.action = 'save-ctrl-access';
    })(saveCtrlAccess = AdminEditGroupR.saveCtrlAccess || (AdminEditGroupR.saveCtrlAccess = {}));
})(AdminEditGroupR = exports.AdminEditGroupR || (exports.AdminEditGroupR = {}));
//# sourceMappingURL=AdminEditGroupR.js.map