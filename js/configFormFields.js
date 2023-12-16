"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.confiFields = void 0;
const choices_js_1 = __importDefault(require("choices.js"));
const countries_service_1 = require("./services/countries.service");
const translate_1 = __importDefault(require("./utils/translate"));
const gender_enum_1 = require("./models/gender.enum");
const ui_1 = require("./models/ui");
function confiFields(user) {
    birthdayField(user?.birthdate);
    genderDropdown(user?.gender);
    countriesDropdown(user?.country);
}
exports.confiFields = confiFields;
async function birthdayField(defaultValue) {
    ui_1.Ui.birthdayField = document.getElementById('birthdate');
    ui_1.Ui.birthdayField.value = defaultValue?.toISOString().slice(0, 10) ?? '';
}
async function genderDropdown(defaultValue) {
    const choices = gender_enum_1.Gender.getList().map(val => {
        return { value: val, label: translate_1.default.word(val) };
    });
    choices.unshift({ value: '', label: translate_1.default.word('selectGender'), placeholder: true });
    ui_1.Ui.dropdownGender = new choices_js_1.default('#gender', {
        searchEnabled: false,
        shouldSort: false,
        classNames,
        choices,
    });
    setDropdownDefaultValue(choices, ui_1.Ui.dropdownGender, defaultValue);
}
async function countriesDropdown(defaultValue) {
    const countries = await (0, countries_service_1.getCountries)();
    const choices = Object.entries(countries).map(([code, name]) => {
        return { value: code, label: name };
    });
    choices.unshift({ value: '', label: translate_1.default.word('selectCountry'), placeholder: true });
    ui_1.Ui.dropdownCountry = new choices_js_1.default('#country', {
        placeholder: true,
        searchEnabled: true,
        shouldSort: false,
        classNames,
        choices,
    });
    setDropdownDefaultValue(choices, ui_1.Ui.dropdownCountry, defaultValue);
}
function setDropdownDefaultValue(choices, dropdown, defaultValue) {
    if (!defaultValue)
        return;
    const item = choices.find(item => item.value === defaultValue);
    dropdown.setChoiceByValue(item.value);
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
