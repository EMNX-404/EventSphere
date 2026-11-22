import { useEffect, useState } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { Icon } from './Icons';
import { useSchedule } from '../context/ScheduleContext';
import Orb from './Orb';

const links = [
  { to: '/', label: 'Home', end: true },
  { to: '/events', label: 'Explore Events' },
  { to: '/exhibitors', label: 'Exhibitors' },
  { to: '/schedule', label: 'My Schedule' },
  { to: '/floor-plan', label: 'Floor Plan' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const { ids } = useSchedule();

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 24);
    on();
    window.addEventListener('scroll', on, { passive: true });
    return () => window.removeEventListener('scroll', on);
  }, []);
  useEffect(() => { setOpen(false); }, [pathname]);

  return (
    <header className={`es-nav ${scrolled || open || pathname !== '/' ? 'is-solid' : ''}`}>
      <div className="es-nav__in">
        <Link to="/" className="es-logo" aria-label="EventSphere home">
          <Orb size={38} /><span>EventSphere</span>
        </Link>
        <nav className={`es-nav__links ${open ? 'is-open' : ''}`} aria-label="Main">
          {links.map((l) => (
            <NavLink key={l.to} to={l.to} end={l.end} className={({ isActive }) => (isActive ? 'is-active' : '')}>
              {l.label}
              {l.to === '/schedule' && ids.length > 0 && <b className="es-count">{ids.length}</b>}
            </NavLink>
          ))}
        </nav>
        <button className="es-nav__toggle" onClick={() => setOpen((o) => !o)} aria-expanded={open} aria-label="Toggle menu">
          {open ? <Icon.Close /> : <Icon.Menu />}
        </button>
      </div>
    </header>
  );
}
