import { MainRequest } from '../System/MainRequest';
/**
 * Подключение к кролику
 * @param req
 * @param res
 * @param next
 */
export default function RabbitMiddleware(req: MainRequest, res: any, next: any): Promise<void>;
