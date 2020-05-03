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
var FileV;
(function (FileV) {
    /**
     * Валидация
     *
     * @param req MainRequest
     * @param data RequestI
     */
    function saveImg() {
        let rules = new Components.ModelRulesC();
        // логин
        rules.set(rules.tpl('fileBase64', true)
            .tplText('Файлв в Base64'));
        return rules;
    }
    FileV.saveImg = saveImg;
})(FileV = exports.FileV || (exports.FileV = {}));
//# sourceMappingURL=FileV.js.map