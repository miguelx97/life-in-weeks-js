import { formFields } from './formActions';
import { Ui } from './models/uiElements';
import { User } from './models/user';
import { processLifeInWeeks } from './processLifeInWeeks';
import { Persistence } from './services/persistence.service';
import Translate from './utils/translate';

Translate.init('','../../i18n/').then(() => {
    Translate.template();
    const user:User = new User()
    user.copy(Persistence.load('user'));
    Ui.init(user);
    formFields(user);
    processLifeInWeeks(user);
})

