import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getEvents, getExhibitors } from '../services/attendeeService';
import useResource from '../hooks/useResource';
import EventCard from '../components/EventCard';
import { Icon } from '../components/Icons';
import { Loading, ErrorState, Empty, DemoNotice, SkeletonGrid } from '../components/States';

const TYPES = [['', 'All Events'], ['Conference', 'Conferences'], ['Exhibition', 'Exhibitions'], ['Workshop', 'Workshops'], ['Networking', 'Networking']];
const CATEGORIES = ['Technology', 'Business', 'Education', 'Innovation', 'Healthcare', 'Networking', 'Exhibitions'];
const DATES = [['', 'Any date'], ['30', 'Next 30 days'], ['90', 'Next 90 days'], ['180', 'Next 6 months']];
const iso = (d) => d.toISOString().slice(0, 10);

export default function Explore() {
  const [params, setParams] = useSearchParams();
  const q = params.get('q') || '';
  const type = params.get('type') || '';
  const category = params.get('category') || '';
  const within = params.get('within') || '';
  const from = params.get('from') || '';

  const events = useResource(getEvents);
  const exhibitors = useResource(getExhibitors);

  const set = (k, v) => {
    const n = new URLSearchParams(params);
    v ? n.set(k, v) : n.delete(k);
    setParams(n, { replace: true });
  };
  const clear = () => setParams({}, { replace: true });

  const results = useMemo(() => {
    const all = events.data || [];
    const xs = exhibitors.data || [];
    const term = q.trim().toLowerCase();
    const today = iso(new Date());
    const limit = within ? iso(new Date(Date.now() + Number(within) * 86400000)) : '';

    return all
      .filter((e) => {
        if (term) {
          const byName = e.title.toLowerCase().includes(term);
          const byExhibitor = (e.exhibitorIds || []).some((id) => xs.find((x) => x.id === id)?.name.toLowerCase().includes(term));
          if (!byName && !byExhibitor) return false;
        }
        if (type && e.type !== type) return false;
        if (category && e.category !== category) return false;
        if (within && !(e.end >= today && e.start <= limit)) return false;
        if (from && e.end < from) return false;
        return true;
      })
      .sort((a, b) => a.start.localeCompare(b.start));
  }, [events.data, exhibitors.data, q, type, category, within, from]);

  const active = [
    q && ['q', `Search: “${q}”`],
    type && ['type', type],
    category && ['category', category],
    within && ['within', DATES.find((d) => d[0] === within)?.[1]],
    from && ['from', `From ${from}`],
  ].filter(Boolean);

  return (
    <main className="es-page">
      <header className="es-pagehead">
        <div className="es-wrap">
          <h1>Explore events</h1>
          <p>Search by event or exhibitor name, then narrow by type, category and date.</p>
        </div>
      </header>

      <div className="es-wrap">
        <div className="es-tabs" role="tablist" aria-label="Event type">
          {TYPES.map(([v, label]) => (
            <button key={label} role="tab" aria-selected={type === v} className={type === v ? 'is-active' : ''} onClick={() => set('type', v)}>{label}</button>
          ))}
        </div>

        <div className="es-filters">
          <label className="es-search">
            <Icon.Search />
            <input type="search" value={q} onChange={(e) => set('q', e.target.value)} placeholder="Search events or exhibitors" aria-label="Search events or exhibitors" />
          </label>
          <select value={category} onChange={(e) => set('category', e.target.value)} aria-label="Category">
            <option value="">All categories</option>
            {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
          </select>
          <select value={within} onChange={(e) => set('within', e.target.value)} aria-label="Date range">
            {DATES.map(([v, l]) => <option key={l} value={v}>{l}</option>)}
          </select>
          <input type="date" value={from} onChange={(e) => set('from', e.target.value)} aria-label="On or after date" />
        </div>

        {active.length > 0 && (
          <div className="es-chips">
            {active.map(([k, label]) => (
              <button key={k} className="es-chip" onClick={() => set(k, '')} aria-label={`Remove filter ${label}`}>{label} <Icon.Close width={14} height={14} /></button>
            ))}
            <button className="es-link es-link--btn" onClick={clear}>Clear filters</button>
          </div>
        )}

        {events.loading ? <><Loading label="Loading events" /><SkeletonGrid /></> :
          events.error ? <ErrorState message={events.error} onRetry={events.retry} /> : (
            <>
              <p className="es-count-line" aria-live="polite">{results.length} {results.length === 1 ? 'event' : 'events'} found</p>
              {results.length === 0
                ? <Empty title="No events match these filters" text="Try a different search or remove a filter." action="Clear filters" onAction={clear} />
                : <div className="es-grid">{results.map((e) => <EventCard key={e.id} event={e} />)}</div>}
            </>
          )}
        <DemoNotice source={events.source} />
      </div>
    </main>
  );
}
