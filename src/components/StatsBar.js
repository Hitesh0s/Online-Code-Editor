import React, { useState, useEffect } from 'react';

const StatsBar = ({ language, codeLength }) => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div
      className="
        font-mono text-xs
        /* LIGHT MODE */
        bg-[#d5ddef] text-gray-800 border-t border-gray-300 backdrop-blur-sm
        /* DARK MODE */
        dark:bg-cyberBlack-400 dark:text-neonGreen-500 dark:border-cyberBlack-300
        flex items-center px-4 py-1
      "
    >
      {/* Status Dot + Language */}
      <div className="mr-6 flex items-center">
        <span
          className="
            inline-block w-2 h-2 rounded-full
            bg-blue-600
            dark:bg-neonGreen-500
            mr-2
          "
        ></span>
        <span>{language.toUpperCase()}</span>
      </div>

      {/* Characters */}
      <div className="mr-6">
        <span className="dark:text-neonGreen-500">Chars: {codeLength}</span>
      </div>

      {/* Time */}
      <div className="mr-6">
        <span className="dark:text-neonGreen-500">
          {time.toLocaleTimeString()}
        </span>
      </div>

      {/* READY text */}
      <div className="flex-grow text-right">
        <span
          className="
            text-gray-600
            dark:text-neonGreen-500
            animate-pulse
          "
        >
          READY
        </span>
      </div>
    </div>
  );
};

export default StatsBar;
