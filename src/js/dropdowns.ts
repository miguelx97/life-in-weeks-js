import Choices from "choices.js";
import { getCountries } from "./services/countries.service";
import Translate from "./utils/translate";

export function configDropdowns() {
    genderDropdown();
    countriesDropdown();
}

async function genderDropdown() {

    const choices:DropdownItem[] = [
        { value: '', label: Translate.word('selectGender'), placeholder: true },
        {value: 'm', label: Translate.word('male')},
        {value: 'f', label: Translate.word('female')},
        {value: 'o', label: Translate.word('other')},
    ];

    new Choices('#gender', {
        searchEnabled: false,
        shouldSort: false,
        classNames,
        choices,
    });
}

async function countriesDropdown() {    
    const countries = await getCountries();
    const choices:DropdownItem[] = Object.entries(countries).map(([code, name]) => {
        return { value: code, label: name };
    });

    choices.unshift({ value: '', label: 'Select a country', placeholder: true });

    new Choices('#countries', {
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
