import { useEffect } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import './styles/tokens.css';
import './styles/attendee.css';
import './styles/extra.css';
import { ScheduleProvider } from './context/ScheduleContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Explore from './pages/Explore';
import Exhibitors from './pages/Exhibitors';
import EventDetails from './pages/EventDetails';
import MySchedule from './pages/MySchedule';
import FloorPlan from './pages/FloorPlan';
import Login from './pages/Login';
import Register from './pages/Register';
import About from './pages/About';
import Contact from './pages/Contact';

function ScrollTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function AttendeeApp() {
  return (
    <ScheduleProvider>
      <div className="es">
        <ScrollTop />
        <Navbar />
        <Routes>
          <Route index element={<Home />} />
          <Route path="events" element={<Explore />} />
          <Route path="events/:id" element={<EventDetails />} />
          <Route path="exhibitors" element={<Exhibitors />} />
          <Route path="schedule" element={<MySchedule />} />
          <Route path="floor-plan" element={<FloorPlan />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        <Footer />
      </div>
    </ScheduleProvider>
  );
}