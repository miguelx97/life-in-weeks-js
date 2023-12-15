import { confiFields } from './configFormFields';
import { formFields } from './formFields';
import { User } from './models/user';
import { processLifeInWeeks } from './processLifeInWeeks';
import { Persistence } from './services/persistence.service';
import Translate from './utils/translate';

Translate.init('','../../i18n/').then(() => {
    Translate.template();
    const user:User = new User()
    user.copy(Persistence.load('user'));
    confiFields(user);
    formFields(user);
    processLifeInWeeks(user);
})

