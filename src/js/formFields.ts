import { User } from "./models/user";
import { processLifeInWeeks } from "./processLifeInWeeks";


const user: User = new User();

export function formFields() {

    const genderField = document.getElementById('gender') as HTMLSelectElement;
    const countryField = document.getElementById('country') as HTMLSelectElement;
    const birthdateField = document.getElementById('birthdate') as HTMLInputElement;

    genderField.addEventListener('change', handleInputChange);
    countryField.addEventListener('change', handleInputChange);
    birthdateField.addEventListener('change', 
        (event) => handleInputChange(event, new Date((event.target as HTMLInputElement).value)));
}

async function handleInputChange(event: Event, value?: any) {
    user.buildFromInputs(event, value);
    await processLifeInWeeks(user);
}
