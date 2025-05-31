<script setup>
import { MoonIcon, SunIcon } from '@heroicons/vue/24/solid'
import { useThemeStore } from '../stores/theme'

const themeStore = useThemeStore()
</script>

<template>
  <header class="bg-white dark:bg-darkBlue shadow-md">
    <div class="container mx-auto px-4 py-6 flex justify-between items-center">
      <h1 class="font-extrabold text-lg dark:text-white">Where in the world?</h1>
      <button 
        @click="themeStore.toggleTheme"
        class="flex items-center gap-2 dark:text-white"
      >
        <MoonIcon v-if="!themeStore.isDark" class="h-5 w-5" />
        <SunIcon v-else class="h-5 w-5" />
        <span>{{ themeStore.isDark ? 'Light Mode' : 'Dark Mode' }}</span>
      </button>
    </div>
  </header>
</template>