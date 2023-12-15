import Choices, { Item } from "choices.js";
import { getCountries } from "./services/countries.service";
import Translate from "./utils/translate";
import { Gender } from "./models/gender.enum";
import { User } from "./models/user";

export function confiFields(user:(User | undefined)) {
    birthdayField(user?.birthdate);
    genderDropdown(user?.gender);
    countriesDropdown(user?.country);
}

async function birthdayField(defaultValue?: Date) {
    const birthdayField = document.getElementById('birthdate') as HTMLInputElement;
    birthdayField.value = defaultValue?.toISOString().slice(0, 10) ?? '';
}

async function genderDropdown(defaultValue?: string) {

    const choices:Item[] = Gender.getList().map(val => {
        return { value: val, label: Translate.word(val) };
    });
    choices.unshift({ value: '', label: Translate.word('selectGender'), placeholder: true });

    const dropdown = new Choices('#gender', {
        searchEnabled: false,
        shouldSort: false,
        classNames,
        choices,
    });

    setDropdownDefaultValue(choices, dropdown, defaultValue);
}

async function countriesDropdown(defaultValue?: string) {    
    const countries = await getCountries();
    const choices:Item[] = Object.entries(countries).map(([code, name]) => {
        return { value: code, label: name };
    });

    choices.unshift({ value: '', label: Translate.word('selectCountry'), placeholder: true });

    const dropdown = new Choices('#country', {
        placeholder: true,
        searchEnabled: true,
        shouldSort: false,
        classNames,
        choices,
    });

    setDropdownDefaultValue(choices, dropdown, defaultValue);
}

function setDropdownDefaultValue(choices:Item[], dropdown:Choices, defaultValue?: string){
    if(!defaultValue) return;
    const item:Item = choices.find(item => item.value === defaultValue)!;
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
