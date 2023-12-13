import Choices from "choices.js";

export function configDropdowns() {
    new Choices('#countries', {
        placeholder: true,
        placeholderValue: 'Select a country',
        searchEnabled: true,
        shouldSort: false,
        classNames,
        choices,
    });
    
    new Choices('#gender', {
        searchEnabled: false,
        shouldSort: false,
        classNames,
    });
}

const choices = [
    { value: '', label: 'Select value', placeholder: true },
    { value: 'a', label: 'A' },
    { value: 'b', label: 'B' },
];

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
