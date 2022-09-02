<template>
  <section>
    <ul class="works grid gap-6 sm:grid-cols-3">
      <li v-for="work in workList" :key="work.path" class="group border border-transparent hover:bg-black hover:border-primary">
        <figure v-if="work.thumb" role="group">
          <div class="img-wrapper relative w-full">
            <NuxtImg
              v-if="work.type == 'image'"
              :src="work.thumb"
              :alt="work.description"
              width="300"
              height="300"
              sizes="sm:100vw md:50vw lg:300px"
              class="mx-auto w-full h-full object-cover"
            />

            <video
              v-if="work.type == 'video'"
              :src="work.thumb"
              :alt="work.description"
              width="300"
              height="300"
              muted
              loop
              class="mx-auto w-full h-full object-cover"
              @mouseenter="$event.target.play()"
              @mouseleave="$event.target.pause()"
            />
          </div>
          <figcaption class="mt-4 p-4 group-hover:text-secondary">
            <h3 class="text-shadow">{{work.title}}</h3>
            <p>{{work.description}}</p>

            <!-- <NuxtLink :to="work.path">Ver Mais</NuxtLink> -->
          </figcaption>
        </figure>
      </li>
    </ul>
  </section>
</template>

<style scoped lang="postcss">
.img-wrapper {
  height: 300px;
}

.img-wrapper::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: linear-gradient(45deg, transparent 48%, rgba(0,0,0,0.75) 48%, rgba(0,0,0,0.75) 50%, transparent 51%);
  background-size: 4px 4px;
}
</style>

<script>
import { getFiletype } from '@/utils/file';

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
    this.workList =
      await this.$content('works')
        .fetch()

    this.workList.map((work) => {
      if(work.thumb) {
        work.type = getFiletype(work.thumb);
      }
    });
  },
  methods: {
    play(el) {
      console.log(el);
    },
    stop(el) {
      console.log(el);
    }
  }
}
</script>
