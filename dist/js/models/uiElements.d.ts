import Choices from "choices.js";
import { User } from "./user";
export declare class Ui {
    static birthdayInput: HTMLInputElement;
    static dropdownGender: Choices;
    static dropdownCountry: Choices;
    static cleanBtn: HTMLButtonElement;
    static livedSpan: HTMLSpanElement;
    static toLiveSpan: HTMLSpanElement;
    static mainContainer: HTMLDivElement;
    static init(user?: User): void;
    private static loadbirthdayInput;
    private static loadGenderDropdown;
    private static loadCountriesDropdown;
    private static setDropdownDefaultValue;
    static cleanForm(): void;
    private static getClassNames;
}
