import React from 'react';
import ServicePage from '../components/ServicePage';

const AlignersBraces = () => {
  const data = {
    title: "Aligners & Braces",
    subtitle: "Straighten your teeth invisibly and comfortably with world-class clear aligner technology.",
    heroImg: "https://images.unsplash.com/photo-1588776814546-1ffbb3b89fd1?w=1600&q=80",
    benefits: [
      { icon: "✨", title: "Completely Invisible", desc: "No one will know you're wearing them. Clear aligners are virtually undetectable." },
      { icon: "🥗", title: "Eat Anything", desc: "Since they are removable, you don't have any food restrictions during treatment." },
      { icon: "📉", title: "Faster Results", desc: "Get your perfectly aligned smile up to 2x faster than traditional metal braces." }
    ],
    steps: [
      { title: "3D Digital Scan", desc: "Precise intraoral scan to map out your current tooth alignment." },
      { title: "ClinCheck Plan", desc: "View a 3D animation of how each tooth will move over time." },
      { title: "Custom Aligners", desc: "Receive your set of custom-made, biologically compatible aligners." },
      { title: "Perfect Smile", desc: "Wear them 22 hours a day and watch your smile transform gradually." }
    ],
    beforeImg: "https://images.unsplash.com/photo-1598256989800-fe5f95da9787?w=800&q=80",
    afterImg: "https://images.unsplash.com/photo-1513412803932-49f9003a7281?w=800&q=80"
  };

  return <ServicePage {...data} />;
};

export default AlignersBraces;
