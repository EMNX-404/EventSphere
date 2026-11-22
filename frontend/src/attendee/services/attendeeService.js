import { apiClient, USE_DEMO_DATA } from './apiClient';
import { ENDPOINTS } from './endpoints';
import {
  normalizeEvent,
  normalizeExhibitor,
  extractSessionsFromEvents,
  unwrapList,
  unwrapOne,
} from './normalizers';
import {
  demoEvents,
  demoExhibitors,
  demoSessions,
  demoStats,
  demoFloorPlan,
} from '../data/demoData';

const demo = (data) => Promise.resolve({ data, source: 'demo' });

async function load(path, demoValue, map) {
  if (USE_DEMO_DATA || !path) return demo(demoValue);
  const res = await apiClient.get(path);
  return { data: map(res), source: 'api' };
}

export const getEvents = () =>
  load(ENDPOINTS.events, demoEvents, (r) => unwrapList(r).map(normalizeEvent));

export const getExhibitors = () =>
  load(ENDPOINTS.exhibitors, demoExhibitors, (r) => unwrapList(r).map(normalizeExhibitor));

export const getSessions = () =>
  load(ENDPOINTS.sessions, demoSessions, (r) => extractSessionsFromEvents(unwrapList(r)));

export const getStats = () =>
  load(ENDPOINTS.stats, demoStats, (r) => r.data);

export const getFloorPlan = () =>
  load(ENDPOINTS.floorPlan, demoFloorPlan, (r) => unwrapOne(r));

export async function getEvent(id) {
  if (USE_DEMO_DATA) {
    const ev = demoEvents.find((e) => e.id === id);
    if (!ev) throw new Error('Event not found.');
    return { data: ev, source: 'demo' };
  }
  const res = await apiClient.get(ENDPOINTS.eventById(id));
  return { data: normalizeEvent(unwrapOne(res)), source: 'api' };
}

export async function getBookmarks() {
  if (USE_DEMO_DATA) return { data: [], source: 'demo' };
  const res = await apiClient.get(ENDPOINTS.bookmarks);
  const list = Array.isArray(res.data) ? res.data.map(String) : [];
  return { data: list, source: 'api' };
}

export async function toggleBookmarkSession(sessionId) {
  if (USE_DEMO_DATA) return { data: null, source: 'demo' };
  const res = await apiClient.put(ENDPOINTS.toggleBookmark(sessionId));
  const list = Array.isArray(res.data) ? res.data.map(String) : [];
  return { data: list, source: 'api' };
}