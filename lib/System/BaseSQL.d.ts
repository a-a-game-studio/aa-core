import * as Components from '@a-a-game-studio/aa-components/lib';
import { RedisSys } from './RedisSys';
import { MainRequest } from './MainRequest';
import { UserSys } from './UserSys';
import { KnexSys } from './KnexSys';
import { CacheSys } from './CacheSys';
import { LogicSys } from './LogicSys';
/**
 * SQL Запросы
 */
export default class BaseSQL {
    protected db: any;
    protected redisSys: RedisSys;
    protected modelValidatorSys: Components.ModelValidatorSys;
    protected errorSys: Components.ErrorSys;
    protected userSys: UserSys;
    protected knexSys: KnexSys;
    protected cacheSys: CacheSys;
    protected logicSys: LogicSys;
    constructor(req: MainRequest);
}
