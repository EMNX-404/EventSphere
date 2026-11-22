import { Link } from 'react-router-dom';
import { Icon } from './Icons';
import { useSchedule } from '../context/ScheduleContext';
import { fmtDate } from '../utils/format';

export function BookmarkButton({ id, title }) {
  const { has, toggle } = useSchedule();
  const saved = has(id);
  return (
    <button
      className={`es-bm ${saved ? 'is-saved' : ''}`}
      onClick={() => toggle(id)}
      aria-pressed={saved}
      aria-label={`${saved ? 'Remove from schedule' : 'Save to schedule'}: ${title}`}
      title={saved ? 'Remove from schedule' : 'Save to schedule'}
    >
      <Icon.Bookmark filled={saved} />
    </button>
  );
}

/** variant: 'row' (timeline / lists) */
export default function SessionItem({ session: s, eventTitle, showDate = true, showEventLink = true, removeLabel }) {
  const { remove } = useSchedule();
  return (
    <li className="es-session">
      <div className="es-session__time">
        <strong>{s.start}</strong>
        {s.end && <span>{s.end}</span>}
      </div>
      <div className="es-session__main">
        <h4>{s.title}</h4>
        <p className="es-meta">
          <span><Icon.Mic /> {s.speaker?.name}{s.speaker?.role ? `, ${s.speaker.role}` : ''}{s.speaker?.company ? ` · ${s.speaker.company}` : ''}</span>
          {showDate && s.date && <span><Icon.Calendar /> {fmtDate(s.date)}</span>}
          {s.room && <span><Icon.Pin /> {s.room}</span>}
        </p>
        {eventTitle && showEventLink && <Link to={`/events/${s.eventId}`} className="es-link">{eventTitle} <Icon.Arrow /></Link>}
      </div>
      {removeLabel
        ? <button className="es-btn es-btn--line" onClick={() => remove(s.id)}>{removeLabel}</button>
        : <BookmarkButton id={s.id} title={s.title} />}
    </li>
  );
}
