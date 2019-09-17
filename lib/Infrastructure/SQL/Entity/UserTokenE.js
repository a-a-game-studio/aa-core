"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Компоненты
const lib_1 = require("@a-a-game-studio/aa-components/lib");
class UserTokenE {
    getRulesInsert() {
        let rules = new lib_1.ModelRulesC();
        rules.set(rules.rule('user_id')
            .type(lib_1.ModelRulesT.int)
            .error(UserTokenE.NAME + '.user_id'));
        rules.set(rules.rule('token')
            .type(lib_1.ModelRulesT.text)
            .error(UserTokenE.NAME + '.token'));
        return rules.get();
    }
}
//Имя таблицы
UserTokenE.NAME = 'aa_user_token';
exports.UserTokenE = UserTokenE;
//# sourceMappingURL=UserTokenE.js.map