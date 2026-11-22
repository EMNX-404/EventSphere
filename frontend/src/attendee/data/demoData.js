/**
 * DEMONSTRATION DATA — NOT FROM THE BACKEND.
 * Used only while VITE_USE_DEMO_DATA=true (or when an endpoint is unavailable).
 * Shapes here are the shapes the UI expects; services/normalizers.js maps real API
 * responses into these shapes.
 */
import { eventArt } from './art';

export const demoEvents = [
  { id: 'ev-1', title: 'Future Tech Summit 2027', type: 'Conference', category: 'Technology', start: '2027-01-20', end: '2027-01-22', venue: 'Expo Centre Karachi', city: 'Karachi', image: eventArt('stage', 3), attendees: 4200,
    description: 'Three days of keynotes and workshops on AI, cloud and the next generation of software.',
    about: 'Future Tech Summit brings engineers, founders and researchers together to share what is working in production. Expect deep technical talks, live demos and plenty of time to meet the people behind the products.',
    highlights: ['40+ keynotes and talks', 'Live product demos', 'Founder and investor meetups', 'Hands-on AI workshops'], exhibitorIds: ['ex-1', 'ex-2', 'ex-6'] },
  { id: 'ev-2', title: 'Global Business Forum', type: 'Conference', category: 'Business', start: '2026-12-09', end: '2026-12-10', venue: 'Marriott Convention Hall', city: 'Lahore', image: eventArt('skyline', 4), attendees: 2800,
    description: 'Executives and entrepreneurs discuss trade, finance and growth across emerging markets.',
    about: 'A two-day forum on how businesses scale across borders. Panels, roundtables and one-to-one meeting slots are built into the schedule.',
    highlights: ['CEO roundtables', 'Cross-border trade panels', 'Pre-booked meeting slots'], exhibitorIds: ['ex-3', 'ex-5'] },
  { id: 'ev-3', title: 'Innovation Expo', type: 'Exhibition', category: 'Innovation', start: '2026-12-18', end: '2026-12-21', venue: 'Pak-China Friendship Centre', city: 'Islamabad', image: eventArt('booths', 5), attendees: 6100,
    description: 'A four-day exhibition of products, prototypes and startups shaping what comes next.',
    about: 'Walk the floor, try the prototypes and speak directly with the teams building them. Startup pitches run on the main stage each afternoon.',
    highlights: ['120+ exhibitor booths', 'Daily startup pitches', 'Prototype showcase hall'], exhibitorIds: ['ex-1', 'ex-4', 'ex-7', 'ex-8'] },
  { id: 'ev-4', title: 'Health Futures Conference', type: 'Conference', category: 'Healthcare', start: '2027-02-04', end: '2027-02-05', venue: 'Aga Khan University Auditorium', city: 'Karachi', image: eventArt('pulse'), attendees: 1900,
    description: 'Clinicians and health-tech teams on digital care, diagnostics and patient experience.',
    about: 'A focused two-day programme on bringing digital tools into everyday clinical practice, with case studies from hospitals and startups.',
    highlights: ['Clinical case studies', 'Digital diagnostics demos', 'Policy and regulation panel'], exhibitorIds: ['ex-4', 'ex-8'] },
  { id: 'ev-5', title: 'EdTech Workshop Series', type: 'Workshop', category: 'Education', start: '2026-12-02', end: '2026-12-02', venue: 'LUMS Learning Hub', city: 'Lahore', image: eventArt('learn'), attendees: 600,
    description: 'Practical one-day workshops on teaching with technology.',
    about: 'Small-group, hands-on sessions for teachers and institution leaders. Bring a laptop; leave with a lesson plan you can use the next day.',
    highlights: ['Small-group workshops', 'Take-home lesson plans', 'Tool comparison clinic'], exhibitorIds: ['ex-6'] },
  { id: 'ev-6', title: 'Founders Networking Night', type: 'Networking', category: 'Networking', start: '2026-12-12', end: '2026-12-12', venue: 'The Nest Rooftop', city: 'Karachi', image: eventArt('network', 6), attendees: 350,
    description: 'An evening to meet founders, operators and investors in a relaxed setting.',
    about: 'No stage, no slides. Structured introductions followed by open networking, with a curated guest list across startups and established companies.',
    highlights: ['Curated introductions', 'Investor lounge', 'Open networking'], exhibitorIds: ['ex-5'] },
  { id: 'ev-7', title: 'Creative Industries Expo', type: 'Exhibition', category: 'Exhibitions', start: '2027-03-11', end: '2027-03-13', venue: 'Expo Centre Lahore', city: 'Lahore', image: eventArt('shapes', 8), attendees: 5200,
    description: 'Design, media and craft studios present new work across three halls.',
    about: 'An exhibition for the people who make things look and feel good: studios, agencies, publishers and makers, with live demonstrations and talks.',
    highlights: ['Three themed halls', 'Live design demos', 'Portfolio review desks'], exhibitorIds: ['ex-3', 'ex-7'] },
  { id: 'ev-8', title: 'Startup Pitch Day', type: 'Conference', category: 'Innovation', start: '2027-02-18', end: '2027-02-18', venue: 'Ignite Hub Auditorium', city: 'Islamabad', image: eventArt('pitch'), attendees: 900,
    description: 'Twenty early-stage teams pitch to a panel of investors and industry leaders.',
    about: 'One day, twenty pitches, live feedback. Attendees vote for the audience award and can meet teams after each round.',
    highlights: ['20 live pitches', 'Audience award', 'Investor feedback panel'], exhibitorIds: ['ex-2', 'ex-5'] },
];

