<template>
  <div class="page overflow-hidden" ref="mainPage">
    <Header />
    <div class="relative flex flex-col min-h-full overflow-auto">
      <Nuxt />
    </div>
  </div>
</template>

<style lang="postcss">
.page {
  @apply grid h-full;

  grid:
    'header content'
    / 160px 1fr;
}
</style>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({

})
</script>
