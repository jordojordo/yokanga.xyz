<script setup lang="ts">
import VideoPlayer from '@/components/VideoPlayer.vue';
</script>

<template>
  <VideoPlayer
    video-name="mystique"
    footer-image="/images/m/running.gif"
    background-image="'/images/m/cross.png'"
    cursor-image="/images/m/circle.png"
  />
</template>

<style scoped>
:deep(.video-container) {
  background: repeat url('/images/m/cross.png') hsl(0, 0%, 2%);
  animation: slide 13s linear infinite;
  -webkit-animation: slide 13s linear infinite;
}

:deep(.video-container video) {
  box-shadow: -19px 17px #3b2d0e;
}

:deep(#link:hover, #main video:hover) {
  cursor: url(/images/m/circle.png), pointer;
}

:deep(#link img) {
  height: 75px;
}

@keyframes slide {
  from {
    background-position: 0px 100px;
  }

  to {
    background-position: -100px;
  }
}
</style>
