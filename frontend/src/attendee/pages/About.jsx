import { Link } from 'react-router-dom';

export default function About() {
  return (
    <main className="es-page-wrap">
      <section className="es-static-hero">
        <span className="es-kicker">About EventSphere</span>
        <h1>
          One platform built for <span>live expos</span> and real-time connections.
        </h1>
        <p>
          EventSphere brings organizers, exhibitors, and attendees onto a single live workspace—from
          interactive booth reservations to personalized session schedules.
        </p>
      </section>

      <section className="es-pillars" aria-label="Platform capabilities">
        <article className="es-pillar">
          <span className="es-pillar__num">01 / ATTENDEES</span>
          <h2>Curate your expo schedule</h2>
          <p>
            Browse upcoming conferences and exhibitions, explore speakers and sessions, and bookmark
            your personal agenda synced across devices.
          </p>
        </article>

        <article className="es-pillar">
          <span className="es-pillar__num">02 / EXHIBITORS</span>
          <h2>Reserve booths in real time</h2>
          <p>
            Manage your company showcase profile and claim available floor plan booths with instant
            live availability updates.
          </p>
        </article>

        <article className="es-pillar">
          <span className="es-pillar__num">03 / ORGANIZERS</span>
          <h2>Run multi-track events smoothly</h2>
          <p>
            Publish schedules, approve incoming exhibitor applications, and monitor hall capacity
            from one centralized control panel.
          </p>
        </article>
      </section>

      <div className="es-cta-row">
        <Link to="/events" className="es-btn-primary">
          Explore Events
        </Link>
        <Link to="/register" className="es-btn-ghost">
          Join as Attendee or Exhibitor
        </Link>
      </div>
    </main>
  );
}