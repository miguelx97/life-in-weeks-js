import { Language } from "../models/language";
import { Utils } from "../utils/utils";

export async function getCountries():Promise<CountryIsoCode> {
    const lang = Utils.getLanguage();
    let url;
    switch(lang) {
        case Language.ES:
            url = 'https://raw.githubusercontent.com/miguelx97/World-Data-API/main/countries_iso_code_esp';
            break;
        default:
            url = 'https://gist.githubusercontent.com/ssskip/5a94bfcd2835bf1dea52/raw/3b2e5355eb49336f0c6bc0060c05d927c2d1e004/ISO3166-1.alpha2.json';
            break;
    }
    const countries:CountryIsoCode = await fetch(url).then(response => response.json());
    // const items:DropdownItem[] = Object.entries(countries).map(([code, name]) => {
    //     return { value: code, label: name };
    // });
    // console.log(items);
    return countries;
}