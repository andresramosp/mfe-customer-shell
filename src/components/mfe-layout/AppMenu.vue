<template>
  <div class="layout-menu-container overflow-y-auto">
    <AppSubmenu
      :items="model"
      class="layout-menu  m-2"
      :root="true"
      @menuitem-click="onMenuItemClick"
      @keydown="onKeyDown">
      </AppSubmenu>
  </div>
</template>

<script lang="ts" setup>

import AppSubmenu from './AppSubmenu.vue'

defineProps<{
  model: Array<any>
}>()

const emit = defineEmits<{
  (e: 'menuitem-click', event: any): void
}>()

const onMenuItemClick = (event) => {
  emit('menuitem-click', event)
}

const onKeyDown = (event) => {
  const nodeElement = event.target
  if (event.code === 'Enter' || event.code === 'Space') {
    nodeElement.click()
    event.preventDefault()
  }
}
</script>
