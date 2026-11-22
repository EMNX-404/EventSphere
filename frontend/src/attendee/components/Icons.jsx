const base = { width: 18, height: 18, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.8, strokeLinecap: 'round', strokeLinejoin: 'round', 'aria-hidden': true };
export const Icon = {
  Bookmark: ({ filled, ...p }) => <svg {...base} {...p} fill={filled ? 'currentColor' : 'none'}><path d="M6 3h12v18l-6-4-6 4z" /></svg>,
  Search: (p) => <svg {...base} {...p}><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></svg>,
  Calendar: (p) => <svg {...base} {...p}><rect x="3" y="5" width="18" height="16" rx="1" /><path d="M3 10h18M8 3v4M16 3v4" /></svg>,
  Pin: (p) => <svg {...base} {...p}><path d="M12 21s7-6.2 7-12a7 7 0 1 0-14 0c0 5.8 7 12 7 12z" /><circle cx="12" cy="9" r="2.5" /></svg>,
  Clock: (p) => <svg {...base} {...p}><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg>,
  Arrow: (p) => <svg {...base} {...p}><path d="M5 12h14M13 6l6 6-6 6" /></svg>,
  Menu: (p) => <svg {...base} {...p}><path d="M4 7h16M4 12h16M4 17h16" /></svg>,
  Close: (p) => <svg {...base} {...p}><path d="M6 6l12 12M18 6 6 18" /></svg>,
  Mic: (p) => <svg {...base} {...p}><rect x="9" y="3" width="6" height="11" rx="3" /><path d="M5 11a7 7 0 0 0 14 0M12 18v3" /></svg>,
};
