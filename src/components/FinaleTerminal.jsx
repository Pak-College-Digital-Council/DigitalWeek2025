import { h } from 'preact';
import { useState, useEffect, useRef } from 'preact/hooks';
import './FinaleTerminal.css';

const FinaleTerminal = () => {
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="finale-terminal">
      <div className="finale-cursor">
        {'> '}{showCursor ? '_' : ' '}
      </div>
    </div>
  );
};

export default FinaleTerminal;