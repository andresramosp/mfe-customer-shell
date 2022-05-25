import federation from "@originjs/vite-plugin-federation";
import vue from "@vitejs/plugin-vue";
import AutoImport from "unplugin-auto-import/vite";
import { fileURLToPath, URL } from "url";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    federation({
      name: "Shell",
      filename: "remoteEntry.js",
      remotes: {
        Shell: {
          external: `Promise.resolve('http://localhost:3000/assets/remoteEntry.js')`,
          externalType: "promise",
          format: "esm",
          from: "vite",
        },
        MfeCustomer: {
          external: `Promise.resolve('http://localhost:8081/assets/remoteEntry.js')`,
          externalType: "promise",
          format: "esm",
          from: "vite",
        },
        MfeCatalog: {
          external: `Promise.resolve('http://localhost:8082/assets/remoteEntry.js')`,
          externalType: "promise",
          format: "esm",
          from: "vite",
        },
      },
      exposes: {
        "./authModule": "./src/federated/authModule",
        "./AppLayout": "./src/components/mfe-layout/AppLayout.vue",
        "./Wizard": "./src/components/wizard/Wizard.vue",

        // Agrupar en './composables'
        "./useWizard": "./src/components/wizard/useWizard",
        "./useTheme": "./src/composable/useTheme",
        "./useLayout": "./src/composable/useLayout",
        "./useModelWrapper": "./src/composable/useModelWrapper",
        "./useI18nGlobal": "./src/composable/useI18nGlobal",
        "./useValidations": "./src/composable/useValidations",
        "./store": "./src/store/store.ts",
        "./router": "./src/router/router",
      },
      shared: {
        // ...require('./package.json').dependencies,
        "@azure/msal-browser": {},
        vue: {
          singleton: true,
          // requiredVersion: '^3.2.25'
        },
      },
    }),
    AutoImport({
      include: [/\.[tj]sx?$/, /\.vue$/, /\.vue\?vue/, /\.md$/],
      eslintrc: {
        enabled: true,
        filepath: "./.eslintrc-auto-import.json",
        globalsPropValue: true,
      },
      imports: ["vue", "vue-router", "vue/macros"],
      dts: "auto-imports.d.ts",
    }),
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  build: {
    target: "esnext",
    minify: false,
    cssCodeSplit: true,
    rollupOptions: {
      external: ["vue"],
      output: {
        minifyInternalExports: false,
        globals: {
          vue: "Vue",
        },
      },
    },
  },
});
