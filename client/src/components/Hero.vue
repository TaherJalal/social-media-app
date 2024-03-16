<script setup lang="ts">

</script>

<template>
  <div class="hero">
    <h1 v-motion-slide-visible-right>Hero section</h1>
  </div>
</template>

<style scoped>
.hero {
  position: relative;
  margin: 0;
  height: 40vh;
  width: 100%;
  background-color: black;
  color: white;
}

.hero h1 {
  padding: 2vw;
  font-size: xxx-large;
}
</style>