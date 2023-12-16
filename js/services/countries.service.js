"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCountries = void 0;
const language_1 = require("../models/language");
const utils_1 = require("../utils/utils");
async function getCountries() {
    const lang = utils_1.Utils.getLanguage();
    let url;
    switch (lang) {
        case language_1.Language.ES:
            url = 'https://raw.githubusercontent.com/miguelx97/World-Data-API/main/countries_iso_code_esp';
            break;
        default:
            url = 'https://gist.githubusercontent.com/ssskip/5a94bfcd2835bf1dea52/raw/3b2e5355eb49336f0c6bc0060c05d927c2d1e004/ISO3166-1.alpha2.json';
            break;
    }
    const countries = await fetch(url).then(response => response.json());
    return countries;
}
exports.getCountries = getCountries;
