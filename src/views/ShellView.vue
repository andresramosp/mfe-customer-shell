<template>
  <div style="margin-top: 50px">
    <div>
      <span class="flex justify-content-center" style="margin-bottom: 2em">
        {{ t("welcome") }} {{ userName }}
      </span>
      <div class="flex">
        <div
          class="flex justify-content-center flex-wrap card-container yellow-container"
        >
          <router-link to="/Customer">
            <Card style="width: 500px; margin-bottom: 2em">
              <template #title>
                <h2>MicroFrontend Customer</h2>
                <h3>Equipo Fenix</h3>
              </template>
              <template #content> Acceder </template>
            </Card>
          </router-link>
        </div>

        <div
          class="flex justify-content-center flex-wrap card-container yellow-container"
        >
          <router-link to="/Catalog">
            <Card style="width: 500px; margin-bottom: 2em">
              <template #title>
                <h2>MicroFrontend Catalog</h2>
                <h3>Equipo Hydra</h3>
              </template>
              <template #content> Acceder </template>
            </Card>
          </router-link>
        </div>
      </div>
      <div
        class="flex justify-content-center flex-wrap card-container yellow-container"
      >
        <button @click="logout">{{ t("signOut") }}</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useMsal } from "@/composable/auth/useMsal";
import Card from "primevue/card";
import { useShellStore } from "Shell/store";
import { useI18n } from "vue-i18n";

const { t } = useI18n({ useScope: "global" });

const store = useShellStore();
const { instance } = useMsal();

const userName = computed(() => store.userData.displayName);

const logout = () => {
  instance.logoutRedirect();
};
</script>

<style scoped>
@import "@/assets/styles/shell-layout.scss";
</style>
