import Choices, { Item } from "choices.js";
import { Gender } from "./gender.enum";
import Translate from "../utils/translate";
import { getCountries } from "../services/countries.service";
import { User } from "./user";

export class Ui {
    static birthdayInput: HTMLInputElement;
    static dropdownGender: Choices;
    static dropdownCountry: Choices;
    static cleanBtn: HTMLButtonElement;
    static livedSpan: HTMLSpanElement;
    static toLiveSpan: HTMLSpanElement;
    static mainContainer: HTMLDivElement;

    static init(user?:User){
        this.loadbirthdayInput(user?.birthdate);
        this.loadGenderDropdown(user?.gender);
        this.loadCountriesDropdown(user?.country);
        this.cleanBtn = document.getElementById('cleanBtn') as HTMLButtonElement;
        this.livedSpan = document.getElementById('lived') as HTMLSpanElement;
        this.toLiveSpan = document.getElementById('toLive') as HTMLSpanElement;
        this.mainContainer = document.getElementById('mainContainer') as HTMLDivElement;
    }

    private static async loadbirthdayInput(defaultValue?: Date) {
        this.birthdayInput = document.getElementById('birthdate') as HTMLInputElement;
        this.birthdayInput.value = defaultValue?.toISOString().slice(0, 10) ?? '';
    }
    
    private static async loadGenderDropdown(defaultValue?: string) {
    
        const choices:Item[] = Gender.getList().map(val => {
            return { value: val, label: Translate.word(val) };
        });
        choices.unshift({ value: '', label: Translate.word('selectGender'), placeholder: true });
    
        this.dropdownGender = new Choices('#gender', {
            searchEnabled: false,
            shouldSort: false,
            classNames: this.getClassNames(),
            choices,
        });
    
        this.setDropdownDefaultValue(choices, this.dropdownGender, defaultValue);
    }
    
    private static async loadCountriesDropdown(defaultValue?: string) {  
        
        let choices:Item[] = [];
    
        choices.unshift({ value: '', label: Translate.word('selectCountry'), placeholder: true });
        
        this.dropdownCountry = new Choices('#country', {
            searchEnabled: true,
            shouldSort: false,
            classNames: this.getClassNames(),
            choices,
        });

        const countries = await getCountries();
        choices = Object.entries(countries).map(([code, name]) => {
            return { value: code, label: name };
        });

        this.dropdownCountry.setChoices(choices);
        
        this.setDropdownDefaultValue(choices, this.dropdownCountry, defaultValue);
    }
    
    private static setDropdownDefaultValue(choices:Item[], dropdown:Choices, defaultValue?: string){
        if(!defaultValue) return;
        const item:Item = choices.find(item => item.value === defaultValue)!;
        dropdown.setChoiceByValue(item.value);
    }

    public static cleanForm() {
        this.birthdayInput!.value = '';
        this.dropdownGender!.setChoiceByValue('');
        this.dropdownCountry!.setChoiceByValue('');
    }
    
    private static getClassNames() {
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
        }
    };
    
}
