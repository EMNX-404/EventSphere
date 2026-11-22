import { apiClient, USE_DEMO_DATA } from './apiClient';
import { ENDPOINTS } from './endpoints';
import { normalizeEvent, normalizeExhibitor, normalizeSession, unwrapList, unwrapOne } from './normalizers';
import { demoEvents, demoExhibitors, demoSessions, demoStats, demoFloorPlan } from '../data/demoData';

/**
 * Every function resolves to { data, source } where source is 'api' or 'demo'.
 * The UI shows a "Demo data" notice when source === 'demo', so demonstration
 * content is never presented as real backend data.
 */
const demo = (data) => Promise.resolve({ data, source: 'demo' });

async function load(path, demoValue, map) {
  if (USE_DEMO_DATA || !path) return demo(demoValue);
  const res = await apiClient.get(path);
  return { data: map(res), source: 'api' };
}

export const getEvents = () => load(ENDPOINTS.events, demoEvents, (r) => unwrapList(r).map(normalizeEvent));
export const getExhibitors = () => load(ENDPOINTS.exhibitors, demoExhibitors, (r) => unwrapList(r).map(normalizeExhibitor));
export const getSessions = () => load(ENDPOINTS.sessions, demoSessions, (r) => unwrapList(r).map(normalizeSession));
export const getStats = () => load(ENDPOINTS.stats, demoStats, (r) => r.data);
export const getFloorPlan = () => load(ENDPOINTS.floorPlan, demoFloorPlan, (r) => unwrapOne(r));

export async function getEvent(id) {
  if (USE_DEMO_DATA) {
    const ev = demoEvents.find((e) => e.id === id);
    if (!ev) throw new Error('Event not found.');
    return { data: ev, source: 'demo' };
  }
  const res = await apiClient.get(ENDPOINTS.eventById(id));
  return { data: normalizeEvent(unwrapOne(res)), source: 'api' };
}
