import React, { useState, useContext, useRef, useEffect } from 'react';
import Editor from '@monaco-editor/react';
import axios from 'axios';
import { ThemeContext } from '../context/ThemeContext';
import ThemeToggle from './ThemeToggle';
import LanguageSelector from './LanguageSelector';
import OutputWindow from './OutputWindow';
import InputField from './InputField';
import SettingsPanel from './SettingsPanel';
import CyberButton from './CyberButton';
import Logo from './logo';
import HeaderDecoration from './HeaderDecoration';
import StatsBar from './StatsBar';
import { codeSnippets } from './CodeSnippets';

const CodeEditor = () => {
  const { isDarkMode } = useContext(ThemeContext);
  
  // ⬇⬇⬇ NEW - store last code per language
  const [savedCode, setSavedCode] = useState(() => {
    const stored = localStorage.getItem("savedCode");
    return stored ? JSON.parse(stored) : {};
  });

  const [language, setLanguage] = useState('javascript');
  const [code, setCode] = useState(codeSnippets.javascript);
  const [output, setOutput] = useState('');
  const [stdin, setStdin] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [isError, setIsError] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [settings, setSettings] = useState({
    fontSize: 14,
    tabSize: 2,
    wordWrap: false,
    minimap: false,
    autoSave: true,
  });
  
  const editorRef = useRef(null);

  // ⬇ Modified: language switch now loads last saved language code
  useEffect(() => {
    if (savedCode[language] !== undefined) {
      setCode(savedCode[language]);
    } else {
      setCode(codeSnippets[language]);
    }
  }, [language]);

  // ⬇ Modified: auto save stores per-language snapshot
  useEffect(() => {
    setSavedCode(prev => {
      const updated = { ...prev, [language]: code };
      localStorage.setItem("savedCode", JSON.stringify(updated));
      return updated;
    });
  }, [code, language]);

  const handleEditorDidMount = (editor, monaco) => {
    editorRef.current = editor;
    
    monaco.editor.defineTheme('cyberpunkTheme', {
      base: 'vs-dark',
      inherit: true,
      rules: [
        { token: 'comment', foreground: '6A9955', fontStyle: 'italic' },
        { token: 'keyword', foreground: '00ff00' },
        { token: 'string', foreground: 'ce9178' },
        { token: 'number', foreground: 'b5cea8' },
        { token: 'operator', foreground: 'd4d4d4' },
      ],
      colors: {
        'editor.background': '#0a0a0a',
        'editor.foreground': '#d4d4d4',
        'editorCursor.foreground': '#00ff00',
        'editor.lineHighlightBackground': '#171717',
        'editorLineNumber.foreground': '#3d3d3d',
        'editorLineNumber.activeForeground': '#00ff00',
        'editor.selectionBackground': '#264f78',
        'editor.selectionHighlightBackground': '#333333',
      }
    });

    monaco.editor.defineTheme('lightTheme', {
      base: 'vs',
      inherit: true,
      rules: [
        { token: 'comment', foreground: '6A9955', fontStyle: 'italic' },
        { token: 'keyword', foreground: '0066CC' },
        { token: 'string', foreground: 'A31515' },
        { token: 'number', foreground: '098658' },
        { token: 'operator', foreground: '333333' },
      ],
      colors: {
        'editor.background': '#ffffff',
        'editor.foreground': '#333333',
        'editorCursor.foreground': '#0066CC',
        'editor.lineHighlightBackground': '#f5f5f5',
        'editorLineNumber.foreground': '#999999',
        'editorLineNumber.activeForeground': '#0066CC',
        'editor.selectionBackground': '#ADD6FF',
        'editor.selectionHighlightBackground': '#e8e8e8',
      }
    });

    // keep your theme fix
    monaco.editor.setTheme(isDarkMode ? 'cyberpunkTheme' : 'lightTheme');

    editor.updateOptions({
      fontFamily: 'Consolas, "Courier New", monospace',
      fontLigatures: true,
    });

    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter, runCode);
    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyS, () => {
      localStorage.setItem(`code-${language}`, editor.getValue());
      const savedElement = document.createElement('div');
      savedElement.innerText = 'SAVED';
      savedElement.className = isDarkMode 
        ? 'fixed bottom-8 right-8 bg-green-400 text-black px-4 py-2 rounded font-mono font-bold z-50'
        : 'fixed bottom-8 right-8 bg-blue-500 text-white px-4 py-2 rounded font-mono font-bold z-50 shadow-lg';
      document.body.appendChild(savedElement);
      setTimeout(() => {
        savedElement.className += ' opacity-0 transition-opacity duration-500';
        setTimeout(() => { document.body.removeChild(savedElement); }, 500);
      }, 1000);
    });
  };

  const runCode = async () => {
    setIsRunning(true);
    setOutput('');
    setIsError(false);

    try {
      const languageMap = {
        javascript: 63,
        python: 71,
        java: 62,
        cpp: 54,
        c: 50,
      };

      const response = await axios.post('https://judge0-ce.p.rapidapi.com/submissions', {
        source_code: code,
        language_id: languageMap[language],
        stdin: stdin,
      }, {
        headers: {
          'content-type': 'application/json',
          'X-RapidAPI-Key': process.env.REACT_APP_JUDGE0_KEY,
          'X-RapidAPI-Host': process.env.REACT_APP_JUDGE0_HOST
        }
      });

      const token = response.data.token;
      let result;

      do {
        await new Promise(resolve => setTimeout(resolve, 1000));
        result = await axios.get(`https://judge0-ce.p.rapidapi.com/submissions/${token}`, {
          headers: {
            'X-RapidAPI-Key': process.env.REACT_APP_JUDGE0_KEY,
            'X-RapidAPI-Host': process.env.REACT_APP_JUDGE0_HOST
          }
        });
      } while (result.data.status?.id <= 2);

      if (result.data.stderr) {
        setIsError(true);
        setOutput(result.data.stderr);
      } else if (result.data.compile_output && result.data.status.id !== 3) {
        setIsError(true);
        setOutput(result.data.compile_output);
      } else {
        setOutput(result.data.stdout || 'Execution completed with no output.');
      }
    } catch (error) {
      setIsError(true);
      setOutput(`Error: ${error.message}`);
    } finally {
      setIsRunning(false);
    }
  };

  const loadSnippet = () => {
    if (window.confirm("Load the default template for this language? This will replace your current code.")) {
      setCode(codeSnippets[language]);
    }
  };

  const clearOutput = () => {
    setOutput('');
    setIsError(false);
  };

  const downloadCode = () => {
    const fileExtensions = {
      javascript: 'js',
      python: 'py',
      java: 'java',
      cpp: 'cpp',
      c: 'c'
    };
    
    const element = document.createElement('a');
    const file = new Blob([code], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = `code.${fileExtensions[language]}`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const copyCode = () => {
    navigator.clipboard.writeText(code).then(() => {
      const copiedElement = document.createElement('div');
      copiedElement.innerText = 'COPIED';
      copiedElement.className = isDarkMode
        ? 'fixed bottom-8 right-8 bg-blue-400 text-black px-4 py-2 rounded font-mono font-bold z-50'
        : 'fixed bottom-8 right-8 bg-purple-500 text-white px-4 py-2 rounded font-mono font-bold z-50 shadow-lg';
      document.body.appendChild(copiedElement);
      setTimeout(() => {
        copiedElement.className += ' opacity-0 transition-opacity duration-500';
        setTimeout(() => { document.body.removeChild(copiedElement); }, 500);
      }, 1000);
    });
  };

  const getCodeStats = () => {
    const lines = code.split('\n').length;
    const chars = code.length;
    const words = code.split(/\s+/).filter(word => word.length > 0).length;
    return { lines, chars, words };
  };

  return (
    <div className={`flex flex-col h-screen ${isDarkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-900'}`}>
      {settingsOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="settings-modal">
          <div className="flex items-start justify-end pt-16 px-4">
            <SettingsPanel 
              settings={settings} 
              updateSettings={setSettings} 
              isOpen={settingsOpen} 
              setIsOpen={setSettingsOpen} 
            />
          </div>
        </div>
      )}
      
      <header className={`${isDarkMode ? 'bg-black border-green-500' : 'bg-white border-blue-300 shadow-md'} border-b py-3 px-4 relative overflow-hidden`}>
        <HeaderDecoration />
        <div className="container mx-auto flex justify-between items-center z-10 relative">
          <div className="flex items-center">
            <Logo className="h-8 w-8 mr-3" />
          </div>
          <div className="flex items-center space-x-4">
            <LanguageSelector language={language} setLanguage={setLanguage} />
            <button
              onClick={loadSnippet}
              className={`p-2 rounded-md ${
                isDarkMode 
                  ? 'bg-gray-800 hover:bg-gray-700 border border-green-500 text-green-400' 
                  : 'bg-blue-50 hover:bg-blue-100 border border-blue-300 text-blue-600'
              } transition-colors`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
              </svg>
            </button>
            <button
              onClick={downloadCode}
              className={`p-2 rounded-md ${
                isDarkMode 
                  ? 'bg-gray-800 hover:bg-gray-700 border border-blue-500 text-blue-400' 
                  : 'bg-purple-50 hover:bg-purple-100 border border-purple-300 text-purple-600'
              } transition-colors`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4 4l-4-4m0 0l-4-4m4 4v12" />
              </svg>
            </button>
            <button
              onClick={copyCode}
              className={`p-2 rounded-md ${
                isDarkMode 
                  ? 'bg-gray-800 hover:bg-gray-700 border border-purple-500 text-purple-400' 
                  : 'bg-indigo-50 hover:bg-indigo-100 border border-indigo-300 text-indigo-600'
              } transition-colors`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
            </button>
            <button
              onClick={() => setSettingsOpen(!settingsOpen)}
              className={`p-2 rounded-md ${
                isDarkMode 
                  ? 'bg-gray-800 hover:bg-gray-700 border border-yellow-500 text-yellow-400' 
                  : 'bg-amber-50 hover:bg-amber-100 border border-amber-300 text-amber-600'
              } transition-colors`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </button>
            <ThemeToggle />
          </div>
        </div>
      </header>
      <StatsBar stats={getCodeStats()} language={language} codeLength={code.length} />

      <div className="flex-1 flex flex-col md:flex-row">
        <div className={`flex-1 h-1/2 md:h-auto border ${isDarkMode ? 'border-gray-800' : 'border-gray-300'}`}>
          <Editor
            height="100%"
            language={language}
            value={code}
            theme={isDarkMode ? 'cyberpunkTheme' : 'lightTheme'}
            
            // ⬇ Updated: saving per-language state
            onChange={(value) => {
              setCode(value);
              setSavedCode(prev => {
                const updated = { ...prev, [language]: value };
                localStorage.setItem("savedCode", JSON.stringify(updated));
                return updated;
              });
            }}

            onMount={handleEditorDidMount}
            options={{
              minimap: { enabled: settings.minimap },
              fontSize: settings.fontSize,
              tabSize: settings.tabSize,
              wordWrap: settings.wordWrap ? 'on' : 'off',
              scrollBeyondLastLine: false,
              automaticLayout: true,
              lineNumbers: 'on',
              glyphMargin: false,
              folding: true,
              lineDecorationsWidth: 10,
              lineNumbersMinChars: 3
            }}
          />
        </div>
        <div className={`w-full md:w-2/5 h-1/2 md:h-auto border-t md:border-t-0 md:border-l ${
          isDarkMode ? 'border-gray-800 bg-black' : 'border-gray-300 bg-[#F1F1F1]'
        } flex flex-col`}>
          <div className={`flex ${isDarkMode ? 'border-gray-800' : 'border-gray-200'} border-b`}>
            <button
              className={`flex-1 py-2 px-4 font-medium text-center ${
                isDarkMode 
                  ? (isError ? 'text-red-400' : 'text-green-400')
                  : (isError ? 'text-red-600' : 'text-blue-600')
              }`}
            >
              Output
            </button>
            <button
              onClick={clearOutput}
              className={`px-3 py-1 m-1 rounded text-xs ${
                isDarkMode 
                  ? 'bg-gray-800 hover:bg-gray-700 text-gray-400'
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-600'
              } transition-colors`}
            >
              Clear
            </button>
          </div>
          <OutputWindow output={output} isError={isError} />
          <InputField stdin={stdin} setStdin={setStdin} />
          <div className={`p-4 border-t ${isDarkMode ? 'border-gray-800' : 'border-gray-200'}`}>
            <CyberButton
              onClick={runCode}
              disabled={isRunning}
              className="w-full"
            >
              {isRunning ? 'EXECUTING...' : 'RUN CODE (Ctrl+Enter)'}
            </CyberButton>
            <div className={`mt-3 text-xs grid grid-cols-2 gap-2 ${isDarkMode ? 'text-gray-500' : 'text-gray-600'}`}>
              <div className="flex items-center">
                <span className={`w-3 h-3 mr-1 rounded-full ${isDarkMode ? 'bg-green-500' : 'bg-blue-500'}`}></span>
                <span>Run: Ctrl+Enter</span>
              </div>
              <div className="flex items-center">
                <span className={`w-3 h-3 mr-1 rounded-full ${isDarkMode ? 'bg-blue-500' : 'bg-purple-500'}`}></span>
                <span>Save: Ctrl+S</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodeEditor;
