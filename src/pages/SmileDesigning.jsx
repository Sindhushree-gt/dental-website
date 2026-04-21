import React from 'react';
import ServicePage from '../components/ServicePage';
import smileDesignBefore from '../images/smile design before.png';
import smileDesignAfter from '../images/smile design after.png';

const SmileDesigning = () => {
  const data = {
    title: "Digital Smile Designing",
    subtitle: "Precision-engineered smile makeovers tailored to your facial features and personality.",
    heroImg: "https://images.unsplash.com/photo-1629909613654-28a3a7c4bd45?w=1600&q=80",
    benefits: [
      { icon: "🎨", title: "Aesthetic Harmony", desc: "We align your teeth according to the 'Golden Ratio' for perfect facial symmetry." },
      { icon: "🔬", title: "3D Visualisation", desc: "See your future smile on-screen before we even touch your teeth." },
      { icon: "⚡", title: "Single Day Procedure", desc: "Many of our smile design cases are completed in just one or two sessions." }
    ],
    steps: [
      { title: "Digital Scan", desc: "We take high-res digital impressions with our intraoral scanner." },
      { title: "Artistic Mapping", desc: "Our specialists design your smile curve on professional dental software." },
      { title: "Trial Design", desc: "You try a temporary mockup to ensure you love the look and feel." },
      { title: "Final Reveal", desc: "Premium E-max veneers or bonding are applied for your final look." }
    ],
    beforeImg: smileDesignBefore,
    afterImg: smileDesignAfter
  };

  return <ServicePage {...data} />;
};

export default SmileDesigning;
