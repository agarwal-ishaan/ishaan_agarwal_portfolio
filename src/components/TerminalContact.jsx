import React, { useState, useRef, useEffect } from 'react';
import { Terminal as TerminalIcon } from 'lucide-react';

const TerminalContact = () => {
  const [history, setHistory] = useState([
    { type: 'system', text: 'Portfolio Contact Interface v2.1.0' },
    { type: 'system', text: 'Use command send_message --body "your message" to send a message to me.' },
    { type: 'system', text: 'Type "help" to see available commands.' }
  ]);
  const [inputVal, setInputVal] = useState('');
  const [suggestion, setSuggestion] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  const COMMANDS = ['help', 'clear', 'whoami', 'send_message --email "" --body ""'];

  // Calculate suggestions
  useEffect(() => {
    if (!inputVal) {
      setSuggestion('');
      return;
    }

    const match = COMMANDS.find(cmd => cmd.startsWith(inputVal.toLowerCase()));
    if (match && match !== inputVal) {
      setSuggestion(match);
    } else {
      setSuggestion('');
    }
  }, [inputVal]);

  // Handle Tab completion
  const onKeyDown = (e) => {
    if (e.key === 'Tab' && suggestion) {
      e.preventDefault();
      setInputVal(suggestion);
    }
    // Also support right arrow for completion
    if (e.key === 'ArrowRight' && suggestion && e.target.selectionStart === inputVal.length) {
      setInputVal(suggestion);
    }
  };

  // Auto-scroll to bottom
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const handleCommand = async (cmd) => {
    const trimmed = cmd.trim();
    if (!trimmed) return;

    // Add user command to history
    setHistory(prev => [...prev, { type: 'user', text: trimmed }]);

    setIsProcessing(true);
    const parts = trimmed.split(' ');
    const rootCommand = parts[0].toLowerCase();

    const pushResponse = (text, delay = 0) => {
      return new Promise(resolve => {
        setTimeout(() => {
          setHistory(prev => [...prev, { type: 'system', text }]);
          resolve();
        }, delay);
      });
    };

    switch (rootCommand) {
      case 'help':
        await pushResponse('Available commands:', 200);
        await pushResponse('  whoami         - Print current user session', 100);
        await pushResponse('  clear          - Clear terminal history', 100);
        await pushResponse('  send_message   - Dispatch a message to Ishaan', 100);
        await pushResponse('                   Example: send_message --body "Hi!"', 100);
        break;

      case 'clear':
        setHistory([]);
        break;

      case 'whoami':
        await pushResponse('guest_0x4f2A', 300);
        break;

      case 'send_message':
        await pushResponse('Preparing local mail client...', 400);

        const bodyMatch = trimmed.match(/--body\s+"([^"]+)"/);

        if (bodyMatch) {
          const userMessage = bodyMatch[1];

          await pushResponse('[ OK ] Launching email interface...', 500);

          // Encode the message so spaces and special characters format correctly in the email draft
          const encodedMessage = encodeURIComponent(userMessage);

          // Triggers the browser to open the user's default mail app
          window.location.href = `mailto:ia299@cornell.edu?subject=Hello Ishaan! Let's Connect.&body=${encodedMessage}`;

        } else {
          await pushResponse('[ ERROR ] Missing required flags.', 500);
          await pushResponse('Usage: send_message --body "your message"', 100);
        }
        break;

      default:
        await pushResponse(`command not found: ${rootCommand}`, 200);
        await pushResponse('Type "help" for a list of available commands.', 100);
    }

    setIsProcessing(false);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (isProcessing) return;
    handleCommand(inputVal);
    setInputVal('');
  };

  return (
    <div className="w-full max-w-3xl mx-auto rounded-xl shadow-2xl overflow-hidden border border-gray-800 bg-[#0c0c0c] font-mono text-sm">
      {/* MacOS Window Header */}
      <div className="bg-[#1f1f1f] px-4 py-3 flex items-center gap-2 border-b border-gray-800">
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
        </div>
        <div className="flex-1 text-center text-gray-400 text-xs font-bold font-sans flex justify-center items-center gap-2">
          <TerminalIcon size={14} /> contact_ishaan.sh
        </div>
      </div>

      {/* Terminal Body */}
      <div
        className="h-80 p-4 overflow-y-auto text-gray-300 custom-scrollbar"
        onClick={() => inputRef.current?.focus()}
      >
        <div className="space-y-1 mb-2">
          {history.map((line, i) => (
            <div key={i} className="flex">
              {line.type === 'user' && <span className="text-primary-500 mr-2 shrink-0">guest@portfolio:~$</span>}
              <span className={`${line.type === 'system' && line.text.includes('[ ERROR ]') ? 'text-red-400' : ''} 
                                 ${line.type === 'system' && line.text.includes('[ SUCCESS ]') ? 'text-green-400 font-bold' : ''}`}>
                {line.text}
              </span>
            </div>
          ))}
        </div>

        {/* Active Input Line */}
        <form onSubmit={onSubmit} className="flex relative">
          <span className="text-primary-500 mr-2 shrink-0">guest@portfolio:~$</span>
          <input
            ref={inputRef}
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            disabled={isProcessing}
            autoComplete="off"
            spellCheck="false"
            className="flex-1 bg-transparent outline-none border-none text-gray-300 w-full disabled:opacity-50"
          />
          {/* Custom blinking cursor effect via caret-color transparent and fake cursor box could be added, but native caret is fine for now */}
        </form>
        <div ref={bottomRef} />
      </div>
    </div>
  );
};

export default TerminalContact;
