import * as Components from '@a-a-game-studio/aa-components/lib';
import { MainRequest } from './MainRequest';
import { UserSys } from './UserSys';
import { EnumSQL } from '../Infrastructure/SQL/Repository/EnumSQL';
import { EnumParamSQL } from '../Infrastructure/SQL/Repository/EnumParamSQL';
import { CacheSys } from './CacheSys';
/**
 * ENUM дерево типов
 */
export declare class EnumSys {
    protected errorSys: Components.ErrorSys;
    protected userSys: UserSys;
    protected enumSQL: EnumSQL;
    protected enumParamSQL: EnumParamSQL;
    protected cacheSys: CacheSys;
    constructor(req: MainRequest);
    private createEnumType;
    /**
     * Путь от точки входа run.ts
     * @param sPathEnumConf
     */
    faGetEnumType(): Promise<any>;
    /**
     * Путь от точки входа en.ts
     * @param sPathEnumConf
     */
    faSaveEnumType(sPathEnumConf: string): Promise<void>;
    /**
     * Путь от точки входа en.ts
     * @param sPathEnumConf
     */
    faGenerateEnumType(): Promise<any>;
}
