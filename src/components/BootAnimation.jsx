import { h } from 'preact';
import { useState, useEffect, useCallback, useContext } from 'preact/hooks';
import { PARTICIPANT_CODES, ACTIVE_DAY } from '../config/globalConfig';
import { GameSessionContext } from '../context/GameSessionContext';
import './BootAnimation.css';

const initialPromptLine = "Enter the code given to you in the email:";
const bootSequenceLines = [
  "Booting L0GIC OS...",
  "Kernel initialization sequence started...",
  "Loading system drivers...",
  "Mounting virtual file systems...",
  "Network interface configured...",
  "Awaiting user authentication...",
];

const BootAnimation = ({ onBootComplete, completedDays }) => {
  const { setParticipant } = useContext(GameSessionContext);
  const [displayedLines, setDisplayedLines] = useState([initialPromptLine]);
  const [currentLineIndex, setCurrentLineIndex] = useState(-1);
  const [showCursor, setShowCursor] = useState(true);
  const [gameStarted, setGameStarted] = useState(false);
  const [authStage, setAuthStage] = useState('input');
  const [codeInput, setCodeInput] = useState('');
  const [shakeScreen, setShakeScreen] = useState(false);

  useEffect(() => {
    const cursorTimer = setInterval(() => {
      setShowCursor(prevShow => !prevShow);
    }, 500);
    return () => clearInterval(cursorTimer);
  }, []);

  const handleKeyPress = useCallback((event) => {
    if (authStage === 'input') {
      if (event.key === 'Enter') {
        const trimmedCode = codeInput.trim();
        if (PARTICIPANT_CODES[trimmedCode]) {
          if (completedDays && completedDays.has(ACTIVE_DAY)) {
            setDisplayedLines([
              initialPromptLine, 
              `> ${'*'.repeat(trimmedCode.length)}`, 
              "ACCEPTED", 
              "", 
              "You have already completed today's challenge!",
              "Come back tomorrow for the next challenge!",
              "",
              "Press Enter to continue"
            ]);
            setAuthStage('completed');
          } else {
            setParticipant(trimmedCode, PARTICIPANT_CODES[trimmedCode]);
            setAuthStage('accepted');
            setDisplayedLines([initialPromptLine, `> ${'*'.repeat(trimmedCode.length)}`, "ACCEPTED", "", "Press Enter to continue"]);
          }
        } else {
          setShakeScreen(true);
          setCodeInput('');
          setTimeout(() => setShakeScreen(false), 500);
        }
      } else if (event.key === 'Backspace') {
        setCodeInput(prev => prev.slice(0, -1));
      } else if (event.ctrlKey && event.key === 'v') {
        event.preventDefault();
        navigator.clipboard.readText().then(text => {
          const cleanText = text.trim().replace(/[^0-9]/g, '').slice(0, 6);
          setCodeInput(cleanText);
        }).catch(err => {
        });
      } else if (event.key.length === 1 && /[0-9]/.test(event.key) && codeInput.length < 6) {
        setCodeInput(prev => prev + event.key);
      }
    } else if ((authStage === 'accepted' || authStage === 'completed') && event.key === 'Enter') {
      if (authStage === 'completed') {
        setAuthStage('input');
        setCodeInput('');
        setDisplayedLines([initialPromptLine]);
      } else {
        setAuthStage('boot');
        setGameStarted(true);
        setDisplayedLines([]);
        setCurrentLineIndex(0);
      }
    }
  }, [authStage, codeInput, setParticipant]);

  useEffect(() => {
    if (authStage !== 'boot') {
      window.addEventListener('keydown', handleKeyPress);
      return () => {
        window.removeEventListener('keydown', handleKeyPress);
      };
    }
  }, [handleKeyPress, authStage]);

  useEffect(() => {
    if (gameStarted && currentLineIndex >= 0 && currentLineIndex < bootSequenceLines.length) {
      const randomDelay = Math.random() * (1000 - 100) + 100;
      const timer = setTimeout(() => {
        setDisplayedLines(prev => [...prev, bootSequenceLines[currentLineIndex]]);
        setCurrentLineIndex(prev => prev + 1);
      }, randomDelay);
      return () => clearTimeout(timer);
    } else if (gameStarted && currentLineIndex === bootSequenceLines.length) {
      const completeTimer = setTimeout(() => {
        if (onBootComplete) {
          onBootComplete();
        }
      }, 300);
      return () => clearTimeout(completeTimer);
    }
  }, [currentLineIndex, gameStarted, onBootComplete]);

  return (
    <div class={`boot-animation-container ${shakeScreen ? 'shake' : ''}`}>
      {displayedLines.map((line, index) => (
        <p key={index}>{line}</p>
      ))}
      {authStage === 'input' && (
        <p>
          {"> "}{'*'.repeat(codeInput.length)}
          {showCursor ? '_' : ' '}
        </p>
      )}
    </div>
  );
};

export default BootAnimation;