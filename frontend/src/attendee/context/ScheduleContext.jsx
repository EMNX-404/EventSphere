import { createContext, useContext, useEffect, useMemo, useState, useCallback } from 'react';

/**
 * Frontend-only bookmarks. Saved session IDs live in React state and LocalStorage.
 * This is NOT a backend database and is not tied to any account.
 * If the backend adds a bookmark API, swap the add/remove calls for service calls here.
 */
const KEY = 'eventsphere:attendee:saved-sessions';
const Ctx = createContext(null);

const read = () => {
  try { const v = JSON.parse(localStorage.getItem(KEY) || '[]'); return Array.isArray(v) ? v : []; }
  catch { return []; }
};

export function ScheduleProvider({ children }) {
  const [ids, setIds] = useState(read);

  useEffect(() => {
    try { localStorage.setItem(KEY, JSON.stringify(ids)); } catch { /* storage unavailable */ }
  }, [ids]);

  const toggle = useCallback((id) => setIds((p) => (p.includes(id) ? p.filter((x) => x !== id) : [...p, id])), []);
  const remove = useCallback((id) => setIds((p) => p.filter((x) => x !== id)), []);
  const value = useMemo(() => ({ ids, toggle, remove, has: (id) => ids.includes(id) }), [ids, toggle, remove]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export const useSchedule = () => {
  const c = useContext(Ctx);
  if (!c) throw new Error('useSchedule must be used inside <ScheduleProvider>');
  return c;
};
