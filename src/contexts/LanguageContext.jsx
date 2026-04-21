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
  fr: {
    nav: {
      home: 'Accueil',
      services: 'Services',
      smileDesigning: 'Conception de Sourire',
      alignersBraces: 'Aligneurs et Appareils Dentaires',
      dentalImplants: 'Implants Dentaires',
      aiPreview: 'Aperçu IA',
      results: 'Résultats',
      assessment: 'Évaluation',
      faq: 'FAQ',
      contact: 'Contact',
      signIn: 'Se Connecter',
      register: "S'inscrire",
      bookAppointment: 'Réserver une Consultation'
    },
    home: {
      heroTitle: 'Où les Sourires Parfaits Sont Créés',
      heroSubtitle: 'Dentisterie avancée pour les patients du monde entier. Technologie de précision, expertise accréditée et compassion véritable.',
      bookConsultation: 'Réserver une Consultation Gratuite',
      viewServices: 'Voir Nos Services'
    },
    booking: {
      title: 'Réservez Votre Consultation',
      subtitle: 'Consultation initiale gratuite avec nos dentistes experts'
    },
    assessment: {
      title: 'Quiz d\'Évaluation du Sourire',
      subtitle: 'Répondez à quelques questions pour obtenir des recommandations personnalisées'
    },
    faq: {
      title: 'Questions Fréquemment Posées',
      subtitle: 'Trouvez des réponses aux questions courantes sur nos traitements'
    }
  }
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
