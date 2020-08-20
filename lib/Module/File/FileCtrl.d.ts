import { BaseCtrl } from "../../Namespace/System";
declare const router: any;
import { FileM } from './Model/FileM';
/**
 * Контроллер
 */
export declare class FileCtrl extends BaseCtrl {
    static sBaseUrl: string;
    fileM: FileM;
    /**
     * Конструктор
     *
     * @param req
     * @param res
     */
    faInit(): Promise<void>;
}
export { router };
