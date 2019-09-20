import { App } from '../../src/App';
const config = require('./MainConfig.js');

console.log('Starting App...');

async function faRunServer() {

    const app = new App(config)
        .fUseMySql();

    await app.faInstall();

    app.fDisableCors() // отключаем cors
        .fUseBodyParser() // используем дефолтный BodyParser
        .fUseDefaultIndex()
        .fUseReddis()
        .fUseAuthSys()
        .fUseAdminUser()
        .fStart(); // Запускаем приложение

    } // faRunServer

faRunServer();





