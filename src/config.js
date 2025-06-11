export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const API_ENDPOINTS = {
  CONTACT: `${API_BASE_URL}/contact`,
  EVENTS: `${API_BASE_URL}/events`,
  UPCOMING_EVENTS: `${API_BASE_URL}/events/upcoming`,
  PAST_EVENTS: `${API_BASE_URL}/events/past`
}; 