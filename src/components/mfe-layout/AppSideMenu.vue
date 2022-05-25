<template>
  <div class="layout-sidebar" @click="onSidebarClick">
    <div class="layout-sidebar-top">
      <div class="layout-top-logo">
        <div class="logo">
          <a href="#" @click="routerShell.push({ name: 'Home' })">
            <img alt="Logo" :src="logoPath" />
          </a>
          <div class="overPanel"></div>
        </div>
        <button
          class="p-link layout-menu-button layout-topbar-button"
          @click="onMenuToggle"
        >
          <i class="pi pi-bars"></i>
        </button>
      </div>
      <hr />
      <div class="layout-menuname-root-text">{{ userEmail }}</div>

      <div class="layout-avatar">
        <img alt="Logo" :src="avatarImage()" />
      </div>
    </div>

    <AppMenu :model="menuOptions" @menuitem-click="onMenuItemClick" />
    <div class="menu-config">
      <ul class="layout-menu m-2">
        <li class="layout-menuitem-category">
          <router-link to="/Config" class="p-ripple">
            <i class="material-icons-outlined">settings</i>
            <span>Configuración</span>
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import routerShell from "Shell/router";
import { useShellStore } from "Shell/store";
import useTheme from "Shell/useTheme";
import { computed } from "vue";
import AppMenu from "./AppMenu.vue";

defineProps({ menuOptions: { type: Array } });
const emit = defineEmits(["sidebar-click", "menu-toggle", "menuitem-click"]);

const { logoPath } = useTheme();
const store = useShellStore();
const userEmail = computed(() => store.userData.mail);

const onSidebarClick = (event) => {
  emit("sidebar-click", event);
};

const avatarImage = () => {
  return import.meta.env.VITE_APP_PUBLIC_PATH + "images/female-avatar.png";
};

const onMenuToggle = (event) => {
  emit("menu-toggle", event);
};

const onMenuItemClick = (event) => {
  emit("menuitem-click", event);
};
</script>
<style lang="scss"></style>
