import { render, h } from 'preact';
import { App } from './components/App';
import { AppProvider } from './context/AppContext';
import { GameSessionProvider } from './context/GameSessionContext';
import './style.css';

import { LocationProvider, Router } from 'preact-iso';
import CatchUpScreen from './components/CatchUpScreen';
import { useState } from 'preact/hooks';

const Rtr = () => {
  const [catchUpDay, setCatchUpDay] = useState(null);

  const handleCatchUpComplete = (selectedDay) => {
    setCatchUpDay(selectedDay);
  };

  return (
    <LocationProvider>
      <Router>
        <App path="/" />

        {/* /catch-up route */}
        {catchUpDay === null ? (
          <CatchUpScreen
            path="/catch-up"
            onCatchUpComplete={handleCatchUpComplete}
          />
        ) : (
          <App path="/catch-up" dayToSet={catchUpDay} />
        )}
      </Router>
    </LocationProvider>
  );
};

render(
  <GameSessionProvider>
    <AppProvider>
      <Rtr />
    </AppProvider>
  </GameSessionProvider>,
  document.body
);
