import { App } from '../../src/App';
import * as AAClasses from '@a-a-game-studio/aa-classes/lib';

const config = require('./MainConfig.js');

console.log('Starting App...');

async function faRunServer() {

    const app = new App(config)
        .fUseMySql();

    const listDBData: AAClasses.SysteCoreModule.ListDBI = {
        userDB: new AAClasses.UserModule.UserDB(app.errorSys),
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





