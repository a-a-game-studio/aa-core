"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Компоненты
const lib_1 = require("@a-a-game-studio/aa-classes/lib");
const lib_2 = require("@a-a-game-studio/aa-components/lib");
class ImgE {
    getRulesInsert() {
        let rules = new lib_1.Components.ModelRulesC();
        rules.set(rules.rule('file_name')
            .type(lib_2.ModelRulesT.text)
            .require()
            .error('file_name - неверный формат'));
        rules.set(rules.rule('f_320')
            .type(lib_2.ModelRulesT.text)
            .require()
            .error('f_320 - неверный формат'));
        rules.set(rules.rule('f_800')
            .type(lib_2.ModelRulesT.text)
            .require()
            .error('f_800 - неверный формат'));
        rules.set(rules.rule('f_1024')
            .type(lib_2.ModelRulesT.text)
            .require()
            .error('f_1024 - неверный формат'));
        return rules.get();
    }
}
exports.ImgE = ImgE;
//Имя таблицы
ImgE.NAME = 'aa_img';
//# sourceMappingURL=ImgE.js.map