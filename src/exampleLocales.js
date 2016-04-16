import _t from './translate';
import locales from '../locales/es-ES';

_t.setLocales(locales);

// Some examples of strings that will be detected:
console.log(_t("exampleContext_Example string"));
console.log(_t("exampleContext_Example string"));
console.log(_t("exampleContext_Example string"));
console.log(_t("exampleContext_Example string"));
console.log(_t("exampleContext_Number of items: {NUM}", { NUM: 5 }));
console.log(_t("exampleContext_Extremely long extremely long extremely long extremely long extremely long extremely long extremely long extremely long extremely long extremely long extremely long extremely long extremely long extremely long extremely long extremely long extremely long extremely long string"));