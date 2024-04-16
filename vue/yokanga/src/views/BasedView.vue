<script setup lang="ts">
import { ref, onMounted } from 'vue';

import { imageLoader } from '@/utils/imageLoader';

import LoadingScreen from '@/components/LoadingScreen.vue';

const isLoading = ref(true);
const { loadImages, progress } = imageLoader();

let audioEl: HTMLAudioElement | null = null;

function handleClick() {
  if ( audioEl ) {
    audioEl.play();
  }
}

async function loadResources() {
  const images = [
    '/images/b/gundam.gif',
  ];

  try {
    await loadImages(images);
  } finally {
    isLoading.value = false;
  }
}

onMounted(() => {
  loadResources();
  audioEl = new Audio(`${ import.meta.env.VITE_DAPHINE_URL }/music?song=akiko.ogg`);
});
</script>

<template>
  <LoadingScreen v-if="isLoading" :progress="progress" />
  <section v-else id="main">
    <button @click="handleClick">
      <figure class="sphere"></figure>
    </button>
    <pre>
          ████████████░        ██████████████░      ██████████████░      ██████████████░      ███████████▒▒
        █████░▒▒▒███░░▒▒     █████░▒▒▒█████░░     ██████████████░░     █████░▒▒▒█████░░     ███████████▒▒▒▒
        █████░░▒▒███░░▒▒░    █████░░▒▒█████░░░    ████████▒▒▒▒▒▒▒░░    █████░░▒▒█████░░░    ████░▒▒▒███▒▒▒▒▒▒
      █████░░░▒███░░▒▒░░   █████░░░▒█████░░░░   ██████████████░▒░░   █████░░░▒█████░░░░   ████░░▒▒███▒▒▒▒▒▒░
      ████████████░░▒▒░░░  █████░░▒▒█████░░░░░  ██████████████░░▒░░  █████░░▒▒█████░░░░░  ████░░░▒███▒▒▒▒▒▒░░
    ████████████░░▒▒░░░  █████░░▒▒█████░░░░░  ██████████████░░░▒░░ █████░▒▒▒█████░░░░░  ████░░░▒█████▒▒▒▒░░
    █████░░░▒█████░░░░   █████░▒▒▒█████░░░░   ██████████████░░░▒░  ██████████████░░░░   ████░░▒▒██████▒▒░░
    █████░░▒▒█████░░░    ██████████████░░░     ▒▒▒▒█████████░░░    █████████░▒▒▒▒▒░░    ████░▒▒▒██████░░░
    █████░▒▒▒█████░░     █████░░  █████░░     ██████████████░░      █████████████░░     ██████████████░░
    ██████████████░      █████░   █████░      ██████████████░        ████████████░      ██████████████░
    </pre>
  </section>

  <footer>
    <a class="link" href="/">
      <img src="/images/b/gundam.gif" />
    </a>
  </footer>
</template>

<style scoped>
#main {
  height: 100%;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #060606;
}

@media screen and (max-width: 920px) {
  #main {
    flex-direction: column;
  }

  footer {
    left: 40% !important;
  }
}

@media screen and (max-width: 830px) {
  pre {
    white-space: normal;
  }
}

@keyframes slide {
  from {
    background-position: -100px -100px;
  }

  to {
    background-position: center;
  }
}

#main {
  float: left;
  position: relative;
  width: 100%;
  height: 100%;
  background: #060606 url(../images/b/diag.png);
  animation: slide 30s linear infinite;
  -webkit-animation: slide 30s linear infinite;
}

@keyframes color-change {

  0%,
  100% {
    color: #33a81d;
  }

  50% {
    color: #9b12f5;
  }
}

#main pre {
  animation: color-change 5s linear infinite;
  -webkit-animation: color-change 5s linear infinite;
}

#main button {
  width: 100px;
  height: 100px;
  border: none;
  background: none;
}

#main button:hover,
footer .link:hover {
  cursor: url(/images/b/doom.gif), pointer;
}

.sphere {
  width: 100%;
  height: 100%;
  margin: 0;
  border-radius: 50%;
  background: radial-gradient(circle at 50% 120%,
      #f9fbea,
      #c6b17d 80%,
      #99642d 100%);
}

footer {
  position: absolute;
  left: 50%;
  bottom: 33px;
  padding: 0;
}

#link {
  position: relative;
  left: -50%;
  background-color: black;
}

#link:hover {
  cursor: url(/images/b/doom.gif), pointer;
}
</style>