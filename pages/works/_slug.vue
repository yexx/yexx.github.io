<template>
  <main id="content" class="relative min-h-full py-4 px-6" v-if="work">
    <h2 :data-text="work.title">{{ work.title }}</h2>
    <hr class="mb-4" />
    <section class="grid gap-4">
      <nuxt-content :document="work" tag="article" />
      <aside v-if="media">
        <figure v-if="media == 'image'">
          <img :src="`/imgs/${work.hero}`" />
        </figure>
        <figure v-if="media == 'video'">
          <video ref="video" autoplay muted loop :src="`/videos/${work.hero}`"/>
        </figure>
      </aside>
    </section>
  </main>
</template>

<script>
import { getFiletype } from '@/utils/file';

export default {
  async asyncData({ $content, params }) {
    const work = await $content("works", params.slug).fetch();
    return { work };
  },
  head() {
    return {
      title: `${this.work.title} - Yeshua Braz`
    };
  },
  computed: {
    media() {
      if (this.work) {
        return getFiletype(this.work.hero);
      }

      return null;
    }
  },
  methods: {

  }
}
</script>

<style lang="postcss">
section.grid {
  grid-template-columns: minmax(auto, 65ch) 1fr;
}
.nuxt-content p {
  @apply mb-4;
}
</style>
