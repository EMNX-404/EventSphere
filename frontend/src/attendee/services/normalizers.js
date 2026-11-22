/**
 * Maps backend documents into the shapes the UI uses (see data/demoData.js).
 * Adjust the field names below to match the real backend models.
 * Each mapper accepts common alternative field names so small differences do not break the UI.
 */
const pick = (o, keys, d = '') => {
  for (const k of keys) if (o?.[k] !== undefined && o?.[k] !== null && o?.[k] !== '') return o[k];
  return d;
};
const day = (v) => (v ? String(v).slice(0, 10) : '');

export const unwrapList = (res) => {
  const d = res?.data;
  if (Array.isArray(d)) return d;
  for (const k of ['data', 'events', 'exhibitors', 'sessions', 'items', 'results'])
    if (Array.isArray(d?.[k])) return d[k];
  return [];
};
export const unwrapOne = (res) => res?.data?.data ?? res?.data?.event ?? res?.data;

export const normalizeEvent = (e) => ({
  id: String(pick(e, ['id', '_id'])),
  title: pick(e, ['title', 'name', 'eventName']),
  type: pick(e, ['type', 'eventType'], 'Conference'),
  category: pick(e, ['category'], 'General'),
  start: day(pick(e, ['start', 'startDate', 'date'])),
  end: day(pick(e, ['end', 'endDate', 'startDate', 'date'])),
  venue: pick(e, ['venue', 'location']),
  city: pick(e, ['city'], ''),
  image: pick(e, ['image', 'imageUrl', 'banner', 'thumbnail'], ''),
  attendees: pick(e, ['attendees', 'attendeeCount'], 0),
  description: pick(e, ['description', 'summary']),
  about: pick(e, ['about', 'description']),
  highlights: pick(e, ['highlights'], []),
  exhibitorIds: (pick(e, ['exhibitorIds', 'exhibitors'], []) || []).map((x) => String(x?._id || x?.id || x)),
});

export const normalizeExhibitor = (x) => ({
  id: String(pick(x, ['id', '_id'])),
  name: pick(x, ['name', 'companyName']),
  industry: pick(x, ['industry', 'category'], 'General'),
  description: pick(x, ['description', 'about']),
  logo: pick(x, ['logo', 'logoUrl'], ''),
  booth: pick(x, ['booth', 'boothNumber'], ''),
});

export const normalizeSession = (s) => {
  const sp = s?.speaker;
  return {
    id: String(pick(s, ['id', '_id'])),
    eventId: String(pick(s, ['eventId', 'event'], '')?._id || pick(s, ['eventId', 'event'], '')),
    title: pick(s, ['title', 'name']),
    date: day(pick(s, ['date', 'startDate', 'start'])),
    start: pick(s, ['startTime', 'start_time', 'from'], ''),
    end: pick(s, ['endTime', 'end_time', 'to'], ''),
    room: pick(s, ['room', 'location', 'venue'], ''),
    description: pick(s, ['description'], ''),
    speaker: typeof sp === 'string' ? { name: sp, role: '', company: '' }
      : { name: sp?.name || pick(s, ['speakerName'], 'To be announced'), role: sp?.role || '', company: sp?.company || '' },
  };
};
