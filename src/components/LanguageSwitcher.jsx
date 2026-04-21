import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const LanguageSwitcher = () => {
  const { language, setLanguage } = useLanguage();

  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'es', name: 'Español', flag: '🇪🇸' },
    { code: 'fr', name: 'Français', flag: '🇫🇷' }
  ];

  return (
    <div className="flex items-center gap-2">
      <span className="text-xs font-bold text-gray-500 uppercase">Language:</span>
      <div className="flex gap-1">
        {languages.map(lang => (
          <button
            key={lang.code}
            onClick={() => setLanguage(lang.code)}
            className={`px-3 py-1 rounded-lg text-sm font-bold transition-all ${
              language === lang.code
                ? 'bg-[color:var(--teal)] text-white'
                : 'bg-[color:var(--soft)] text-[color:var(--dk)] hover:bg-white border border-black/5'
            }`}
            title={lang.name}
          >
            {lang.flag} {lang.code.toUpperCase()}
          </button>
        ))}
      </div>
    </div>
  );
};

export default LanguageSwitcher;
