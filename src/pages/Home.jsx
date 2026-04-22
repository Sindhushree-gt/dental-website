import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import smileImg from '../images/smile design after.png';
import alignersImg from '../images/braces and aligners after.png';
import implantsImg from '../images/dental implant after.png';

const Home = () => {
  const [contactData, setContactData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (location.hash === '#contact') {
      setTimeout(() => {
        const element = document.getElementById('contact');
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  }, [location]);

  const handleContactChange = (e) => {
    const { name, value } = e.target;
    setContactData(prev => ({ ...prev, [name]: value }));
  };

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post('https://api.web3forms.com/submit', {
        access_key: '8f11e73a-2e5f-4578-bb73-52c99d93155f',
        subject: `Contact Inquiry: ${contactData.firstName} ${contactData.lastName}`,
        from_name: 'SmileVista Dental Website',
        confirm_email: 'true',
        replyto: 'cursorhalesh@gmail.com',
        name: `${contactData.firstName} ${contactData.lastName}`, 
        email: contactData.email,
        message: contactData.message,
        ...contactData
      }, {
        headers: {
          'Accept': 'application/json'
        }
      });
      setSubmitted(true);
    } catch (error) {
      console.error('Contact error:', error);
      alert('Error sending message. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="pt-20">
      {/* Hero Section */}
      <header className="relative min-h-[90vh] flex items-center px-6 md:px-20 overflow-hidden bg-[color:var(--deep)]">
        <img 
          src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=1800&q=85" 
          alt="Clinic" 
          className="absolute inset-0 w-full h-full object-cover opacity-35 brightness-50"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[color:var(--deep)]/95 via-[color:var(--deep)]/80 to-[color:var(--deep)]/10" />
        <div className="relative z-10 max-w-3xl text-white">
          <div className="inline-block bg-[color:var(--teal)]/20 border border-[color:var(--teal)]/30 text-[#C9A24A] px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-8">
            International Centre of Excellence
          </div>
          <h1 className="text-6xl md:text-8xl font-serif font-bold leading-[1.1] mb-6">
            Where Perfect <br />
            <span className="italic text-[#C9A24A]">Smiles</span> Are Crafted
          </h1>
          <p className="text-xl text-white/70 mb-12 max-w-2xl leading-relaxed">
            Advanced dentistry for patients worldwide. Precision technology, accredited expertise, and genuine compassion — from consultation to your confident new smile.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link to="/booking" className="bg-[color:var(--teal)] text-white px-10 py-4 rounded-2xl font-bold text-lg hover:bg-[color:var(--dk)] transition-all shadow-xl shadow-black/30 active:scale-95">
              Book Consultation
            </Link>
          </div>

          <div className="mt-14 grid grid-cols-2 sm:grid-cols-4 gap-8 max-w-2xl">
            {[
              { n: '25K+', l: 'Happy Patients' },
              { n: '40+', l: 'Countries' },
              { n: '18 yrs', l: 'Excellence' },
              { n: '4.9★', l: 'Rating' }
            ].map((s) => (
              <div key={s.l}>
                <div className="font-serif text-3xl text-[#C9A24A] font-bold leading-none">{s.n}</div>
                <div className="text-xs tracking-wide uppercase text-white/50 mt-2">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </header>

      {/* Trust Bar */}
      <section className="bg-[color:var(--soft)] border-y border-black/5 px-6 py-6">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-center gap-x-12 gap-y-4 text-sm text-[color:var(--muted)]">
          {[
            { t: 'JCI Accredited', d: 'Facility' },
            { t: 'ISO 9001:2015', d: 'Certified' },
            { t: '15+', d: 'Specialist Doctors' },
            { t: '40+ Countries', d: 'International Patients' },
            { t: 'Same‑Day', d: 'Emergency Care' }
          ].map((x) => (
            <div key={x.t} className="flex items-center gap-2">
              <span className="inline-flex w-2 h-2 rounded-full bg-[color:var(--teal)]" />
              <span>
                <span className="font-bold text-[color:var(--txt)]">{x.t}</span> {x.d}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* About Split */}
      <section className="grid lg:grid-cols-2">
        <div className="relative min-h-[420px] overflow-hidden">
          <img
            src="https://static.vecteezy.com/system/resources/thumbnails/071/062/019/small/dental-checkup-examination-procedure-with-doctor-and-patient-free-photo.jpg"
            alt="Dentist consulting with patient"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent" />
          <div className="absolute bottom-6 left-6 bg-white/95 rounded-2xl px-6 py-5 shadow-2xl">
            <div className="font-serif text-4xl font-bold text-[color:var(--teal)] leading-none">18+</div>
            <div className="text-sm text-[color:var(--muted)] mt-1">Years of international excellence</div>
          </div>
        </div>
        <div className="bg-[color:var(--bg)] px-6 py-20 lg:px-16 flex items-center">
          <div className="max-w-xl">
            <div className="text-xs font-bold tracking-[0.3em] uppercase text-[color:var(--teal)] mb-4">
              About SmileVista
            </div>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-[color:var(--dk)] leading-tight">
              More than a clinic — <br />
              a <span className="italic text-[color:var(--teal)]">global smile</span> centre
            </h2>
            <p className="mt-6 text-[color:var(--muted)] leading-relaxed">
              Founded by internationally trained specialists, SmileVista combines cutting‑edge technology with genuine warmth. We
              treat local families and international travelers with the same high‑touch care, from consultation to aftercare.
            </p>

            <div className="mt-10 grid sm:grid-cols-2 gap-6">
              {[
                { i: '🔬', t: '3D Digital Planning', d: 'Preview your smile with CBCT + digital design workflow.' },
                { i: '🌍', t: 'International Concierge', d: 'Travel, hotel, airport pickup — coordinated end‑to‑end.' },
                { i: '🛡️', t: 'Lifetime Aftercare', d: 'Remote check‑ins and support after you return home.' },
                { i: '💤', t: 'Anxiety‑Friendly Care', d: 'Gentle approach with modern comfort options.' }
              ].map((f) => (
                <div key={f.t} className="flex gap-4">
                  <div className="w-11 h-11 rounded-xl bg-[color:var(--soft)] flex items-center justify-center text-lg">
                    {f.i}
                  </div>
                  <div>
                    <div className="font-bold text-[color:var(--dk)]">{f.t}</div>
                    <div className="text-sm text-[color:var(--muted)] mt-1 leading-relaxed">{f.d}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                to="/booking"
                className="bg-[color:var(--teal)] text-white px-8 py-3 rounded-xl font-bold hover:bg-[color:var(--dk)] transition"
              >
                Schedule a Visit →
              </Link>
              <Link
                to="/assessment"
                className="border-2 border-[color:var(--teal)] text-[color:var(--teal)] px-8 py-3 rounded-xl font-bold hover:bg-[color:var(--soft)] transition"
              >
                Take Smile Quiz →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Signature Treatments */}
      <section className="py-32 px-6 bg-white relative overflow-hidden bg-dot-pattern">
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-[color:var(--bg)] to-transparent" />
        
        <div className="max-w-7xl mx-auto text-center mb-24 relative z-10">
          <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-[color:var(--soft)] border border-[color:var(--teal)]/10 text-[color:var(--teal)] text-xs font-bold uppercase tracking-[0.2em] mb-6">
            <span className="w-2 h-2 rounded-full bg-[color:var(--teal)] animate-pulse" />
            Signature Treatments
          </div>
          <h2 className="text-5xl md:text-6xl font-serif font-bold text-[color:var(--dk)] mb-6 leading-tight">
            Crafting Your <span className="italic text-gradient">Perfect Smile</span>
          </h2>
          <p className="text-[color:var(--muted)] max-w-2xl mx-auto text-lg leading-relaxed font-medium">
            Where advanced precision meets aesthetic artistry. Explore our most sought‑after dental transformations.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 max-w-7xl mx-auto relative z-10">
          {[
            { 
              title: "Smile Designing", 
              path: "/smile-designing", 
              icon: "https://parthadental.com/wp-content/uploads/2022/09/cosmetic-dentistry-750x750.jpg", 
              isImage: true,
              desc: "Digital planning for anatomical perfection and facial harmony.",
              accent: "from-amber-50 to-orange-50",
              num: "01"
            },
            { 
              title: "Aligners & Braces", 
              path: "/aligners-braces", 
              icon: "https://dentistry.uic.edu/wp-content/uploads/sites/741/2020/10/iStock-501427146-1090x595.jpg", 
              isImage: true,
              desc: "Discreet orthodontic solutions for a lifetime of confidence.",
              accent: "from-blue-50 to-indigo-50",
              num: "02"
            },
            { 
              title: "Dental Implants", 
              path: "/dental-implants", 
              icon: "https://www.sanmarcosdental.com/blog/wp-content/uploads/implant-diagram.jpeg", 
              isImage: true,
              desc: "Bio-compatible restorations that feel and function like natural teeth.",
              accent: "from-emerald-50 to-teal-50",
              num: "03"
            }
          ].map((service, i) => (
            <Link
              key={i}
              to={service.path}
              className="group relative p-10 bg-white rounded-[3rem] border border-black/5 hover:border-[color:var(--teal)]/20 premium-shadow premium-shadow-hover hover-lift transition-all duration-500 no-underline text-left overflow-hidden flex flex-col"
            >
              {/* Decorative Number */}
              <div className="absolute top-8 right-10 text-6xl font-serif font-bold text-black/[0.03] group-hover:text-[color:var(--teal)]/[0.05] transition-colors">
                {service.num}
              </div>

              {/* Image Icon Wrapper */}
              <div className="w-32 h-32 rounded-[2.5rem] shadow-lg shadow-black/5 border border-black/10 flex items-center justify-center overflow-hidden mb-10 group-hover:scale-110 transition-all duration-500 bg-white">
                <img src={service.icon} alt={service.title} className="w-full h-full object-cover" />
              </div>

              <div className="relative z-10 flex flex-col flex-grow">
                <h3 className="text-3xl font-serif font-bold text-[color:var(--dk)] mb-4">{service.title}</h3>
                <p className="text-[color:var(--muted)] mb-10 leading-relaxed font-medium min-h-[4.5rem]">
                  {service.desc}
                </p>
                
                <div className="mt-auto pt-6 border-t border-black/5 flex items-center justify-between">
                  <span className="text-[color:var(--teal)] font-bold flex items-center gap-2 text-lg">
                    Discover More 
                    <span className="group-hover:translate-x-2 transition-transform duration-300">→</span>
                  </span>
                  <div className="w-10 h-10 rounded-full border border-black/5 flex items-center justify-center group-hover:bg-[color:var(--soft)] group-hover:border-transparent transition-colors">
                    <svg className="w-4 h-4 text-[color:var(--teal)]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                  </div>
                </div>
              </div>

              {/* Background Accent Gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-transparent to-[color:var(--soft)] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            </Link>
          ))}
        </div>
      </section>

      {/* Doctors */}
      <section className="py-24 px-6 bg-[color:var(--bg)]">
        <div className="max-w-7xl mx-auto text-center">
          <div className="text-xs font-bold tracking-[0.3em] uppercase text-[color:var(--teal)] mb-4">Meet the Team</div>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-[color:var(--dk)] mb-6">
            World‑trained <span className="italic text-[color:var(--teal)]">specialists</span>
          </h2>
          <p className="text-[color:var(--muted)] max-w-3xl mx-auto leading-relaxed">
            Our clinicians hold advanced fellowships and deliver results with a balance of clinical precision and aesthetic artistry.
          </p>
        </div>

        <div className="max-w-7xl mx-auto mt-14 grid gap-8 md:grid-cols-3">
          {[
            {
              name: 'Dr. Rohan Mehta',
              role: 'Founder & Chief Dental Surgeon',
              tag: 'Oral & Maxillofacial',
              img: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=900&q=85',
              exp: '20+ years'
            },
            {
              name: 'Dr. Priya Sharma',
              role: 'Lead Cosmetic & Aesthetic Dentist',
              tag: 'Cosmetic & Aesthetic',
              img: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=900&q=85',
              exp: '14 years'
            },
            {
              name: 'Dr. Arjun Nair',
              role: 'Senior Implantologist',
              tag: 'Implantology',
              img: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=900&q=85',
              exp: '16 years'
            }
          ].map((d) => (
            <div key={d.name} className="bg-white rounded-3xl overflow-hidden border border-black/5 shadow-sm hover:shadow-xl hover:shadow-black/5 transition">
              <div className="relative h-72">
                <img src={d.img} alt={d.name} className="absolute inset-0 w-full h-full object-cover" />
                <div className="absolute top-4 left-4 bg-[color:var(--teal)] text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
                  {d.tag}
                </div>
              </div>
              <div className="p-8">
                <div className="font-serif text-2xl font-bold text-[color:var(--dk)]">{d.name}</div>
                <div className="text-sm text-[color:var(--muted)] mt-1">{d.role}</div>
                <div className="mt-4 text-sm text-[color:var(--muted)]">
                  Trained internationally · <span className="font-bold text-[color:var(--teal)]">{d.exp}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Dental Tourism */}
      <section className="py-24 px-6 bg-[color:var(--soft)]">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-14 items-start">
          <div>
            <div className="text-xs font-bold tracking-[0.3em] uppercase text-[color:var(--teal)] mb-4">Medical Tourism</div>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-[color:var(--dk)] leading-tight">
              Your journey to a <br />
              better <span className="italic text-[color:var(--teal)]">smile</span>
            </h2>
            <p className="mt-6 text-[color:var(--muted)] leading-relaxed">
              Save 40–70% on world‑class dentistry. Our team helps with travel guidance, accommodation partners, and aftercare so you can focus on your treatment.
            </p>
            <div className="mt-8 space-y-5">
              {[
                { n: '1', t: 'Free virtual consultation', d: 'Share X‑rays/photos. Receive a plan and estimate within 24 hours.' },
                { n: '2', t: 'Travel & accommodation', d: 'Airport pickup + partner hotels minutes from the clinic.' },
                { n: '3', t: 'Treatment at SmileVista', d: 'Most multi‑procedure packages completed in 5–10 days.' },
                { n: '4', t: 'Lifetime remote aftercare', d: 'Digital records and follow‑ups after you return home.' }
              ].map((s) => (
                <div key={s.n} className="flex gap-4 border-b border-black/5 pb-5">
                  <div className="w-11 h-11 rounded-full bg-[color:var(--teal)] text-white font-bold flex items-center justify-center flex-shrink-0">
                    {s.n}
                  </div>
                  <div>
                    <div className="font-bold text-[color:var(--dk)]">{s.t}</div>
                    <div className="text-sm text-[color:var(--muted)] mt-1 leading-relaxed">{s.d}</div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-10">
              <Link
                to="/booking"
                className="bg-[color:var(--teal)] text-white px-8 py-3 rounded-xl font-bold hover:bg-[color:var(--dk)] transition inline-flex"
              >
                Plan My Dental Trip →
              </Link>
            </div>
          </div>

          <div className="bg-[color:var(--dk)] rounded-3xl overflow-hidden text-white">
            <div className="relative h-80">
              <img
                src="https://images.unsplash.com/photo-1504439468489-c8920d796a29?w=1400&q=85"
                alt="International patient smiling at clinic"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/60" />
            </div>
            <div className="p-10">
              <div className="font-serif text-3xl font-bold">Why India for dentistry?</div>
              <p className="text-white/60 mt-3 leading-relaxed">
                World‑class outcomes at a fraction of the cost — with doctors trained in leading global institutions.
              </p>
              <div className="mt-8 grid grid-cols-2 gap-4">
                {[
                  { i: '✈️', t: 'Direct flights', d: 'From UAE, UK, US, AU + more' },
                  { i: '🏨', t: 'Hotel partners', d: '4★ & 5★ at exclusive rates' },
                  { i: '👨‍⚕️', t: 'Specialist team', d: 'Cosmetic, implants, aligners' },
                  { i: '📋', t: 'Visa support', d: 'Documents + medical letter' }
                ].map((x) => (
                  <div key={x.t} className="bg-white/5 border border-white/10 rounded-2xl p-4">
                    <div className="text-xl">{x.i}</div>
                    <div className="font-bold mt-2">{x.t}</div>
                    <div className="text-xs text-white/55 mt-1 leading-relaxed">{x.d}</div>
                  </div>
                ))}
              </div>
              <div className="mt-6 rounded-2xl bg-gradient-to-r from-[color:var(--teal)] to-[#6B8F71] p-5 flex items-center gap-4">
                <div className="font-serif text-5xl font-bold leading-none">70%</div>
                <div>
                  <div className="font-bold">Average cost savings</div>
                  <div className="text-sm text-white/80">vs. equivalent care in UK, USA, or Australia</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 px-6 bg-[color:var(--bg)]">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-end">
          <div>
            <div className="text-xs font-bold tracking-[0.3em] uppercase text-[color:var(--teal)] mb-4">Patient stories</div>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-[color:var(--dk)] leading-tight">
              Smiles shared <br />
              <span className="italic text-[color:var(--teal)]">across the globe</span>
            </h2>
          </div>
          <p className="text-[color:var(--muted)] leading-relaxed">
            Real patients, real results — from London to Lagos, Sydney to São Paulo. Every smile tells a story of trust.
          </p>
        </div>

        <div className="max-w-7xl mx-auto mt-14 grid gap-6 md:grid-cols-3">
          {[
            {
              feat: true,
              q: '“I flew from Dubai for a full mouth reconstruction. From the first WhatsApp consult to the final fitting, everything was seamless. Worth every hour of travel.”',
              n: 'Sara Al‑Hamdan',
              l: 'Dubai, UAE'
            },
            {
              q: '“I dreaded dentists, but here I felt completely at ease. Outstanding quality and value compared to UK prices.”',
              n: 'James Mitchell',
              l: 'Manchester, UK'
            },
            {
              q: '“My veneers are perfect. I consulted in three countries — the quality here exceeded all of them at a third of the price.”',
              n: 'Anna Petrova',
              l: 'Moscow, Russia'
            }
          ].map((t) => (
            <div
              key={t.n}
              className={[
                'rounded-3xl p-8 border transition',
                t.feat
                  ? 'bg-gradient-to-br from-[color:var(--dk)] to-[color:var(--deep)] border-transparent text-white'
                  : 'bg-white border-black/5 text-[color:var(--txt)] hover:shadow-xl hover:shadow-black/5'
              ].join(' ')}
            >
              <div className={t.feat ? 'text-[#C9A24A]' : 'text-[color:var(--teal)]'}>★★★★★</div>
              <p className={['mt-4 leading-relaxed', t.feat ? 'text-white/75' : 'text-[color:var(--muted)]'].join(' ')}>
                {t.q}
              </p>
              <div className="mt-6 font-bold">{t.n}</div>
              <div className={t.feat ? 'text-white/50 text-sm' : 'text-[color:var(--muted)] text-sm'}>{t.l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Contact CTA */}
      <section id="contact" className="py-24 px-6 bg-gradient-to-br from-[color:var(--deep)] to-[color:var(--dk)] text-white">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-14 items-start">
          <div>
            <div className="text-xs font-bold tracking-[0.3em] uppercase text-[#C9A24A] mb-4">Get in touch</div>
            <h2 className="text-4xl md:text-5xl font-serif font-bold leading-tight">
              Book your <br />
              <span className="italic text-[color:var(--teal)]">free consultation</span>
            </h2>
            <p className="mt-6 text-white/65 leading-relaxed max-w-xl">
              Whether local or international, our team creates your personalized plan. First consultations are free and include a complete digital assessment.
            </p>
            <div className="mt-10 space-y-4 text-white/80">
              <div className="flex gap-4 items-start">
                <div className="w-11 h-11 rounded-xl bg-white/10 border border-white/10 flex items-center justify-center">📞</div>
                <div>
                  <div className="font-bold text-white">+91 98765 43210</div>
                  <div className="text-sm text-white/55">Mon–Sat, 9 AM – 8 PM IST</div>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <div className="w-11 h-11 rounded-xl bg-white/10 border border-white/10 flex items-center justify-center">📧</div>
                <div>
                  <div className="font-bold text-white">hello@smilevista.com</div>
                  <div className="text-sm text-white/55">Response within 2 hours</div>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <div className="w-11 h-11 rounded-xl bg-white/10 border border-white/10 flex items-center justify-center">📍</div>
                <div>
                  <div className="font-bold text-white">Koramangala, Bengaluru, India</div>
                  <div className="text-sm text-white/55">15 mins from the city center</div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-10 text-[color:var(--txt)] border border-white/20 shadow-2xl shadow-black/20">
            {submitted ? (
              <div className="text-center py-10">
                <div className="text-5xl mb-4">🚀</div>
                <h3 className="text-2xl font-serif font-bold text-[color:var(--dk)] mb-4">Message Sent!</h3>
                <p className="text-[color:var(--muted)] mb-8">Thank you for reaching out. We'll get back to you shortly.</p>
                <div className="flex flex-col gap-4">
                  <a 
                    href={`https://wa.me/919731065325?text=${encodeURIComponent(
                      `Hello! I just submitted a contact form on your website. \nName: ${contactData.firstName} ${contactData.lastName} \nEmail: ${contactData.email} \nMessage: ${contactData.message}`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-green-500 text-white px-8 py-3 rounded-xl font-bold hover:bg-green-600 transition flex items-center justify-center gap-2"
                  >
                    <span>Follow up on WhatsApp</span>
                    <span className="text-xl">💬</span>
                  </a>
                  <button onClick={() => setSubmitted(false)} className="text-[color:var(--teal)] font-bold">
                    Send another message
                  </button>
                </div>
              </div>
            ) : (
              <>
                <h3 className="font-serif text-3xl font-bold text-[color:var(--dk)]">Request an appointment</h3>
                <p className="text-[color:var(--muted)] mt-2">Fill out this quick form and we'll reach out to schedule your free consultation.</p>

                <form onSubmit={handleContactSubmit} className="mt-8 grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wide text-[color:var(--muted)] mb-2">First name</label>
                    <input 
                      name="firstName"
                      value={contactData.firstName}
                      onChange={handleContactChange}
                      required
                      className="w-full bg-[color:var(--bg)] border border-black/10 rounded-xl px-4 py-3 focus:outline-none focus:border-[color:var(--teal)]" 
                      placeholder="Sarah" 
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wide text-[color:var(--muted)] mb-2">Last name</label>
                    <input 
                      name="lastName"
                      value={contactData.lastName}
                      onChange={handleContactChange}
                      required
                      className="w-full bg-[color:var(--bg)] border border-black/10 rounded-xl px-4 py-3 focus:outline-none focus:border-[color:var(--teal)]" 
                      placeholder="Johnson" 
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-bold uppercase tracking-wide text-[color:var(--muted)] mb-2">Email</label>
                    <input 
                      name="email"
                      type="email"
                      value={contactData.email}
                      onChange={handleContactChange}
                      required
                      className="w-full bg-[color:var(--bg)] border border-black/10 rounded-xl px-4 py-3 focus:outline-none focus:border-[color:var(--teal)]" 
                      placeholder="sarah@example.com" 
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-bold uppercase tracking-wide text-[color:var(--muted)] mb-2">Message</label>
                    <textarea 
                      name="message"
                      value={contactData.message}
                      onChange={handleContactChange}
                      className="w-full bg-[color:var(--bg)] border border-black/10 rounded-xl px-4 py-3 h-28 resize-none focus:outline-none focus:border-[color:var(--teal)]" 
                      placeholder="Tell us what you want to improve..." 
                    />
                  </div>
                  <div className="sm:col-span-2 mt-4">
                    <button 
                      type="submit" 
                      disabled={loading}
                      className="w-full bg-[color:var(--teal)] text-white py-4 rounded-xl font-bold text-lg hover:bg-[color:var(--dk)] transition-colors disabled:opacity-50"
                    >
                      {loading ? 'Sending...' : 'Send Message →'}
                    </button>
                  </div>
                </form>

                <div className="mt-8 pt-8 border-t border-gray-100 flex flex-wrap gap-4">
                  <Link to="/booking" className="text-[color:var(--teal)] font-bold hover:underline">
                    Go to Full Booking Page →
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
