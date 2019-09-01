
import * as express from 'express';

// Подключение системных классов


// Подключение системных моделей
import {UserM} from '../Model/UserM';
import {GroupM} from '../Model/GroupM';
import {CtrlAccessM} from '../Model/CtrlAccessM';
import {AccessGroupM} from '../Model/AccessGroupM';

import MainRequest from '../../../System/MainRequest';
import BaseCtrl from '../../../System/BaseCtrl';

var router = express.Router();

/**
 * API для Админки
 * Редактирование и управление пользователями, а так-же их правами
 */
class AdminUserController extends BaseCtrl
{

    public userM:UserM;

    public groupM:GroupM;

    public ctrlAccessM:CtrlAccessM;

    public accessGroupM:AccessGroupM;


    /**
     * Конструктор
     *
     * @param req
     * @param res
     */
    public static async init(req:MainRequest, res:any): Promise<AdminUserController>{
        let self = new AdminUserController(req);

        // Инициализация бизнес моделей
        self.userM = new UserM(req);
        self.groupM = new GroupM(req);
        self.ctrlAccessM = new CtrlAccessM(req);
        self.accessGroupM = new AccessGroupM(req);

        //==================================================

        // Проверка авторизации
        await self.userSys.isAuth();

        // Проверка права доступа на модуль
        await self.userSys.isAccessCtrl('api_admin_user');

        // Проверка являетесь ли вы администратором
        self.userSys.isAdmin();

        return self;

    }
}

// ==========================================
// SELECT
// ==========================================

/**
 * Получить список пользователей
 */
router.post('/api/admin/user/get-users', async (req:any, res:any, next:any) => {
    let self = await AdminUserController.init(req, res);

    let ok = self.userSys.isAccessRead(); // Проверка доступа

    let out = null;
    if( ok ){ // Получаем список пользователей
        out = await self.userM.getUserList(req.body);
    }

    res.send(
        self.responseSys.response(out, 'Список пользователей')
    );

    // res.send(JSON.stringify(req.body, null,2));
});

/*
 * Получить одного пользователя
 */
router.post('/api/admin/user/get-user', async (req:any, res:any, next:any) => {

    let self = await AdminUserController.init(req, res);

    let ok = self.userSys.isAccessRead(); // Проверка доступа

    let out = null;
    if( ok ){ // Получаем пользователя по ID
        out = await self.userM.getUserByID(req.body);
    }


    res.send(
        self.responseSys.response(out, 'Информация о пользователе')
    );
});

/**
 * Получить Краткаю информацию по группе
 */
router.post('/api/admin/user/get-group', async (req:any, res:any, next:any) => {

    let self = await AdminUserController.init(req, res);

    let ok = self.userSys.isAccessRead(); // Проверка доступа

    let out = null;
    if( ok ){ // Получаем группу по ID
        out = await self.groupM.getGroupByID(req.body);
    }

    res.send(
        self.responseSys.response(out, 'Краткая информация по группе')
    );
});

/**
 * Получить краткую информацию по контроллеру доступа
 */
router.post('/api/admin/user/get-ctrl-access', async (req:any, res:any, next:any) => {

    let self = await AdminUserController.init(req, res);

    let ok = self.userSys.isAccessRead(); // Проверка доступа

    let out = null;
    if( ok ){ // Получаем контроль доступа по ID
        out = await self.ctrlAccessM.getCtrlAccessByAlias(req.body);
    }

    res.send(
        self.responseSys.response(out, 'Краткая информация по контроллеру доступа')
    );
});

/**
 * @Route("/api/admin/user/get-user-groups", name="api__admin__user__get_user_groups")
 */
router.post('/api/admin/user/get-user-groups', async (req:any, res:any, next:any) => {

    let self = await AdminUserController.init(req, res);

    let ok = self.userSys.isAccessRead(); // Проверка доступа

    let out = null;
    if( ok ){ // Получаем роли по ID пользователя
        out = await self.userM.getUserGroupsByUserID(req.body);
    }

    res.send(
        self.responseSys.response(out, 'Роли доступные пользователю')
    );
});

/**
 * Получить список модулей доступных группе
 *
 * @Route("/api/admin/user/get-ctrl-access-of-group", name="api__admin__user__get_ctrl_access_of_group")
 */
router.post('/api/admin/user/get-ctrl-access-of-group', async (req:any, res:any, next:any) => {

    let self = await AdminUserController.init(req, res);

    let ok = self.userSys.isAccessRead(); // Проверка доступа

    let out = null;
    if( ok ){ // Получаем модули доступные группе по ID группы
        out = await self.accessGroupM.getCtrlAccessOfGroupByID(req.body);
    }

    res.send(
        self.responseSys.response(out, 'Модули доступные группе')
    );
});

/**
 * @Route("/api/admin/user/get-group-list", name="api__admin__user_get_group_list")
 */
router.post('/api/admin/user/get-group-list', async (req:any, res:any, next:any) => {

    let self = await AdminUserController.init(req, res);

    let ok = self.userSys.isAccessRead(); // Проверка доступа

    let out = null;
    if( ok ){ // Получаем весь список ролей
        out = await self.groupM.getAllGroups(req.body);
    }

    res.send(
        self.responseSys.response(out, 'Все Роли/Группы пользователей')
    );
});

/**
 * @Route("/api/admin/user/get-ctrl-access-list", name="api__admin__user_get_ctrl_access_list")
 */
