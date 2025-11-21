import React from 'react';

const OutputWindow = ({ output, isError }) => {
  return (
    <div className="flex-1 p-4 overflow-auto">
      <div className="flex items-center mb-2">
        <div
          className={`
            w-3 h-3 rounded-full mr-2
            ${output 
              ? isError
                ? 'bg-red-500'
                : 'bg-blue-600 dark:bg-neonGreen-500'
              : 'bg-gray-400 dark:bg-gray-500'
            }
          `}
        ></div>

        <h2
          className="
            text-lg font-medium font-mono
            text-gray-800
            dark:text-white
          "
        >
          Output
        </h2>
      </div>

      <div
        className={`
          font-mono p-4 rounded h-full whitespace-pre-wrap overflow-auto
          border bg-white text-gray-800 border-gray-300

          dark:border-cyberBlack-300 dark:bg-cyberBlack-500
          ${isError ? 'text-red-600 dark:text-red-400' : 'text-blue-700 dark:text-neonGreen-400'}
        `}
      >
        {output || '> Waiting for code execution...'}
      </div>
    </div>
  );
};

export default OutputWindow;
