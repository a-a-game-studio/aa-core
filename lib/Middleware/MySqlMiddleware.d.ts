import { MainRequest } from '../System/MainRequest';
/**
 * Подключнеие к MySQl
 * @param req
 * @param res
 * @param next
 */
export default function MySqlMiddleware(req: MainRequest, res: any, next: any): Promise<void>;
