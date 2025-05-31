<script setup>
import { MagnifyingGlassIcon } from '@heroicons/vue/24/solid'

const emit = defineEmits(['search', 'filter'])

const regions = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania']
</script>

<template>
  <div class="container mx-auto px-4 py-8">
    <div class="flex flex-col md:flex-row justify-between gap-4">
      <div class="relative w-full md:w-96">
        <MagnifyingGlassIcon class="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
        <input
          type="text"
          placeholder="Search for a country..."
          class="w-full pl-12 pr-4 py-3 rounded-md shadow-sm dark:bg-darkBlue dark:text-white"
          @input="(e) => emit('search', e.target.value)"
        />
      </div>
      <select
        class="w-48 px-4 py-3 rounded-md shadow-sm dark:bg-darkBlue dark:text-white"
        @change="(e) => emit('filter', e.target.value)"
      >
        <option value="">Filter by Region</option>
        <option v-for="region in regions" :key="region" :value="region">
          {{ region }}
        </option>
      </select>
    </div>
  </div>
</template>