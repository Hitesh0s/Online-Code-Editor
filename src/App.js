import React from 'react';
import { ThemeProvider } from './context/ThemeContext';
import CodeEditor from './components/CodeEditor';

function App() {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-lightBg dark:bg-darkBg text-lightText dark:text-darkText">
        <CodeEditor />
      </div>
    </ThemeProvider>
  );
}

export default App;