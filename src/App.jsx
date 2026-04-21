import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import SmileDesigning from './pages/SmileDesigning';
import AlignersBraces from './pages/AlignersBraces';
import DentalImplants from './pages/DentalImplants';
import { Login, Register, Booking, Results, Assessment } from './pages/Placeholders';
import ImageUpload from './components/ImageUpload';
import FloatingWhatsApp from './components/FloatingWhatsApp';
import StickyBooking from './components/StickyBooking';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/smile-designing" element={<SmileDesigning />} />
        <Route path="/aligners-braces" element={<AlignersBraces />} />
        <Route path="/dental-implants" element={<DentalImplants />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/results" element={<Results />} />
        <Route path="/assessment" element={<Assessment />} />
        <Route path="/ai-preview" element={<ImageUpload />} />
        <Route path="*" element={<Home />} />
      </Routes>
      <FloatingWhatsApp />
      <StickyBooking />
    </Router>
  );
}

export default App;
