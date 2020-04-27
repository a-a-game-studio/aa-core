import { MainRequest } from '../System/MainRequest';
import { MemSysI } from '@a-a-game-studio/aa-redis-sys/lib/CacheSys';
/**
 * Поключенеи к SharedMemSys
 * возвращает ф-ю middleware
 * @param globalMem  - общая переменная в памяти. Лежит вне модулей
 *
 * пример использованя:
 * const globalMem:MemSysI = {};
 * objExpress.use(SharedMemMiddleware(globalMem));
 */
export declare const SharedMemMiddleware: (globalMem: MemSysI) => (req: MainRequest, res: any, next: any) => void;
