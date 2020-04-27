"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
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
const FileCtrl = __importStar(require("../Module/File/Controller/FileController"));
exports.FileCtrl = FileCtrl;
//# sourceMappingURL=Controller.js.map