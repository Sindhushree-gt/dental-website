import React from 'react';
import ServicePage from '../components/ServicePage';
import alignersBefore from '../images/braces and aligners before.png';
import alignersAfter from '../images/braces and aligners after.png';
import alignersBg from '../images/braces and aligners background.jpg';

const AlignersBraces = () => {
  const data = {
    title: "Aligners & Braces",
    subtitle: "Straighten your teeth invisibly and comfortably with world-class clear aligner technology.",
    heroImg: alignersBg,
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
    afterImg: "https://dentistry.uic.edu/wp-content/uploads/sites/741/2020/10/iStock-501427146-1090x595.jpg"
  };

  return <ServicePage {...data} />;
};

export default AlignersBraces;
