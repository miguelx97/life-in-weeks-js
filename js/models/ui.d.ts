import Choices from "choices.js";
import { User } from "./user";
export declare class Ui {
    static birthdayField?: HTMLInputElement;
    static dropdownGender?: Choices;
    static dropdownCountry?: Choices;
    static init(user?: User): void;
    private static loadBirthdayField;
    private static loadGenderDropdown;
    private static loadCountriesDropdown;
    private static setDropdownDefaultValue;
    private static getClassNames;
}
