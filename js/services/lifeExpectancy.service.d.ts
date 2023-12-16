import { CountryLifeExpectancy } from "../models/countryLifeExpectancy";
import { User } from "../models/user";
export declare function getCountriesLifeExpectancy(): Promise<CountryLifeExpectancy[]>;
export declare function getLifeExpectancyByCountry(user: User): Promise<number>;
