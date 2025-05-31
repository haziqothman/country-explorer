<script setup>
defineProps({
  country: {
    type: Object,
    required: true
  }
})
</script>

<template>
  <router-link 
    :to="`/country/${country.cca3}`"
    class="block bg-white dark:bg-darkBlue rounded-lg shadow-md overflow-hidden hover:scale-105 transition-transform duration-200"
  >
    <img 
      :src="country.flags.png" 
      :alt="`Flag of ${country.name.common}`"
      class="w-full h-48 object-cover"
    />
    <div class="p-6">
      <h2 class="font-extrabold text-lg mb-4 dark:text-white">{{ country.name.common }}</h2>
      <div class="space-y-1 text-sm dark:text-gray-300">
        <p><span class="font-semibold">Population:</span> {{ country.population.toLocaleString() }}</p>
        <p><span class="font-semibold">Region:</span> {{ country.region }}</p>
        <p><span class="font-semibold">Capital:</span> {{ country.capital?.[0] || 'N/A' }}</p>
      </div>
    </div>
  </router-link>
</template>