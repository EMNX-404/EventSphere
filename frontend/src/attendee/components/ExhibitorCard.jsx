import { initials } from '../utils/format';

export default function ExhibitorCard({ exhibitor: x }) {
  return (
    <article className="es-xcard">
      {x.logo ? <img className="es-xcard__logo" src={x.logo} alt={`${x.name} logo`} loading="lazy" />
        : <div className="es-xcard__logo es-xcard__logo--mono" aria-hidden="true">{initials(x.name)}</div>}
      <h3>{x.name}</h3>
      <span className="es-tag es-tag--line">{x.industry}</span>
      <p>{x.description}</p>
      {x.booth && <small>Booth {x.booth}</small>}
    </article>
  );
}
