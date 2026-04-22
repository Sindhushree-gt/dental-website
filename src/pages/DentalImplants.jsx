import React from 'react';
import ServicePage from '../components/ServicePage';
import implantsBefore from '../images/dental implant before.png';
import implantsAfter from '../images/dental implant after.png';
import implantsBg from '../images/dental implant background.jpg';

const DentalImplants = () => {
  const data = {
    title: "Dental Implants",
    subtitle: "The gold standard for permanent tooth replacement. Restore your bite and your confidence.",
    heroImg: implantsBg,
    benefits: [
      { icon: "🛡️", title: "Lifetime Solution", desc: "Crafted from biologically compatible titanium, implants are built to last a lifetime." },
      { icon: "🥩", title: "Full Biting Power", desc: "Enjoy your favorite foods again without worry. Implants feel exactly like real teeth." },
      { icon: "🦴", title: "Prevents Bone Loss", desc: "Implants stimulate bone growth and prevent facial sagging caused by missing teeth." }
    ],
    steps: [
      { title: "CBCT Scan", desc: "A 3D X-ray allows us to map bone density and nerve locations accurately." },
      { title: "Implant Surgery", desc: "A simple, painless procedure to place the titanium root and a temporary crown." },
      { title: "Healing Phase", desc: "Wait 3-6 months for the implant to fuse naturally with your jawbone." },
      { title: "Final Crown", desc: "A custom porcelain crown is fitted for a seamless, natural look and feel." }
    ],
    afterImg: "https://www.sanmarcosdental.com/blog/wp-content/uploads/implant-diagram.jpeg"
  };

  return <ServicePage {...data} />;
};

export default DentalImplants;
