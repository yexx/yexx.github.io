<template>
  <main class="min-h-full p-4" v-if="work">
    <div class="container mx-auto">
      <h2 :data-text="work.title">{{ work.title }}</h2>
      <hr class="mb-4" />
      <section class="grid gap-4">
        <nuxt-content :document="work" tag="article" />
        <aside v-if="work.media">
          <figure v-if="work.media == 'image'">
            <img :src="`/imgs/${work.img}`" />
          </figure>
          <figure v-if="work.media == 'video'">
            <video ref="video" autoplay muted loop :src="`/videos/${work.img}`"/>
          </figure>
        </aside>
      </section>
    </div>
  </main>
</template>

<style lang="postcss">
section.grid {
  grid-template-columns: minmax(auto, 65ch) 1fr;
}
.nuxt-content p {
  @apply mb-4;
}
</style>

<script>
export default {
    head() {
      return {
        title: `${this.work.title} - Yeshua Braz`
      };
    },
    transition: "polygon",
    async asyncData({ $content, params }) {
      const work = await $content("works", params.slug).fetch();
      return { work };
    },
}
</script>
