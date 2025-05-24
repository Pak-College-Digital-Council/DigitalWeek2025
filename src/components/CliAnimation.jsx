import { h } from 'preact';
import { useState, useEffect } from 'preact/hooks';
import './CliAnimation.css';

const cliLinesContent = [
  "Booting L0GIC OS...",
  "Kernel initialisation sequence started...",
  "Loading system drivers...",
  "Mounting virtual file systems...",
  "Network interface configured...",
  "Awaiting user authentication...",
];

const CliAnimation = ({ onAnimationComplete }) => {
  const [visibleLines, setVisibleLines] = useState([]);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);

  useEffect(() => {
    if (currentLineIndex < cliLinesContent.length) {
      const randomDelay = Math.random() * (1000 - 100) + 100;
      const timer = setTimeout(() => {
        setVisibleLines(prev => [...prev, cliLinesContent[currentLineIndex]]);
        setCurrentLineIndex(prev => prev + 1);
      }, randomDelay);
      return () => clearTimeout(timer);
    } else if (visibleLines.length === cliLinesContent.length) {
      const completeTimer = setTimeout(() => {
        onAnimationComplete();
      }, 300);
      return () => clearTimeout(completeTimer);
    }
  }, [currentLineIndex, onAnimationComplete, visibleLines.length]);

  return (
    <div class="cli-animation-container">
      {visibleLines.map((line, index) => (
        <p key={index}>{line}</p>
      ))}
    </div>
  );
};

export default CliAnimation;