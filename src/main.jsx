import { render, h } from 'preact';
import { App } from './components/App';
import { AppProvider } from './context/AppContext';
import { GameSessionProvider } from './context/GameSessionContext';
import './style.css';

render(
  <GameSessionProvider>
    <AppProvider>
      <App />
    </AppProvider>
  </GameSessionProvider>,
  document.getElementById('app')
);