import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BookingPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    date: '',
    time: '',
    service: 'smile-designing',
    issue: ''
  });
  const [availableSlots, setAvailableSlots] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [emailStatus, setEmailStatus] = useState(null);

  useEffect(() => {
    fetchAvailableSlots();
  }, []);

  const fetchAvailableSlots = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/available-slots');
      setAvailableSlots(response.data.slots);
    } catch (error) {
      console.log('Using default slots');
      setAvailableSlots(['10:00 AM', '11:00 AM', '2:00 PM', '3:00 PM']);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // 1. Submit to local API (existing logic)
      const localResponse = await axios.post('http://localhost:5000/api/appointments', formData);

      setEmailStatus(localResponse?.data?.emailStatus || null);

      if (localResponse.data.success) {
        setSubmitted(true);
        // We keep formData for the "Success" display, but clear it later if needed
      }
    } catch (error) {
      console.error('Booking error:', error);
      alert('Error booking appointment. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-32 pb-20 px-4 bg-gradient-to-b from-[color:var(--soft)] to-white">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-serif font-bold text-[color:var(--dk)] mb-4">Book Your Consultation</h1>
          <p className="text-[color:var(--muted)] text-lg">Zero-cost initial consultation with our expert dentists</p>
        </div>

        {submitted ? (
          <div className="bg-green-50 border-2 border-green-500 rounded-3xl p-12 text-center">
            <div className="text-6xl mb-4">✅</div>
            <h2 className="text-3xl font-serif font-bold text-green-900 mb-4">Appointment Confirmed!</h2>
            <p className="text-green-700 mb-6">We've received your booking request. Our team will confirm your appointment within 2 hours via phone/email.</p>
            {emailStatus ? (
              <p className="text-sm mb-6">
                <strong>Email:</strong>{' '}
                {emailStatus.sent ? (
                  <>
                    Confirmation email sent.
                    {emailStatus.mode === 'ethereal' && emailStatus.previewUrl ? (
                      <>
                        {' '}
                        <a
                          href={emailStatus.previewUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[color:var(--teal)] font-bold hover:underline"
                        >
                          View email preview
                        </a>
                      </>
                    ) : null}
                  </>
                ) : (
                  `Not sent (${emailStatus.reason || 'unknown'}).`
                )}
              </p>
            ) : null}
            <div className="bg-white rounded-2xl p-6 mb-6 text-left">
              <p className="text-gray-700 mb-2"><strong>Name:</strong> {formData.name || 'Pending'}</p>
              <p className="text-gray-700 mb-2"><strong>Date:</strong> {formData.date}</p>
              <p className="text-gray-700 mb-2"><strong>Time:</strong> {formData.time}</p>
              <p className="text-gray-700"><strong>Service:</strong> {formData.service}</p>
            </div>
            <div className="flex flex-col gap-4">
              <a 
                href={`https://wa.me/919731065325?text=${encodeURIComponent(
                  `Hello SmileVista! 👋 \n\nI just booked an appointment:\n👤 Name: ${formData.name}\n📆 Date: ${formData.date}\n⏰ Time: ${formData.time}\n🦷 Service: ${formData.service}\n\nPlease confirm!`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-green-500 text-white px-8 py-3 rounded-xl font-bold hover:bg-green-600 transition flex items-center justify-center gap-2"
              >
                <span>Confirm on WhatsApp</span>
                <span className="text-xl">💬</span>
              </a>
              <button 
                onClick={() => {
                  setSubmitted(false);
                  setEmailStatus(null);
                  setFormData({
                    name: '',
                    phone: '',
                    email: '',
                    date: '',
                    time: '',
                    service: 'smile-designing',
                    issue: ''
                  });
                }} 
                className="text-[color:var(--teal)] font-bold hover:underline"
              >
                Book Another Appointment
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="bg-white rounded-3xl shadow-2xl p-10 border border-black/5">
            {/* Personal Info */}
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div>
                <label className="block text-[color:var(--dk)] font-bold mb-2">Full Name *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-[color:var(--teal)]"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label className="block text-[color:var(--dk)] font-bold mb-2">Phone Number *</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-[color:var(--teal)]"
                  placeholder="+1 (555) 000-0000"
                />
              </div>
            </div>

            <div className="mb-8">
              <label className="block text-[color:var(--dk)] font-bold mb-2">Email Address</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-[color:var(--teal)]"
                placeholder="your@email.com"
              />
            </div>

            {/* Appointment Details */}
            <div className="bg-[color:var(--soft)] p-6 rounded-2xl mb-8 border border-black/5">
              <h3 className="text-lg font-bold text-[color:var(--dk)] mb-6">Select Your Appointment</h3>
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-[color:var(--dk)] font-bold mb-2">Service *</label>
                  <select
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-[color:var(--teal)]"
                  >
                    <option value="smile-designing">Digital Smile Designing</option>
                    <option value="aligners">Aligners & Braces</option>
                    <option value="implants">Dental Implants</option>
                    <option value="consultation">General Consultation</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[color:var(--dk)] font-bold mb-2">Date *</label>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    required
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-[color:var(--teal)]"
                  />
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-[color:var(--dk)] font-bold mb-3">Time Slot *</label>
                <div className="grid grid-cols-3 gap-3">
                  {availableSlots.map((slot) => (
                    <button
                      key={slot}
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, time: slot }))}
                      className={`py-2 px-3 rounded-lg font-semibold transition ${
                        formData.time === slot
                          ? 'bg-[color:var(--teal)] text-white'
                          : 'bg-white border border-gray-300 text-gray-700 hover:border-[color:var(--teal)]'
                      }`}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Issue Description */}
            <div className="mb-8">
              <label className="block text-[color:var(--dk)] font-bold mb-2">Tell us about your dental goals</label>
              <textarea
                name="issue"
                value={formData.issue}
                onChange={handleChange}
                rows="4"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-[color:var(--teal)]"
                placeholder="E.g., I want to straighten my teeth, improve my smile, replace missing teeth, etc."
              ></textarea>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[color:var(--teal)] text-white py-4 rounded-xl font-bold text-lg hover:bg-[color:var(--dk)] transition-colors disabled:opacity-50"
            >
              {loading ? 'Processing...' : 'Confirm Appointment'}
            </button>

            <p className="text-[color:var(--muted)] text-sm text-center mt-4">
              ✓ Free consultation • ✓ Personalized treatment plan • ✓ No obligations
            </p>
          </form>
        )}
      </div>
    </div>
  );
};

export default BookingPage;
