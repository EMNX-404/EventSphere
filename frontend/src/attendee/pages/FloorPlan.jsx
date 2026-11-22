import { useState } from 'react';
import { getFloorPlan, getExhibitors } from '../services/attendeeService';
import useResource from '../hooks/useResource';
import { Loading, ErrorState, DemoNotice } from '../components/States';

export default function FloorPlan() {
  const plan = useResource(getFloorPlan);
  const xs = useResource(getExhibitors);
  const [hallId, setHallId] = useState('');
  const [boothId, setBoothId] = useState('');

  const halls = plan.data?.halls || [];
  const hall = halls.find((h) => h.id === hallId) || halls[0];
  const exhibitor = (id) => (xs.data || []).find((x) => x.id === id);
  const booth = hall?.booths.find((b) => b.id === boothId);
  const bx = booth && exhibitor(booth.exhibitorId);

  return (
    <main className="es-page">
      <header className="es-pagehead">
        <div className="es-wrap"><h1>Floor plan</h1><p>Select a booth to see who is exhibiting there.</p></div>
      </header>
      <div className="es-wrap">
        {plan.loading ? <Loading label="Loading floor plan" /> : plan.error ? <ErrorState message={plan.error} onRetry={plan.retry} /> : !hall ? (
          <ErrorState message="No floor plan is available yet." />
        ) : (
          <>
            <div className="es-tabs" role="tablist" aria-label="Hall">
              {halls.map((h) => (
                <button key={h.id} role="tab" aria-selected={h.id === hall.id} className={h.id === hall.id ? 'is-active' : ''} onClick={() => { setHallId(h.id); setBoothId(''); }}>{h.name}</button>
              ))}
            </div>
            <div className="es-plan">
              <div className="es-plan__map">
                <svg viewBox="0 0 780 460" role="img" aria-label={`Floor plan of ${hall.name}`}>
                  <rect x="2" y="2" width="776" height="456" fill="none" stroke="currentColor" strokeOpacity=".25" strokeWidth="2" />
                  {(plan.data.landmarks || []).map((l) => (
                    <g key={l.label}><rect x={l.x} y={l.y} width={l.w} height={l.h} className="es-plan__land" />
                      <text x={l.x + l.w / 2} y={l.y + l.h / 2 + 5} textAnchor="middle" className="es-plan__lbl">{l.label}</text></g>
                  ))}
                  {hall.booths.map((b) => {
                    const taken = !!b.exhibitorId;
                    return (
                      <g key={b.id} tabIndex={0} role="button" aria-label={`Booth ${b.id}${taken ? `, ${exhibitor(b.exhibitorId)?.name || 'exhibitor'}` : ', available'}`}
                        className={`es-plan__booth ${taken ? 'is-taken' : ''} ${b.id === boothId ? 'is-sel' : ''}`}
                        onClick={() => setBoothId(b.id)} onKeyDown={(ev) => (ev.key === 'Enter' || ev.key === ' ') && setBoothId(b.id)}>
                        <rect x={b.x} y={b.y} width={b.w} height={b.h} />
                        <text x={b.x + b.w / 2} y={b.y + b.h / 2 + 5} textAnchor="middle">{b.id}</text>
                      </g>
                    );
                  })}
                </svg>
              </div>
              <aside className="es-plan__info" aria-live="polite">
                {!booth ? <p>Choose a booth on the map.</p> : bx ? (
                  <><small>Booth {booth.id}</small><h3>{bx.name}</h3><span className="es-tag es-tag--line">{bx.industry}</span><p>{bx.description}</p></>
                ) : (
                  <><small>Booth {booth.id}</small><h3>Not assigned</h3><p>No exhibitor is listed for this booth.</p></>
                )}
              </aside>
            </div>
          </>
        )}
        <DemoNotice source={plan.source} />
      </div>
    </main>
  );
}
