import { Components } from '@a-a-game-studio/aa-classes/lib';
import db from "knex";
import express from 'express';
import * as System from './Namespace/System';
import { ListDBI, ListDB } from '@a-a-game-studio/aa-classes/lib/BaseClass/ListDB';
import { MemSysI } from '@a-a-game-studio/aa-redis-sys/lib/CacheSys';
/**
 * Класс приложения со всеми компонентами
 */
export declare class App {
    protected iPort: number;
    protected bodyMaxSize: string;
    protected conf: System.ConfI;
    protected reddis: System.RedisSys;
    protected bUseMySql: boolean;
    protected bUseRabbitSender: boolean;
    protected bUseReddis: boolean;
    protected bUseAuthSys: boolean;
    protected bUserCtrl: boolean;
    protected bUseAAClasses: boolean;
    objExpress: express.Express;
    errorSys: Components.ErrorSys;
    objDb: db;
    protected listDBData: ListDBI;
    protected listDB: ListDB;
    constructor(conf: System.ConfI, iPort?: number);
    /**
     * отключить Cors
     */
    fDisableCors(): App;
    /**
     * Размер тела запроса
     * @param size
     */
    fSetBodyMaxSize(iSize: number): App;
    /**
     * Использоватть bodyParser с дефолтными настройками
     */
    fUseBodyParser(): App;
    /**
     * запуск приложения
     */
    fStart(): void;
    /**
     * Использовать MySql
     */
    fUseMySql(): App;
    /**
     * Использовать Reddis
     */
    fUseReddis(): App;
    /**
     * Использовать SharedMem
     * заменяет redis
     */
    fUseSharedMem(globalMem: MemSysI): App;
    /**
     * Ипользование отправки в RabbitMQ
     */
    faUseRabbitSender(): Promise<App>;
    /**
     * Использование AuthSys
     */
    faUseAuthSys(): Promise<App>;
    /**
     * Использовать статические файлы
     * @param sPath
     */
    fUseStatic(sPath: string): App;
    /**
     * ИСпользовать динамически шаблоны ejs
     * @param sPath
     */
    fUseViews(sPath: string): App;
    /**
     * Использовать дефолтный index page
     */
    fUseDefaultIndex(): App;
    /**
     * Использовать файловый модуль
     */
    fUseFileModule(): App;
    /**
     * Установка приложения
     */
    faInstall(): Promise<App>;
    /**
     * Создать миграцию
     * @param name: string - Название миграции
     */
    faMakeMigration(name: string): Promise<App>;
    /**
     * Выпольнить дефлтную миграцию
     */
    faRunDefaultMigration(): Promise<void>;
    /**
     * Использовать AAClasses
     * его нудно переопределять есть используются extended AAClasses
     */
    fUseAAClasses(): App;
}
