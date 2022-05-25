import { createI18n } from "vue-i18n";
import { useI18n } from "vue-i18n";
import { commonI18n } from "@/i18n/commonI18n";

let i18n = null;

export default function useI18nGlobal() {
  const getOrCreate = (args) => {
    if (!i18n) {
      i18n = createI18n(args);
    }
    return i18n;
  };

  const mergeLocales = (messages) => {
    const { mergeLocaleMessage } = useI18n({ useScope: "global" });
    for (let locale of Object.keys(messages)) {
      mergeLocaleMessage(locale, messages[locale]);
    }
  };

  return {
    getOrCreate,
    i18n,
    locale: i18n?.global.locale.value,
    mergeLocales,
    commonI18n,
  };
}