export const demoExhibitors = [
  { id: 'ex-1', name: 'Nimbus Cloud', industry: 'Technology', description: 'Managed cloud infrastructure for fast-growing teams.', booth: 'A-12' },
  { id: 'ex-2', name: 'Vertex AI Labs', industry: 'Technology', description: 'Applied machine learning tools for retail and logistics.', booth: 'A-15' },
  { id: 'ex-3', name: 'Harbor Trade Group', industry: 'Business', description: 'Cross-border trade finance and advisory services.', booth: 'B-04' },
  { id: 'ex-4', name: 'Medora Health', industry: 'Healthcare', description: 'Digital diagnostics and remote patient monitoring.', booth: 'C-07' },
  { id: 'ex-5', name: 'Launchpad Ventures', industry: 'Innovation', description: 'Early-stage investment and founder support.', booth: 'B-09' },
  { id: 'ex-6', name: 'Learnwise', industry: 'Education', description: 'Classroom tools and curriculum platforms for schools.', booth: 'D-02' },
  { id: 'ex-7', name: 'Studio Alif', industry: 'Exhibitions', description: 'Exhibition design, build and brand environments.', booth: 'D-11' },
  { id: 'ex-8', name: 'Orbit Robotics', industry: 'Innovation', description: 'Service robots for hospitals, hotels and warehouses.', booth: 'C-14' },
];

