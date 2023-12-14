export async function getCountries() {
    console.log('getCountries');
    
    const countries:CountryIsoCode = await fetch('https://raw.githubusercontent.com/miguelx97/World-Data-API/main/countries_iso_code_esp').then(response => response.json());
    const items:DropdownItem[] = Object.entries(countries).map(([code, name]) => {
        return { value: code, label: name };
    });
    console.log(items);
    
}