
// Модуль ролевой модели
import * as AdminUserController from '../Module/RoleModel/Controller/AdminUserController'

// Базовые роуты проверки core api
// Общие сведения о системе
import * as IndexController from '../Module/Common/Controller/IndexController'

// api для пользователя
import * as UserController from '../Module/User/Controller/UserController'

// api login
import * as LoginController from '../Module/Login/Controller/LoginController'

// admin-edit-user
import * as AdminEditUserCtrl from '../Module/AdminEditUser/Controller/AdminEditUserCtrl'

// admin-edit-group
import * as AdminEditGroupCtrl from '../Module/AdminEditGroup/Controller/AdminEditGroupCtrl'

export {
    IndexController,
    AdminUserController,
    LoginController,
    UserController,
    AdminEditUserCtrl,
    AdminEditGroupCtrl
}