import { h } from 'preact';
import { useState, useEffect, useCallback } from 'preact/hooks';
import LoadingSpinner from './LoadingSpinner';
import './LoginScreen.css';

const LoginScreen = ({ onLoginSuccess }) => {
  const [loginStep, setLoginStep] = useState('form'); 
  const [showSystemIcons, setShowSystemIcons] = useState(true);

  const handleSignIn = useCallback((event) => {
    if (event) {
      event.preventDefault();
    }
    
    if (loginStep !== 'form') return;

    const isValid = true;
    
    if (!isValid) {
      alert("Invalid credentials! (Placeholder error message)");
      return;
    }

    setLoginStep('fading');
    setShowSystemIcons(false);

    setTimeout(() => {
      setLoginStep('loading');

      const randomSpinnerTime = Math.random() * (3000 - 1000) + 1000;
      
      setTimeout(() => {
        setLoginStep('success');
      }, randomSpinnerTime);
    }, 400); 
  }, [loginStep]);

  useEffect(() => {
    if (loginStep === 'success') {
      const transitionToDesktopTimer = setTimeout(() => {
        if (onLoginSuccess) {
          onLoginSuccess();
        }
      }, 100); 
      return () => clearTimeout(transitionToDesktopTimer);
    }
  }, [loginStep, onLoginSuccess]);



  return (
    <div class="login-screen">
      <div class="login-content-area">
        {loginStep === 'loading' ? (
          <LoadingSpinner />
        ) : (
          (loginStep === 'form' || loginStep === 'fading') && (
            <div class={`login-form-elements ${loginStep === 'fading' ? 'fading-out' : ''}`}>
              <img src="/logic-profile.png" alt="Profile" class="profile-pic" />
              <div class="user-name">L0GIC Personal</div>
              <button 
                class="sign-in-button" 
                onClick={handleSignIn}
                disabled={loginStep === 'fading' || loginStep === 'loading'}
              >
                Sign in
              </button>
            </div>
          )
        )}
      </div>
      
      <div class={`login-screen-icons ${!showSystemIcons ? 'fading-out' : ''}`}>
        <img src="/icons/wifi.svg" alt="Wifi status" />
        <img src="/icons/battery.svg" alt="Battery status" />
      </div>
    </div>
  );
};

export default LoginScreen;