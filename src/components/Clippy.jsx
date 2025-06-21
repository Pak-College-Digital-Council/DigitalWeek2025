import { h } from 'preact';
import { useState, useEffect, useMemo, useCallback } from 'preact/hooks';
import './Clippy.css';

const Typewriter = ({ text, onTypingComplete }) => {
  const [displayedText, setDisplayedText] = useState('');

  useEffect(() => {
    setDisplayedText('');
    if (text) {
      let i = 0;
      const speed = 40;
      const timer = setInterval(() => {
        if (i < text.length) {
          setDisplayedText(prev => prev + text.charAt(i));
          i++;
        } else {
          clearInterval(timer);
          if (onTypingComplete) onTypingComplete();
        }
      }, speed);
      return () => clearInterval(timer);
    }
  }, [text, onTypingComplete]);

  return <p>{displayedText}</p>;
};

const Clippy = ({ messages = [], onAllMessagesComplete }) => {
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);
  
  const currentMessage = useMemo(() => messages[currentMessageIndex], [messages, currentMessageIndex]);

  const advance = useCallback(() => {
    if (!currentMessage) return;

    if (currentMessage.onComplete) {
      currentMessage.onComplete();
    }

    if (currentMessageIndex < messages.length - 1) {
      setCurrentMessageIndex(prev => prev + 1);
      setIsTyping(true);
    } else {
      if (onAllMessagesComplete) {
        onAllMessagesComplete();
      }
    }
  }, [currentMessage, currentMessageIndex, messages.length, onAllMessagesComplete]);


  const handleTypingComplete = useCallback(() => {
    setIsTyping(false);
    if (currentMessage && currentMessage.interactive === false) {
      setTimeout(advance, 500);
    }
  }, [currentMessage, advance]);

  useEffect(() => {
    if (messages.length > 0) {
      setCurrentMessageIndex(0);
      setIsTyping(true);
    }
  }, [messages]);

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