<template>
  <div id="layout-float-right" :class="containerClass">
    <a href="#" class="layout-float-right-button" id="layout-float-right-button" @click="toggleConfigurator">
      <span class="material-symbols-rounded"> support_agent </span>
    </a>
    <Button class="p-button-danger layout-float-right-close p-button-rounded p-button-text" icon="pi pi-times"
      @click="hideConfigurator" :style="{ 'z-index': 1 }"></Button>

    <slot name="right-panel-content"></slot>

  </div>
</template>

<script setup lang="ts">

import Button from 'primevue/button'

const active = ref(false)
const outsideClickListener = ref(null)

const containerClass = computed(() => {
  return ['layout-float-right', { 'layout-float-right-active': active.value }]
})

const toggleConfigurator = (event) => {
  active.value = !active.value
  event.preventDefault()
  if (active.value) bindOutsideClickListener()
  else unbindOutsideClickListener()
}

const hideConfigurator = (event) => {
  active.value = false
  unbindOutsideClickListener()
  event.preventDefault()
}

const bindOutsideClickListener = () => {
  if (!outsideClickListener.value) {
    const outsideClickListener = (event) => {
      if (active.value && isOutsideClicked(event)) {
        active.value = false
      }
    }
    document.addEventListener('click', outsideClickListener)
  }
}

const unbindOutsideClickListener = () => {
  if (outsideClickListener.value) {
    document.removeEventListener('click', outsideClickListener.value)
    outsideClickListener.value = null
  }
}

const isOutsideClicked = (event) => {
  return !(
    true // this.$el.isSameNode(event.target) || this.$el.contains(event.target)
  )
}
</script>

<style lang="scss">
.material-symbols-rounded {
  line-height: inherit;
}
</style>
