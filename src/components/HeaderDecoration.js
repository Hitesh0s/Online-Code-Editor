import React from 'react';

const HeaderDecoration = () => {
  return (
    <div className="absolute left-0 top-0 w-full overflow-hidden h-1 flex">
      <div className="h-full w-4 bg-neonGreen-500"></div>
      <div className="h-full w-8 bg-cyberBlack-500"></div>
      <div className="h-full w-2 bg-neonGreen-500"></div>
      <div className="h-full w-16 bg-cyberBlack-500"></div>
      <div className="h-full w-1 bg-neonGreen-500"></div>
      <div className="h-full flex-grow bg-cyberBlack-500"></div>
      <div className="h-full w-6 bg-neonGreen-600 animate-pulse"></div>
    </div>
  );
};

export default HeaderDecoration;
