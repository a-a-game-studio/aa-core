import * as AAClasses from '@a-a-game-studio/aa-classes/lib';
import { UserSys } from './UserSys';
import { MainRequest } from './MainRequest';
/**
 * Клас для сервисов которые проксируют запросы к базе данных
 * объединяют под различные запросы SQL под единой логикой службы
 * автоматизируют рутинные операции
 */
export default class BaseS {
    errorSys: AAClasses.Components.ErrorSys;
    userSys: UserSys;
    req: MainRequest;
    constructor(req: MainRequest);
}
