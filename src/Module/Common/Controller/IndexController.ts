

import * as express from 'express';

// Подключение системных классов
import BaseCtrl from '../../../System/BaseCtrl';

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
router.post('/post', function(req, res, next) {
    let self = new IndexController(req);
    res.send('POST API сервер работает');
});

/**
 * Проверка на работоспособность
 */
router.get('/', function(req, res, next) {
    let self = new IndexController(req);
    res.send('API сервер работает');
});

export {router};