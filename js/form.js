"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formFields = void 0;
const life_1 = require("./models/life");
const user_1 = require("./models/user");
const lifeExpectancy_service_1 = require("./services/lifeExpectancy.service");
const persistence_service_1 = require("./services/persistence.service");
const user = new user_1.User();
function formFields() {
    const genderField = document.getElementById('gender');
    const countryField = document.getElementById('country');
    const birthdateField = document.getElementById('birthdate');
    // Load user from localStorage
    const userFromDb = persistence_service_1.Persistence.load('user');
    user.copy(userFromDb);
    console.log('User loaded from localStorage:', user);
    genderField.value = user.gender ?? '';
    countryField.value = user.country ?? '';
    birthdateField.value = user.birthdate?.toISOString().slice(0, 10) ?? '';
    genderField.addEventListener('change', handleInputChange);
    countryField.addEventListener('change', handleInputChange);
    birthdateField.addEventListener('change', (event) => handleInputChange(event, new Date(event.target.value)));
}
exports.formFields = formFields;
async function handleInputChange(event, value) {
    user.buildFromInputs(event, value);
    console.log('Input value changed:', user);
    if (user.birthdate && user.country && user.gender) {
        const life = await getLifeInWeeks(user);
        generateWeeksGrid(life);
        persistence_service_1.Persistence.save('user', user);
    }
}
async function getLifeInWeeks(user) {
    const lifeExpectancy = await (0, lifeExpectancy_service_1.getLifeExpectancyByCountry)(user);
    const life = new life_1.Life();
    life.build(user, lifeExpectancy);
    console.log('Life in weeks:', life);
    return life;
}
function generateWeeksGrid(life) {
    const grid = document.getElementById('grid');
    for (let i = 0; i < life.totalWeeks; i++) {
        const square = document.createElement('div');
        square.classList.add('week'); // Add the "week" class
        if (i < life.weeksLived) {
            square.classList.add('week-lived'); // Add the "week-lived" class
        }
        grid.appendChild(square);
    }
}
