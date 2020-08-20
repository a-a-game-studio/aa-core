import { MainRequest } from '../System/MainRequest';
/**
 * Пключенеи к редису
 * @param req
 * @param res
 * @param next
 */
export default function RedisMiddleware(req: MainRequest, res: any, next: any): Promise<void>;
