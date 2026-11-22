const toDate = (iso) => new Date(iso && iso.length === 10 ? iso + 'T00:00:00' : iso);

export const fmtDate = (iso, opts = { day: 'numeric', month: 'short', year: 'numeric' }) =>
  iso ? toDate(iso).toLocaleDateString('en-GB', opts) : '';

export const fmtRange = (start, end) => {
  if (!start) return '';
  if (!end || end === start) return fmtDate(start);
  const s = toDate(start), e = toDate(end);
  if (s.getMonth() === e.getMonth() && s.getFullYear() === e.getFullYear())
    return `${s.getDate()}–${e.getDate()} ${s.toLocaleDateString('en-GB', { month: 'short', year: 'numeric' })}`;
  return `${fmtDate(start)} – ${fmtDate(end)}`;
};

export const initials = (name = '') =>
  name.split(' ').filter(Boolean).slice(0, 2).map((w) => w[0]).join('').toUpperCase();

export const FALLBACK_IMG =
  'data:image/svg+xml;utf8,' +
  encodeURIComponent(
    "<svg xmlns='http://www.w3.org/2000/svg' width='800' height='600'><rect width='100%' height='100%' fill='#111'/><circle cx='640' cy='140' r='90' fill='#f66e02' opacity='.85'/></svg>"
  );
