import { App } from '../../src/App';
import * as AAClasses from '@a-a-game-studio/aa-classes/lib';
import * as Middleware from '../../src/Namespace/Middleware';
import { MainRequest, UserSys } from '../../src/Namespace/System';
const config = require('./MainConfig.js');

// /* Пример переопредления класса пользователя */
// class MyUserSys extends UserSys {
//     constructor(req: MainRequest.MainRequest, listDB: AAClasses.BaseModule.ListDB) {
//         super(req, listDB);
//         console.log('Change UserActions');
//     }
// }

// /* Пример переопределения AuthSysMiddleware */
// class MyAuthSysMiddleware extends Middleware.AuthSysMiddleware {
//     protected fInitUser(req: MainRequest.MainRequest): UserSys {
//         console.log('Init UserSys');
//         return new MyUserSys(req, this.listDB);
//     }
// }

const app = new App(config)
        .fUseMySql();

/* Ф-я запуска приложения */
async function faRunServer() {
    console.log('Starting App...');

    /* модули доступа к данным */
    const listDBData: AAClasses.SysteCoreModule.ListDBI = {
        walletDB: new AAClasses.WalletModule.WalletDB(app.errorSys),
        fileDB: new AAClasses.FileModule.FileDB(app.errorSys),
    }

    // const authSysMiddleware = new MyAuthSysMiddleware();

    await app.faInstall();

    app.fDisableCors() // отключаем cors
        .fUseBodyParser() // используем дефолтный BodyParser
        .fUseDefaultIndex()
        .fUseReddis()
        ;

    /* Иницализируем модуль аторизации */
    await app.faUseAuthSys();

    // app.fUseAdminUser() // Контролер администрирования пользователей
    //     .fUseUserCtrl() // Контролер пользователя
    //     .fStart(); // Запускаем приложение

} // faRunServer

// faRunServer();

app.faRunDefaultMigration();