const sp = (name, role, company) => ({ name, role, company });
export const demoSessions = [
  { id: 'se-1', eventId: 'ev-1', title: 'Opening keynote: Software in the age of agents', date: '2027-01-20', start: '10:00', end: '11:00', room: 'Main Stage', speaker: sp('Ayesha Malik', 'Chief Technology Officer', 'Nimbus Cloud'), description: 'How agentic systems change the way teams build and ship.' },
  { id: 'se-2', eventId: 'ev-1', title: 'Building reliable AI features', date: '2027-01-20', start: '11:30', end: '12:15', room: 'Hall B', speaker: sp('Omar Siddiqui', 'Head of Research', 'Vertex AI Labs'), description: 'Evaluation, guardrails and monitoring in production.' },
  { id: 'se-3', eventId: 'ev-1', title: 'Workshop: Deploying to the cloud in an afternoon', date: '2027-01-21', start: '14:00', end: '16:00', room: 'Workshop Room 2', speaker: sp('Hamza Raza', 'Solutions Architect', 'Nimbus Cloud'), description: 'A hands-on build from repository to live service.' },
  { id: 'se-4', eventId: 'ev-1', title: 'Panel: Scaling engineering teams', date: '2027-01-22', start: '10:30', end: '11:30', room: 'Main Stage', speaker: sp('Sana Farooq', 'VP Engineering', 'Launchpad Ventures'), description: 'Four leaders on hiring, culture and delivery.' },
  { id: 'se-5', eventId: 'ev-2', title: 'Trade corridors in 2027', date: '2026-12-09', start: '09:30', end: '10:30', room: 'Ballroom', speaker: sp('Bilal Hussain', 'Director', 'Harbor Trade Group'), description: 'Where regional trade is growing and what it means for exporters.' },
  { id: 'se-6', eventId: 'ev-2', title: 'Financing growth without dilution', date: '2026-12-10', start: '13:00', end: '14:00', room: 'Room 3', speaker: sp('Zara Ahmed', 'Partner', 'Launchpad Ventures'), description: 'Debt, revenue-based and trade finance options compared.' },
  { id: 'se-7', eventId: 'ev-3', title: 'Prototype to product', date: '2026-12-18', start: '11:00', end: '12:00', room: 'Innovation Stage', speaker: sp('Usman Tariq', 'Founder', 'Orbit Robotics'), description: 'Lessons from taking a robot from lab bench to hospital floor.' },
  { id: 'se-8', eventId: 'ev-3', title: 'Startup pitches: round one', date: '2026-12-19', start: '15:00', end: '17:00', room: 'Innovation Stage', speaker: sp('Mariam Qureshi', 'Moderator', 'Innovation Expo'), description: 'Ten teams, five minutes each.' },
  { id: 'se-9', eventId: 'ev-4', title: 'Remote monitoring in practice', date: '2027-02-04', start: '10:00', end: '11:00', room: 'Auditorium', speaker: sp('Dr. Imran Sheikh', 'Consultant Physician', 'Medora Health'), description: 'What hospitals learned from two years of remote patient monitoring.' },
  { id: 'se-10', eventId: 'ev-4', title: 'Regulating digital diagnostics', date: '2027-02-05', start: '12:00', end: '13:00', room: 'Auditorium', speaker: sp('Dr. Nadia Hashmi', 'Policy Lead', 'Health Futures'), description: 'A practical guide to approvals and compliance.' },
  { id: 'se-11', eventId: 'ev-5', title: 'Workshop: Lesson design with AI tools', date: '2026-12-02', start: '10:00', end: '12:00', room: 'Studio 1', speaker: sp('Rabia Noor', 'Learning Designer', 'Learnwise'), description: 'Plan a week of lessons, with and without automation.' },
  { id: 'se-12', eventId: 'ev-6', title: 'Founder introductions', date: '2026-12-12', start: '19:00', end: '20:00', room: 'Rooftop', speaker: sp('Faisal Anwar', 'Host', 'The Nest'), description: 'Structured three-minute introductions to start the evening.' },
  { id: 'se-13', eventId: 'ev-7', title: 'Design in the age of AI', date: '2027-03-11', start: '11:00', end: '12:00', room: 'Hall A', speaker: sp('Hira Baig', 'Creative Director', 'Studio Alif'), description: 'What changes and what stays the same for design studios.' },
  { id: 'se-14', eventId: 'ev-8', title: 'Pitch Day: finals', date: '2027-02-18', start: '16:00', end: '17:30', room: 'Main Hall', speaker: sp('Kamran Yousuf', 'Investor', 'Launchpad Ventures'), description: 'The top five teams pitch for the audience award.' },
];

export const demoStats = { upcomingEvents: 8, exhibitors: 120, sessions: 64, attendees: 18000 };

export const demoFloorPlan = {
  halls: [
    { id: 'hall-a', name: 'Hall A — Technology & Business', booths: [
      { id: 'A-12', x: 40, y: 40, w: 150, h: 90, exhibitorId: 'ex-1' },
      { id: 'A-15', x: 220, y: 40, w: 150, h: 90, exhibitorId: 'ex-2' },
      { id: 'B-04', x: 410, y: 40, w: 150, h: 90, exhibitorId: 'ex-3' },
      { id: 'B-09', x: 590, y: 40, w: 150, h: 90, exhibitorId: 'ex-5' },
      { id: 'A-20', x: 40, y: 330, w: 150, h: 90, exhibitorId: null },
      { id: 'A-21', x: 220, y: 330, w: 150, h: 90, exhibitorId: null },
    ] },
    { id: 'hall-b', name: 'Hall B — Health, Education & Creative', booths: [
      { id: 'C-07', x: 40, y: 40, w: 170, h: 100, exhibitorId: 'ex-4' },
      { id: 'C-14', x: 250, y: 40, w: 170, h: 100, exhibitorId: 'ex-8' },
      { id: 'D-02', x: 460, y: 40, w: 130, h: 100, exhibitorId: 'ex-6' },
      { id: 'D-11', x: 620, y: 40, w: 120, h: 100, exhibitorId: 'ex-7' },
      { id: 'D-15', x: 40, y: 320, w: 170, h: 100, exhibitorId: null },
    ] },
  ],
  landmarks: [
    { label: 'Main stage', x: 300, y: 190, w: 200, h: 90 },
  ],
};
