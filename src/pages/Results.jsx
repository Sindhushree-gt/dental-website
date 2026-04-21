import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ResultsPage = () => {
  const [gallery, setGallery] = useState([]);
  const [filter, setFilter] = useState('all');
  const [selectedImage, setSelectedImage] = useState(null);
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
    <div className="min-h-screen pt-32 pb-20 px-4 bg-gradient-to-b from-white to-[color:var(--soft)]">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-16">
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
      <div className="max-w-7xl mx-auto">
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
                onClick={() => setSelectedImage(item)}
                className="group cursor-pointer"
              >
                <div className="relative overflow-hidden rounded-2xl shadow-lg mb-4 h-80">
                  <img
                    src={item.before}
                    alt="Before"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center">
                    <span className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-lg font-bold">
                      Click to compare
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

      {/* Modal - Full Comparison */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4" onClick={() => setSelectedImage(null)}>
          <div className="bg-white rounded-3xl shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-hidden" onClick={e => e.stopPropagation()}>
            <div className="flex flex-col md:flex-row">
              {/* Before */}
              <div className="md:w-1/2 bg-gray-100 flex flex-col">
                <div className="flex-1 overflow-hidden">
                  <img
                    src={selectedImage.before}
                    alt="Before"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6 bg-gray-50 border-t border-gray-200 text-center">
                  <p className="text-gray-500 font-bold">BEFORE</p>
                </div>
              </div>

              {/* After */}
              <div className="md:w-1/2 bg-teal-50 flex flex-col">
                <div className="flex-1 overflow-hidden">
                  <img
                    src={selectedImage.after}
                    alt="After"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6 bg-[color:var(--soft)] border-t border-black/5 text-center">
                  <p className="text-[color:var(--dk)] font-bold">AFTER</p>
                </div>
              </div>
            </div>

            {/* Details */}
            <div className="p-8 border-t border-gray-200">
              <h2 className="text-2xl font-bold text-[color:var(--dk)] mb-4">{selectedImage.title}</h2>
              <p className="text-[color:var(--muted)] mb-6">
                {categories.find(c => c.value === selectedImage.category)?.label}
              </p>

              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="bg-green-50 p-4 rounded-xl text-center">
                  <p className="text-2xl font-bold text-green-600">✅</p>
                  <p className="text-sm text-gray-600 mt-2">Patient Satisfied</p>
                </div>
                <div className="bg-blue-50 p-4 rounded-xl text-center">
                  <p className="text-2xl font-bold text-blue-600">🎯</p>
                  <p className="text-sm text-gray-600 mt-2">Treatment Complete</p>
                </div>
                <div className="bg-purple-50 p-4 rounded-xl text-center">
                  <p className="text-2xl font-bold text-purple-600">⭐</p>
                  <p className="text-sm text-gray-600 mt-2">5-Star Result</p>
                </div>
              </div>

              <p className="text-gray-700 mb-6">
                This patient underwent our comprehensive treatment program and achieved remarkable results. The transformation showcases the power of modern dentistry combined with our personalized approach to each patient's unique needs.
              </p>

              <div className="flex gap-4 flex-col sm:flex-row">
                <button
                  onClick={() => setSelectedImage(null)}
                  className="flex-1 bg-gray-200 text-gray-800 py-3 rounded-xl font-bold hover:bg-gray-300 transition"
                >
                  Close
                </button>
                <button className="flex-1 bg-[color:var(--teal)] text-white py-3 rounded-xl font-bold hover:bg-[color:var(--dk)] transition">
                  Achieve Similar Results
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CTA Section */}
      <div className="max-w-6xl mx-auto mt-20">
        <div className="bg-gradient-to-r from-[color:var(--teal)] to-[color:var(--dk)] rounded-3xl p-12 text-center text-white">
          <h2 className="text-4xl font-serif font-bold mb-4">Your Smile Could Be Next</h2>
          <p className="text-white/80 mb-8 text-lg">Schedule your free consultation and let our experts create your personalized smile transformation plan.</p>
          <button className="bg-white text-[color:var(--dk)] px-10 py-4 rounded-xl font-bold text-lg hover:bg-[color:var(--soft)] transition-colors shadow-lg">
            Start Your Journey Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResultsPage;
