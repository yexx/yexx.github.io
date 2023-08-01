<template>
  <header class="relative flex w-full py-4 px-6 bg-white border-b">
    <!-- <a id="jumpcontent" href="#content" title="Jump to content" tabindex="0">Jump to content</a -->

    <NuxtLink to="/" class="logo flex-shrink-0" aria-label="Yeshua Braz">
      <svg viewBox="0 0 640 560" xmlns="http://www.w3.org/2000/svg" c>
        <g class="primary">
          <path d="M322.744 556.947L482.985 92.95l-162.951 90.63 2.71 373.367z"/>
          <path d="M321.892 184.391L642.022.635l-321.988 371.8 1.858-188.044z"/>
          <path d="M642.021.635L161.75 92.195l160.996 92.95L642.021.635z"/>
          <path d="M482.985 92.95l-160.993 92.949L0 0l482.984 92.95h.001z"/>
          <path d="M0 0l320.034 372.435 2.712-187.29L0 0z"/>
          <path d="M322.746 185.522l-.002 371.801L161.75 92.573l160.996 92.95v-.001z"/>
        </g>
        <g class="secondary">
          <path d="M322.744 556.947L482.985 92.95l-162.951 90.63 2.71 373.367z"/>
          <path d="M321.892 184.391L642.022.635l-321.988 371.8 1.858-188.044z"/>
          <path d="M642.021.635L161.75 92.195l160.996 92.95L642.021.635z"/>
          <path d="M482.985 92.95l-160.993 92.949L0 0l482.984 92.95h.001z"/>
          <path d="M0 0l320.034 372.435 2.712-187.29L0 0z"/>
          <path d="M322.746 185.522l-.002 371.801L161.75 92.573l160.996 92.95v-.001z"/>
        </g>
      </svg>
    </NuxtLink>

    <input id="showMenu" class="peer" type="checkbox" hidden/>
    <label
      for="showMenu"
      class="
         ml-auto self-center p-3
         sm:hidden
        peer-checked:bg-primary peer-checked:text-white">Menu</label>
    <div class="
        hidden absolute top-full right-[-1px] gap-3 p-3 bg-white border z-10
        peer-checked:grid
        sm:static sm:flex sm:flex-1 sm:items-center sm:p-0 sm:border-0
      ">
      <nav class="sm:ml-3" aria-label="Site menu">
        <ul class="flex flex-col gap-1 text-center sm:flex-row sm:text-left sm:gap-3">
          <li><NuxtLink to="/works" aria-label="Go to My Work page" title="Go to My Work page">My Work</NuxtLink></li>
          <!--
            <li><NuxtLink to="/contact" aria-label="Go to Contact page" title="Go to Contact page">Let's talk</NuxtLink></li>
            <li><NuxtLink to="/blog" aria-abel="Go to Blog page" title="Go to Blog page">Random Ideas</NuxtLink></li>
          -->
        </ul>
      </nav>

      <nav class="sm:ml-auto text-2xl" aria-label="Contact options">
        <ul class="flex gap-3 items-center">
          <li><a class=" px-2" href="https://www.linkedin.com/in/yeshua-braz-9b075590/" title="My Linkedin profile"><fa-icon :icon="['fab', 'linkedin']" /></a></li>
          <li><a class=" px-2" href="https://codepen.io/yexx" title="My Codepen profile"><fa-icon :icon="['fab', 'codepen']" /></a></li>
          <li><a class=" px-2" href="https://github.com/yexx" title="My GitHub profile"><fa-icon :icon="['fab', 'github']" /></a></li>
        </ul>
      </nav>
    </div>
  </header>
</template>

<style lang="postcss">
#jumpcontent {
  width: 0;
  overflow: hidden;
  white-space: nowrap;
  transition: all 0.1s ease;

  &:focus {
    width: auto;
  }
}

.logo {
  display: block;
  width: 72px;
  box-shadow: none;
}

.logo svg path {
  stroke-width: 10;
  fill: transparent;
}

.logo svg g.primary path {
  stroke: theme('colors.primary.DEFAULT');
  stroke-dasharray: 100em;
  stroke-dashoffset: 0em;
  transition: all 0.5s ease-in-out 0.2s;
}

.logo svg g.secondary path {
  stroke: theme('colors.secondary');
  stroke-dasharray: 100em;
  stroke-dashoffset: 100rem;
  transition: all 0.5s ease-in-out;
}

.logo:hover {
  box-shadow: none;
}

.logo:hover svg g.primary path {
  stroke-dashoffset: -80em;
  transition-delay: 0s;
}

.logo:hover svg g.secondary path {
  stroke-dashoffset: 0;
  transition-delay: 0.2s;
}

</style>
