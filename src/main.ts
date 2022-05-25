import { AuthenticationResult, EventType } from "@azure/msal-browser";
import "primeflex/primeflex.css";
import "primeicons/primeicons.css";
import "primevue/resources/primevue.min.css";
import "primevue/resources/themes/md-light-deeppurple/theme.css";
import { pinia } from "Shell/store";
import { createApp } from "vue";
import App from "./App.vue";
import { msalInstance } from "./authConfig";
import { msalPlugin } from "./plugins/msalPlugin";
import { CustomNavigationClient } from "./router/NavigationClient";
import router from "./router/router";
import useI18nGlobal from "./composable/useI18nGlobal";
import { commonI18n } from "./i18n/commonI18n";

const navigationClient = new CustomNavigationClient(router);
msalInstance.setNavigationClient(navigationClient);

const accounts = msalInstance.getAllAccounts();
if (accounts.length > 0) {
  msalInstance.setActiveAccount(accounts[0]);
}
msalInstance.addEventCallback((event) => {
  if (event.eventType === EventType.LOGIN_SUCCESS && event.payload) {
    const payload = event.payload as AuthenticationResult;
    const account = payload.account;
    msalInstance.setActiveAccount(account);
  }
});

const { getOrCreate } = useI18nGlobal();
const i18n = getOrCreate({
  legacy: false,
  mode: "composition",
  locale: "es-ES",
  globalInjection: true,
  fallbackLocale: "es-ES",
  messages: commonI18n,
});

const app = createApp(App);
app.use(router);
app.use(pinia);
app.use(msalPlugin, msalInstance);
app.use(i18n);
app.mount("#app");
