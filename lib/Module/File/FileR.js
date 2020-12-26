"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/** Модуль для загрузки файлов */
var FileR;
(function (FileR) {
    // =======================================================
    /** Загрузить картинку в файловое хранилище */
    let uploadImg;
    (function (uploadImg) {
        /** APIURL */
        uploadImg.route = '/file/upload-img';
        /** Alias действия */
        uploadImg.action = 'upload-img';
    })(uploadImg = FileR.uploadImg || (FileR.uploadImg = {}));
})(FileR = exports.FileR || (exports.FileR = {}));
//# sourceMappingURL=FileR.js.map