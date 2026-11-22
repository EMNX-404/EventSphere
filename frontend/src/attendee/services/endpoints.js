/**
 * Backend endpoint paths used by the attendee interface.
 *
 * !! VERIFY AGAINST THE BACKEND ROUTES BEFORE SETTING VITE_USE_DEMO_DATA=false !!
 * These paths were NOT confirmed against the repository (the backend was not
 * available when this was written). Change them here — nowhere else.
 * Set a path to null if the backend has no such endpoint: the service will then
 * fall back to labelled demo data for that resource only.
 */
export const ENDPOINTS = {
  events: '/events',
  eventById: (id) => `/events/${id}`,
  exhibitors: '/exhibitors',
  sessions: '/sessions',
  floorPlan: '/floorplan',
  stats: null,
};
