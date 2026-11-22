import { createContext, useContext, useEffect, useMemo, useRef, useState, useCallback } from 'react';
import { USE_DEMO_DATA } from '../services/apiClient';
import { getBookmarks, toggleBookmarkSession } from '../services/attendeeService';

const KEY = 'eventsphere:attendee:saved-sessions';
const Ctx = createContext(null);

const readLocal = () => {
  try {
    const v = JSON.parse(localStorage.getItem(KEY) || '[]');
    return Array.isArray(v) ? v.map(String) : [];
  } catch {
    return [];
  }
};

const canUseApi = () => !USE_DEMO_DATA && Boolean(localStorage.getItem('token'));

export function ScheduleProvider({ children }) {
  const [ids, setIds] = useState(readLocal);
  const idsRef = useRef(ids);
  idsRef.current = ids;

  // Load saved bookmarks from MongoDB when logged in
  const refresh = useCallback(async () => {
    if (!canUseApi()) return;
    try {
      const { data } = await getBookmarks();
      setIds(data);
    } catch (err) {
      // If 401/403 (e.g. expired token or admin/exhibitor role), keep local state quietly
      console.warn('Could not sync bookmarks from API:', err?.response?.data?.message || err.message);
    }
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify(ids));
    } catch {
      /* storage unavailable */
    }
  }, [ids]);

  const toggle = useCallback(async (id) => {
    const sid = String(id);
    const prev = idsRef.current;
    const next = prev.includes(sid) ? prev.filter((x) => x !== sid) : [...prev, sid];

    // Update UI immediately
    setIds(next);

    if (!canUseApi()) return;

    try {
      const { data } = await toggleBookmarkSession(sid);
      if (Array.isArray(data)) setIds(data);
    } catch (err) {
      // Revert if the backend rejects the request
      setIds(prev);
      console.error('Failed to update bookmark:', err?.response?.data?.message || err.message);
    }
  }, []);

  const remove = useCallback(async (id) => {
    const sid = String(id);
    const prev = idsRef.current;
    if (!prev.includes(sid)) return; // Prevent toggle route from accidentally re-adding

    const next = prev.filter((x) => x !== sid);
    setIds(next);

    if (!canUseApi()) return;

    try {
      const { data } = await toggleBookmarkSession(sid);
      if (Array.isArray(data)) setIds(data);
    } catch (err) {
      setIds(prev);
      console.error('Failed to remove bookmark:', err?.response?.data?.message || err.message);
    }
  }, []);

  const value = useMemo(
    () => ({
      ids,
      toggle,
      remove,
      refresh,
      has: (id) => ids.includes(String(id)),
    }),
    [ids, toggle, remove, refresh]
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export const useSchedule = () => {
  const c = useContext(Ctx);
  if (!c) throw new Error('useSchedule must be used inside <ScheduleProvider>');
  return c;
};