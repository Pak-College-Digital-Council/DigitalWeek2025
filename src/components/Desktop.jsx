import { h } from 'preact';
import { useState, useEffect, useCallback, useContext } from 'preact/hooks';
import { Rnd } from 'react-rnd';
import Terminal from './Terminal';
import FileExplorer from './FileExplorer';
import Clippy from './Clippy';
import { AppContext } from '../context/AppContext';
import { quests as allQuests } from '../config/quests';
import './Desktop.css';

const defaultTerminalSize = { width: 800, height: 500 };
const defaultFileExplorerSize = { width: 700, height: 550 };

const Desktop = ({ onLogout }) => {
  const {
    clippyMessages,
    showClippyMessages,
    completeClippyMessages,
    highlightedIconDay,
    triggerHighlightTerminalIcon,
    challengeCompletion,
    startLogoutCountdown,
    showLogoutCountdown,
    currentDay,
    currentQuestData,
  } = useContext(AppContext);

  const [currentTime, setCurrentTime] = useState(new Date());

  const [isTerminalOpen, setIsTerminalOpen] = useState(false);
  const [terminalSize, setTerminalSize] = useState(defaultTerminalSize);
  const [terminalPosition, setTerminalPosition] = useState({
    x: (window.innerWidth - defaultTerminalSize.width) / 2,
    y: (window.innerHeight - defaultTerminalSize.height) / 2,
  });

  const [isFileExplorerOpen, setIsFileExplorerOpen] = useState(false);
  const [fileExplorerSize, setFileExplorerSize] = useState(defaultFileExplorerSize);
  const [fileExplorerPosition, setFileExplorerPosition] = useState({
    x: (window.innerWidth - defaultFileExplorerSize.width) / 2 + 30,
    y: (window.innerHeight - defaultFileExplorerSize.height) / 2 + 30,
  });

  const [mainAppOpenedThisSession, setMainAppOpenedThisSession] = useState(false);
  const [hasWelcomeScriptBeenShown, setHasWelcomeScriptBeenShown] = useState(false);
  const [countdown, setCountdown] = useState(null);
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    setMainAppOpenedThisSession(false);
    setHasWelcomeScriptBeenShown(false);
    setIsTerminalOpen(false);
    setIsFileExplorerOpen(false);
  }, [currentDay]);

  const createWelcomeScript = useCallback(() => {
    if (currentDay === 1) {
      return [
        { text: "Hey there! Looks like you made it inside.", interactive: true },
        { text: "My name is C.L.I.P.P.Y. — your Companion and Logistical Interface for Player Progression. You can just call me Clippy.", interactive: true },
        { text: "L0GIC's system is tough to crack. To get to the core, we first need to pass a 'human verification' test.", interactive: true },
        {
          text: "I'm pretty sure we can run this in the Terminal app on the desktop. I'll point it out for you. Double-click it when you're ready to start!",
          interactive: true,
          onComplete: () => triggerHighlightTerminalIcon(1),
        },
      ];
    } else if (currentDay === 2) {
      return [
        { text: "Welcome back, agents!", interactive: true },
        { text: "It looks like there's a new application on your desktop for today's task.", interactive: true },
        { text: "I'm highlighting it now – let's see what L0GIC has in store for us!", interactive: true },
        {
          text: "Double-click the highlighted icon when you're set.",
          interactive: true,
          onComplete: () => triggerHighlightTerminalIcon(2),
        },
      ];
    }
    return [
        { text: "Welcome! Systems are ready.", interactive: true },
        { text: `Current objective: ${currentQuestData?.title || 'Pending assignment...'}`, interactive: true }
    ];
  }, [triggerHighlightTerminalIcon, currentDay, currentQuestData?.title]);

  useEffect(() => {
    if (!hasWelcomeScriptBeenShown && clippyMessages.length === 0 && !mainAppOpenedThisSession) {
        const timer = setTimeout(() => {
            showClippyMessages(createWelcomeScript());
            setHasWelcomeScriptBeenShown(true);
        }, 1000);
        return () => clearTimeout(timer);
    }
  }, [hasWelcomeScriptBeenShown, createWelcomeScript, showClippyMessages, clippyMessages, mainAppOpenedThisSession]);

  useEffect(() => { if (showLogoutCountdown && countdown === null) setCountdown(5); }, [showLogoutCountdown]);

  useEffect(() => {
    if (countdown === null) return;
    if (countdown === 0) {
      setIsFadingOut(true);
      const logoutTimer = setTimeout(() => onLogout(), 500);
      return () => clearTimeout(logoutTimer);
    }
    const timer = setTimeout(() => setCountdown(prev => (prev !== null ? prev - 1 : null)), 1000);
    return () => clearTimeout(timer);
  }, [countdown, onLogout]);

  useEffect(() => {
    const timerId = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timerId);
  }, []);
