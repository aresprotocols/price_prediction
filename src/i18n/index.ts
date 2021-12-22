import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import zhCommon from "i18n/zh_cn/common"
import enCommon from "i18n/en/common";
import enFooter from "i18n/en/footer";
import zhFooter from "./zh_cn/footer";
import zhRules from "./zh_cn/rules";
import enRules from "./en/rules";

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
