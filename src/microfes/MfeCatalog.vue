<template>
  <div id="root-catalog" />
</template>

<script setup lang="ts">
import { mount } from "MfeCatalog/mount";
import { onMounted } from "vue";
onMounted(() => {
  const root = document.getElementById("root-catalog");
  mount(root);
});
</script>

<style></style>
