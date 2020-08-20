"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileCtrl = exports.AdminEditEnumCtrl = exports.AdminEditGroupCtrl = exports.AdminEditUserCtrl = exports.LoginCtrl = exports.UserController = exports.IndexController = void 0;
// Базовые роуты проверки core api
// Общие сведения о системе
const IndexController = __importStar(require("../Module/Common/Controller/IndexController"));
exports.IndexController = IndexController;
// api для пользователя
const UserController = __importStar(require("../Module/User/Controller/UserController"));
exports.UserController = UserController;
// api login
const LoginCtrl = __importStar(require("../Module/Login/LoginCtrl"));
exports.LoginCtrl = LoginCtrl;
// admin-edit-user
const AdminEditUserCtrl = __importStar(require("../Module/AdminEditUser/AdminEditUserCtrl"));
exports.AdminEditUserCtrl = AdminEditUserCtrl;
// admin-edit-group
const AdminEditGroupCtrl = __importStar(require("../Module/AdminEditGroup/AdminEditGroupCtrl"));
exports.AdminEditGroupCtrl = AdminEditGroupCtrl;
// admin-edit-enum
const AdminEditEnumCtrl = __importStar(require("../Module/AdminEditEnum/AdminEditEnumCtrl"));
exports.AdminEditEnumCtrl = AdminEditEnumCtrl;
const FileCtrl = __importStar(require("../Module/File/FileCtrl"));
exports.FileCtrl = FileCtrl;
//# sourceMappingURL=Controller.js.map