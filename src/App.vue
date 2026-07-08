<script setup lang="ts">
import Header from "./components/Header.vue";
import Footer from "./components/Footer.vue";
</script>

<template>
  <div>
    <Header />
    <div class="main">
      <RouterView />
    </div>
    <Footer />
  </div>
</template>

<style>
.main {
  min-height: calc(100vh - 200px);
}
</style>
