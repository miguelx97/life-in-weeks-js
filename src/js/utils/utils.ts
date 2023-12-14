export class Utils {
    static getLanguage():string {
        return navigator.language.substring(0, 2);
    }
}