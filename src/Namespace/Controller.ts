
// Модуль ролевой модели
import * as AdminUserController from '../Module/RoleModel/Controller/AdminUserController'

// Базовые роуты проверки core api
// Общие сведения о системе
import * as IndexController from '../Module/Common/Controller/IndexController'

// api для пользователя
import * as UserController from '../Module/User/Controller/UserController'

// api login
import * as LoginController from '../Module/Login/Controller/LoginController'

export {
    IndexController,
    AdminUserController,
    LoginController,
    UserController
}