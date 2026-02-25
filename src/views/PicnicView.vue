<script setup lang="ts">
import VideoPlayer from '@/components/VideoPlayer.vue';
</script>

<template>
  <VideoPlayer
    video-name="picnic"
    footer-image="/images/p/apple.gif"
    background-image="'/images/p/usflag.gif'"
    cursor-image="/images/p/circle.gif"
  />
</template>

<style scoped>
:deep(.video-container) {
  background: repeat url('/images/p/usflag.gif') hsl(240, 50%, 60%);
}

:deep(.video-container video) {
  box-shadow: 19px 17px #818181;
}

:deep(#link:hover, #main video:hover) {
  cursor: url(/images/m/circle.png), pointer;
}
</style>
