<template>
  <BaseWizard 
    :steps="steps" 
    :orientation="orientation" 
    :title="title" 
    @on-complete="onComplete"
    :navigation="navigation"
  >
  </BaseWizard>
</template>
<script setup lang='ts'>

import BaseWizard from './BaseWizard.vue'
import { StepStatus } from './types'

interface Props {
  orientation: string,
  title: string,
  navigation: boolean,
  steps: Array<any>
}

const props = withDefaults(
  defineProps<Props>(), { orientation: 'horizontal', title: 'hello', steps: () => [], navigation: true }
)

const emit = defineEmits(['on-complete'])

provide('wizardState', reactive({
  currentIndex: 0,
  textBack: 'Back',
  textNext: 'Next',
  steps: props.steps.map((step) => {
    return {
      ...step,
      $v: {},
      state: {...step.state},
      status: StepStatus.pending,
      loading: false,
    }
  }),

}))

const onComplete = (form) => {
  emit('on-complete', form)
}

</script>

<style lang="scss">
</style>