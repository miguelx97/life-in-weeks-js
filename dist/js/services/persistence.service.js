"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Persistence = void 0;
class Persistence {
    static save(key, value) {
        const json = JSON.stringify(value);
        localStorage.setItem(key, json);
    }
    static load(key) {
        if (!localStorage.getItem(key)) {
            return null;
        }
        const json = localStorage.getItem(key);
        return JSON.parse(json);
    }
    static remove(key) {
        localStorage.removeItem(key);
    }
}
exports.Persistence = Persistence;
