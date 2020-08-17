"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserTokenE = void 0;
// Компоненты
const lib_1 = require("@a-a-game-studio/aa-classes/lib");
class UserTokenE {
    getRulesInsert() {
        let rules = new lib_1.Components.ModelRulesC();
        rules.set(rules.rule('id_user')
            .type(lib_1.Components.ModelRulesT.int)
            .error(UserTokenE.NAME + '.id_user'));
        rules.set(rules.rule('token')
            .type(lib_1.Components.ModelRulesT.text)
            .error(UserTokenE.NAME + '.token'));
        return rules.get();
    }
}
exports.UserTokenE = UserTokenE;
//Имя таблицы
UserTokenE.NAME = 'aa_user_token';
//# sourceMappingURL=UserTokenE.js.map