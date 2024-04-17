<script setup lang="ts">
import { ref, onMounted, watch, onBeforeUnmount } from 'vue';
import { useRoute, RouterLink } from 'vue-router';

import { useMediaStore } from '@/stores/mediaStore';
import { imageLoader } from '@/utils/imageLoader';

import LoadingScreen from '@/components/LoadingScreen.vue';

const props = defineProps<{
  videoName: string;
  footerImage: string;
  backgroundImage: string;
  cursorImage: string;
}>();

const route = useRoute();
const routeName = route.name?.toString();

const isLoading = ref(true);
const { loadImages, progress } = imageLoader();

const DAPHINE_URL = import.meta.env.VITE_DAPHINE_URL;
const videoPoster = '/images/static.webp';

const mediaStore = useMediaStore();
const videoEl = ref<HTMLVideoElement | null>(null);
const VIDEO_ENDPOINT = `/stream?video=${ props.videoName }.webm`

async function loadResources() {
  const images = [
    props.footerImage,
    props.backgroundImage,
    props.cursorImage,
    videoPoster
  ];

  try {
    await loadImages(images);
  } finally {
    isLoading.value = false;
  }
}

onMounted(async() => {
  await loadResources();

  if ( routeName ) {
    const config = mediaStore.getConfig(routeName);

    if ( config && videoEl.value ) {
      videoEl.value.src = `${ DAPHINE_URL }${ VIDEO_ENDPOINT }`;
      videoEl.value.currentTime = config.lastTime;

      videoEl.value.play();
    }
  }
});

onBeforeUnmount(() => {
  if ( videoEl.value ) {
    mediaStore.setLastTime(`${ routeName }`, videoEl.value.currentTime);
  }
});

watch(videoEl, (newVal, oldVal) => {
  if ( newVal ) {
    newVal.onended = () => {
      if ( mediaStore.routes[`${ routeName }`].loop ) {
        newVal.play();
      }
    };
  }
});
</script>

<template>
  <LoadingScreen v-if="isLoading" :progress="progress" />
  <section v-else v-show="!isLoading" id="main">
    <div class="video-container">
      <video ref="videoEl" autoplay controls playsinline loop :poster="videoPoster">
        <source
          :src="`${ DAPHINE_URL }/stream?video=${ videoName }.webm`"
          type="video/webm; codecs=vp9,vorbis"
        />
        <source :src="`${ DAPHINE_URL }/stream?video=${ videoName }.mp4`" type="video/mp4" />
      </video>
      <footer>
        <RouterLink id="link" to="/">
          <img :src="footerImage" alt="home">
        </RouterLink>
      </footer>
    </div>
    
  </section>
</template>

<style scoped>
.video-container {
  height: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.video-container video {
  width: 75%;
  height: auto;
  max-width: 725px;
  max-height: 540px;
  box-shadow: 19px 17px #060606;
  object-fit: cover;
}

.video-container video:focus {
  outline: none;
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
}
</style>