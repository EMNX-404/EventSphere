import { Link } from 'react-router-dom';
import { getEvents, getExhibitors, getSessions, getStats } from '../services/attendeeService';
import useResource from '../hooks/useResource';
import EventCard from '../components/EventCard';
import ExhibitorCard from '../components/ExhibitorCard';
import SessionItem from '../components/SessionItem';
import Reveal from '../components/Reveal';
import { Icon } from '../components/Icons';
import { Loading, ErrorState, DemoNotice } from '../components/States';
import HeroStage from '../components/HeroStage';

const CATEGORIES = ['Technology', 'Business', 'Education', 'Innovation', 'Healthcare', 'Networking', 'Exhibitions'];

const byDate = (a, b) => (a.start || '').localeCompare(b.start || '');
const bySession = (a, b) => `${a.date} ${a.start}`.localeCompare(`${b.date} ${b.start}`);

export default function Home() {
  const events = useResource(getEvents);
  const exhibitors = useResource(getExhibitors);
  const sessions = useResource(getSessions);
  const stats = useResource(getStats);

  const list = [...(events.data || [])].sort(byDate);
  const next = list[0];
  const featured = list.slice(0, 6);
  const upcoming = [...(sessions.data || [])].sort(bySession).slice(0, 4);
  const titleOf = (id) => (events.data || []).find((e) => e.id === id)?.title;

  const s = stats.data;
  const statItems = [
    ['Upcoming events', s?.upcomingEvents ?? list.length],
    ['Exhibitors', s?.exhibitors ?? exhibitors.data?.length],
    ['Sessions', s?.sessions ?? sessions.data?.length],
    ['Attendees', s?.attendees],
  ];

  return (
    <>
      {/* HERO */}
      <section className="es-hero">
        <div className="es-wrap es-hero__grid">
          <div className="es-hero__copy">
            <h1>Where <em>Ideas</em> Meet <em>Experiences.</em></h1>
            <p>Discover inspiring events, connect with industry leaders and explore experiences that bring people together.</p>
            <div className="es-hero__cta">
              <Link to="/events" className="es-btn es-btn--orange es-btn--pill">Explore Events</Link>
              <Link to="/schedule" className="es-btn es-btn--outline es-btn--pill">View Schedule</Link>
            </div>
            {s?.attendees > 0 && (
              <div className="es-trust">
                <span className="es-trust__faces" aria-hidden="true"><i>AM</i><i>OS</i><i>ZA</i></span>
                <b>Trusted by {Math.round(s.attendees / 1000)}k+ attendees</b>
              </div>
            )}
          </div>
        </div>
        <HeroStage event={next} attendees={next?.attendees} />
      </section>

      {/* STATS */}
      <section className="es-stats">
        <div className="es-wrap">
          <dl>
            {statItems.map(([label, v]) => (
              <div key={label}><dt>{label}</dt><dd>{v != null ? Number(v).toLocaleString() : '—'}</dd></div>
            ))}
          </dl>
          <DemoNotice source={stats.source} />
        </div>
      </section>

      {/* FEATURED EVENTS */}
      <section className="es-section">
        <div className="es-wrap">
          <Reveal as="div" className="es-head">
            <h2>Featured events</h2>
            <Link to="/events" className="es-link">All events <Icon.Arrow /></Link>
          </Reveal>
          {events.loading ? <Loading label="Loading events" /> : events.error ? <ErrorState message={events.error} onRetry={events.retry} /> : (
            <div className="es-grid">{featured.map((e) => <EventCard key={e.id} event={e} />)}</div>
          )}
          <DemoNotice source={events.source} />
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="es-section es-section--dark">
        <div className="es-wrap">
          <Reveal as="div" className="es-head"><h2>Browse by category</h2></Reveal>
          <ul className="es-cats">
            {CATEGORIES.map((c) => (
              <li key={c}><Link to={`/events?category=${encodeURIComponent(c)}`}>{c}<Icon.Arrow /></Link></li>
            ))}
          </ul>
        </div>
      </section>

      {/* EXHIBITORS */}
      <section className="es-section">
        <div className="es-wrap">
          <Reveal as="div" className="es-head">
            <h2>Featured exhibitors</h2>
            <Link to="/exhibitors" className="es-link">All exhibitors <Icon.Arrow /></Link>
          </Reveal>
          {exhibitors.loading ? <Loading label="Loading exhibitors" /> : exhibitors.error ? <ErrorState message={exhibitors.error} onRetry={exhibitors.retry} /> : (
            <div className="es-grid es-grid--4">{exhibitors.data.slice(0, 4).map((x) => <ExhibitorCard key={x.id} exhibitor={x} />)}</div>
          )}
        </div>
      </section>

      {/* SESSIONS */}
      <section className="es-section es-section--soft">
        <div className="es-wrap es-narrow">
          <Reveal as="div" className="es-head"><h2>Upcoming sessions</h2><Link to="/schedule" className="es-link">My schedule <Icon.Arrow /></Link></Reveal>
          {sessions.loading ? <Loading label="Loading sessions" /> : sessions.error ? <ErrorState message={sessions.error} onRetry={sessions.retry} /> : (
            <ul className="es-sessions">
              {upcoming.map((x) => <SessionItem key={x.id} session={x} eventTitle={titleOf(x.eventId)} />)}
            </ul>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="es-cta">
        <div className="es-wrap">
          <h2>Your next event is already on the calendar.</h2>
          <p>Browse conferences, exhibitions and workshops, then save the sessions you want to attend.</p>
          <Link to="/events" className="es-btn es-btn--orange es-btn--lg">Explore Events</Link>
        </div>
      </section>
    </>
  );
}
