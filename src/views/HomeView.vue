<script setup lang="ts">
import { ref, onMounted } from 'vue';

import { imageLoader } from '@/utils/imageLoader';

import LoadingScreen from '@/components/LoadingScreen.vue';
import ImageLink from '@/components/ImageLink.vue';

const isLoading = ref(true);
const { loadImages, progress } = imageLoader();

const isSereneVisible = ref(false);
const audioButtonVisible = ref(true);

let audioEl: HTMLAudioElement | null = null;

function handleClick() {
  isSereneVisible.value = true;
  audioButtonVisible.value = false;

  if ( audioEl ) {
    audioEl.play();
  }
}

async function loadResources() {
  const images = [
    '/images/sea-view/water.gif',
    '/images/sword-cursor.gif',
    '/images/sea-view/gaze.webp',
    '/images/sea-view/allure.webp',
    '/images/sea-view/eternal-question.webp',
    '/images/sea-view/freestyle.webp',
    '/images/sea-view/helm.gif'
  ];

  try {
    await loadImages(images);
  } finally {
    isLoading.value = false;
  }
}

onMounted(() => {
  loadResources();
  audioEl = new Audio(`${ import.meta.env.VITE_DAPHINE_URL }/music?song=sea-view-gardens.ogg`);
});
</script>

<template>
  <div v-if="isLoading">
    <LoadingScreen :progress="progress" />
  </div>
  <main v-else id="main">
    <div>
      <button 
        id="audio-button" 
        :class="{ hidden: isSereneVisible, flex: !isSereneVisible }"
        @click="handleClick"
      >
        Consume
      </button>
    </div>
    <div id="serene" :class="{ hidden: !isSereneVisible, flex: isSereneVisible }">
      <div id="links">
        <ImageLink
          target="/j"
          name="jerry"
          hover-src="/images/sea-view/gaze.webp"
          alt="kick back and enjoy the view"
        />
        <ImageLink
          target="/b"
          name="based"
          hover-src="/images/sea-view/allure.webp"
          alt="let your worries drift away"
        />
        <ImageLink
          target="/m"
          name="mystique"
          hover-src="/images/sea-view/eternal-question.webp"
          alt="father capital is here for you"
        />
        <ImageLink
          target="/p"
          name="picnic"
          hover-src="/images/sea-view/freestyle.webp"
          alt="crack open a cold one"
        />
      </div>
      <div id="exit">
        <a id="helm" href="https://hermes.yokanga.xyz">
          <img src="/images/sea-view/helm.gif" alt="follow me to serenity"/>
        </a>
      </div>
    </div>
  </main>
</template>

<style scoped>
.hidden {
  display: none;
}
.flex {
  display: flex;
}

#main {
  height: auto;
  background: repeat url("/images/sea-view/water.gif") hsl(0, 0%, 2%);
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

#serene {
  width: 100%;
  height: 100%;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
}

#serene #links {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

#serene #exit {
  margin-top: 20px;
}

#serene #links a:hover,
#helm:hover,
#audio-button:hover {
  cursor: url(/images/sword-cursor.gif), pointer;
}
</style>