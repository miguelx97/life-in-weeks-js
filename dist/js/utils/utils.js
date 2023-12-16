"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Utils = void 0;
class Utils {
    static getLanguage() {
        return navigator.language.substring(0, 2);
    }
}
exports.Utils = Utils;
