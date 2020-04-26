"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Компоненты
const lib_1 = require("@a-a-game-studio/aa-classes/lib");
class ImgE {
    getRulesInsert() {
        let rules = new lib_1.Components.ModelRulesC();
        rules.set(rules.rule('file_name')
            .type('text')
            .require()
            .error('file_name - неверный формат'));
        rules.set(rules.rule('f_320')
            .type('text')
            .require()
            .error('f_320 - неверный формат'));
        rules.set(rules.rule('f_800')
            .type('text')
            .require()
            .error('f_800 - неверный формат'));
        rules.set(rules.rule('f_1024')
            .type('text')
            .require()
            .error('f_1024 - неверный формат'));
        return rules.get();
    }
}
//Имя таблицы
ImgE.NAME = 'aa_img';
exports.ImgE = ImgE;
//# sourceMappingURL=ImgE.js.map