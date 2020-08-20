import * as db from "knex";
/**
 * Дефотная миграция
 */
export declare class AppDefaultMigration {
    objDb: db;
    constructor(objDb: db);
    faRun(): Promise<void>;
}
