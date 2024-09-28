<script setup lang="ts">
import { ref, computed } from 'vue';

import { RouterLink } from 'vue-router';

const props = defineProps<{
  target: string;
  name: string;
  hoverSrc: string;
  alt: string;
}>();

const hover = ref(false);

const currentSrc = computed(() => hover.value ? props.hoverSrc : '/images/sea-view/serene.webp');
</script>

<template>
  <RouterLink
    class="links"
    :to="props.target"
    @mouseover="hover = true"
    @mouseleave="hover = false"
  >
    <img
      :id="props.name"
      :src="currentSrc"
      :alt="props.alt"
    />
  </RouterLink>
</template>

<style scoped>
.links {
  width: calc(648px / 1.5);
  height: calc(484px / 1.5);
  margin: 25px;
}
.links img {
  width: 100%;
  height: 100%;
}
</style>