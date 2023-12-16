import { Ui } from "./models/uiElements";
import { User } from "./models/user";
import { cleanGrid, processLifeInWeeks } from "./processLifeInWeeks";
import { Persistence } from "./services/persistence.service";

const user: User = new User();

export function formFields(_user: User) {
    user.copy(_user);

    Ui.dropdownGender.passedElement.element.addEventListener('change', handleInputChange);
    Ui.dropdownCountry.passedElement.element.addEventListener('change', handleInputChange);
    Ui.birthdayInput.addEventListener('change', 
        (event) => handleInputChange(event, new Date((event.target as HTMLInputElement).value)));

    Ui.cleanBtn.addEventListener('click', () => {
        user.clean();
        cleanGrid();
        Ui.cleanForm();
        Persistence.remove('user');
    });
}

async function handleInputChange(event: Event, value?: any) {
    user.buildFromInputs(event, value);
    await processLifeInWeeks(user);
}
