<template>
  <div>
   <MfeCatalog />
  </div>
</template>

<script>
import { defineAsyncComponent } from 'vue'
import LoadingComponent from '../microfes/fallbacks/LoadingComponent.vue'
import ErrorComponent from '../microfes/fallbacks/ErrorComponent.vue'

export default {
  name: 'App',
  components: {
    MfeCatalog: defineAsyncComponent({
      loader: () => import('../microfes/MfeCatalog.vue'),
      loadingComponent: LoadingComponent,
      errorComponent: ErrorComponent
    })
  }
}
</script>

<style>
</style>
