"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLifeExpectancyByCountry = void 0;
const gender_enum_1 = require("../models/gender.enum");
async function getCountriesLifeExpectancy() {
    const url = 'https://raw.githubusercontent.com/miguelx97/World-Data-API/main/life_expectancy_2023.json';
    const countries = await fetch(url).then(response => response.json());
    return countries;
}
async function getCountryDetails(countryIso) {
    const countries = await getCountriesLifeExpectancy();
    const country = countries.find(c => c.country === countryIso);
    if (country) {
        return country;
    }
    else {
        throw new Error(`Country ${country} not found`);
    }
}
async function getLifeExpectancyByCountry(user) {
    if (!user.country) {
        throw new Error('Country is required');
    }
    if (!user.gender) {
        throw new Error('Gender is required');
    }
    const country = await getCountryDetails(user.country);
    switch (user.gender) {
        case gender_enum_1.Gender.Male: return country.males;
        case gender_enum_1.Gender.Female: return country.females;
        default: return country.bothsexes;
    }
}
exports.getLifeExpectancyByCountry = getLifeExpectancyByCountry;
