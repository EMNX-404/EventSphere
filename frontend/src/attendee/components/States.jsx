import { Link } from 'react-router-dom';

export const Loading = ({ label = 'Loading' }) => (
  <div className="es-state" role="status" aria-live="polite">
    <span className="es-spinner" />
    <p>{label}…</p>
  </div>
);

export const ErrorState = ({ message, onRetry }) => (
  <div className="es-state" role="alert">
    <h3>We couldn’t load this</h3>
    <p>{message}</p>
    {onRetry && <button className="es-btn es-btn--dark" onClick={onRetry}>Try again</button>}
  </div>
);

export const Empty = ({ title, text, action, to, onAction }) => (
  <div className="es-state">
    <h3>{title}</h3>
    {text && <p>{text}</p>}
    {action && (to ? <Link to={to} className="es-btn es-btn--orange">{action}</Link> : <button className="es-btn es-btn--dark" onClick={onAction}>{action}</button>)}
  </div>
);

export const DemoNotice = ({ source }) =>
  source === 'demo' ? <p className="es-demo">Demo data — sample content for the interface, not from the EventSphere backend.</p> : null;

export const SkeletonGrid = ({ n = 6 }) => (
  <div className="es-grid" aria-hidden="true">
    {Array.from({ length: n }).map((_, i) => <div key={i} className="es-skel" />)}
  </div>
);
