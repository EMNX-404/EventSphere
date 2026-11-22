import { Link } from 'react-router-dom';
import { Icon } from './Icons';
import { fmtRange, FALLBACK_IMG } from '../utils/format';

export default function EventCard({ event, large }) {
  return (
    <Link to={`/events/${event.id}`} className={`es-ecard ${large ? 'es-ecard--lg' : ''}`}>
      <div className="es-ecard__img">
        <img src={event.image || FALLBACK_IMG} alt="" loading="lazy" onError={(e) => { e.currentTarget.src = FALLBACK_IMG; }} />
        <span className="es-tag">{event.category}</span>
      </div>
      <div className="es-ecard__body">
        <h3>{event.title}</h3>
        <p><Icon.Calendar /> {fmtRange(event.start, event.end)}</p>
        <p><Icon.Pin /> {[event.venue, event.city].filter(Boolean).join(', ')}</p>
        <span className="es-link">View details <Icon.Arrow /></span>
      </div>
    </Link>
  );
}
