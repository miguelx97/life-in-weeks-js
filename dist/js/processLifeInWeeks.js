"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cleanGrid = exports.processLifeInWeeks = void 0;
const gender_enum_1 = require("./models/gender.enum");
const life_1 = require("./models/life");
const uiElements_1 = require("./models/uiElements");
const countries_service_1 = require("./services/countries.service");
const lifeExpectancy_service_1 = require("./services/lifeExpectancy.service");
const persistence_service_1 = require("./services/persistence.service");
const translate_1 = __importDefault(require("./utils/translate"));
async function processLifeInWeeks(user) {
    console.log('Processing life in weeks...', user);
    if (!user || !user.birthdate || !user.country || !user.gender)
        return;
    const life = await getLifeInWeeks(user);
    generateWeeksGrid(life);
    showLifePercentages(life);
    showCountryLifeExpectancy(life, user);
    persistence_service_1.Persistence.save('user', user);
}
exports.processLifeInWeeks = processLifeInWeeks;
async function getLifeInWeeks(user) {
    const lifeExpectancy = await (0, lifeExpectancy_service_1.getLifeExpectancyByCountry)(user);
    const life = new life_1.Life();
    life.build(user, lifeExpectancy);
    console.log('Life in weeks:', life);
    return life;
}
function generateWeeksGrid(life) {
    const grid = document.getElementById('grid');
    cleanGrid();
    for (let i = 0; i < life.totalWeeks; i++) {
        const square = document.createElement('div');
        square.classList.add('week'); // Add the "week" class
        if (i < life.weeksLived) {
            square.classList.add('week-lived'); // Add the "week-lived" class
        }
        grid.appendChild(square);
    }
    uiElements_1.Ui.mainContainer.classList.remove('noResultsYet');
}
function cleanGrid() {
    const grid = document.getElementById('grid');
    grid.innerHTML = '';
    uiElements_1.Ui.mainContainer.classList.add('noResultsYet');
}
exports.cleanGrid = cleanGrid;
function showLifePercentages(life) {
    const livedSpan = document.getElementById('lived');
    const toLiveSpan = document.getElementById('toLive');
    livedSpan.innerText = life.percentageLived + '';
    toLiveSpan.innerText = life.percentageLeft + '';
}
async function showCountryLifeExpectancy(life, user) {
    const countryLifeExpectancy = document.getElementById('countryLifeExpectancy');
    let message = translate_1.default.word('lifeExpCountryMessage');
    switch (user.gender) {
        case gender_enum_1.Gender.Male:
            message += translate_1.default.word('aMan');
            break;
        case gender_enum_1.Gender.Female:
            message += translate_1.default.word('aWoman');
            break;
        default:
            message += translate_1.default.word('aPerson');
            break;
    }
    const countries = await (0, countries_service_1.getCountries)();
    const country = (Object.entries(countries).find(([key, value]) => key === user.country))[1];
    message += translate_1.default.word('in') + country + ' ' + translate_1.default.word('is');
    message += Math.trunc(life.lifeExpectancyYears) + translate_1.default.word('years');
    countryLifeExpectancy.innerText = message;
}
