import { configDropdowns } from './dropdowns';
import { getCountries } from './services/countries.service';
import Translate from './utils/translate';

Translate.init('','../../i18n/').then(() => {
    Translate.template();
    configDropdowns();
})