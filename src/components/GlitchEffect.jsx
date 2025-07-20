import { h } from 'preact';
import { useState, useEffect } from 'preact/hooks';
import './GlitchEffect.css';

const GlitchEffect = ({ onComplete }) => {
  const [glitchPhase, setGlitchPhase] = useState(0);

  useEffect(() => {
    const phases = [
      { duration: 200, show: 'normal' },
      { duration: 100, show: 'black' },
      { duration: 150, show: 'normal' },
      { duration: 80, show: 'black' },
      { duration: 120, show: 'normal' },
      { duration: 60, show: 'black' },
      { duration: 100, show: 'normal' },
      { duration: 40, show: 'black' },
      { duration: 80, show: 'normal' },
      { duration: 300, show: 'black' }
    ];

    let currentPhase = 0;
    
    const runPhase = () => {
      if (currentPhase >= phases.length) {
        onComplete();
        return;
      }

      const phase = phases[currentPhase];
      setGlitchPhase(currentPhase);
      
      setTimeout(() => {
        currentPhase++;
        runPhase();
      }, phase.duration);
    };

    runPhase();
  }, [onComplete]);

  const currentPhase = glitchPhase < 10 ? glitchPhase : 9;
  const phases = [
    { duration: 200, show: 'normal' },
    { duration: 100, show: 'black' },
    { duration: 150, show: 'normal' },
    { duration: 80, show: 'black' },
    { duration: 120, show: 'normal' },
    { duration: 60, show: 'black' },
    { duration: 100, show: 'normal' },
    { duration: 40, show: 'black' },
    { duration: 80, show: 'normal' },
    { duration: 300, show: 'black' }
  ];

  const showBlack = phases[currentPhase]?.show === 'black';

  return (
    <div className={`glitch-overlay ${showBlack ? 'black' : 'transparent'}`}>
    </div>
  );
};

export default GlitchEffect;