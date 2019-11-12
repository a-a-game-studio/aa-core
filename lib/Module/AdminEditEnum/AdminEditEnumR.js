"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var AdminEditEnumR;
(function (AdminEditEnumR) {
    // =======================================================
    /** Получить дерево типов */
    let getEnumTreeType;
    (function (getEnumTreeType) {
        /** APIURL */
        getEnumTreeType.route = '/aa/admin-edit-enum/get-enum-tree-type';
        /** Alias действия */
        getEnumTreeType.action = 'get-enum-tree-type';
    })(getEnumTreeType = AdminEditEnumR.getEnumTreeType || (AdminEditEnumR.getEnumTreeType = {}));
    // =======================================================
    /** Получить Список пользователей */
    let init;
    (function (init) {
        /** APIURL */
        init.route = '/aa/admin-edit-enum/init';
        /** Alias действия */
        init.action = 'init';
    })(init = AdminEditEnumR.init || (AdminEditEnumR.init = {}));
    // =======================================================
    /** Выбрать enumу */
    let selectEnum;
    (function (selectEnum) {
        /** APIURL */
        selectEnum.route = '/aa/admin-edit-enum/select-enum';
        /** Alias действия */
        selectEnum.action = 'select-enum';
    })(selectEnum = AdminEditEnumR.selectEnum || (AdminEditEnumR.selectEnum = {}));
    // =======================================================
    /** Выбрать enumу */
    let selectEnumParam;
    (function (selectEnumParam) {
        /** APIURL */
        selectEnumParam.route = '/aa/admin-edit-enum/select-enum-param';
        /** Alias действия */
        selectEnumParam.action = 'select-enum-param';
    })(selectEnumParam = AdminEditEnumR.selectEnumParam || (AdminEditEnumR.selectEnumParam = {}));
    // =======================================================
    /** Удалить пользователя из enumы */
    let delEnumParam;
    (function (delEnumParam) {
        /** APIURL */
        delEnumParam.route = '/aa/admin-edit-enum/del-enum-param';
        /** Alias действия */
        delEnumParam.action = 'del-enum-param';
    })(delEnumParam = AdminEditEnumR.delEnumParam || (AdminEditEnumR.delEnumParam = {}));
    // =======================================================
    /** Добавить enumу пользователей */
    let addEnum;
    (function (addEnum) {
        /** APIURL */
        addEnum.route = '/aa/admin-edit-enum/add-enum';
        /** Alias действия */
        addEnum.action = 'add-enum';
    })(addEnum = AdminEditEnumR.addEnum || (AdminEditEnumR.addEnum = {}));
    // =======================================================
    /** Добавить enumу контроллер доступа*/
    let addEnumParam;
    (function (addEnumParam) {
        /** APIURL */
        addEnumParam.route = '/aa/admin-edit-enum/add-enum-param';
        /** Alias действия */
        addEnumParam.action = 'add-enum-param';
    })(addEnumParam = AdminEditEnumR.addEnumParam || (AdminEditEnumR.addEnumParam = {}));
    // =======================================================
    /** Удалить enumу */
    let delEnum;
    (function (delEnum) {
        /** APIURL */
        delEnum.route = '/aa/admin-edit-enum/del-enum';
        /** Alias действия */
        delEnum.action = 'del-enum';
    })(delEnum = AdminEditEnumR.delEnum || (AdminEditEnumR.delEnum = {}));
    /** Сохранить данные о enumу */
    let saveEnum;
    (function (saveEnum) {
        /** APIURL */
        saveEnum.route = '/aa/admin-edit-enum/save-enum';
        /** Alias действия */
        saveEnum.action = 'save-enum';
    })(saveEnum = AdminEditEnumR.saveEnum || (AdminEditEnumR.saveEnum = {}));
    /** Сохранить контроллер доступа */
    let saveEnumParam;
    (function (saveEnumParam) {
        /** APIURL */
        saveEnumParam.route = '/aa/admin-edit-enum/save-enum-param';
        /** Alias действия */
        saveEnumParam.action = 'save-enum-param';
        ;
    })(saveEnumParam = AdminEditEnumR.saveEnumParam || (AdminEditEnumR.saveEnumParam = {}));
})(AdminEditEnumR = exports.AdminEditEnumR || (exports.AdminEditEnumR = {}));
//# sourceMappingURL=AdminEditEnumR.js.map