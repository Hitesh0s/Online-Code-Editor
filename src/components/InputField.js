import React, { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';

const InputField = ({ stdin, setStdin }) => {
  const { isDarkMode } = useContext(ThemeContext);

  // Light-mode classes (clean blue focus)
  const lightClasses = `
    w-full h-24 p-3 rounded font-mono resize-none
    border border-gray-300 text-gray-800 bg-white
    placeholder-gray-400
    focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500
    transition-colors
  `;

  // Dark-mode classes (restored original neon green focus + no blue)
  const darkClasses = `
    w-full h-24 p-3 rounded font-mono resize-none
    border-cyberBlack-300 bg-cyberBlack-500 text-white
    placeholder-gray-500
    focus:outline-none
    focus:border-neonGreen-500 focus:ring-1 focus:ring-neonGreen-500
    transition-colors
  `;

  return (
    <div
      className={`
        p-4 border-t
        ${isDarkMode ? 'border-cyberBlack-300' : 'border-gray-300'}
      `}
    >
      <div className="flex items-center mb-2">
        <svg
          className={`w-4 h-4 mr-2 ${isDarkMode ? 'text-neonGreen-500' : 'text-gray-700'}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
        <h2 className={`${isDarkMode ? 'text-white' : 'text-gray-800'} text-lg font-medium font-mono`}>
          Input (stdin)
        </h2>
      </div>

      <textarea
        value={stdin}
        onChange={(e) => setStdin(e.target.value)}
        placeholder="> Enter input for your program here..."
        className={isDarkMode ? darkClasses : lightClasses}
      />
    </div>
  );
};


export default InputField;
