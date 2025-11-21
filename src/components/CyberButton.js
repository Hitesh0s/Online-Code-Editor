import React, { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';

const CyberButton = ({ onClick, disabled, children, className = '', isRunning }) => {
  const { isDarkMode } = useContext(ThemeContext);
  
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`relative overflow-hidden font-mono font-bold py-2 px-6 transition-all duration-300 ${
        isDarkMode
          ? `bg-cyberBlack-500 border border-neonGreen-500 text-neonGreen-500 
             ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-neonGreen-600 hover:text-cyberBlack-900'}`
          : `bg-blue-600 border-2 border-blue-700 text-white shadow-lg
             ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700 hover:shadow-xl active:scale-95'}`
      } ${className}`}
    >
      <span className="relative z-10 flex items-center justify-center">
        {isRunning ? (
          <>
            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-current" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Running
          </>
        ) : (
          <>
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {children}
          </>
        )}
      </span>
      {!disabled && isDarkMode && (
        <>
          <span className="absolute top-0 left-0 w-2 h-full bg-neonGreen-500 transform -skew-x-12 -translate-x-full z-5 transition-transform duration-700 ease-in-out group-hover:translate-x-[2000%]"></span>
          <span className="absolute bottom-0 right-0 w-full h-0.5 bg-neonGreen-500"></span>
          <span className="absolute top-0 right-0 w-0.5 h-full bg-neonGreen-500"></span>
        </>
      )}
    </button>
  );
};

export default CyberButton;