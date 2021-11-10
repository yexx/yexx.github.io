<template>
  <header class="flex flex-col p-4 bg-white border-r-4">
    <NuxtLink to="/" class="logo flex-shrink-0 mb-4" aria-label="Yeshua Braz">
      <svg viewBox="0 0 640 560" xmlns="http://www.w3.org/2000/svg">
        <path d="M322.744 556.947L482.985 92.95l-162.951 90.63 2.71 373.367z"/>
        <path d="M321.892 184.391L642.022.635l-321.988 371.8 1.858-188.044z"/>
        <path d="M642.021.635L161.75 92.195l160.996 92.95L642.021.635z"/>
        <path d="M482.985 92.95l-160.993 92.949L0 0l482.984 92.95h.001z"/>
        <path d="M0 0l320.034 372.435 2.712-187.29L0 0z"/>
        <path d="M322.746 185.522l-.002 371.801L161.75 92.573l160.996 92.95v-.001z"/>
      </svg>
    </NuxtLink>
    <nav class="h-full" aria-label="Main menu">
      <ul class="menu-nav flex flex-col h-full">
        <li><NuxtLink to="/works" aria-label="Go to My Work page" title="Go to My Work page">My Work</NuxtLink></li>
        <li><NuxtLink to="/#" aria-label="Go to Contact page" title="Go to Contact page">Talk with me</NuxtLink></li>
        <li><NuxtLink to="/#" aria-label="Go to Blog page" title="Go to Blog page">Random Ideas</NuxtLink></li>
      </ul>
    </nav>
  </header>
</template>

<style>
.logo svg path {
  stroke: currentColor;
  stroke-width: 4px;
  fill: transparent;
}
</style>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
})
</script>
