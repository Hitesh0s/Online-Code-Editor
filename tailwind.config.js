/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Cyberpunk theme
        neonGreen: {
          100: '#d2ffd2',
          200: '#a5ffa5',
          300: '#79ff79',
          400: '#4cff4c',
          500: '#1fff1f',
          600: '#00ff00',
          700: '#00df00',
          800: '#00c000',
          900: '#00a000',
        },
        cyberBlack: {
          100: '#4a4a4a',
          200: '#3d3d3d',
          300: '#303030',
          400: '#242424',
          500: '#171717', 
          600: '#0a0a0a',
          700: '#070707',
          800: '#040404',
          900: '#000000',
        },
        accent: '#00ff00', // Neon green
        darkBg: '#0a0a0a',
        darkSecondary: '#171717',
        darkBorder: '#303030',
        darkText: '#e2e2e2',
        lightBg: '#f8f8f8',
        lightSecondary: '#e1e1e1',
        lightBorder: '#c4c4c4',
        lightText: '#202020',
      },
      boxShadow: {
        'neon': '0 0 5px #00ff00, 0 0 10px #00ff00',
        'neon-sm': '0 0 2px #00ff00, 0 0 4px #00ff00',
        'neon-lg': '0 0 10px #00ff00, 0 0 20px #00ff00',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow': 'glow 1.5s ease-in-out infinite alternate',
      },
      keyframes: {
        glow: {
          '0%': { boxShadow: '0 0 5px #00ff00, 0 0 10px #00ff00' },
          '100%': { boxShadow: '0 0 10px #00ff00, 0 0 20px #00ff00, 0 0 30px #00ff00' },
        },
      },
    },
  },
  plugins: [],
}