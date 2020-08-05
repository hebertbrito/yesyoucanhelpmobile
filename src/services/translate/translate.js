import RNLocalize, { getLocales } from "react-native-localize";
import en_US from '../../locales/en-US';
import pt_BR from '../../locales/pt-BR';

const GetLangUserMobile = () => {
    const locales = getLocales();
    if (Array.isArray(locales)) {
        return locales[0].languageTag
    }

    if (typeof locales === 'object') {
        return locales.languageTag
    }
}

const translate = (key) => {
    const languser = GetLangUserMobile();
    switch (languser) {
        case 'pt-BR':
            return pt_BR[key]
            break;
        case 'en-US':
            return en_US[key]
            break
        default:
            return en_US[key]
            break;
    }

    return pt_BR[key]
}

export default translate;