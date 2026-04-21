import React, { createContext, useState, useContext } from 'react';

const translations = {
  en: {
    nav: {
      home: 'Home',
      services: 'Services',
      smileDesigning: 'Smile Designing',
      alignersBraces: 'Aligners & Braces',
      dentalImplants: 'Dental Implants',
      aiPreview: 'AI Preview',
      results: 'Results',
      assessment: 'Assessment',
      faq: 'FAQ',
      contact: 'Contact',
      signIn: 'Sign In',
      register: 'Register',
      bookAppointment: 'Book Appointment'
    },
    home: {
      heroTitle: 'Where Perfect Smiles Are Crafted',
      heroSubtitle: 'Advanced dentistry for patients worldwide. Precision technology, accredited expertise, and genuine compassion.',
      bookConsultation: 'Book Free Consultation',
      viewServices: 'View Our Services'
    },
    booking: {
      title: 'Book Your Consultation',
      subtitle: 'Zero-cost initial consultation with our expert dentists'
    },
    assessment: {
      title: 'Smile Assessment Quiz',
      subtitle: 'Answer a few quick questions to get personalized recommendations'
    },
    faq: {
      title: 'Frequently Asked Questions',
      subtitle: 'Find answers to common questions about our treatments'
    }
  },
  es: {
    nav: {
      home: 'Inicio',
      services: 'Servicios',
      smileDesigning: 'Diseño de Sonrisa',
      alignersBraces: 'Alineadores y Frenos',
      dentalImplants: 'Implantes Dentales',
      aiPreview: 'Vista Previa IA',
      results: 'Resultados',
      assessment: 'Evaluación',
      faq: 'Preguntas Frecuentes',
      contact: 'Contacto',
      signIn: 'Iniciar Sesión',
      register: 'Registrarse',
      bookAppointment: 'Reservar Cita'
    },
    home: {
      heroTitle: 'Donde Se Crean Sonrisas Perfectas',
      heroSubtitle: 'Odontología avanzada para pacientes de todo el mundo. Tecnología de precisión, experiencia acreditada y compasión genuina.',
      bookConsultation: 'Reservar Consulta Gratuita',
      viewServices: 'Ver Nuestros Servicios'
    },
    booking: {
      title: 'Reserva Tu Consulta',
      subtitle: 'Consulta inicial sin costo con nuestros dentistas expertos'
    },
    assessment: {
      title: 'Cuestionario de Evaluación de Sonrisa',
      subtitle: 'Responde algunas preguntas para obtener recomendaciones personalizadas'
    },
    faq: {
      title: 'Preguntas Frecuentes',
      subtitle: 'Encuentra respuestas a preguntas comunes sobre nuestros tratamientos'
    }
  },
};

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('en');

  const t = (path) => {
    const keys = path.split('.');
    let value = translations[language];
    for (const key of keys) {
      value = value?.[key];
    }
    return value || path;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
};

export default translations;
