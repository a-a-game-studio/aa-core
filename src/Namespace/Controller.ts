
// Модуль ролевой модели
import * as AdminUserController from '../Module/RoleModel/Controller/AdminUserController'

// Базовые роуты проверки core api
// Общие сведения о системе
import * as IndexController from '../Module/Common/Controller/IndexController'

// api для пользователя
import * as UserController from '../Module/User/Controller/UserController'

export {
    IndexController,
    AdminUserController,
    UserController
}