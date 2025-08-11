import { h } from 'preact';
import { useState, useEffect } from 'preact/hooks';
import BootAnimation from './BootAnimation';
import LoginScreen from './LoginScreen';
import Desktop from './Desktop';
import ShutdownScreen from './ShutdownScreen';
import CatchUpScreen from './CatchUpScreen'; 

export function App({dayToSet = false}) {
  const [currentStage, setCurrentStage] = useState(() => {
    const path = window.location.pathname;
    return path === '/catch-up' ? 'catch-up' : 'boot';
  }); 
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

  const handleCatchUpComplete = (selectedDay) => {
    window.DEV_TOOLS?.setDay(selectedDay);
    setCurrentStage('boot');
  };
  
  useEffect(() => {
    if (dayToSet) {
      window.DEV_TOOLS?.setDay(dayToSet);
      setCurrentStage('boot');
    }
  }, [dayToSet]);  

  useEffect(() => {
    if (currentStage === 'login' || currentStage === 'boot' || currentStage === 'shutdown' || currentStage === 'catch-up') {
      document.body.style.backgroundImage = 'none';
      document.body.style.backgroundColor = '#000';
    } else if (currentStage === 'desktop') {
      document.body.style.backgroundColor = 'transparent'; 
    }
  }, [currentStage]);

  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname;
      if (path === '/catch-up') {
        setCurrentStage('catch-up');
      } else {
        setCurrentStage('boot');
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  return (
    <div class="app-container">
      {currentStage === 'catch-up' && <CatchUpScreen onCatchUpComplete={handleCatchUpComplete} />}
      {currentStage === 'boot' && <BootAnimation onBootComplete={handleBootSequenceComplete} completedDays={completedDays} />}
      {currentStage === 'login' && <LoginScreen onLoginSuccess={handleLoginSuccess} />} 
      {currentStage === 'desktop' && <Desktop onLogout={handleLogout} onDayComplete={handleDayComplete} />}
      {currentStage === 'shutdown' && <ShutdownScreen onShutdownComplete={handleShutdownComplete} />}
    </div>
  );
}