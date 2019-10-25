"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Модуль ролевой модели
const AdminUserController = require("../Module/RoleModel/Controller/AdminUserController");
exports.AdminUserController = AdminUserController;
// Базовые роуты проверки core api
// Общие сведения о системе
const IndexController = require("../Module/Common/Controller/IndexController");
exports.IndexController = IndexController;
// api для пользователя
const UserController = require("../Module/User/Controller/UserController");
exports.UserController = UserController;
// api login
const LoginController = require("../Module/Login/Controller/LoginController");
exports.LoginController = LoginController;
// admin-edit-user
const AdminEditUserCtrl = require("../Module/AdminEditUser/Controller/AdminEditUserCtrl");
exports.AdminEditUserCtrl = AdminEditUserCtrl;
// admin-edit-group
const AdminEditGroupCtrl = require("../Module/AdminEditGroup/Controller/AdminEditGroupCtrl");
exports.AdminEditGroupCtrl = AdminEditGroupCtrl;
//# sourceMappingURL=Controller.js.map