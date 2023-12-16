"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formFields = void 0;
const uiElements_1 = require("./models/uiElements");
const user_1 = require("./models/user");
const processLifeInWeeks_1 = require("./processLifeInWeeks");
const persistence_service_1 = require("./services/persistence.service");
const user = new user_1.User();
function formFields(_user) {
    user.copy(_user);
    uiElements_1.Ui.dropdownGender.passedElement.element.addEventListener('change', handleInputChange);
    uiElements_1.Ui.dropdownCountry.passedElement.element.addEventListener('change', handleInputChange);
    uiElements_1.Ui.birthdayInput.addEventListener('change', (event) => handleInputChange(event, new Date(event.target.value)));
    uiElements_1.Ui.cleanBtn.addEventListener('click', () => {
        user.clean();
        (0, processLifeInWeeks_1.cleanGrid)();
        uiElements_1.Ui.cleanForm();
        persistence_service_1.Persistence.remove('user');
    });
}
exports.formFields = formFields;
async function handleInputChange(event, value) {
    user.buildFromInputs(event, value);
    await (0, processLifeInWeeks_1.processLifeInWeeks)(user);
}
