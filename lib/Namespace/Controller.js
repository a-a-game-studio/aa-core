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
//# sourceMappingURL=Controller.js.map