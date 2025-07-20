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

  return <p dangerouslySetInnerHTML={{ __html: displayedText }}></p>;
};

const Clippy = () => {
  const { clippyMessages, completeClippyMessages, persistentClippyMessages } = useContext(AppContext);

  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);

  const currentMessage = useMemo(() => {
    if (clippyMessages.length > 0) {
      return clippyMessages[currentMessageIndex];
    } else if (persistentClippyMessages.length > 0) {
      return persistentClippyMessages[0];
    }
    return null;
  }, [clippyMessages, currentMessageIndex, persistentClippyMessages]);

  const advance = useCallback(() => {
    if (!currentMessage) return;

    if (currentMessage.onComplete) {
      currentMessage.onComplete();
    }

    if (clippyMessages.length > 0 && currentMessageIndex < clippyMessages.length - 1) {
      setCurrentMessageIndex(prev => prev + 1);
      setIsTyping(true);
    } else if (clippyMessages.length > 0) {
      completeClippyMessages();
    }
  }, [currentMessage, currentMessageIndex, clippyMessages.length, completeClippyMessages]);


  const handleTypingComplete = useCallback(() => {
    setIsTyping(false);
    
    if (currentMessage && currentMessage.onTypingComplete) {
      currentMessage.onTypingComplete();
    }
    
    if (currentMessage && currentMessage.interactive === false) {
      setTimeout(advance, NON_INTERACTIVE_ADVANCE_DELAY_MS);
    }
  }, [currentMessage, advance]);

  useEffect(() => {
    if (clippyMessages.length > 0) {
      setCurrentMessageIndex(0);
      setIsTyping(true);
    } else {
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
        {!isTyping && currentMessage.interactive !== false && clippyMessages.length > 0 && (
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