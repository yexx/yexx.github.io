<template>
  <section class="hero relative flex flex-col justify-end items-center">
    <div class="flex items-center justify-center text-center h-full">
      <h1 data-text="Hello! I'm Yeshua" class="hero__title">
        <span>Hello! I'm Yeshua</span>
      </h1>
    </div>
    <div class="text-center">
      <p class="mb-4 font-bold text-lg">
        and these are Missô and Karê
      </p>
    </div>
  </section>
</template>

<style lang="postcss">
.hero {
  height: 70vh;
  background: url('/imgs/my-photo-no-bg.png') center bottom / contain no-repeat;
}

.hero__title {
  font-size: clamp(theme('fontSize.5xl'), 10vw, theme('fontSize.9xl'));
}
</style>