router.post('/api/admin/user/get-ctrl-access-list', async (req:any, res:any, next:any) => {

    let self = await AdminUserController.init(req, res);

    let ok = self.userSys.isAccessRead(); // Проверка доступа

    let out = null;
    if( ok ){ // Получаем весь список ролей
        out = await self.ctrlAccessM.getAllCtrlAccess(req.body);
    }

    res.send(
        self.responseSys.response(out, 'Все контроллеры')
    );
});

// ====================================================
// UPDATE
// ====================================================

/**
 * @Route("/api/admin/user/save-group", name="api__admin__user__save_group")
 */
router.post('/api/admin/user/save-group', async (req:any, res:any, next:any) => {

    let self = await AdminUserController.init(req, res);

    let ok = self.userSys.isAccessUpdate(); // Проверка доступа

    let out = null;
    if( ok ){ // сохраняем данные группы
        out = await self.groupM.saveGroup(req.body);
    }

    res.send(
        self.responseSys.response(out, 'Данные группы сохраненны')
    );
});

/**
 * @Route("/api/admin/user/save-ctrl-access", name="api__admin__user__save_ctrl_access")
 */
router.post('/api/admin/user/save-ctrl-access', async (req:any, res:any, next:any) => {

    let self = await AdminUserController.init(req, res);

    let ok = self.userSys.isAccessUpdate(); // Проверка доступа

    let out = null;
    if( ok ){ // сохраняем данные контроллера доступа
        out = await self.ctrlAccessM.saveCtrlAccess(req.body);
    }

    res.send(
        self.responseSys.response(out, 'Сохранены данные контроллера доступа к модулю')
    );
});

/**
 * @Route("/api/admin/user/save-access-group", name="api__admin__user__save_access_group")
 */
router.post('/api/admin/user/save-access-group', async (req:any, res:any, next:any) => {

    let self = await AdminUserController.init(req, res);

    let ok = self.userSys.isAccessUpdate(); // Проверка доступа

    let out = null;
    if( ok ){ // сохраняем/изменяем доступы группы к модулю
        out = await self.accessGroupM.saveAccessGroup(req.body);
    }

    res.send(
        self.responseSys.response(out, 'Изменены параметры доступа к модулю')
    );
});



// ========================================================
// INSERT
// ========================================================

/**
 * @Route("/api/admin/user/add-ctrl-access", name="api__admin__user__add_ctrl_access")
 */
router.post('/api/admin/user/add-ctrl-access', async (req:any, res:any, next:any) => {

    let self = await AdminUserController.init(req, res);

    let ok = self.userSys.isAccessCreate(); // Проверка доступа

    let out = null;
    if( ok ){ // Добавляем пользователя
        out = await self.ctrlAccessM.addCtrlAccess(req.body);
    }

    res.send(
        self.responseSys.response(out, 'Добавлен alias контроллера')
    );
});

/**
 * @Route("/api/admin/user/add-user-to-group", name="api__admin__user__add_user_to_group")
 */
router.post('/api/admin/user/add-user-to-group', async (req:any, res:any, next:any) => {

    let self = await AdminUserController.init(req, res);

    let ok = self.userSys.isAccessCreate(); // Проверка доступа

    let out = null;
    if( ok ){ // Добавляем пользователя
        out = await self.userM.addUserToGroup(req.body);
    }

    res.send(
        self.responseSys.response(out, 'Добавлена роль пользователю')
    );
});

/**
 * @Route("/api/admin/user/add-ctrl-access-to-group", name="api__admin__user__add_ctrl_access_to_group")
 */
router.post('/api/admin/user/add-ctrl-access-to-group', async (req:any, res:any, next:any) => {

    let self = await AdminUserController.init(req, res);

    let ok = self.userSys.isAccessCreate(); // Проверка доступа

    let out = null;
    if( ok ){ // Добавляем доступ группы к модулю
        out = await self.accessGroupM.addCtrlAccessToGroup(req.body);
    }

    res.send(
        self.responseSys.response(out, 'Группе добавлен доступ к модулю')
    );
});



// ==========================================================
// DELETE
// ==========================================================

/**
 * @Route("/api/admin/user/del-user-from-group", name="api__admin__user__del_user_from_group")
 */
router.post('/api/admin/user/del-user-from-group', async (req:any, res:any, next:any) => {

    let self = await AdminUserController.init(req, res);

    let ok = self.userSys.isAccessDelete(); // Проверка доступа

    let out = null;
    if( ok ){ // Удаляем пользователя
        out = await self.userM.delUserFromGroup(req.body);
    }

    res.send(
        self.responseSys.response(out, 'Удалена роль у пользователя')
    );
});

/**
 * @Route("/api/admin/user/del-ctrl-access", name="api__admin__user__del_ctrl_access")
 */
router.post('/api/admin/user/del-ctrl-access', async (req:any, res:any, next:any) => {

    let self = await AdminUserController.init(req, res);

    let ok = self.userSys.isAccessDelete(); // Проверка доступа

    let out = null;
    if( ok ){ // Удаляем пользователя
        out = await self.ctrlAccessM.delCtrlAccess(req.body);
    }

    res.send(
        self.responseSys.response(out, 'Удален контрноллер доступа')
    );
});

/**
 * @Route("/api/admin/user/del-ctrl-access-from-group", name="api__admin__user__del_ctrl_access_from_group")
 */
router.post('/api/admin/user/del-ctrl-access-from-group', async (req:any, res:any, next:any) => {

    let self = await AdminUserController.init(req, res);

    let ok = self.userSys.isAccessDelete(); // Проверка доступа

    let out = null;
    if( ok ){ // Удаляем доступ группы к модулю
        out = await self.accessGroupM.delCtrlAccessFromGroup(req.body);
    }

    res.send(
        self.responseSys.response(out, 'Группе удален доступ к модулю')
    );
});

export {router};