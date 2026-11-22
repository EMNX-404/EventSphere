const pick = (o, keys, d = '') => {
  for (const k of keys) {
    if (o?.[k] !== undefined && o?.[k] !== null && o?.[k] !== '') return o[k];
  }
  return d;
};

const day = (v) => (v ? String(v).slice(0, 10) : '');

const formatTime = (v) => {
  if (!v) return '';
  const str = String(v);
  if (!str.includes('T') && str.length <= 10) return str;
  const d = new Date(v);
  if (Number.isNaN(d.getTime())) return str;
  const hh = String(d.getHours()).padStart(2, '0');
  const mm = String(d.getMinutes()).padStart(2, '0');
  return `${hh}:${mm}`;
};

export const unwrapList = (res) => {
  const d = res?.data;
  if (Array.isArray(d)) return d;
  for (const k of ['data', 'events', 'exhibitors', 'sessions', 'users', 'items', 'results']) {
    if (Array.isArray(d?.[k])) return d[k];
  }
  return [];
};

export const unwrapOne = (res) => res?.data?.data ?? res?.data?.event ?? res?.data;

export const normalizeEvent = (e) => {
  const loc = pick(e, ['venue', 'location'], '');
  const parts = loc.split(',').map((p) => p.trim()).filter(Boolean);
  const hasExplicitCity = Boolean(e?.city);
  const derivedCity = !hasExplicitCity && parts.length > 1 ? parts[parts.length - 1] : '';
  const derivedVenue = !hasExplicitCity && parts.length > 1 ? parts.slice(0, -1).join(', ') : loc;

  return {
    id: String(pick(e, ['id', '_id'])),
    title: pick(e, ['title', 'name', 'eventName']),
    type: pick(e, ['type', 'eventType'], 'Expo'),
    category: pick(e, ['theme', 'category'], 'General'),
    start: day(pick(e, ['start', 'startDate', 'date'])),
    end: day(pick(e, ['end', 'endDate', 'startDate', 'date'])),
    venue: derivedVenue,
    city: pick(e, ['city'], derivedCity),
    image: pick(e, ['image', 'imageUrl', 'banner', 'thumbnail'], ''),
    attendees: pick(e, ['attendees', 'attendeeCount'], 0),
    description: pick(e, ['description', 'summary']),
    about: pick(e, ['about', 'description']),
    highlights: pick(e, ['highlights'], []),
    exhibitorIds: (pick(e, ['exhibitorIds', 'exhibitors'], []) || []).map((x) =>
      String(x?._id || x?.id || x)
    ),
  };
};

export const normalizeExhibitor = (x) => ({
  id: String(pick(x, ['id', '_id'])),
  name: pick(x, ['companyName', 'name']),
  industry: pick(x, ['industry', 'category'], 'Exhibitor'),
  description: pick(x, ['companyDescription', 'description', 'about']),
  logo: pick(x, ['logoUrl', 'logo'], ''),
  booth: pick(x, ['booth', 'boothNumber'], ''),
});

export const normalizeSession = (s, fallbackEventId = '') => {
  const sp = s?.speaker;
  const rawEventId = pick(s, ['eventId', 'event'], fallbackEventId);
  const resolvedEventId = String(rawEventId?._id || rawEventId?.id || rawEventId || '');
  const startRaw = pick(s, ['startTime', 'start_time', 'from'], '');
  const endRaw = pick(s, ['endTime', 'end_time', 'to'], '');

  return {
    id: String(pick(s, ['id', '_id'])),
    eventId: resolvedEventId,
    title: pick(s, ['sessionTitle', 'title', 'name']),
    date: day(pick(s, ['date', 'startDate', 'startTime', 'start'])),
    start: formatTime(startRaw),
    end: formatTime(endRaw),
    room: pick(s, ['locationDetails', 'room', 'location', 'venue'], ''),
    description: pick(s, ['description'], ''),
    speaker:
      typeof sp === 'string'
        ? { name: sp, role: '', company: '' }
        : {
            name: sp?.name || pick(s, ['speakerName'], 'To be announced'),
            role: sp?.role || '',
            company: sp?.company || '',
          },
  };
};

export const extractSessionsFromEvents = (events = []) =>
  events.flatMap((ev) => {
    const evId = String(ev?._id || ev?.id || '');
    const list = Array.isArray(ev?.schedule) ? ev.schedule : [];
    return list.map((s) => normalizeSession(s, evId));
  });