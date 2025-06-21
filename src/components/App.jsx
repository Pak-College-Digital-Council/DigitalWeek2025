import { h } from 'preact';
import { useState, useEffect } from 'preact/hooks';
import BootAnimation from './BootAnimation';
import LoginScreen from './LoginScreen';
import Desktop from './Desktop'; 

export function App() {
  const [currentStage, setCurrentStage] = useState('boot'); 

  const handleBootSequenceComplete = () => {
    setCurrentStage('login');
  };

  const handleLoginSuccess = () => {
    setCurrentStage('desktop'); 
  };

  const handleLogout = () => {
    setCurrentStage('login');
  };

  useEffect(() => {
    if (currentStage === 'login' || currentStage === 'boot') {
      document.body.style.backgroundImage = 'none';
      document.body.style.backgroundColor = '#000'; 
    } else if (currentStage === 'desktop') {
      document.body.style.backgroundColor = 'transparent'; 
    }
  }, [currentStage]);

  return (
    <div class="app-container">
      {currentStage === 'boot' && <BootAnimation onBootComplete={handleBootSequenceComplete} />}
      {currentStage === 'login' && <LoginScreen onLoginSuccess={handleLoginSuccess} />} 
      {currentStage === 'desktop' && <Desktop onLogout={handleLogout} />}
    </div>
  );
}