<script setup lang="ts">
import VideoPlayer from '@/components/VideoPlayer.vue';
</script>

<template>
  <VideoPlayer
    video-name="fish"
    footer-image="/images/j/sparkle.gif"
    background-image="'/images/j/down.gif'"
    cursor-image="/images/j/point.gif"
  />
</template>

<style scoped>
:deep(.video-container) {
  background: repeat url("/images/j/down.gif") hsl(0, 0%, 2%);
  background-size: 6.25px 3.125px;
}

:deep(.video-container video) {
  box-shadow: 19px 17px #060606;
}

:deep(#link:hover, #main video:hover) {
  cursor: url(/images/j/point.gif), pointer;
}
</style>