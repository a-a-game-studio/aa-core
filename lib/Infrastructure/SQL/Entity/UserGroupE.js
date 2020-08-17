"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserGroupE = void 0;
// Компоненты
const lib_1 = require("@a-a-game-studio/aa-classes/lib");
class UserGroupE {
    getRulesInsert() {
        let rules = new lib_1.Components.ModelRulesC();
        rules.set(rules.rule('id_user')
            .type(lib_1.Components.ModelRulesT.int)
            .error(UserGroupE.NAME + '.id_user'));
        rules.set(rules.rule('id_group')
            .type(lib_1.Components.ModelRulesT.int)
            .error(UserGroupE.NAME + '.id_group'));
        return rules.get();
    }
}
exports.UserGroupE = UserGroupE;
//Имя таблицы
UserGroupE.NAME = 'aa_user_group';
//# sourceMappingURL=UserGroupE.js.map