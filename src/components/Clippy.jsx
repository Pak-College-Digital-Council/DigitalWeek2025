import { h } from 'preact';
import { useState, useEffect, useMemo, useCallback, useContext } from 'preact/hooks';
import { AppContext } from '../context/AppContext';
import './Clippy.css';

const TYPEWRITER_SPEED_MS = 40;
const NON_INTERACTIVE_ADVANCE_DELAY_MS = 700;

const Typewriter = ({ text, onTypingComplete }) => {
  const [displayedText, setDisplayedText] = useState('');

  useEffect(() => {
    setDisplayedText('');
    if (text) {
      let i = 0;
      const timer = setInterval(() => {
        if (i < text.length) {
          setDisplayedText(prev => prev + text.charAt(i));
          i++;
        } else {
          clearInterval(timer);
          if (onTypingComplete) onTypingComplete();
        }
      }, TYPEWRITER_SPEED_MS); // Used constant
      return () => clearInterval(timer);
    }
  }, [text, onTypingComplete]);

  return <p>{displayedText}</p>;
};

const Clippy = () => {
  const { clippyMessages, completeClippyMessages } = useContext(AppContext);

  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);

  const currentMessage = useMemo(() => clippyMessages[currentMessageIndex], [clippyMessages, currentMessageIndex]);

  const advance = useCallback(() => {
    if (!currentMessage) return;

    if (currentMessage.onComplete) {
      currentMessage.onComplete();
    }

    if (currentMessageIndex < clippyMessages.length - 1) {
      setCurrentMessageIndex(prev => prev + 1);
      setIsTyping(true);
    } else {
      completeClippyMessages();
    }
  }, [currentMessage, currentMessageIndex, clippyMessages.length, completeClippyMessages]);


  const handleTypingComplete = useCallback(() => {
    setIsTyping(false);
    if (currentMessage && currentMessage.interactive === false) {
      setTimeout(advance, NON_INTERACTIVE_ADVANCE_DELAY_MS); // constant
    }
  }, [currentMessage, advance]);

  useEffect(() => {
    // reset when clippyMessages from context change
    if (clippyMessages.length > 0) {
      setCurrentMessageIndex(0);
      setIsTyping(true);
    } else {
      // if messages are cleared (empty array, etc) reset index
      setCurrentMessageIndex(0);
    }
  }, [clippyMessages]);

  useEffect(() => {
    if (isTyping || !currentMessage || currentMessage.interactive === false) {
      return;
    }

    const handleKeyDown = (e) => {
      if (e.target && (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA')) {
        return;
      }

      if (e.code === 'Space') {
        e.preventDefault();
        advance();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isTyping, currentMessage, advance]);

  if (!currentMessage) {
    return null;
  }

  return (
    <div class="clippy-container">
      <div class="clippy-speech-bubble">
        <Typewriter text={currentMessage.text} onTypingComplete={handleTypingComplete} />
        {!isTyping && currentMessage.interactive !== false && (
          <div class="continue-prompt">
            Press [SPACE] to continue <span class="blinking-cursor">_</span>
          </div>
        )}
      </div>
      <div class="clippy-character"></div>
    </div>
  );
};

export default Clippy;