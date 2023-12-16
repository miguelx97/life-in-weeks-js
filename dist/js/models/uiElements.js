"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Ui = void 0;
const choices_js_1 = __importDefault(require("choices.js"));
const gender_enum_1 = require("./gender.enum");
const translate_1 = __importDefault(require("../utils/translate"));
const countries_service_1 = require("../services/countries.service");
const lifeExpectancy_service_1 = require("../services/lifeExpectancy.service");
class Ui {
    static birthdayInput;
    static dropdownGender;
    static dropdownCountry;
    static cleanBtn;
    static livedSpan;
    static toLiveSpan;
    static mainContainer;
    static init(user) {
        this.loadbirthdayInput(user?.birthdate);
        this.loadGenderDropdown(user?.gender);
        this.loadCountriesDropdown(user?.country);
        this.cleanBtn = document.getElementById('cleanBtn');
        this.livedSpan = document.getElementById('lived');
        this.toLiveSpan = document.getElementById('toLive');
        this.mainContainer = document.getElementById('mainContainer');
    }
    static async loadbirthdayInput(defaultValue) {
        this.birthdayInput = document.getElementById('birthdate');
        this.birthdayInput.value = defaultValue?.toISOString().slice(0, 10) ?? '';
    }
    static async loadGenderDropdown(defaultValue) {
        const choices = gender_enum_1.Gender.getList().map(val => {
            return { value: val, label: translate_1.default.word(val) };
        });
        choices.unshift({ value: '', label: translate_1.default.word('selectGender'), placeholder: true });
        this.dropdownGender = new choices_js_1.default('#gender', {
            searchEnabled: false,
            shouldSort: false,
            classNames: this.getClassNames(),
            choices,
        });
        this.setDropdownDefaultValue(choices, this.dropdownGender, defaultValue);
    }
    static async loadCountriesDropdown(defaultValue) {
        let choices = [];
        choices.unshift({ value: '', label: translate_1.default.word('selectCountry'), placeholder: true });
        this.dropdownCountry = new choices_js_1.default('#country', {
            searchEnabled: true,
            shouldSort: false,
            classNames: this.getClassNames(),
            choices,
        });
        const countries = await (0, countries_service_1.getCountries)();
        choices = Object.entries(countries).map(([code, name]) => {
            return { value: code, label: name };
        });
        // filter by the ones that are in the life expectancy data
        const lifeExpectancyCountries = await (0, lifeExpectancy_service_1.getCountriesLifeExpectancy)();
        const lifeExpectancyCountriesCodes = lifeExpectancyCountries.map(country => country.country);
        choices = choices.filter(choice => lifeExpectancyCountriesCodes.includes(choice.value));
        this.dropdownCountry.setChoices(choices);
        this.setDropdownDefaultValue(choices, this.dropdownCountry, defaultValue);
    }
    static setDropdownDefaultValue(choices, dropdown, defaultValue) {
        if (!defaultValue)
            return;
        const item = choices.find(item => item.value === defaultValue);
        dropdown.setChoiceByValue(item.value);
    }
    static cleanForm() {
        this.birthdayInput.value = '';
        this.dropdownGender.setChoiceByValue('');
        this.dropdownCountry.setChoiceByValue('');
    }
    static getClassNames() {
        return {
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
    }
    ;
}
exports.Ui = Ui;
