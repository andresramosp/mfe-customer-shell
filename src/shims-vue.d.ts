/* eslint-disable */
declare module "*.vue" {
  import type { DefineComponent } from "vue";
  const component: DefineComponent<{}, {}, any>;
  export default component;
}
declare module "MfeCustomer/mount";
declare module "MfeCatalog/mount";
declare module "Shell/store";
declare module "Shell/useTheme";
declare module "Shell/router";
declare module "Shell/useI18nGlobal";
declare module "Shell/useModelWrapper";
