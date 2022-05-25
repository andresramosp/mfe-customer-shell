<template>
  <div
    :class="[
      'layout-wrapper',
      'layout-static',
      'layout-mobile-sidebar-active',
      {
        'layout-static-sidebar-inactive': staticMenuInactive,
      },
    ]"
    @click="onWrapperClick"
  >
    <AppSideMenu
      :menuOptions="menuOptions"
      @menu-toggle="onMenuToggle"
      @sidebar-click="onSidebarClick"
      @menuitem-click="onMenuItemClick"
    >
    </AppSideMenu>

    <div class="layout-main-container">
      <AppTopBar>
        <template #title>
          <slot name="title" />
        </template>
      </AppTopBar>
      <div class="layout-main">
        <slot name="main-content" />
      </div>
    </div>
    <AppRightPanel>
      <template v-slot:right-panel-content>
        <slot name="right-panel-content" />
      </template>
    </AppRightPanel>
    <transition name="layout-mask">
      <div
        class="layout-mask p-component-overlay"
        v-if="mobileMenuActive"
      ></div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import AppRightPanel from "@/components/mfe-layout/AppRightPanel.vue";
import AppSideMenu from "@/components/mfe-layout/AppSideMenu.vue";
import AppTopBar from "@/components/mfe-layout/AppTopBar.vue";
import useLayout from "@/composable/useLayout";

defineProps({
  menuOptions: { type: Array },
});

const {
  onWrapperClick,
  onMenuToggle,
  onSidebarClick,
  onMenuItemClick,
  mobileMenuActive,
  staticMenuInactive,
  openMenu,
} = useLayout();

onMounted(() => {
  openMenu();
});
</script>

<style lang="scss">
@import "@/assets/styles/mfe-layout/layout.scss";
</style>
