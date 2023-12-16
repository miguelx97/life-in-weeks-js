"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
class User {
    birthdate;
    gender;
    country;
    copy(user) {
        if (!user)
            return;
        this.birthdate = new Date(user.birthdate);
        this.gender = user.gender;
        this.country = user.country;
    }
    buildFromInputs(event, value) {
        value = value ?? event.target.value;
        const inputId = event.target.id;
        if (inputId in this)
            this[inputId] = value;
    }
    clean() {
        this.birthdate = undefined;
        this.gender = undefined;
        this.country = undefined;
    }
}
exports.User = User;
