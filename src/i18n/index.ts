import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import zhCommon from "./zh_cn/common"
import enCommon from "./en/common";
import enFooter from "./en/footer";
import zhFooter from "./zh_cn/footer";
import zhRules from "./zh_cn/rules";
import enRules from "./en/rules";
import alert from "./zh_cn/alert";
import enAlert from "./en/alert";
import enPopular from "./en/popular";
import zhPopular from "./zh_cn/popular";

const resources = {
    cn: {
        common: {
            ...zhCommon
        },
        rules: {
            ...zhRules
        },
        footer: {
            ...zhFooter
        },
        alert: {
            ...alert
        },
        popular: {
            ...zhPopular
        }
    },
    en: {
        common: {
            ...enCommon
        },
        rules: {
            ...enRules
        },
        footer: {
            ...enFooter
        },
        alert: {
            ...enAlert
        },
        popular: {
            ...enPopular
        }
    },
};

i18n
    .use(LanguageDetector) //获取当前浏览器语言
    .use(initReactI18next)
    .init({
        resources,
        lng: "en",
        keySeparator: false,
        interpolation: {
            escapeValue: false,
        },
        // 如果找不到语言设置，将会使用fallbackLng
        fallbackLng: "en",
    });

export default i18n;
