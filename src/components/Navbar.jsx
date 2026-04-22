import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import LanguageSwitcher from './LanguageSwitcher';

const Navbar = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    if (token && userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    navigate('/');
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-black/5 px-6 py-4 flex items-center justify-between">
      <Link to="/" className="flex items-center gap-3 no-underline">
        <div className="w-10 h-10 bg-[color:var(--teal)] rounded-xl flex items-center justify-center text-white">
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C7.5 2 4 5.5 4 10c0 2.5 1.1 4.7 2.9 6.2L8 21h8l1.1-4.8C18.9 14.7 20 12.5 20 10c0-4.5-3.5-8-8-8zm0 12c-2.2 0-4-1.8-4-4s1.8-4 4-4 4 1.8 4 4-1.8 4-4 4z"/></svg>
        </div>
        <span className="font-serif text-2xl font-bold text-[color:var(--dk)]">SmileVista</span>
      </Link>

      <div className="hidden md:flex items-center gap-8 font-medium text-[color:var(--txt)]/70">
        <Link to="/" className="hover:text-[color:var(--teal)] transition-colors">Home</Link>
        <div className="relative group">
          <span className="cursor-pointer hover:text-[color:var(--teal)] transition-colors flex items-center gap-1">
            Services 
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
          </span>
          <div className="absolute top-full left-0 mt-2 w-56 bg-white border border-black/5 rounded-xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all py-2 translate-y-2 group-hover:translate-y-0">
            <Link to="/smile-designing" className="block px-6 py-3 hover:bg-[color:var(--soft)] hover:text-[color:var(--teal)] transition-colors">Smile Designing</Link>
            <Link to="/aligners-braces" className="block px-6 py-3 hover:bg-[color:var(--soft)] hover:text-[color:var(--teal)] transition-colors">Aligners & Braces</Link>
            <Link to="/dental-implants" className="block px-6 py-3 hover:bg-[color:var(--soft)] hover:text-[color:var(--teal)] transition-colors">Dental Implants</Link>
          </div>
        </div>
        <Link to="/ai-preview" className="hover:text-[color:var(--teal)] transition-colors">AI Preview</Link>
        <Link to="/results" className="hover:text-[color:var(--teal)] transition-colors">Gallery</Link>
        <Link to="/assessment" className="hover:text-[color:var(--teal)] transition-colors">Assessment</Link>
        <Link to="/faq" className="hover:text-[color:var(--teal)] transition-colors">FAQ</Link>
        <Link to="/#contact" className="hover:text-[color:var(--teal)] transition-colors">Contact</Link>
      </div>

      <div className="flex items-center gap-4">
        <LanguageSwitcher />
        {user ? (
          <div className="flex items-center gap-4">
            <span className="text-[color:var(--dk)] font-medium">Welcome, {user.name}</span>
            <Link to="/booking" className="bg-[color:var(--teal)] text-white px-6 py-2.5 rounded-xl font-bold hover:bg-[color:var(--dk)] transition-all shadow-lg shadow-black/10 active:scale-95">
              My Dashboard
            </Link>
            <button onClick={handleLogout} className="text-[color:var(--teal)] hover:text-[color:var(--dk)] font-medium">
              Logout
            </button>
          </div>
        ) : (
          <>
            <Link to="/booking" className="bg-[color:var(--teal)] text-white px-6 py-2.5 rounded-xl font-bold hover:bg-[color:var(--dk)] transition-all shadow-lg shadow-black/10 active:scale-95">
              Book Appointment
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
