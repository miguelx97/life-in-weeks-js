import { CountryLifeExpectancy } from "../models/countryLifeExpectancy";
import { Gender } from "../models/gender.enum";
import { User } from "../models/user";

export async function getCountriesLifeExpectancy():Promise<CountryLifeExpectancy[]> {
    const url = 'https://raw.githubusercontent.com/miguelx97/World-Data-API/main/life_expectancy_2023.json';
    const countries:CountryLifeExpectancy[] = await fetch(url).then(response => response.json());
    return countries;
}

async function getCountryDetails(countryIso:string):Promise<CountryLifeExpectancy>  {
    const countries:CountryLifeExpectancy[] = await getCountriesLifeExpectancy();
    const country:CountryLifeExpectancy|undefined = countries.find(c => c.country === countryIso);
    if (country) {
        return country;
    } else {
        throw new Error(`Country ${country} not found`);
    }
}

export async function getLifeExpectancyByCountry(user:User):Promise<number> {
    if(!user.country) {
        throw new Error('Country is required');
    }
    if(!user.gender) {
        throw new Error('Gender is required');
    }
    const country:CountryLifeExpectancy = await getCountryDetails(user.country);
    switch (user.gender) {
        case Gender.Male: return country.males;
        case Gender.Female: return country.females;
        default: return country.bothsexes;
    }
}

