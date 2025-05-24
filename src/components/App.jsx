import { h } from 'preact';
import { useState, useEffect } from 'preact/hooks';
import StartScreen from './StartScreen';
import CliAnimation from './CliAnimation';
import LoginScreen from './LoginScreen';
import Desktop from './Desktop'; 

export function App() {
  const [currentStage, setCurrentStage] = useState('start'); 

  const handleStartGame = () => {
    setCurrentStage('cli');
  };

  const handleAnimationComplete = () => {
    setCurrentStage('login');
  };

  const handleLoginSuccess = () => {
    setCurrentStage('desktop'); 
  };

  useEffect(() => {
    if (currentStage === 'cli' || currentStage === 'login') {
      document.body.style.backgroundImage = 'none';
      document.body.style.backgroundColor = '#000'; 
    } else if (currentStage === 'desktop' || currentStage === 'start') {
      document.body.style.backgroundColor = 'transparent'; 
    }
  }, [currentStage]);

  return (
    <div class="app-container">
      {currentStage === 'start' && <StartScreen onStartGame={handleStartGame} />}
      {currentStage === 'cli' && <CliAnimation onAnimationComplete={handleAnimationComplete} />}
      {currentStage === 'login' && <LoginScreen onLoginSuccess={handleLoginSuccess} />} 
      {currentStage === 'desktop' && <Desktop />}
    </div>
  );
}