cat << 'EOF' > src/views/HomeView.vue
<script setup>
import { ref, onMounted } from 'vue'
import { useCountries } from '../composables/useCountries'
import CountryCard from '../components/CountryCard.vue'
import SearchFilter from '../components/SearchFilter.vue'

const { countries, loading, error, fetchAllCountries, searchCountries, filterByRegion } = useCountries()

onMounted(() => {
  fetchAllCountries()
})

const handleSearch = (name) => {
  if (name.trim() === '') {
    fetchAllCountries()
  } else {
    searchCountries(name)
  }
}

const handleFilter = (region) => {
  if (region === '') {
    fetchAllCountries()
  } else {
    filterByRegion(region)
  }
}
</script>

<template>
  <main class="min-h-screen bg-veryLightGray dark:bg-veryDarkBlueBg">
    <SearchFilter @search="handleSearch" @filter="handleFilter" />
    <div v-if="loading" class="container mx-auto px-4 py-8 text-center">
      Loading countries...
    </div>
    <div v-else-if="error" class="container mx-auto px-4 py-8 text-center text-red-500">
      {{ error }}
    </div>
    <div v-else class="container mx-auto px-4 py-8">
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        <CountryCard 
          v-for="country in countries" 
          :key="country.cca3" 
          :country="country" 
        />
      </div>
    </div>
  </main>
</template>
EOF