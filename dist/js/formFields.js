"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formFields = void 0;
const user_1 = require("./models/user");
const processLifeInWeeks_1 = require("./processLifeInWeeks");
const user = new user_1.User();
function formFields(_user) {
    user.copy(_user);
    const genderField = document.getElementById('gender');
    const countryField = document.getElementById('country');
    const birthdateField = document.getElementById('birthdate');
    const cleanBtn = document.getElementById('cleanBtn');
    genderField.addEventListener('change', handleInputChange);
    countryField.addEventListener('change', handleInputChange);
    birthdateField.addEventListener('change', (event) => handleInputChange(event, new Date(event.target.value)));
    cleanBtn.addEventListener('click', () => {
        user.clean();
        (0, processLifeInWeeks_1.cleanGrid)();
    });
}
exports.formFields = formFields;
async function handleInputChange(event, value) {
    user.buildFromInputs(event, value);
    await (0, processLifeInWeeks_1.processLifeInWeeks)(user);
}
