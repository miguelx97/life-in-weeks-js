"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.configDropdowns = void 0;
const choices_js_1 = __importDefault(require("choices.js"));
const countries_service_1 = require("./services/countries.service");
const translate_1 = __importDefault(require("./utils/translate"));
const gender_enum_1 = require("./models/gender.enum");
function configDropdowns() {
    genderDropdown();
    countriesDropdown();
}
exports.configDropdowns = configDropdowns;
async function genderDropdown() {
    const choices = gender_enum_1.Gender.getList().map(val => {
        return { value: val, label: translate_1.default.word(val) };
    });
    choices.unshift({ value: '', label: translate_1.default.word('selectGender'), placeholder: true });
    const dropdown = new choices_js_1.default('#gender', {
        searchEnabled: false,
        shouldSort: false,
        classNames,
        choices,
    });
    dropdown.setValue(['male']);
}
async function countriesDropdown() {
    const countries = await (0, countries_service_1.getCountries)();
    const choices = Object.entries(countries).map(([code, name]) => {
        return { value: code, label: name };
    });
    choices.unshift({ value: '', label: translate_1.default.word('selectCountry'), placeholder: true });
    new choices_js_1.default('#country', {
        placeholder: true,
        placeholderValue: 'Select a country',
        searchEnabled: true,
        shouldSort: false,
        classNames,
        choices,
    });
}
const classNames = {
    containerOuter: 'choices',
    containerInner: 'form-control',
    input: 'choices__input',
    inputCloned: 'choices__input--cloned',
    list: 'choices__list',
    listItems: 'choices__list--multiple',
    listSingle: 'choices__list--single',
    listDropdown: 'choices__list--dropdown',
    item: 'choices__item',
    itemSelectable: 'choices__item--selectable',
    itemDisabled: 'choices__item--disabled',
    itemChoice: 'choices__item--choice',
    placeholder: 'choices__placeholder',
    group: 'choices__group',
    groupHeading: 'choices__heading',
    button: 'choices__button',
    activeState: 'is-active',
    focusState: 'is-focused',
    openState: 'is-open',
    disabledState: 'is-disabled',
    highlightedState: 'is-highlighted',
    selectedState: 'is-selected',
    flippedState: 'is-flipped',
    loadingState: 'is-loading',
    noResults: 'has-no-results',
    noChoices: 'has-no-choices'
};
