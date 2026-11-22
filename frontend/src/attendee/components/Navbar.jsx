import { useEffect, useRef, useState } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { Icon } from './Icons';
import { useSchedule } from '../context/ScheduleContext';
import { useAuthStore } from '../../store/authStore';
import Orb from './Orb';

function getNavLinks(role) {
  if (role === 'attendee') {
    return [
      { to: '/', label: 'Home', end: true },
      { to: '/events', label: 'Explore Events' },
      { to: '/exhibitors', label: 'Exhibitors' },
      { to: '/schedule', label: 'My Schedule' },
      { to: '/floor-plan', label: 'Floor Plan' },
    ];
  }
  if (role === 'exhibitor') {
    return [
      { to: '/events', label: 'All Expos' },
      { to: '/floor-plan', label: 'Floor Plan' },
      { to: '/exhibitors', label: 'Exhibitors' },
      { to: '/contact', label: 'Contact' },
    ];
  }
  if (role === 'admin') {
    return [
      { to: '/events', label: 'All Expos' },
      { to: '/exhibitors', label: 'Exhibitors' },
      { to: '/floor-plan', label: 'Floor Plan' },
    ];
  }
  // Logged-out / public
  return [
    { to: '/', label: 'Home', end: true },
    { to: '/events', label: 'All Expos' },
    { to: '/exhibitors', label: 'Exhibitors' },
    { to: '/about', label: 'About' },
    { to: '/contact', label: 'Contact' },
  ];
}

function getInitials(user) {
  const src = user?.name || user?.email || 'U';
  return src
    .split(/\s+/)
    .slice(0, 2)
    .map((p) => p[0])
    .join('')
    .toUpperCase();
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  const { pathname } = useLocation();
  const { ids } = useSchedule();
  const { user, logout } = useAuthStore();

  const links = getNavLinks(user?.role);

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 24);
    on();
    window.addEventListener('scroll', on, { passive: true });
    return () => window.removeEventListener('scroll', on);
  }, []);

  useEffect(() => {
    setOpen(false);
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    // Clean reload clears all cached React contexts (including saved schedule state)
    window.location.assign('/');
  };

  return (
    <header className={`es-nav ${scrolled || open || pathname !== '/' ? 'is-solid' : ''}`}>
      <div className="es-nav__in">
        <Link to="/" className="es-logo" aria-label="EventSphere home">
          <Orb size={38} />
          <span>EventSphere</span>
        </Link>

        <nav className={`es-nav__links ${open ? 'is-open' : ''}`} aria-label="Main">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.end}
              className={({ isActive }) => (isActive ? 'is-active' : '')}
            >
              {l.label}
              {l.to === '/schedule' && ids.length > 0 && <b className="es-count">{ids.length}</b>}
            </NavLink>
          ))}

          {/* Mobile-only auth controls inside hamburger drawer */}
          <div className="es-nav__mobile-auth">
            {user ? (
              <>
                <span className="es-user__name">
                  {user.name} ({user.role})
                </span>
                <button type="button" className="es-btn-ghost" onClick={handleLogout}>
                  Log Out
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="es-btn-ghost" style={{ textAlign: 'center' }}>
                  Log In
                </Link>
                <Link to="/register" className="es-btn-primary" style={{ textAlign: 'center' }}>
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </nav>

        {/* Desktop auth actions */}
        <div className="es-nav__actions">
          {user ? (
            <div className="es-user" ref={menuRef}>
              <button
                type="button"
                className="es-user__btn"
                onClick={() => setMenuOpen((m) => !m)}
                aria-expanded={menuOpen}
              >
                <span className="es-user__avatar">{getInitials(user)}</span>
                <span>{user.name?.split(' ')[0] || 'Account'}</span>
              </button>

              {menuOpen && (
                <div className="es-user__menu" role="menu">
                  <div className="es-user__meta">
                    <span className="es-user__name">{user.name}</span>
                    <span className="es-user__role">{user.role}</span>
                  </div>

                  {user.role === 'attendee' && (
                    <Link to="/schedule" className="es-user__item" role="menuitem">
                      My Schedule ({ids.length})
                    </Link>
                  )}

                  <button
                    type="button"
                    className="es-user__item es-user__item--danger"
                    role="menuitem"
                    onClick={handleLogout}
                  >
                    Log Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link to="/login" className="es-btn-ghost">
                Log In
              </Link>
              <Link to="/register" className="es-btn-primary">
                Sign Up
              </Link>
            </>
          )}
        </div>

        <button
          className="es-nav__toggle"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          aria-label="Toggle menu"
        >
          {open ? <Icon.Close /> : <Icon.Menu />}
        </button>
      </div>
    </header>
  );
}