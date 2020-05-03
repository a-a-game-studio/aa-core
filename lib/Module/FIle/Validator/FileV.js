"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const Components = __importStar(require("@a-a-game-studio/aa-components/lib"));
/** Сохранить данные о картинке */
var saveImg;
(function (saveImg) {
    /**
     * Валидация
     *
     * @param req MainRequest
     * @param data RequestI
     */
    function valid(req, data) {
        let rules = new Components.ModelRulesC();
        // =======================================
        // логин
        rules.set(rules.rule('fileBase64')
            .type(Components.ModelRulesT.text)
            .require()
            .errorEx('fileBase64', 'fileBase64'));
        // =======================================
        let validator = new Components.ModelValidatorSys(req.sys.errorSys);
        validator.fValid(rules.get(), data);
        return validator.getResult();
    }
    saveImg.valid = valid;
})(saveImg = exports.saveImg || (exports.saveImg = {}));
//# sourceMappingURL=FileV.js.map