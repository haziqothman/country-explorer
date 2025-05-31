import { ref } from "vue";
import axios from "axios";

const API_URL = "https://restcountries.com/v3.1";

export function useCountries() {
  const countries = ref([]);
  const loading = ref(false);
  const error = ref(null);

  const fetchAllCountries = async () => {
    try {
      loading.value = true;
      const response = await axios.get(`${API_URL}/all`);
      countries.value = response.data;
    } catch (err) {
      error.value = err.message;
    } finally {
      loading.value = false;
    }
  };

  const fetchCountryByCode = async (code) => {
    try {
      loading.value = true;
      const response = await axios.get(`${API_URL}/alpha/${code}`);
      return response.data[0];
    } catch (err) {
      error.value = err.message;
    } finally {
      loading.value = false;
    }
  };

  const searchCountries = async (name) => {
    try {
      loading.value = true;
      const response = await axios.get(`${API_URL}/name/${name}`);
      countries.value = response.data;
    } catch (err) {
      countries.value = [];
      error.value = "No countries found";
    } finally {
      loading.value = false;
    }
  };

  const filterByRegion = async (region) => {
    try {
      loading.value = true;
      const response = await axios.get(`${API_URL}/region/${region}`);
      countries.value = response.data;
    } catch (err) {
      error.value = err.message;
    } finally {
      loading.value = false;
    }
  };

  return {
    countries,
    loading,
    error,
    fetchAllCountries,
    fetchCountryByCode,
    searchCountries,
    filterByRegion,
  };
}
