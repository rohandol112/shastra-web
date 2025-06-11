const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? 'https://your-production-api.com/api'
  : 'http://localhost:5000/api';

export const API_ENDPOINTS = {
  CONTACT: `${API_BASE_URL}/contact`,
  EVENTS: `${API_BASE_URL}/events`,
  UPCOMING_EVENTS: `${API_BASE_URL}/events/upcoming`,
  PAST_EVENTS: `${API_BASE_URL}/events/past`
}; 