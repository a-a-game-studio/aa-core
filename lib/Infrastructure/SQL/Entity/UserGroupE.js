"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Компоненты
const lib_1 = require("@a-a-game-studio/aa-classes/lib");
class UserGroupE {
    getRulesInsert() {
        let rules = new lib_1.Components.ModelRulesC();
        rules.set(rules.rule('user_id')
            .type(lib_1.Components.ModelRulesT.int)
            .error(UserGroupE.NAME + '.user_id'));
        rules.set(rules.rule('group_id')
            .type(lib_1.Components.ModelRulesT.int)
            .error(UserGroupE.NAME + '.group_id'));
        return rules.get();
    }
}
//Имя таблицы
UserGroupE.NAME = 'aa_user_group';
exports.UserGroupE = UserGroupE;
//# sourceMappingURL=UserGroupE.js.map