import { h } from 'preact';
import './StartScreen.css';

const StartScreen = ({ onStartGame }) => {
  return (
    <div class="start-screen">
      <button class="start-button" onClick={onStartGame}>
        {/* will edit later to be like a cli >_ press enter to start game thing */}
        Start Game
      </button>
    </div>
  );
};

export default StartScreen;