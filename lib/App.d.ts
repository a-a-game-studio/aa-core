import * as express from 'express';
/**
 * Класс приложения со всеми компонентами
 */
export declare class App {
    protected objExpress: express.Express;
    protected port: number;
    protected bodyMaxSize: string;
    constructor(objExpress: express.Express, port?: number);
    /**
     * Размер тела запроса
     * @param size
     */
    setBodyMaxSize(size: number): void;
    /**
     * запуск приложения
     */
    start(): void;
}
