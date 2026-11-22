import axios from 'axios';

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';
// Demo mode is ON unless explicitly set to "false".
export const USE_DEMO_DATA = import.meta.env.VITE_USE_DEMO_DATA !== 'false';

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: { Accept: 'application/json' },
});

export const errorMessage = (err) =>
  err?.response?.data?.message || err?.message || 'Something went wrong. Please try again.';
