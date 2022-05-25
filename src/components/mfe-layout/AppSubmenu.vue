<template>
  <ul v-if="items">
    <template v-for="(item, i) of items">
      <li
        v-if="visible(item) && !item.separator"
        :key="item.label || i"
        :class="[
          {
            'layout-menuitem-category': root,
            'active-menuitem': activeIndex === i && !item.to && !item.disabled,
          },
        ]"
        role="none"
      >
        <template v-if="root">
          <div class="layout-menuitem-root-text" :aria-label="item.label">
            <span v-if="!item.button">{{ item.label }}</span>
            <Button
              v-if="item.button"
              class="bg-menu__button"
              @click="item.fn"
            >
              <span class="material-icons-round">{{item.icon}}</span>
              <span class="p-button-label">{{item.label}}</span>
            </Button>
          </div>
          <AppSubmenu
            v-if="visible(item) && item.items"
            :items="item.items"
            @menuitem-click="$emit('menuitem-click', $event)"
          ></AppSubmenu>
        </template>
        <template v-else>
          <router-link
            v-if="item.to"
            :to="item.to"
            :class="[item.class, 'p-ripple', { 'p-disabled': item.disabled }]"
            :style="item.style"
            @click="onMenuItemClick($event, item, i)"
            :target="item.target"
            :aria-label="item.label"
            exact
            role="menuitem"
            v-ripple
          >
            <i class="material-icons-outlined">{{item.icon}}</i>
            <span>{{ item.label }}</span>
            <i
              v-if="item.items"
              class="pi pi-fw pi-angle-down menuitem-toggle-icon"
            ></i>
            <Badge v-if="item.badge" :value="item.badge"></Badge>
          </router-link>
          <a
            v-if="!item.to"
            :href="item.url || '#'"
            :style="item.style"
            :class="[item.class, 'p-ripple', { 'p-disabled': item.disabled }]"
            @click="onMenuItemClick($event, item, i)"
            :target="item.target"
            :aria-label="item.label"
            role="menuitem"
            v-ripple
          >
            <i :class="item.icon"></i>
            <span>{{ item.label }}</span>
            <i
              v-if="item.items"
              class="pi pi-fw pi-angle-down menuitem-toggle-icon"
            ></i>
            <Badge v-if="item.badge" :value="item.badge"></Badge>
          </a>
        </template>
      </li>
      <li
        class="p-menu-separator"
        :style="item.style"
        v-if="visible(item) && item.separator"
        :key="'separator' + i"
        role="separator"
      ></li>
    </template>
  </ul>
</template>

<script lang="ts" setup>

import { ref } from 'vue'
import Badge from 'primevue/badge'
import Button from 'primevue/button'

interface Props {
  items: Array<any>,
  root?: boolean,
}

withDefaults(defineProps<Props>(), {
  root: false
})

const emit = defineEmits<{
  (e: 'menuitem-click', item: any): void
}>()

const activeIndex = ref(null)

const onMenuItemClick = (event, item, index) => {
  if (item.disabled) {
    event.preventDefault()
    return
  }

  if (!item.to && !item.url) {
    event.preventDefault()
  }

  // execute command
  if (item.command) {
    item.command({ originalEvent: event, item: item })
  }

  activeIndex.value = index === activeIndex.value ? null : index

  emit('menuitem-click', {
    originalEvent: event,
    item
  })
}

const visible = (item) => {
  return typeof item.visible === 'function'
    ? item.visible()
    : item.visible !== false
}

</script>

<style lang="scss" scoped>
</style>
