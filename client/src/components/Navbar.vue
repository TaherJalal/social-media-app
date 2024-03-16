<script setup lang="ts">

</script>

<template>
  <nav class="navbar">
    <RouterLink to="/">Home</RouterLink>
    <RouterLink to="/about">About</RouterLink>
    <RouterLink to="/tc">T&C</RouterLink>
  </nav>
</template>

<style scoped>
  .navbar{
    padding-top: 2vh;
    padding-left: 8vw;
    padding-bottom: 2vh;
    margin: 0;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    gap: 4vw;
    font-weight: bold;
    background-color: aquamarine;
  }

  .navbar a {
    text-decoration: none !important;
    color: black;
  }
</style>