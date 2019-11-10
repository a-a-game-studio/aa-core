

import config from './Config/MainConfig'
import { MainRequest, initMainRequest } from './System/MainRequest'
import { EnumSys } from './System/EnumSys'
import { LogicSys } from './System/LogicSys'
import BaseCommand from './System/BaseCommand'

process.env.tsconfig = '../tsconfig.json'

// =========================
// Подключение middleware
// =========================
import * as middleware from './Namespace/Middleware';

function fVoid(){}

// Инициализация конфига
const req = initMainRequest(config);
async function initSys(){
    /* Инициализация базовых систем */
    await middleware.InitBaseSysMiddleware(req, fVoid, fVoid);
    /** Конфигурирование приложения */
    await middleware.ConfigMiddleware(req, fVoid, fVoid);
}

async function run(){
    await initSys();
    
    let logicSys = new LogicSys(req);
    
    let enumSys = new EnumSys(req);
    enumSys.fGenerateJSON();

}; run();
