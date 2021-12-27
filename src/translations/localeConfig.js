import * as RNLocalize from "react-native-localize";
import I18n from "i18n-js";
import en from './en.json';
import es from './es.json';

const locales = RNLocalize.getLocales();
if (Array.isArray(locales)) {
    I18n.locale = locales[0].languageTag;
}
I18n.translations = {
    en,
    es
};

I18n.fallbacks = true;
export default I18n;