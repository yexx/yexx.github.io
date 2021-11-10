<template>
  <nav class="breadcrumb">
    <ol class="flex">
      <li>
        <NuxtLink to="/">Home</NuxtLink>
      </li>
      <li v-for="route in routes" :key="route.path">
        <NuxtLink :to="route.path">{{ route.name }}</NuxtLink>
      </li>
    </ol>
  </nav>
</template>

<style lang="postcss">
.breadcrumb ol li:not(:last-child)::after {
  content: '/';
  @apply mx-1.5 text-lg align-middle;
}
</style>

<script lang="ts">
import Vue from 'vue';
import { Route } from 'vue-router';
export default Vue.extend({
  computed: {
    routes() {
      const { fullPath } = this.$route;
      const splitPath = fullPath.startsWith('/')
        ? fullPath.substring(1).split('/')
        : fullPath.split('/');

      const routes = [] as Route[];

      let url = '';

      splitPath.forEach((path) => {
        url = `${url}/${path}`

        const match = this.$router.match(path);
        if (match.name !== null) {
          routes.push(match)
        }
      })

      return routes;
    }
  }
})
</script>
