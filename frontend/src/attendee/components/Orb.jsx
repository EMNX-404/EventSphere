import { useId } from 'react';

/** EventSphere brand orb — original SVG, orange only. */
export default function Orb({ size = 40, className = '' }) {
  const id = useId().replace(/:/g, '');
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 100 100" aria-hidden="true">
      <defs>
        <radialGradient id={`o${id}`} cx="35%" cy="30%" r="80%">
          <stop offset="0" stopColor="#ffc38a" />
          <stop offset=".35" stopColor="#f66e02" />
          <stop offset="1" stopColor="#8a2f00" />
        </radialGradient>
        <clipPath id={`c${id}`}><circle cx="50" cy="50" r="48" /></clipPath>
      </defs>
      <circle cx="50" cy="50" r="48" fill={`url(#o${id})`} />
      <g clipPath={`url(#c${id})`}>
        <ellipse cx="30" cy="70" rx="46" ry="22" fill="#ffb36b" opacity=".55" transform="rotate(-35 30 70)" />
        <ellipse cx="72" cy="30" rx="40" ry="16" fill="#3a1200" opacity=".55" transform="rotate(30 72 30)" />
        <ellipse cx="58" cy="62" rx="34" ry="12" fill="#fff" opacity=".3" transform="rotate(-20 58 62)" />
        <ellipse cx="40" cy="36" rx="26" ry="9" fill="#a83c00" opacity=".6" transform="rotate(50 40 36)" />
        <ellipse cx="66" cy="78" rx="30" ry="8" fill="#3a1200" opacity=".5" transform="rotate(-50 66 78)" />
      </g>
      <circle cx="50" cy="50" r="48" fill="none" stroke="#fff" strokeOpacity=".25" strokeWidth="1.5" />
    </svg>
  );
}
