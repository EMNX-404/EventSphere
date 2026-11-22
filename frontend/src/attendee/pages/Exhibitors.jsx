import { useMemo, useState } from 'react';
import { getExhibitors } from '../services/attendeeService';
import useResource from '../hooks/useResource';
import ExhibitorCard from '../components/ExhibitorCard';
import { Icon } from '../components/Icons';
import { Loading, ErrorState, Empty, DemoNotice } from '../components/States';

export default function Exhibitors() {
  const { data, source, loading, error, retry } = useResource(getExhibitors);
  const [q, setQ] = useState('');
  const [industry, setIndustry] = useState('');

  const industries = useMemo(() => [...new Set((data || []).map((x) => x.industry))].sort(), [data]);
  const shown = useMemo(() => (data || []).filter((x) =>
    (!industry || x.industry === industry) &&
    (!q.trim() || `${x.name} ${x.description}`.toLowerCase().includes(q.trim().toLowerCase()))), [data, q, industry]);
  const reset = () => { setQ(''); setIndustry(''); };

  return (
    <main className="es-page">
      <header className="es-pagehead">
        <div className="es-wrap"><h1>Exhibitors</h1><p>Find the companies showing at EventSphere events.</p></div>
      </header>
      <div className="es-wrap">
        <div className="es-filters es-filters--2">
          <label className="es-search"><Icon.Search />
            <input type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search exhibitors" aria-label="Search exhibitors" />
          </label>
          <select value={industry} onChange={(e) => setIndustry(e.target.value)} aria-label="Industry">
            <option value="">All industries</option>
            {industries.map((i) => <option key={i}>{i}</option>)}
          </select>
        </div>
        {loading ? <Loading label="Loading exhibitors" /> : error ? <ErrorState message={error} onRetry={retry} /> : (
          <>
            <p className="es-count-line" aria-live="polite">{shown.length} {shown.length === 1 ? 'exhibitor' : 'exhibitors'}</p>
            {shown.length === 0
              ? <Empty title="No exhibitors found" text="Try another name or industry." action="Clear filters" onAction={reset} />
              : <div className="es-grid es-grid--4">{shown.map((x) => <ExhibitorCard key={x.id} exhibitor={x} />)}</div>}
          </>
        )}
        <DemoNotice source={source} />
      </div>
    </main>
  );
}
