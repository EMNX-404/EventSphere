import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AttendeeApp from './attendee/AttendeeApp';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<AttendeeApp />} />
      </Routes>
    </BrowserRouter>
  );
}