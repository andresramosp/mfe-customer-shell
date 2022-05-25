<template>
  <div id="root-customer" />
</template>

<script setup lang="ts">
import { mount } from "MfeCustomer/mount";
import { onMounted } from "vue";
onMounted(() => {
  const root = document.getElementById("root-customer");
  mount(root);
});
</script>

<style></style>
