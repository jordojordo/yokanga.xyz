<script setup lang="ts">
defineProps<{
  progress: number
}>();
</script>

<template>
  <div class="loading-screen">
    <p>Loading... {{ Math.floor(progress) }}%</p>
    <div class="progress-bar">
      <div class="progress" :style="{ width: progress + '%' }"></div>
    </div>
  </div>
</template>

<style>
.loading-screen {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.7);
  color: white;
  font-size: 24px;
}
</style>