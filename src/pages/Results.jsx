import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const API_BASE = 'http://localhost:5000';

function resolveMediaUrl(url) {
  if (!url) return url;
  if (url.startsWith('http://') || url.startsWith('https://')) return url;
  if (url.startsWith('/')) return `${API_BASE}${url}`;
  return `${API_BASE}/${url}`;
}

const ResultsPage = () => {
  const [gallery, setGallery] = useState([]);
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchGallery();
  }, []);

  const fetchGallery = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/gallery');
      setGallery(response.data.gallery);
      setLoading(false);
    } catch (error) {
      console.log('Using default gallery');
      setGallery([
        {
          id: 1,
          category: 'smile-designing',
          title: 'Smile Design Transformation',
          before: 'https://images.unsplash.com/photo-1600170311833-c2cf5280ce49?w=500&q=80',
          after: 'https://images.unsplash.com/photo-1629909613654-28a3a7c4bd45?w=500&q=80'
        },
        {
          id: 2,
          category: 'aligners',
          title: 'Aligner Treatment Success',
          before: 'https://images.unsplash.com/photo-1598256989800-fe5f95da9787?w=500&q=80',
          after: 'https://images.unsplash.com/photo-1513412803932-49f9003a7281?w=500&q=80'
        },
        {
          id: 3,
          category: 'implants',
          title: 'Implant Crown Placement',
          before: 'https://images.unsplash.com/photo-1627483262769-04d0a1401487?w=500&q=80',
          after: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=500&q=80'
        }
      ]);
      setLoading(false);
    }
  };

  const filteredGallery = filter === 'all'
    ? gallery
    : gallery.filter(item => item.category === filter);

  const categories = [
    { value: 'all', label: 'All Treatments', emoji: '⭐' },
    { value: 'smile-designing', label: 'Smile Designing', emoji: '✨' },
    { value: 'aligners', label: 'Aligners', emoji: '🔮' },
    { value: 'implants', label: 'Implants', emoji: '🦷' }
  ];

  return (
    <div className="min-h-screen pt-24 bg-[color:var(--bg)] text-[color:var(--txt)]">
      <div className="max-w-full flex">
        {/* Deep Green Sidebar */}
        <aside className="w-80 h-[calc(100vh-96px)] bg-[color:var(--deep)] p-8 sticky top-24 hidden lg:block">
          <div className="mb-12 px-4">
            <h2 className="text-3xl font-bold text-white tracking-tight">AdminPanel</h2>
          </div>
          
          <nav className="space-y-4">
            {[
              { id: 'leads', icon: <path d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />, label: 'Dashboard', path: '/results', active: true },
              { id: 'appointments', icon: <path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />, label: 'Appointments', path: '/booking' },
              { id: 'services', icon: <path d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />, label: 'Services', path: '/smile-designing' },
              { id: 'doctors', icon: <path d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />, label: 'Doctors', path: '/' },
              { id: 'about', icon: <path d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />, label: 'About Clinic', path: '/faq' },
              { id: 'contact', icon: <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />, label: 'Contact Us', path: '/#contact' },
            ].map((item) => (
              <Link
                key={item.id}
                to={item.path}
                className={`flex items-center gap-4 px-6 py-4 rounded-2xl font-semibold transition-all group ${
                  item.active 
                    ? 'bg-white/10 text-white shadow-lg' 
                    : 'text-white/50 hover:bg-white/5 hover:text-white'
                }`}
              >
                <svg className={`w-6 h-6 transition-colors ${item.active ? 'text-emerald-400' : 'text-white/30 group-hover:text-emerald-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {item.icon}
                </svg>
                {item.label}
              </Link>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <div className="flex-1 min-w-0 bg-[color:var(--bg)] min-h-[calc(100vh-96px)] p-12 lg:p-20 text-[color:var(--txt)]">
      {/* Header */}
      <div className="mb-16">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-serif font-bold text-[color:var(--dk)] mb-4">Real Results, Real People</h1>
          <p className="text-xl text-[color:var(--muted)] max-w-3xl mx-auto">
            Witness the transformations from our happy patients. Every smile tells a story of precision, care, and dedication.
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map(cat => (
            <button
              key={cat.value}
              onClick={() => setFilter(cat.value)}
              className={`px-6 py-3 rounded-full font-bold transition-all ${
                filter === cat.value
                  ? 'bg-[color:var(--teal)] text-white shadow-lg shadow-black/10'
                  : 'bg-white border-2 border-gray-300 text-gray-700 hover:border-[color:var(--teal)]'
              }`}
            >
              {cat.emoji} {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Gallery Grid */}
      <div>
        {loading ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">⏳</div>
            <p className="text-gray-600 text-lg">Loading gallery...</p>
          </div>
        ) : filteredGallery.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">📸</div>
            <p className="text-gray-600 text-lg">No results found</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {filteredGallery.map(item => (
              <div
                key={item.id}
                className="group"
              >
                <div className="relative overflow-hidden rounded-2xl shadow-lg mb-4 h-80">
                  <img
                    src={resolveMediaUrl(item.image)}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center">
                    <span className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-lg font-bold">
                      View
                    </span>
                  </div>
                </div>
                <h3 className="text-lg font-bold text-[color:var(--dk)] mb-2">{item.title}</h3>
                <p className="text-[color:var(--muted)]">
                  {categories.find(c => c.value === item.category)?.label}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* CTA Section */}
      <div className="mt-20">
        <div className="bg-gradient-to-r from-[color:var(--teal)] to-[color:var(--dk)] rounded-3xl p-12 text-center text-white">
          <h2 className="text-4xl font-serif font-bold mb-4">Your Smile Could Be Next</h2>
          <p className="text-white/80 mb-8 text-lg">Schedule your free consultation and let our experts create your personalized smile transformation plan.</p>
          <button className="bg-white text-[color:var(--dk)] px-10 py-4 rounded-xl font-bold text-lg hover:bg-[color:var(--soft)] transition-colors shadow-lg">
            Start Your Journey Now
          </button>
        </div>
      </div>
        </div>
      </div>
    </div>
  );
};

export default ResultsPage;
