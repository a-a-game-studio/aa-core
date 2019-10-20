// Системные сервисы
import { ResponseSys } from './ResponseSys';
import *  as Components  from '@a-a-game-studio/aa-components/lib';

import { MainRequest } from './MainRequest';

import { UserSys } from './UserSys';

const express = require('express');
const router = express.Router();


/**
 * Базовый контроллер
 */
export default class BaseCtrl {

    private bInit = false;
    public req: MainRequest;
    public errorSys: Components.ErrorSys;
    public userSys: UserSys;
    public responseSys: ResponseSys;

    protected resp: any;

    constructor(req: MainRequest, resp: any){
        this.req = req;
        this.responseSys = req.sys.responseSys;
        this.errorSys = req.sys.errorSys;
        this.userSys = req.sys.userSys;
        this.resp = resp;
    }

    protected fClassName() {
        return this.constructor.name;
    }

    /**
     * 
     * @param msg - Сообщение
     * @param cbAction - Анонимная функция для вызова действия
     */
    public async faAction(msg:string, cbAction:Function){
        
        let out = null;
        if(this.bInit && this.errorSys.isOk()){
            try {
                out = await cbAction();
            } catch (e) {
                this.errorSys.errorEx(e, 'fatal_error', 'Фатальная ошибка');
                this.resp.status(500)
            }  
        } else {
            this.resp.status(401)
            this.errorSys.error('init_ctrl', 'Контролер не активирован - вызовите родительскю функцию - await super.fInit(req, res)')
        }

        this.resp.send(
            this.responseSys.response(out, msg)
        );
    }


}
