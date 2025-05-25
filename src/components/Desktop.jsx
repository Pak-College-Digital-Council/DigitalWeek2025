import { h } from 'preact';
import { useState, useEffect } from 'preact/hooks';
import './Desktop.css';

const Desktop = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timerId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timerId);
  }, []);

  const formatTime = (date) => {
    let hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');
    const ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12;
    return `${hours}:${minutes}:${seconds} ${ampm}`;
  };

  const formatDate = (date) => {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  return (
    <div class="desktop-background">
      {/*  icons and apps and stuff will go here */}

      <div class="taskbar">
        {/* hi :D */}
        <div class="taskbar-spacer"></div>
        <div class="taskbar-clock-date">
          <div class="time">{formatTime(currentTime)}</div>
          <div class="date">{formatDate(currentTime)}</div>
        </div>
      </div>
    </div>
  );
};

export default Desktop;