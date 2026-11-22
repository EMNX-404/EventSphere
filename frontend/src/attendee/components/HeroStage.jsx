import { Link } from 'react-router-dom';
import Orb from './Orb';
import { fmtRange } from '../utils/format';

/** Monitor on a rock: pure SVG + CSS, no image files. `event` is the next upcoming event. */
export default function HeroStage({ event, attendees }) {
  return (
    <div className="es-stage" aria-label="Featured event">
      <svg className="es-stage__rock" viewBox="0 0 900 330" preserveAspectRatio="none" aria-hidden="true">
        <defs>
          <linearGradient id="rk" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#2a1608" /><stop offset=".35" stopColor="#0c0805" /><stop offset="1" stopColor="#000" />
          </linearGradient>
          <linearGradient id="rim" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#f66e02" stopOpacity="0" /><stop offset=".3" stopColor="#f66e02" /><stop offset="1" stopColor="#ffb36b" />
          </linearGradient>
          <linearGradient id="glow" x1="0" y1="1" x2="0" y2="0">
            <stop offset="0" stopColor="#f66e02" stopOpacity=".95" /><stop offset=".6" stopColor="#f66e02" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d="M0 120 L70 96 L150 108 L240 70 L330 84 L420 52 L520 70 L610 40 L700 62 L790 34 L900 58 L900 330 L0 330z" fill="url(#rk)" />
        <path d="M0 120 L70 96 L150 108 L240 70 L330 84 L420 52 L520 70 L610 40 L700 62 L790 34 L900 58" fill="none" stroke="url(#rim)" strokeWidth="3" />
        <g stroke="#f66e02" strokeOpacity=".22" strokeWidth="1.5" fill="none">
          <path d="M120 130 L160 190 L130 260" /><path d="M300 110 L340 180 L310 250 L350 310" /><path d="M520 100 L490 170 L540 240" />
          <path d="M680 90 L720 160 L690 230 L740 300" /><path d="M820 80 L790 150 L830 220" /><path d="M210 150 L240 220" />
        </g>
        <rect y="0" width="900" height="330" fill="url(#glow)" />
      </svg>

      <div className="es-mon">
        <div className="es-mon__bezel">
          <div className="es-mon__screen">
            <div className="es-mon__logo"><Orb size={64} /><i /><span>ES</span></div>
          </div>
        </div>
        <div className="es-mon__stand" />
      </div>

      <div className="es-stage__chip">
        <span className="es-stage__dot" />
        <div><b>{attendees ? `${attendees.toLocaleString()}` : '—'}</b><small>attendees expected</small></div>
      </div>

      {event && (
        <Link to={`/events/${event.id}`} className="es-stage__glass">
          <span className="es-tag">Next up</span>
          <strong>{event.title}</strong>
          <small>{fmtRange(event.start, event.end)} · {[event.city || event.venue].filter(Boolean).join('')}</small>
        </Link>
      )}
    </div>
  );
}