// dont need this but just in case
  const handleOpenMainApp = () => {
    if (challengeCompletion[currentDay]) {
        showClippyMessages([{text: `You've already completed Day ${currentDay}'s task! Excellent work.`, interactive:true}]);
        return;
    }
    completeClippyMessages();
    triggerHighlightTerminalIcon(null);
    setMainAppOpenedThisSession(true);

    if (currentDay === 1 && currentQuestData?.type === 'trivia') {
      const newX = (window.innerWidth - defaultTerminalSize.width) / 2;
      const newY = (window.innerHeight - defaultTerminalSize.height) / 2;
      setTerminalPosition({ x: newX, y: newY });
      setTerminalSize(defaultTerminalSize);
      setIsTerminalOpen(true);
    } else if (currentDay === 2 && currentQuestData?.type === 'file_sort') {
      const newX = (window.innerWidth - defaultFileExplorerSize.width) / 2;
      const newY = (window.innerHeight - defaultFileExplorerSize.height) / 2;
      setFileExplorerPosition({ x: newX, y: newY });
      setFileExplorerSize(defaultFileExplorerSize);
      setIsFileExplorerOpen(true);
    }
  };
  
  const handleCloseTerminal = useCallback(() => setIsTerminalOpen(false), []);
  const handleCloseFileExplorer = useCallback(() => setIsFileExplorerOpen(false), []);

  useEffect(() => {
    if ( clippyMessages.length === 0 && challengeCompletion[1] && currentDay === 1 && mainAppOpenedThisSession && !showLogoutCountdown ) {
      startLogoutCountdown();
    }
  }, [clippyMessages, challengeCompletion, currentDay, mainAppOpenedThisSession, startLogoutCountdown, showLogoutCountdown]);

  const formatTime = (date) => {
    let hours = date.getHours();
    const minutes = (date.getMinutes() < 10 ? '0' : '') + date.getMinutes();
    const ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12;
    return `${hours}:${minutes} ${ampm}`;
  };

  const formatDate = (date) => {
    return date.toLocaleDateString(undefined, {
      weekday: 'short', year: 'numeric', month: 'short', day: 'numeric',
    });
  };

  const day1QuestStaticInfo = allQuests[1];
  const isDay1Complete = challengeCompletion[1];
  // Disable Day 1 icon if:
  // it's not day 1
  // it's complete
  // the terminal is currently open on day 1
  const isDay1IconDisabled = currentDay !== 1 || isDay1Complete || (currentDay === 1 && isTerminalOpen);
  const isDay1IconHighlighted = currentDay === 1 && highlightedIconDay === 1 && !isDay1IconDisabled;

  const Day1TerminalIcon = day1QuestStaticInfo ? (
    <div
      class={`icon ${isDay1IconHighlighted ? 'highlight-icon' : ''} ${isDay1IconDisabled ? 'disabled-icon' : ''}`}
      onDblClick={() => {
        if (currentDay === 1 && !isDay1IconDisabled) {
          handleOpenMainApp();
        } else if (isDay1Complete) {
          // removed clippy yapping
        } else if (currentDay === 1 && isTerminalOpen) {
          // removed clippy yapping
        }
         else {
          // removed clippy yapping
        }
      }}
      title={
        isDay1Complete ? `Day 1 Completed: ${day1QuestStaticInfo.title}` :
        (currentDay === 1 && isTerminalOpen) ? `${day1QuestStaticInfo.title} (Open)` :
        (currentDay === 1 ? day1QuestStaticInfo.title : `${day1QuestStaticInfo.title} (Inactive)`)
      }
    >
      <img src="/icons/terminal.svg" alt={day1QuestStaticInfo.title || "Terminal"} style={{filter: isDay1IconDisabled ? 'grayscale(80%) opacity(0.6)' : ''}} />
      <span>{day1QuestStaticInfo.title || "Terminal"}</span>
    </div>
  ) : null;

  let ActiveDayAppIcon = null;
  if (currentDay !== 1 && currentQuestData) {
    const isCurrentDayComplete = challengeCompletion[currentDay];
    const isAppOpenAndRelevant = currentDay === 2 && currentQuestData.type === 'file_sort' && isFileExplorerOpen;
    const iconDisabled = isCurrentDayComplete || isAppOpenAndRelevant;

    let iconLabel = currentQuestData.title || `Day ${currentDay} Task`;
    let iconPath = "/icons/terminal.svg";

    if (currentDay === 2 && currentQuestData.type === 'file_sort') {
      iconPath = "/icons/clippy.svg";
      iconLabel = currentQuestData.title || "Analyse This";
    }
    ActiveDayAppIcon = (
      <div
        class={`icon ${highlightedIconDay === currentDay && !iconDisabled ? 'highlight-icon' : ''} ${iconDisabled ? 'disabled-icon' : ''}`}
        onDblClick={!iconDisabled ? handleOpenMainApp : null}
        title={isCurrentDayComplete ? `${iconLabel} (Completed)` : (isAppOpenAndRelevant ? `${iconLabel} (Open)` : iconLabel)}
      >
        <img src={iconPath} alt={iconLabel} style={{filter: iconDisabled ? 'grayscale(80%) opacity(0.6)' : ''}}/>
        <span>{iconLabel}</span>
      </div>
    );
  }

  return (
    <div class={`desktop-wrapper ${isFadingOut ? 'fading-out' : ''}`}>
      {countdown !== null && (
        <div class="logout-overlay">
          <div class="logout-countdown">Connection terminated in {countdown}...</div>
        </div>
      )}
      <div class="desktop-background">
        <div class="desktop-icons">
          {Day1TerminalIcon}
          {ActiveDayAppIcon}
        </div>
        
        {isTerminalOpen && currentDay === 1 && currentQuestData?.type === 'trivia' && (
          <Rnd size={terminalSize} position={terminalPosition} onDragStop={(e, d) => setTerminalPosition({ x: d.x, y: d.y })} onResizeStop={(e, direction, ref, delta, position) => { setTerminalSize({ width: ref.style.width, height: ref.style.height }); setTerminalPosition(position); }} minWidth={500} minHeight={300} dragHandleClassName="terminal-header" className="terminal-rnd-wrapper" default={{ ...defaultTerminalSize, ...terminalPosition }} enableResizing={true} >
            <Terminal onClose={handleCloseTerminal} />
          </Rnd>
        )}

        {isFileExplorerOpen && currentDay === 2 && currentQuestData?.type === 'file_sort' && (
           <Rnd size={fileExplorerSize} position={fileExplorerPosition} onDragStop={(e,d) => setFileExplorerPosition({x:d.x, y:d.y})} onResizeStop={(e,direction,ref,delta,position)=>{setFileExplorerSize({width:ref.style.width,height:ref.style.height}); setFileExplorerPosition(position);}} minWidth={600} minHeight={450} dragHandleClassName="title-bar" className="file-explorer-rnd-wrapper" default={{...defaultFileExplorerSize, ...fileExplorerPosition}} enableResizing={true}>
            <FileExplorer questData={currentQuestData} onClose={handleCloseFileExplorer} />
          </Rnd>
        )}

        <Clippy />
        <div class="taskbar">
          <div class="taskbar-spacer"></div>
          <div class="taskbar-clock-date">
            <div class="time">{formatTime(currentTime)}</div>
            <div class="date">{formatDate(currentTime)}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Desktop;