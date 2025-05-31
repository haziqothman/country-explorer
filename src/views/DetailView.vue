<script setup>
import { ref, onMounted, computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useCountries } from '../composables/useCountries'
import { ArrowLeftIcon } from '@heroicons/vue/24/solid'

const route = useRoute()
const router = useRouter()
const { fetchCountryByCode } = useCountries()

const country = ref(null)
const loading = ref(false)
const error = ref(null)

const nativeName = computed(() => {
  if (!country.value?.name?.nativeName) return 'N/A'
  const nativeNames = Object.values(country.value.name.nativeName)
  return nativeNames[0].common
})

const currencies = computed(() => {
  if (!country.value?.currencies) return 'N/A'
  return Object.values(country.value.currencies).map(c => c.name).join(', ')
})

const languages = computed(() => {
  if (!country.value?.languages) return 'N/A'
  return Object.values(country.value.languages).join(', ')
})

const fetchCountryData = async () => {
  try {
    loading.value = true
    country.value = await fetchCountryByCode(route.params.code)
  } catch (err) {
    error.value = err.message
  } finally {
    loading.value = false
  }
}

watch(
  () => route.params.code,
  (newCode) => {
    if (newCode) {
      fetchCountryData()
    }
  },
  { immediate: true }
)
</script>

<template>
  <main class="min-h-screen bg-veryLightGray dark:bg-veryDarkBlueBg py-12">
    <div class="container mx-auto px-4">
      <button 
        @click="router.go(-1)"
        class="flex items-center gap-2 bg-white dark:bg-darkBlue px-6 py-2 rounded-md shadow-sm mb-16 dark:text-white"
      >
        <ArrowLeftIcon class="h-5 w-5" />
        <span>Back</span>
      </button>

      <div v-if="loading" class="text-center">
        Loading country details...
      </div>
      <div v-else-if="error" class="text-center text-red-500">
        {{ error }}
      </div>
      <div v-else-if="country" class="flex flex-col lg:flex-row gap-16 items-center">
        <img 
          :src="country.flags.png" 
          :alt="`Flag of ${country.name.common}`"
          class="w-full lg:w-1/2 h-auto max-h-96 object-cover"
        />
        <div class="w-full lg:w-1/2 dark:text-white">
          <h2 class="text-2xl font-extrabold mb-6">{{ country.name.common }}</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div class="space-y-2">
              <p><span class="font-semibold">Native Name:</span> {{ nativeName }}</p>
              <p><span class="font-semibold">Population:</span> {{ country.population.toLocaleString() }}</p>
              <p><span class="font-semibold">Region:</span> {{ country.region }}</p>
              <p><span class="font-semibold">Sub Region:</span> {{ country.subregion || 'N/A' }}</p>
              <p><span class="font-semibold">Capital:</span> {{ country.capital?.[0] || 'N/A' }}</p>
            </div>
            <div class="space-y-2">
              <p><span class="font-semibold">Top Level Domain:</span> {{ country.tld?.[0] || 'N/A' }}</p>
              <p><span class="font-semibold">Currencies:</span> {{ currencies }}</p>
              <p><span class="font-semibold">Languages:</span> {{ languages }}</p>
            </div>
          </div>
          <div v-if="country.borders?.length" class="flex flex-col md:flex-row gap-4 items-start md:items-center">
            <span class="font-semibold whitespace-nowrap">Border Countries:</span>
            <div class="flex flex-wrap gap-2">
              <router-link
                v-for="border in country.borders"
                :key="border"
                :to="`/country/${border}`"
                class="bg-white dark:bg-darkBlue px-4 py-1 rounded-sm shadow-sm text-sm"
              >
                {{ border }}
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>