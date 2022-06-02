<template>
  <section class="bg-black">
    <nuxt-content
      :document="about"
      class="
        mx-auto
        prose prose-lg
        prose-headings:text-center
        prose-headings:text-white
        prose-strong:text-secondary
        text-white
      "
      tag="article"
    />
  </section>
</template>

<script>
export default {
  data() {
    return {
      about: {}
    }
  },
  async fetch () {
    const about = await this.$content('about-me').fetch()
    this.about = about;
  }
}
</script>
