import React from 'react';

const SettingsPanel = ({ settings, updateSettings, isOpen, setIsOpen }) => {
  if (!isOpen) return null;

  // Improved toggle handler to make sure clicking anywhere on the toggle works
  const handleToggle = (setting) => {
    updateSettings({ ...settings, [setting]: !settings[setting] });
  };

  return (
    <div className="absolute top-16 right-4 w-80 bg-cyberBlack-500 border border-neonGreen-700 rounded shadow-lg z-50 backdrop-blur-sm shadow-neon-sm">
      <div className="flex justify-between items-center p-4 border-b border-cyberBlack-300">
        <h2 className="font-mono font-bold text-neonGreen-500">SYSTEM SETTINGS</h2>
        <button 
          onClick={() => setIsOpen(false)}
          className="text-neonGreen-500 hover:text-neonGreen-400 transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      
      <div className="p-4 space-y-4">
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-300 font-mono">Font Size (px)</label>
          <input
            type="range"
            min="12"
            max="24"
            step="2"
            value={settings.fontSize}
            onChange={(e) => updateSettings({ ...settings, fontSize: Number(e.target.value) })}
            className="w-full h-2 bg-cyberBlack-400 rounded-lg appearance-none cursor-pointer accent-neonGreen-500"
          />
          <div className="flex justify-between mt-1 text-xs text-gray-400">
            <span>12px</span>
            <span>{settings.fontSize}px</span>
            <span>24px</span>
          </div>
        </div>
        
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-300 font-mono">Tab Size</label>
          <div className="flex gap-2">
            {[2, 4, 8].map(tabSize => (
              <button
                key={tabSize}
                onClick={() => updateSettings({ ...settings, tabSize })}
                className={`flex-1 py-1 border ${
                  settings.tabSize === tabSize 
                    ? 'bg-neonGreen-600 text-black border-neonGreen-500' 
                    : 'bg-cyberBlack-400 text-gray-300 border-cyberBlack-300 hover:border-neonGreen-700'
                } rounded-md transition-colors font-mono`}
              >
                {tabSize}
              </button>
            ))}
          </div>
        </div>
        
        <div className="space-y-2">
          {/* Word Wrap Toggle */}
          <div className="flex items-center justify-between">
            <label 
              htmlFor="word-wrap" 
              className="text-sm font-medium text-gray-300 font-mono cursor-pointer"
            >
              Word Wrap
            </label>
            <div 
              className="relative w-12 h-6 cursor-pointer"
              onClick={() => handleToggle('wordWrap')}
            >
              <div className="block bg-cyberBlack-400 w-12 h-6 rounded-full"></div>
              <div 
                className={`absolute left-1 top-1 bg-gray-600 w-4 h-4 rounded-full transition-transform duration-200 ease-in-out ${
                  settings.wordWrap ? 'transform translate-x-6 bg-neonGreen-500' : ''
                }`}
              ></div>
            </div>
          </div>
          
          {/* Show Minimap Toggle */}
          <div className="flex items-center justify-between">
            <label 
              htmlFor="minimap" 
              className="text-sm font-medium text-gray-300 font-mono cursor-pointer"
            >
              Show Minimap
            </label>
            <div 
              className="relative w-12 h-6 cursor-pointer"
              onClick={() => handleToggle('minimap')}
            >
              <div className="block bg-cyberBlack-400 w-12 h-6 rounded-full"></div>
              <div 
                className={`absolute left-1 top-1 bg-gray-600 w-4 h-4 rounded-full transition-transform duration-200 ease-in-out ${
                  settings.minimap ? 'transform translate-x-6 bg-neonGreen-500' : ''
                }`}
              ></div>
            </div>
          </div>
          
          {/* Auto Save Toggle */}
          <div className="flex items-center justify-between">
            <label 
              htmlFor="autoSave" 
              className="text-sm font-medium text-gray-300 font-mono cursor-pointer"
            >
              Auto Save
            </label>
            <div 
              className="relative w-12 h-6 cursor-pointer"
              onClick={() => handleToggle('autoSave')}
            >
              <div className="block bg-cyberBlack-400 w-12 h-6 rounded-full"></div>
              <div 
                className={`absolute left-1 top-1 bg-gray-600 w-4 h-4 rounded-full transition-transform duration-200 ease-in-out ${
                  settings.autoSave ? 'transform translate-x-6 bg-neonGreen-500' : ''
                }`}
              ></div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="p-4 border-t border-cyberBlack-300 text-center">
        <button 
          onClick={() => setIsOpen(false)}
          className="font-mono text-sm bg-cyberBlack-400 border border-neonGreen-700 hover:border-neonGreen-500 text-neonGreen-500 px-4 py-1 rounded transition-colors"
        >
          Apply Settings
        </button>
      </div>
    </div>
  );
};

export default SettingsPanel;