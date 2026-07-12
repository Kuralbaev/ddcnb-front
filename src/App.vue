<script setup lang="ts">
import { onMounted } from "vue";
import Header from "./components/Header.vue";
import Footer from "./components/Footer.vue";
import { useThemeStore } from "./stores/theme";

const themeStore = useThemeStore();

onMounted(() => {
  themeStore.init();
});
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
