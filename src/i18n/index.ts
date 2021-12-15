import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import zhCommon from "i18n/zh_cn/common"
import enCommon from "i18n/en/common";
import enFooter from "i18n/en/footer";
import zhFooter from "./zh_cn/footer";

const resources = {
    zh_CN: {
        common: {
            ...zhCommon
        },
        menu: {

        },
        footer: {
            ...zhFooter
        }
    },
    en: {
        common: {
            ...enCommon
        },
        menu: {
        },
        footer: {
            ...enFooter
        }
    },
};

i18n
    .use(initReactI18next)
    .init({
        resources,
        lng: "en",
        keySeparator: false,
        interpolation: {
            escapeValue: false,
        },
    });

export default i18n;