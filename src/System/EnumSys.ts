

import *  as Components  from '@a-a-game-studio/aa-components/lib';

// Системные сервисы
import { RedisSys } from './RedisSys';
import { MainRequest } from './MainRequest';

import { UserSys } from './UserSys';
import { EnumSQL } from '../Infrastructure/SQL/Repository/EnumSQL';
import { EnumParamSQL } from '../Infrastructure/SQL/Repository/EnumParamSQL';
import * as fs from 'fs';


/**
 * ENUM дерево типов
 */
export class EnumSys {

    protected errorSys: Components.ErrorSys;
    protected userSys: UserSys;
    protected enumSQL: EnumSQL;
    protected enumParamSQL: EnumParamSQL;

    constructor(req: MainRequest) {
        this.errorSys = req.sys.errorSys;
        this.userSys = req.sys.userSys;

        this.enumSQL = new EnumSQL(req);
        this.enumParamSQL = new EnumParamSQL(req);
    }

    private createEnumType(){
        return {
            n:{}, // индекс по имени
            k:{}, // индекс по ключу
            c:{}, // индекс о коду
            v:{}, // индекс display display
            tn:{},
            tk:{},
            tt:{},
            a1:{},
            a2:{},
            a3:{},
        };
    }

    public async fGenerateJSON(){
        let str = "";

        let aEnum = await this.enumSQL.listAllEnum();

        let aEnumTree:any = {};
        for(let i = 0; i < aEnum.length; i++){
            let vEnum = aEnum[i];

            let aEnumParam = await this.enumParamSQL.listByParam({
                'id_enum':vEnum.id,
            });


            if(!aEnumTree[vEnum.k]){
                aEnumTree[vEnum.k] = {};
            }

            if(vEnum.path1){
                if(!aEnumTree[vEnum.k][vEnum.path1]){
                    aEnumTree[vEnum.k][vEnum.path1] = {};
                }
            }

            if(vEnum.path1 && vEnum.path2){
                if(!aEnumTree[vEnum.k][vEnum.path1][vEnum.path2]){
                    aEnumTree[vEnum.k][vEnum.path1][vEnum.path2] = {};
                }
            }

            if(vEnum.path1 && vEnum.path2 && vEnum.path3){
                if(!aEnumTree[vEnum.k][vEnum.path1][vEnum.path2][vEnum.path3]){
                    aEnumTree[vEnum.k][vEnum.path1][vEnum.path2][vEnum.path3] = {};
                }
            }
            
            // Заполняем первый уровень дерева
            if( !vEnum.path1 && !vEnum.path2 && !vEnum.path3 ){
                for(let j = 0; j < aEnumParam.length; j++){
                    let vEnumParam = aEnumParam[j];

                    if(!aEnumTree[vEnum.k]['n']){
                        aEnumTree[vEnum.k] = this.createEnumType();
                    }

                    aEnumTree[vEnum.k]['n'][vEnumParam.val] = vEnumParam.name;
                    aEnumTree[vEnum.k]['k'][vEnumParam.val] = vEnumParam.k;
                    aEnumTree[vEnum.k]['c'][vEnumParam.k] = vEnumParam.val;
                    aEnumTree[vEnum.k]['v'][vEnumParam.k] = vEnumParam.name;
                    
                    if(vEnumParam.type){
                        if(!aEnumTree[vEnum.k]['tn'][vEnumParam.type]){
                            aEnumTree[vEnum.k]['tn'][vEnumParam.type] = {};
                            aEnumTree[vEnum.k]['tk'][vEnumParam.type] = {};
                        }
                        aEnumTree[vEnum.k]['tn'][vEnumParam.type][vEnumParam.val] = vEnumParam.name;
                        aEnumTree[vEnum.k]['tk'][vEnumParam.type][vEnumParam.val] = vEnumParam.k;
                    }
                    aEnumTree[vEnum.k]['tt'][vEnumParam.val] = vEnumParam.type;
                    
                    aEnumTree[vEnum.k]['a1'][vEnumParam.val] = vEnumParam.arg1;
                    aEnumTree[vEnum.k]['a2'][vEnumParam.val] = vEnumParam.arg2;
                    aEnumTree[vEnum.k]['a3'][vEnumParam.val] = vEnumParam.arg3;
                }
            }

            // Заполняем второй уровень дерева
            if( vEnum.path1 && !vEnum.path2 && !vEnum.path3 ){
                for(let j = 0; j < aEnumParam.length; j++){
                    let vEnumParam = aEnumParam[j];

        
                    if(!aEnumTree[vEnum.k][vEnum.path1]['n']){
                        aEnumTree[vEnum.k][vEnum.path1] = this.createEnumType();
                    }

                    aEnumTree[vEnum.k][vEnum.path1]['n'][vEnumParam.val] = vEnumParam.name;
                    aEnumTree[vEnum.k][vEnum.path1]['k'][vEnumParam.val] = vEnumParam.k;
                    aEnumTree[vEnum.k][vEnum.path1]['c'][vEnumParam.k] = vEnumParam.val;
                    aEnumTree[vEnum.k][vEnum.path1]['v'][vEnumParam.k] = vEnumParam.name;
                    
                    if( vEnumParam.type ){
                        if(!aEnumTree[vEnum.k][vEnum.path1]['tn'][vEnumParam.type]){
                            aEnumTree[vEnum.k][vEnum.path1]['tn'][vEnumParam.type] = {};
                            aEnumTree[vEnum.k][vEnum.path1]['tk'][vEnumParam.type] = {};
                        }
                        aEnumTree[vEnum.k][vEnum.path1]['tn'][vEnumParam.type][vEnumParam.val] = vEnumParam.name;
                        aEnumTree[vEnum.k][vEnum.path1]['tk'][vEnumParam.type][vEnumParam.val] = vEnumParam.k;
                    }
                    aEnumTree[vEnum.k][vEnum.path1]['tt'][vEnumParam.val] = vEnumParam.type;
                    
                    aEnumTree[vEnum.k][vEnum.path1]['a1'][vEnumParam.val] = vEnumParam.arg1;
                    aEnumTree[vEnum.k][vEnum.path1]['a2'][vEnumParam.val] = vEnumParam.arg2;
                    aEnumTree[vEnum.k][vEnum.path1]['a3'][vEnumParam.val] = vEnumParam.arg3;
                }
            }

            // Заполняем третий уровень дерева
            if( vEnum.path1 && vEnum.path2 && !vEnum.path3 ){
                for(let j = 0; j < aEnumParam.length; j++){
                    let vEnumParam = aEnumParam[j];
        
                    if(!aEnumTree[vEnum.k][vEnum.path1][vEnum.path2]['n']){
                        aEnumTree[vEnum.k][vEnum.path1][vEnum.path2] = this.createEnumType();
                    }

                    aEnumTree[vEnum.k][vEnum.path1][vEnum.path2]['n'][vEnumParam.val] = vEnumParam.name;
                    aEnumTree[vEnum.k][vEnum.path1][vEnum.path2]['k'][vEnumParam.val] = vEnumParam.k;
                    aEnumTree[vEnum.k][vEnum.path1][vEnum.path2]['c'][vEnumParam.k] = vEnumParam.val;
                    aEnumTree[vEnum.k][vEnum.path1][vEnum.path2]['v'][vEnumParam.k] = vEnumParam.name;
                    
                    if(vEnumParam.type){
                        if(!aEnumTree[vEnum.k][vEnum.path1][vEnum.path2]['tn'][vEnumParam.type]){
                            aEnumTree[vEnum.k][vEnum.path1][vEnum.path2]['tn'][vEnumParam.type] = {};
                            aEnumTree[vEnum.k][vEnum.path1][vEnum.path2]['tk'][vEnumParam.type] = {};
                        }
                        aEnumTree[vEnum.k][vEnum.path1][vEnum.path2]['tn'][vEnumParam.type][vEnumParam.val] = vEnumParam.name;
                        aEnumTree[vEnum.k][vEnum.path1][vEnum.path2]['tk'][vEnumParam.type][vEnumParam.val] = vEnumParam.k;
                    }
                    aEnumTree[vEnum.k][vEnum.path1][vEnum.path2]['tt'][vEnumParam.val] = vEnumParam.type;
                    
                    aEnumTree[vEnum.k][vEnum.path1][vEnum.path2]['a1'][vEnumParam.val] = vEnumParam.arg1;
                    aEnumTree[vEnum.k][vEnum.path1][vEnum.path2]['a2'][vEnumParam.val] = vEnumParam.arg2;
                    aEnumTree[vEnum.k][vEnum.path1][vEnum.path2]['a3'][vEnumParam.val] = vEnumParam.arg3;
                }
            }
            if( vEnum.path1 && vEnum.path2 && vEnum.path3 ){
                for(let j = 0; j < aEnumParam.length; j++){
                    let vEnumParam = aEnumParam[j];
        
                    if(!aEnumTree[vEnum.k][vEnum.path1][vEnum.path2][vEnum.path3]['n']){
                        aEnumTree[vEnum.k][vEnum.path1][vEnum.path2][vEnum.path3] = this.createEnumType();
                    }
                    

                    aEnumTree[vEnum.k][vEnum.path1][vEnum.path2][vEnum.path3]['n'][vEnumParam.val] = vEnumParam.name;
                    aEnumTree[vEnum.k][vEnum.path1][vEnum.path2][vEnum.path3]['k'][vEnumParam.val] = vEnumParam.k;
                    aEnumTree[vEnum.k][vEnum.path1][vEnum.path2][vEnum.path3]['c'][vEnumParam.k] = vEnumParam.val;
                    aEnumTree[vEnum.k][vEnum.path1][vEnum.path2][vEnum.path3]['v'][vEnumParam.k] = vEnumParam.name;
                    
                    if( vEnumParam.type ){
                        if(!aEnumTree[vEnum.k][vEnum.path1][vEnum.path2][vEnum.path3]['tn'][vEnumParam.type]){
                            aEnumTree[vEnum.k][vEnum.path1][vEnum.path2][vEnum.path3]['tn'][vEnumParam.type] = {};
                            aEnumTree[vEnum.k][vEnum.path1][vEnum.path2][vEnum.path3]['tk'][vEnumParam.type] = {};
                        }
                        aEnumTree[vEnum.k][vEnum.path1][vEnum.path2][vEnum.path3]['tn'][vEnumParam.type][vEnumParam.val] = vEnumParam.name;
                        aEnumTree[vEnum.k][vEnum.path1][vEnum.path2][vEnum.path3]['tk'][vEnumParam.type][vEnumParam.val] = vEnumParam.k;
                    }
                    aEnumTree[vEnum.k][vEnum.path1][vEnum.path2][vEnum.path3]['tt'][vEnumParam.val] = vEnumParam.type;
                    
                    aEnumTree[vEnum.k][vEnum.path1][vEnum.path2][vEnum.path3]['a1'][vEnumParam.val] = vEnumParam.arg1;
                    aEnumTree[vEnum.k][vEnum.path1][vEnum.path2][vEnum.path3]['a2'][vEnumParam.val] = vEnumParam.arg2;
                    aEnumTree[vEnum.k][vEnum.path1][vEnum.path2][vEnum.path3]['a3'][vEnumParam.val] = vEnumParam.arg3;
                }
            }
            
        } //foreach

        let sEnumTree = JSON.stringify(aEnumTree);
        let sFileTS = `
            export const En = ${sEnumTree};
        `;
        console.log(sFileTS);

        fs.writeFile('./src/Data/Enum/Enum.json', sEnumTree, function (err) {
            if (err) throw err;
            console.log('It\'s saved!');
        });
    }

}