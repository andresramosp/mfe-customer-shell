<template>
  <div class="layout-topbar shadow-none justify-content-end">
    <div class="flex w-full">
      <slot name="title"></slot>
    </div>
    <div class="flex h-full align-items-center">
      <span class="p-input-icon-right">
        <InputText type="text" placeholder="Search" />
        <i class="pi pi-search" />
      </span>
      <div>
        <ul class="layout-topbar-menu hidden lg:flex origin-top">
          <li>
            <button @click="switchTheme()" class="p-link layout-topbar-button">
              <i :class="isDarkTheme ? 'pi pi-moon' : 'pi pi-sun'"></i>
              <span>Settings</span>
            </button>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import InputText from "primevue/inputtext";
import useTheme from "Shell/useTheme";
export default {
  components: {
    InputText,
  },
  setup() {
    const { switchTheme, isDarkTheme } = useTheme();

    return {
      isDarkTheme,
      switchTheme,
    };
  },
};
</script>
<style scoped></style>
