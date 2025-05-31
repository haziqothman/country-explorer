<script setup>
import { onMounted } from 'vue'
import { useThemeStore } from './stores/theme'
import Header from './components/Header.vue'

const themeStore = useThemeStore()

onMounted(() => {
  if (localStorage.getItem('darkMode') === 'true') {
    themeStore.isDark = true
    document.documentElement.classList.add('dark')
  }
})
</script>

<template>
  <Header />
  <router-view />
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Nunito+Sans:wght@300;600;800&display=swap');

body {
  font-family: 'Nunito Sans', sans-serif;
  @apply bg-veryLightGray dark:bg-veryDarkBlueBg;
}
</style>