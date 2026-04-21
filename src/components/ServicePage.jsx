import React from 'react';

const ServicePage = ({ title, subtitle, heroImg, benefits, steps, beforeImg, afterImg }) => {
  return (
    <div className="bg-[color:var(--bg)] min-h-screen pt-20">
      {/* Hero Section */}
      <section className="relative h-[500px] flex items-center justify-center overflow-hidden">
        <img src={heroImg} alt={title} className="absolute inset-0 w-full h-full object-cover brightness-50" />
        <div className="absolute inset-0 bg-gradient-to-r from-[color:var(--deep)]/80 via-[color:var(--deep)]/55 to-black/10" />
        <div className="relative text-center text-white px-4">
          <h1 className="text-5xl md:text-6xl font-serif font-bold mb-4">{title}</h1>
          <p className="text-xl max-w-2xl mx-auto opacity-90">{subtitle}</p>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-4 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-serif font-bold text-[color:var(--dk)] mb-4 text-center">Why Choose This Treatment?</h2>
          <div className="w-20 h-1 bg-[color:var(--teal)] mx-auto"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {benefits.map((benefit, i) => (
            <div key={i} className="bg-white p-8 rounded-2xl shadow-sm border border-black/5 hover:shadow-md transition-shadow">
              <div className="text-[color:var(--teal)] text-3xl mb-4">{benefit.icon}</div>
              <h3 className="text-xl font-bold text-[color:var(--dk)] mb-2">{benefit.title}</h3>
              <p className="text-[color:var(--muted)] leading-relaxed">{benefit.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Process Steps Section */}
      <section className="py-20 bg-[color:var(--deep)] text-white px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-serif font-bold mb-4">Your Journey to a Perfect Smile</h2>
            <p className="opacity-70">A step-by-step clinical approach</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {steps.map((step, i) => (
              <div key={i} className="relative text-center">
                <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center text-2xl font-bold text-[#C9A24A] mx-auto mb-6 border-2 border-white/15">
                  {i + 1}
                </div>
                <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                <p className="text-white/65 text-sm">{step.desc}</p>
                {i < steps.length - 1 && (
                  <div className="hidden md:block absolute top-8 left-[calc(50%+4rem)] w-[calc(100%-8rem)] h-[2px] bg-white/10"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Before/After Section */}
      <section className="py-20 px-4 max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-serif font-bold text-[color:var(--dk)] mb-4">Real Transformations</h2>
          <p className="text-[color:var(--muted)]">Actual patient results from our clinic</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 rounded-3xl overflow-hidden shadow-2xl">
          <div className="relative h-[400px]">
            <img src={beforeImg} alt="Before" className="w-full h-full object-cover" />
            <div className="absolute top-4 left-4 bg-black/60 text-white px-4 py-1 rounded-full text-sm font-bold uppercase tracking-widest">Before</div>
          </div>
          <div className="relative h-[400px]">
            <img src={afterImg} alt="After" className="w-full h-full object-cover" />
            <div className="absolute top-4 right-4 bg-[color:var(--teal)] text-white px-4 py-1 rounded-full text-sm font-bold uppercase tracking-widest">After</div>
          </div>
        </div>
      </section>

      {/* Global CTA Section */}
      <section className="py-20 px-4 bg-[color:var(--teal)] mt-20 rounded-t-[3rem] text-center">
        <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-6">Ready to Transform Your Smile?</h2>
        <p className="text-white/85 mb-10 max-w-2xl mx-auto">Schedule your zero-cost consultation today and get a personalized 3D treatment plan.</p>
        <div className="flex flex-col md:flex-row gap-4 justify-center">
          <button className="bg-white text-[color:var(--dk)] px-10 py-4 rounded-xl font-bold text-lg hover:bg-[color:var(--soft)] transition-colors shadow-lg">Book Appointment Now</button>
          <button className="bg-[color:var(--dk)] text-white px-10 py-4 rounded-xl font-bold text-lg hover:bg-[color:var(--deep)] transition-colors border border-white/20">View More Results</button>
        </div>
      </section>
    </div>
  );
};

export default ServicePage;
