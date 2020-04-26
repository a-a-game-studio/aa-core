import { BaseCtrl, MainRequest } from "../../../Namespace/System";
declare const router: any;
import { FileM } from '../Model/FileM';
/**
 * Контроллер
 */
export declare class FileController extends BaseCtrl {
    static sBaseUrl: string;
    fileM: FileM;
    /**
     * Конструктор
     *
     * @param req
     * @param res
     */
    static Init(req: MainRequest, res: any): Promise<FileController>;
}
export { router };
