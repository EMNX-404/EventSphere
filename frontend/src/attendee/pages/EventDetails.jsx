import { useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getEvent, getEvents, getExhibitors, getSessions } from '../services/attendeeService';
import useResource from '../hooks/useResource';
import SessionItem from '../components/SessionItem';
import ExhibitorCard from '../components/ExhibitorCard';
import EventCard from '../components/EventCard';
import { Icon } from '../components/Icons';
import { Loading, ErrorState, Empty, DemoNotice } from '../components/States';
import { fmtDate, fmtRange, initials, FALLBACK_IMG } from '../utils/format';

export default function EventDetails() {
  const { id } = useParams();
  const ev = useResource(() => getEvent(id), [id]);
  const sessions = useResource(getSessions);
  const exhibitors = useResource(getExhibitors);
  const events = useResource(getEvents);

  const e = ev.data;
  const mine = useMemo(() => (sessions.data || []).filter((s) => s.eventId === id)
    .sort((a, b) => `${a.date} ${a.start}`.localeCompare(`${b.date} ${b.start}`)), [sessions.data, id]);
  const days = useMemo(() => {
    const m = new Map();
    mine.forEach((s) => m.set(s.date, [...(m.get(s.date) || []), s]));
    return [...m.entries()];
  }, [mine]);
  const speakers = useMemo(() => {
    const m = new Map();
    mine.forEach((s) => s.speaker?.name && !m.has(s.speaker.name) && m.set(s.speaker.name, s.speaker));
    return [...m.values()];
  }, [mine]);
  const related = useMemo(() => (exhibitors.data || []).filter((x) => e?.exhibitorIds?.includes(x.id)), [exhibitors.data, e]);
  const otherEvents = useMemo(() => (events.data || []).filter((x) => x.id !== id && e && (x.category === e.category || x.type === e.type)).slice(0, 3), [events.data, id, e]);

  if (ev.loading) return <main className="es-page"><Loading label="Loading event" /></main>;
  if (ev.error) return (
    <main className="es-page"><div className="es-wrap">
      <ErrorState message={ev.error} onRetry={ev.retry} />
      <p style={{ textAlign: 'center' }}><Link to="/events" className="es-link">Back to all events</Link></p>
    </div></main>
  );

  return (
    <main className="es-page es-page--flush">
      <section className="es-banner">
        <img src={e.image || FALLBACK_IMG} alt="" onError={(x) => { x.currentTarget.src = FALLBACK_IMG; }} />
        <div className="es-banner__shade" />
        <div className="es-wrap es-banner__in">
          <Link to="/events" className="es-back">← All events</Link>
          <span className="es-tag">{e.category}</span>
          <h1>{e.title}</h1>
          <p className="es-meta es-meta--light">
            <span><Icon.Calendar /> {fmtRange(e.start, e.end)}</span>
            <span><Icon.Pin /> {[e.venue, e.city].filter(Boolean).join(', ')}</span>
            <span>{e.type}</span>
          </p>
        </div>
      </section>

      <div className="es-wrap es-detail">
        <div className="es-detail__main">
          <section>
            <h2>About this event</h2>
            <p className="es-lead">{e.description}</p>
            {e.about && e.about !== e.description && <p>{e.about}</p>}
          </section>

          {e.highlights?.length > 0 && (
            <section>
              <h2>Highlights</h2>
              <ul className="es-highlights">{e.highlights.map((h) => <li key={h}>{h}</li>)}</ul>
            </section>
          )}

          <section>
            <h2>Session schedule</h2>
            {sessions.loading ? <Loading label="Loading sessions" /> : sessions.error ? <ErrorState message={sessions.error} onRetry={sessions.retry} /> :
              days.length === 0 ? <Empty title="No sessions published yet" text="Check back closer to the event date." /> :
                days.map(([d, list]) => (
                  <div key={d} className="es-day">
                    <h3>{fmtDate(d, { weekday: 'long', day: 'numeric', month: 'long' })}</h3>
                    <ul className="es-sessions es-sessions--timeline">
                      {list.map((s) => <SessionItem key={s.id} session={s} showDate={false} showEventLink={false} />)}
                    </ul>
                  </div>
                ))}
          </section>

          {speakers.length > 0 && (
            <section>
              <h2>Speakers</h2>
              <ul className="es-speakers">
                {speakers.map((s) => (
                  <li key={s.name}><span className="es-avatar" aria-hidden="true">{initials(s.name)}</span>
                    <div><strong>{s.name}</strong><small>{[s.role, s.company].filter(Boolean).join(', ')}</small></div></li>
                ))}
              </ul>
            </section>
          )}
        </div>

        <aside className="es-detail__side">
          <div className="es-facts">
            <h3>Event details</h3>
            <dl>
              <dt>Date</dt><dd>{fmtRange(e.start, e.end)}</dd>
              <dt>Venue</dt><dd>{e.venue}</dd>
              {e.city && <><dt>City</dt><dd>{e.city}</dd></>}
              <dt>Type</dt><dd>{e.type}</dd>
              <dt>Sessions</dt><dd>{mine.length}</dd>
            </dl>
            <Link to="/schedule" className="es-btn es-btn--orange">View my schedule</Link>
          </div>
        </aside>
      </div>

      {related.length > 0 && (
        <section className="es-section es-section--soft">
          <div className="es-wrap">
            <div className="es-head"><h2>Exhibitors at this event</h2><Link to="/exhibitors" className="es-link">All exhibitors <Icon.Arrow /></Link></div>
            <div className="es-grid es-grid--4">{related.map((x) => <ExhibitorCard key={x.id} exhibitor={x} />)}</div>
          </div>
        </section>
      )}

      {otherEvents.length > 0 && (
        <section className="es-section">
          <div className="es-wrap">
            <div className="es-head"><h2>Related events</h2></div>
            <div className="es-grid">{otherEvents.map((x) => <EventCard key={x.id} event={x} />)}</div>
          </div>
        </section>
      )}
      <div className="es-wrap"><DemoNotice source={ev.source} /></div>
    </main>
  );
}
