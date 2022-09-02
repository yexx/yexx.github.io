<template>
  <div class="page grid h-full border">
    <Header />
    <main class="content relative grid min-h-full overflow-auto" >
      <header class="sm:flex sm:items-center px-8 py-6 border-b" v-if="page">
        <h1 class="sm:w-4/6 sm:text-7xl" :data-text="page.title">
          <span>{{ page.title }}</span>
        </h1>
        <p class="mt-2 sm:text-right sm:mt-0 sm:ml-auto" v-html="page.subtitle"></p>
      </header>
      <Nuxt />
    </main>
    <Footer />
  </div>
</template>

<style lang="postcss">
.page {
  grid-template-rows: auto 1fr auto;
}

.content {
   grid-template-rows: auto 1fr;
}

.content section {
  @apply relative px-8 pt-8 pb-6;
}
</style>

<script lang="ts">
import Vue from 'vue';

type Page = {
  name: string,
  title: string,
  subtitle: string,
  description: string,
};

declare module 'vue/types/vue' {
  interface Vue {
    name: string,
    pages: Page[],
    page: Page,
  }
}

export default Vue.extend({
  data() {
    return {
      pages: [
        {
          name: "works",
          title: "My Works",
          subtitle: "Besides projects listed below, I've worked with <span class='bg-black'>Redacted</span>, <span class='bg-black'>Redacted</span> and <span class='bg-black'>Redacted</span>",
          description: "Some of the projects that I`ve worked on"
        },
        {
          name: "contact",
          title: "Let's talk",
          subtitle: "Liked my work? Send me a message.<br />Found a tyop? Tell me about it.",
          description: "Where you can contact me"
        },
        {
          name: "blog",
          title: "Random Ideas",
          subtitle: "Sometimes I write some stuff.",
          description: "Blog Posts"
        }
      ]
    }
  },
  computed: {
    page() {
      const pages = this.pages;
      return pages.find((p: Page) => p.name == this.$route.name) || null;
    }
  },
  head() {
    return {
      title: this.page ? `${this.page.title} | Yeshua Braz` : 'Yeshua Braz',
      meta: [
        { name: 'description', content: this.page?.description || '' }
      ]
    }
  }
});
</script>
