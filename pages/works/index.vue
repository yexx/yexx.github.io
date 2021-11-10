<template>
  <main class="p-4 h-full">
    <header>
      <h1 class="text-9xl" data-text="My Works">My Works</h1>
    </header>
    <ul class="works flex gap-4">
      <li v-for="work in workList" :key="work.path">
        <Card>
          <figure class="relative pb-2">
            <img width="300" height="300" :src="`/imgs/${work.img}`" :alt="work.description">
            <figcaption class="absolute position-center w-4/5 font-bold text-center">
              {{work.description}}
            </figcaption>
          </figure>
          <h3 class="text-shadow">{{work.title}}</h3>
          <NuxtLink :to="work.path">Ver Mais</NuxtLink>
        </Card>
      </li>
    </ul>
  </main>
</template>

<style>
.works li {
  flex-basis: 25%;
}

.works .card:hover {
  box-shadow: 0.75em 0.75em 0px theme('colors.black');
}
</style>

<script>
export default {
  head() {
    return {
      title: 'My Works - Yeshua Braz'
    }
  },
  data() {
    return {
      workList: []
    }
  },
  async fetch() {
    this.workList = await this.$content('works')
      .only(['title', "description", 'img'])
      .fetch();
  }
}
</script>
