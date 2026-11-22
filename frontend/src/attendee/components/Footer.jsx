import { Link } from 'react-router-dom';
import Orb from './Orb';

export default function Footer() {
  return (
    <footer className="es-footer">
      <div className="es-wrap es-footer__grid">
        <div>
          <div className="es-logo"><Orb size={34} /><strong>EventSphere</strong></div>
          <p>One place to find events, meet exhibitors and plan your days on the floor.</p>
        </div>
        <div>
          <h4>Explore</h4>
          <Link to="/events">Explore Events</Link>
          <Link to="/exhibitors">Exhibitors</Link>
          <Link to="/schedule">My Schedule</Link>
          <Link to="/floor-plan">Floor Plan</Link>
        </div>
        <div>
          <h4>Platform</h4>
          <span>For attendees</span>
          <span>Events and sessions</span>
          <span>Exhibitor directory</span>
        </div>
        <div>
          <h4>Follow</h4>
          <a href="https://www.linkedin.com" target="_blank" rel="noreferrer">LinkedIn</a>
          <a href="https://x.com" target="_blank" rel="noreferrer">X</a>
          <a href="https://www.instagram.com" target="_blank" rel="noreferrer">Instagram</a>
        </div>
      </div>
      <div className="es-wrap es-footer__base">© {new Date().getFullYear()} EventSphere. All rights reserved.</div>
    </footer>
  );
}
