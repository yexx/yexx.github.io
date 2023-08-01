<template>
  <div :class="['card', 'border', 'relative', `p-${spacing}`]">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  props: {
    spacing: {
      type: Number,
      default: 4
    }
  }
})
</script>
