import { useMemo } from 'react';
import { getEvents, getSessions } from '../services/attendeeService';
import useResource from '../hooks/useResource';
import { useSchedule } from '../context/ScheduleContext';
import SessionItem from '../components/SessionItem';
import { Loading, ErrorState, Empty, DemoNotice } from '../components/States';
import { fmtDate } from '../utils/format';

export default function MySchedule() {
  const { ids } = useSchedule();
  const sessions = useResource(getSessions);
  const events = useResource(getEvents);

  const saved = useMemo(() => (sessions.data || []).filter((s) => ids.includes(s.id))
    .sort((a, b) => `${a.date} ${a.start}`.localeCompare(`${b.date} ${b.start}`)), [sessions.data, ids]);
  const days = useMemo(() => {
    const m = new Map();
    saved.forEach((s) => m.set(s.date, [...(m.get(s.date) || []), s]));
    return [...m.entries()];
  }, [saved]);
  const titleOf = (eid) => (events.data || []).find((e) => e.id === eid)?.title;

  return (
    <main className="es-page">
      <header className="es-pagehead">
        <div className="es-wrap">
          <h1>My schedule</h1>
          <p>Sessions you’ve saved, grouped by day. Saved on this device only.</p>
        </div>
      </header>
      <div className="es-wrap es-narrow">
        {sessions.loading ? <Loading label="Loading your schedule" /> : sessions.error ? <ErrorState message={sessions.error} onRetry={sessions.retry} /> :
          saved.length === 0 ? (
            <Empty title="You haven’t saved any sessions yet" text="Save sessions from an event page and they’ll appear here." action="Explore Events" to="/events" />
          ) : (
            <>
              <p className="es-count-line" aria-live="polite">{saved.length} saved {saved.length === 1 ? 'session' : 'sessions'}</p>
              {days.map(([d, list]) => (
                <section key={d} className="es-day">
                  <h2>{fmtDate(d, { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}</h2>
                  <ul className="es-sessions es-sessions--timeline">
                    {list.map((s) => <SessionItem key={s.id} session={s} eventTitle={titleOf(s.eventId)} showDate={false} removeLabel="Remove" />)}
                  </ul>
                </section>
              ))}
            </>
          )}
        <DemoNotice source={sessions.source} />
      </div>
    </main>
  );
}
