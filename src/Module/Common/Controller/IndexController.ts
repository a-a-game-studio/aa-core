const express = require('express');

// Подключение системных классов
import BaseCtrl from '../../../System/BaseCtrl';
import * as System from '../../../Namespace/System'

var router = express.Router();

/**
 * Контроллер проверки отвечает API или нет
 */
class IndexController extends BaseCtrl
{

    constructor(req:any){
        super(req);

        console.log('Проверка работы API Сервера');
    }
}

/**
 * Проверка на работоспособность
 */
router.post('/post', function(req: System.MainRequest.MainRequest, res: any, next: any) {
    let self = new IndexController(req);
    res.send('POST API сервер работает');
});

/**
 * Проверка на работоспособность
 */
router.get('/', function(req: System.MainRequest.MainRequest, res: any, next: any) {
    let self = new IndexController(req);
    res.send('API сервер работает');
});

export {router};