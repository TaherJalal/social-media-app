<script setup lang="ts">

</script>

<template>
  <nav class="navbar">
    <div class="navbar">
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/about">About</RouterLink>
      <RouterLink to="/tc">T&C</RouterLink>
    </div>
    <div>
      <RouterLink to="/register">Register</RouterLink>
      <RouterLink to="/login">Login</RouterLink>
    </div>
  </nav>
</template>

<style scoped>
.navbar {
  padding-top: 1vh;
  padding-left: 8vw;
  padding-bottom: 1vh;
  margin: 0;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  gap: 4vw;
  font-weight: bold;
  background-color: aquamarine;
}

.navbar a {
  text-decoration: none !important;
  color: black;
}
</style>