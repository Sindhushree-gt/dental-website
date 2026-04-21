import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="pt-20">
      {/* Hero Section */}
      <header className="relative min-h-[90vh] flex items-center px-6 md:px-20 overflow-hidden bg-teal-950">
        <img 
          src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=1800&q=85" 
          alt="Clinic" 
          className="absolute inset-0 w-full h-full object-cover opacity-40 brightness-50"
        />
        <div className="relative z-10 max-w-3xl text-white">
          <div className="inline-block bg-teal-500/20 border border-teal-500/30 text-teal-400 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-8">
            International Centre of Excellence
          </div>
          <h1 className="text-6xl md:text-8xl font-serif font-bold leading-[1.1] mb-6">
            Where Perfect <br />
            <span className="italic text-teal-400">Smiles</span> Are Crafted
          </h1>
          <p className="text-xl text-teal-50/70 mb-12 max-w-2xl leading-relaxed">
            Advanced dentistry for patients worldwide. Precision technology, accredited expertise, and genuine compassion from consultation to your new smile.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link to="/booking" className="bg-teal-500 text-white px-10 py-4 rounded-2xl font-bold text-lg hover:bg-teal-600 transition-all shadow-xl shadow-teal-900/40 active:scale-95">
              Book Free Consultation
            </Link>
            <Link to="/smile-designing" className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-10 py-4 rounded-2xl font-bold text-lg hover:bg-white/20 transition-all no-underline">
              View Our Services
            </Link>
          </div>
        </div>
      </header>

      {/* Services Overview */}
      <section className="py-32 px-6 bg-white">
        <div className="max-w-7xl mx-auto text-center mb-20">
          <span className="text-teal-600 font-bold uppercase tracking-[0.3em] text-sm mb-4 block">International Standards</span>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-teal-900 mb-6">Our Signature Treatments</h2>
          <p className="text-gray-500 max-w-2xl mx-auto text-lg leading-relaxed">We combine medical precision with aesthetic artistry to deliver world-class dental results.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-7xl mx-auto">
          {[
            { title: "Smile Designing", path: "/smile-designing", icon: "✨", desc: "Digitally planned smile makeovers for perfect proportions." },
            { title: "Aligners & Braces", path: "/aligners-braces", icon: "🔮", desc: "Invisible correction for perfectly aligned teeth." },
            { title: "Dental Implants", path: "/dental-implants", icon: "🦷", desc: "Permanent, natural-feeling tooth replacements." }
          ].map((service, i) => (
            <Link key={i} to={service.path} className="group p-10 bg-slate-50 rounded-[2.5rem] border border-teal-50 hover:bg-white hover:shadow-2xl hover:shadow-teal-900/5 transition-all duration-500 no-underline text-left">
              <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center text-3xl mb-8 group-hover:scale-110 group-hover:-rotate-6 transition-transform">
                {service.icon}
              </div>
              <h3 className="text-2xl font-serif font-bold text-teal-900 mb-4">{service.title}</h3>
              <p className="text-gray-600 mb-8 leading-relaxed">{service.desc}</p>
              <div className="text-teal-600 font-bold flex items-center gap-2 group-hover:gap-4 transition-all">
                Learn More <span>→</span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
