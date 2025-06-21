import { h } from 'preact';
import { useState, useEffect, useCallback } from 'preact/hooks';
import { Rnd } from 'react-rnd';
import Terminal from './Terminal';
import Clippy from './Clippy';
import './Desktop.css';

const defaultTerminalSize = { width: 800, height: 500 };

const Desktop = ({ onLogout }) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);
  const [terminalSize, setTerminalSize] = useState(defaultTerminalSize);
  const [terminalPosition, setTerminalPosition] = useState({ 
    x: (window.innerWidth - defaultTerminalSize.width) / 2, 
    y: (window.innerHeight - defaultTerminalSize.height) / 2 
  });

  const [clippyMessages, setClippyMessages] = useState([]);
  const [highlightTerminalIcon, setHighlightTerminalIcon] = useState(false);
  const [hasTerminalBeenOpened, setHasTerminalBeenOpened] = useState(false);
  const [isChallengeComplete, setIsChallengeComplete] = useState(false);
  const [countdown, setCountdown] = useState(null);
  const [isFadingOut, setIsFadingOut] = useState(false); // New state for fade-out!

  const createWelcomeScript = useCallback(() => [
    { text: "Hey there! Looks like you made it inside.", interactive: true },
    { text: "My name is C.L.I.P.P.Y. — your Companion and Logistical Interface for Player Progression. You can just call me Clippy.", interactive: true },
    { text: "L0GIC's system is tough to crack. To get to the core, we first need to pass a 'human verification' test.", interactive: true },
    { 
      text: "I'm pretty sure we can run this in the Terminal app on the desktop. I'll point it out for you. Double-click it when you're ready to start!", 
      interactive: false,
      onComplete: () => setHighlightTerminalIcon(true)
    }
  ], []);

  useEffect(() => {
    const timer = setTimeout(() => setClippyMessages(createWelcomeScript()), 1000);
    return () => clearTimeout(timer);
  }, [createWelcomeScript]);
  
  useEffect(() => {
    if (countdown === null) return;

    if (countdown === 0) {
      setIsFadingOut(true);
      const logoutTimer = setTimeout(() => {
        onLogout();
      }, 500);
      return () => clearTimeout(logoutTimer);
    }
    
    const timer = setTimeout(() => {
      setCountdown(prev => prev - 1);
    }, 1000);
    return () => clearTimeout(timer);
  }, [countdown, onLogout]);


  useEffect(() => {
    const timerId = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timerId);
  }, []);

  const handleOpenTerminal = () => {
    const newX = (window.innerWidth - defaultTerminalSize.width) / 2;
    const newY = (window.innerHeight - defaultTerminalSize.height) / 2;
    setTerminalSize(defaultTerminalSize);
    setTerminalPosition({ x: newX, y: newY });
    setIsTerminalOpen(true);
    setClippyMessages([]);
    setHighlightTerminalIcon(false); 
    setHasTerminalBeenOpened(true);
  };
  
  const handleCloseTerminal = () => {
    setIsTerminalOpen(false);
    setClippyMessages([]);
  };

  const handleDialogueComplete = useCallback(() => {
    if (isChallengeComplete) {
      setCountdown(5);
    }
  }, [isChallengeComplete]);

  const formatTime = (date) => {
    let hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12;
    return `${hours}:${minutes} ${ampm}`;
  };

  const formatDate = (date) => {
    return date.toLocaleDateString(undefined, {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div class={`desktop-wrapper ${isFadingOut ? 'fading-out' : ''}`}>
      {countdown !== null && (
        <div class="logout-overlay">
          <div class="logout-countdown">Connection terminated in {countdown}...</div>
        </div>
      )}

      <div class="desktop-background">
        <div class="desktop-icons">
          <div 
            class={`icon ${highlightTerminalIcon ? 'highlight-icon' : ''} ${hasTerminalBeenOpened ? 'disabled-icon' : ''}`} 
            onDblClick={!hasTerminalBeenOpened ? handleOpenTerminal : null}
          >
            <img src="/icons/terminal.svg" alt="Terminal Icon"/> {/* get art dept to make a better one maybe */}
            <span>Terminal</span>
          </div>
        </div>
        
        {isTerminalOpen && (
          <Rnd
            size={terminalSize}
            position={terminalPosition}
            onDragStop={(e, d) => setTerminalPosition({ x: d.x, y: d.y })}
            onResizeStop={(e, direction, ref, delta, position) => {
              setTerminalSize({ width: ref.style.width, height: ref.style.height });
              setTerminalPosition(position);
            }}
            minWidth={500}
            minHeight={300}
            dragHandleClassName="terminal-header"
            className="terminal-rnd-wrapper"
            default={{ ...defaultTerminalSize, ...terminalPosition }}
            enableResizing
          >
            <Terminal 
              onClose={handleCloseTerminal} 
              setClippyScript={setClippyMessages}
              onChallengeComplete={() => setIsChallengeComplete(true)}
            />
          </Rnd>
        )}
        
        <Clippy 
          messages={clippyMessages} 
          onAllMessagesComplete={handleDialogueComplete}
        />

        <div class="taskbar">
          <div class="taskbar-spacer"></div>
          <div class="taskbar-clock-date">
            <div class="time">{formatTime(currentTime)}</div>
            <div class="date">{formatDate(currentTime)}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Desktop;