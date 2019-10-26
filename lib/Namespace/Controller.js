"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Базовые роуты проверки core api
// Общие сведения о системе
const IndexController = require("../Module/Common/Controller/IndexController");
exports.IndexController = IndexController;
// api для пользователя
const UserController = require("../Module/User/Controller/UserController");
exports.UserController = UserController;
// api login
const LoginCtrl = require("../Module/Login/LoginCtrl");
exports.LoginCtrl = LoginCtrl;
// admin-edit-user
const AdminEditUserCtrl = require("../Module/AdminEditUser/AdminEditUserCtrl");
exports.AdminEditUserCtrl = AdminEditUserCtrl;
// admin-edit-group
const AdminEditGroupCtrl = require("../Module/AdminEditGroup/AdminEditGroupCtrl");
exports.AdminEditGroupCtrl = AdminEditGroupCtrl;
//# sourceMappingURL=Controller.js.map