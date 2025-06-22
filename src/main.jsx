import { render, h } from 'preact';
import { App } from './components/App';
import { AppProvider } from './context/AppContext';
import './style.css';

render(
  <AppProvider>
    <App />
  </AppProvider>,
  document.getElementById('app')
);