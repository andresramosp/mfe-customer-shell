<template>
  <div class="wizard__container">
    <div class="wizard__view">
      <div class="wizard__view_title">
        {{ wizardState.steps[wizardState.currentIndex]?.label }}
      </div>
      <slot name="content"> </slot>
    </div>
    <div class="wizard__footer">
      <div class="divider"></div>
      <div v-if="navigation" class="wizard__nav">
        <Button
          label="prev"
          class="p-button-outlined"
          :disabled="backDisabled"
          @click="back()"
          >{{ backText }}</Button
        >
        <Button label="next" :disabled="nextDisabled" @click="next()">{{
          nextText
        }}</Button>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import Button from "primevue/button";
import { WizardState } from "./types";
import { useWizardNavigation } from "./useWizard";

defineProps({ navigation: Boolean });
defineEmits(["on-complete"]);

const { back, next, backDisabled, nextDisabled, backText, nextText } =
  useWizardNavigation();

const wizardState: WizardState = inject("wizardState");
</script>

<style scoped></style>
