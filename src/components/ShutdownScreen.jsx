import { h } from 'preact';
import { useState, useEffect } from 'preact/hooks';
import LoadingSpinner from './LoadingSpinner';
import './ShutdownScreen.css';

const ShutdownScreen = ({ onShutdownComplete }) => {
  const [shutdownStage, setShutdownStage] = useState('fading');

  useEffect(() => {

    if (shutdownStage === 'fading') {
      const timer = setTimeout(() => {
        setShutdownStage('loading');
      }, 1000);
      return () => clearTimeout(timer);
    }
    

    if (shutdownStage === 'loading') {
      const timer = setTimeout(() => {
        setShutdownStage('black');
      }, 3000);
      return () => clearTimeout(timer);
    }
    

    if (shutdownStage === 'black') {
      const timer = setTimeout(() => {
        if (onShutdownComplete) {
          onShutdownComplete();
        }
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [shutdownStage, onShutdownComplete]);

  return (
    <div className={`shutdown-screen ${shutdownStage}`}>
      {shutdownStage === 'loading' && (
        <div className="shutdown-content">
          <div className="shutdown-message">Shutting down...</div>
          <LoadingSpinner />
        </div>
      )}
    </div>
  );
};

export default ShutdownScreen;