import { h } from 'preact';
import { useState, useEffect, useCallback } from 'preact/hooks';
import './BootAnimation.css';

const initialPromptLine = "Press Enter to start game";
const bootSequenceLines = [
  "Booting L0GIC OS...",
  "Kernel initialisation sequence started...",
  "Loading system drivers...",
  "Mounting virtual file systems...",
  "Network interface configured...",
  "Awaiting user authentication...",
];

const BootAnimation = ({ onBootComplete }) => {
  const [displayedLines, setDisplayedLines] = useState([initialPromptLine]);
  const [currentLineIndex, setCurrentLineIndex] = useState(-1);
  const [showCursor, setShowCursor] = useState(true);
  const [gameStarted, setGameStarted] = useState(false);

  useEffect(() => {
    const cursorTimer = setInterval(() => {
      setShowCursor(prevShow => !prevShow);
    }, 500);
    return () => clearInterval(cursorTimer);
  }, []);

  const handleKeyPress = useCallback((event) => {
    if (event.key === 'Enter' && !gameStarted) {
      setGameStarted(true);
      setDisplayedLines([]);
      setCurrentLineIndex(0);
    }
  }, [gameStarted]);

  useEffect(() => {
    if (!gameStarted) {
      window.addEventListener('keydown', handleKeyPress);
      return () => {
        window.removeEventListener('keydown', handleKeyPress);
      };
    }
  }, [handleKeyPress, gameStarted]);

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
    <div class="boot-animation-container">
      {displayedLines.map((line, index) => (
        <p key={index}>{line}</p>
      ))}
      {!gameStarted && (
        <p>
          {"> "}
          {showCursor ? '_' : ' '}
        </p>
      )}
    </div>
  );
};

export default BootAnimation;