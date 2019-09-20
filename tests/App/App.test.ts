import { App } from '../../src/App';
import * as AAClasses from '@a-a-game-studio/aa-classes/lib';
import { UserSQL } from "../../src/Module/User/UserSQL";
const config = require('./MainConfig.js');

console.log('Starting App...');

async function faRunServer() {

    const app = new App(config)
        .fUseMySql();

    /* модули доступа к данным */
    const listDBData: AAClasses.SysteCoreModule.ListDBI = {
        userDB: new UserSQL(app.errorSys, app.objDb),
        walletDB: new AAClasses.WalletModule.WalletDB(app.errorSys),
        fileDB: new AAClasses.FileModule.FileDB(app.errorSys),
    }

    await app.faInstall();

    app.fDisableCors() // отключаем cors
        .fUseBodyParser() // используем дефолтный BodyParser
        .fUseDefaultIndex()
        .fUseReddis()
        ;

    /* Иницализируем модуль аторизации */
    await app.faUseAuthSys(listDBData);

    app.fUseAdminUser()
        .fStart(); // Запускаем приложение

} // faRunServer

faRunServer();





