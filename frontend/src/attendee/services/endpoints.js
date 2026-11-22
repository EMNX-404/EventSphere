export const ENDPOINTS = {
  events: '/events',
  eventById: (id) => `/events/${id}`,
  exhibitors: '/users/exhibitors',
  sessions: '/events', // Sessions live inside Event.schedule[]
  floorPlan: null,     // Reserved for Emaan's live HTML5 Canvas + Socket.io map
  stats: null,
  bookmarks: '/users/bookmarks',
  toggleBookmark: (sessionId) => `/users/bookmarks/${sessionId}`,
};