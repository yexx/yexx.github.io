<template>
  <main class="relative p-4 grid items-center justify-center h-full">
    <div class="relative text-center z-10">
      <h1
        data-text="Hello, I'm Yeshua"
        :class="[
          'relative',
          'text-9xl',
        ]"
      >
        Hello, I'm Yeshua
      </h1>
      <p
        :class="['mb-4', 'text-sm', 'font-bold']"
        style="--delay: 1.5s"
      >
        and this are Missô and Karê
      </p>
      <p
        :class="['inline-block', 'py-1', 'px-2', 'bg-black', 'text-white']"
        style="--delay: 1s"
      >
        I'm a <strong>Front-end Developer</strong> and <strong>Graphic Designer</strong>
      </p>
    </div>
    <img :class="['absolute', 'bottom-0','block']" src="/imgs/my-photo-no-bg.png" />
  </main>
</template>

<style scoped lang="postcss">
main img { max-height: 100%; }
main h1::after {
  content: attr(data-text);
  @apply
    absolute
    -bottom-1
    -right-1
    w-full
    h-full
    bg-clip-text
    text-transparent;

  background-image:
    linear-gradient(
      135deg,
      transparent 30%,
      var(--black) 30%,
      var(--black) 50%,
      transparent 50%,
      transparent 80%,
      var(--black) 80%);
  background-size: 5px 5px;
}
</style>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  data() {
    return {
      isMounted: false,
    }
  },
  mounted() {
    this.isMounted = true;
  }
})
</script>
