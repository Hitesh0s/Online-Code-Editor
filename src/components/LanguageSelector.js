import React, { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';

const LanguageSelector = ({ language, setLanguage }) => {
  const { isDarkMode } = useContext(ThemeContext);
  
  const languages = [
    { id: 'javascript', name: 'JavaScript', icon: 'js' },
    { id: 'python', name: 'Python', icon: 'py' },
    { id: 'java', name: 'Java', icon: 'java' },
    { id: 'cpp', name: 'C++', icon: 'cpp' },
    { id: 'c', name: 'C', icon: 'c' },
  ];
  
  return (
    <div className="relative inline-block">
      <select
        value={language}
        onChange={(e) => setLanguage(e.target.value)}
        className={`font-mono appearance-none rounded-md pl-8 pr-8 py-2 outline-none focus:ring-1 transition-all ${
          isDarkMode 
            ? 'bg-cyberBlack-400 border border-cyberBlack-300 hover:border-neonGreen-700 focus:border-neonGreen-600 text-white focus:ring-neonGreen-500'
            : 'bg-white border-2 border-blue-200 hover:border-blue-400 focus:border-blue-500 text-gray-900 focus:ring-blue-400 shadow-sm'
        }`}
      >
        {languages.map((lang) => (
          <option key={lang.id} value={lang.id} className={isDarkMode ? 'bg-cyberBlack-500' : 'bg-white'}>
            {lang.name}
          </option>
        ))}
      </select>
      <div className="absolute inset-y-0 left-0 flex items-center pl-2 pointer-events-none">
        <span className={`font-mono font-bold ${isDarkMode ? 'text-neonGreen-500' : 'text-blue-600'}`}>
          {language.slice(0, 2)}
        </span>
      </div>
      <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
        <svg className={`w-4 h-4 ${isDarkMode ? 'text-neonGreen-500' : 'text-blue-600'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </div>
  );
};

export default LanguageSelector;