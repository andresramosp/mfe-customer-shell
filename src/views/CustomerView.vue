<template>
  <div>
   <MfeCustomer />
  </div>
</template>

<script>
import { defineAsyncComponent } from 'vue'
import LoadingComponent from '../microfes/fallbacks/LoadingComponent.vue'
import ErrorComponent from '../microfes/fallbacks/ErrorComponent.vue'

export default {
  name: 'App',
  components: {
    MfeCustomer: defineAsyncComponent({
      loader: () => import('../microfes/MfeCustomer.vue'),
      loadingComponent: LoadingComponent,
      errorComponent: ErrorComponent
    })
  }
}
</script>

<style>
</style>
