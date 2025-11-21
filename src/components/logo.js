import React, { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';

const Logo = () => {
  const { isDarkMode } = useContext(ThemeContext);
  
  return (
    <div className="flex items-center">
      <div className="font-mono font-bold text-2xl relative">
        <span className={`tracking-wider ${
          isDarkMode ? 'text-neonGreen-600' : 'text-blue-600'
        }`}>
          &lt;/&gt;
        </span>
        <span className={`ml-2 tracking-tight ${
          isDarkMode ? 'text-white' : 'text-gray-900'
        }`}>
          CODE
          <span className={isDarkMode ? 'text-neonGreen-500' : 'text-blue-600'}>
            X
          </span>
        </span>
        <div className={`absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r ${
          isDarkMode 
            ? 'from-transparent via-neonGreen-500 to-transparent'
            : 'from-transparent via-blue-500 to-transparent'
        }`}></div>
      </div>
    </div>
  );
};

export default Logo;