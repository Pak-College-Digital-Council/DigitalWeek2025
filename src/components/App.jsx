import { h } from 'preact';
import { useState, useEffect } from 'preact/hooks';
import BootAnimation from './BootAnimation';
import LoginScreen from './LoginScreen';
import Desktop from './Desktop';
import ShutdownScreen from './ShutdownScreen'; 

export function App() {
  const [currentStage, setCurrentStage] = useState('boot'); 
  const [completedDays, setCompletedDays] = useState(new Set());

  const handleBootSequenceComplete = () => {
    setCurrentStage('login');
  };

  const handleLoginSuccess = () => {
    setCurrentStage('desktop'); 
  };

  const handleLogout = () => {
    setCurrentStage('login');
  };

  const handleDayComplete = (day) => {
    setCompletedDays(prev => new Set([...prev, day]));
    setCurrentStage('shutdown');
  };

  const handleShutdownComplete = () => {
    setCurrentStage('boot');
  };

  useEffect(() => {
    if (currentStage === 'login' || currentStage === 'boot' || currentStage === 'shutdown') {
      document.body.style.backgroundImage = 'none';
      document.body.style.backgroundColor = '#000';
    } else if (currentStage === 'desktop') {
      document.body.style.backgroundColor = 'transparent'; 
    }
  }, [currentStage]);

  return (
    <div class="app-container">
      {currentStage === 'boot' && <BootAnimation onBootComplete={handleBootSequenceComplete} completedDays={completedDays} />}
      {currentStage === 'login' && <LoginScreen onLoginSuccess={handleLoginSuccess} />} 
      {currentStage === 'desktop' && <Desktop onLogout={handleLogout} onDayComplete={handleDayComplete} />}
      {currentStage === 'shutdown' && <ShutdownScreen onShutdownComplete={handleShutdownComplete} />}
    </div>
  );
}