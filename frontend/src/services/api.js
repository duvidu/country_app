import axios from "axios";

const API_BASE_URL = 'https://restcountries.com/v3.1';

// Fields we typically need for this app
const BASIC_FIELDS = 'name,flags,cca3,population,region,capital';

export const getAllCountries = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/all?fields=${BASIC_FIELDS}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching all countries:', error);
    return [];
  }
};

export const getCountryByName = async (name) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/name/${name}?fields=${BASIC_FIELDS}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching country by name:', error);
    return [];
  }
};

export const getCountriesByRegion = async (region) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/region/${region}?fields=${BASIC_FIELDS}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching countries by region:', error);
    return [];
  }
};

export const getCountryByCode = async (code) => {
  try {
    // For single country, we might want more detailed info
    const response = await axios.get(`${API_BASE_URL}/alpha/${code}?fields=name,flags,cca3,population,region,subregion,capital,tld,currencies,languages,borders`);
    return response.data;
  } catch (error) {
    console.error('Error fetching country by code:', error);
    return null;
  }
};