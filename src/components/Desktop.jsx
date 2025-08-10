import { h } from 'preact';
import { useState, useEffect, useCallback, useContext } from 'preact/hooks';
import { Rnd } from 'react-rnd';
import Terminal from './Terminal';
import FileExplorer from './FileExplorer';
import EmailClient from './EmailClient/EmailClient';
import CommandTerminal from './CommandTerminal';
import FinaleTerminal from './FinaleTerminal';
import GlitchEffect from './GlitchEffect';
import Clippy from './Clippy';
import { AppContext } from '../context/AppContext';
import { quests as allQuests, desktopMessages } from '../config/quests';
import { DEV_SKIP_TO_FINALE } from '../config/globalConfig';
import './Desktop.css';

const defaultTerminalSize = { width: 800, height: 500 };
const defaultFileExplorerSize = { width: 700, height: 550 };
const defaultEmailClientSize = { width: 1170, height: 650 };

const Desktop = ({ onLogout, onDayComplete }) => {
  const {
    clippyMessages,
    showClippyMessages,
    completeClippyMessages,
    highlightedIconDay,
    triggerHighlightTerminalIcon,
    challengeCompletion,
    currentDay,
    currentQuestData,
    finaleMode,
    startFinaleSequence,
    showGlitchEffect,
    triggerGlitchEffect,
    startDayTracking,
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

  const [isEmailClientOpen, setIsEmailClientOpen] = useState(false);
  const [emailClientSize, setEmailClientSize] = useState(defaultEmailClientSize);
  const [emailClientPosition, setEmailClientPosition] = useState({
    x: (window.innerWidth - defaultEmailClientSize.width) / 2 + 60,
    y: (window.innerHeight - defaultEmailClientSize.height) / 2 + 60,
  });

  const [isCommandTerminalOpen, setIsCommandTerminalOpen] = useState(false);
  const [commandTerminalSize, setCommandTerminalSize] = useState(defaultTerminalSize);
  const [commandTerminalPosition, setCommandTerminalPosition] = useState({
    x: (window.innerWidth - defaultTerminalSize.width) / 2,
    y: (window.innerHeight - defaultTerminalSize.height) / 2,
  });

  const [mainAppOpenedThisSession, setMainAppOpenedThisSession] = useState(false);
  const [hasWelcomeScriptBeenShown, setHasWelcomeScriptBeenShown] = useState(false);
  const [showFinaleTerminal, setShowFinaleTerminal] = useState(false);


  useEffect(() => {
    window.onDayComplete = onDayComplete;
    window.triggerDayComplete = (dayId) => {
      if (onDayComplete) {
        onDayComplete(dayId);
      }
    };
    return () => {
      delete window.onDayComplete;
      delete window.triggerDayComplete;
    };
  }, [onDayComplete]);


  useEffect(() => {
    setMainAppOpenedThisSession(false);
    setHasWelcomeScriptBeenShown(false);
    setIsTerminalOpen(false);
    setIsFileExplorerOpen(false);
    setIsEmailClientOpen(false);
  }, [currentDay]);

  const createWelcomeScript = useCallback(() => {
    if (desktopMessages[currentDay]) {
      const messages = [...desktopMessages[currentDay]];


      if (messages.length > 0) {
        const lastMessage = messages[messages.length - 1];
        const existingOnComplete = lastMessage.onComplete;

        lastMessage.onComplete = () => {
          if (existingOnComplete) existingOnComplete();
          triggerHighlightTerminalIcon(currentDay);
        };
      }

      return messages;
    }

    return [
      { text: "Welcome! Systems are ready.", interactive: true, clippyImage: "/clippy/thinking.png" },
      { text: `Current objective: ${currentQuestData?.title || 'Pending assignment...'}`, interactive: true, clippyImage: "/clippy/thinking.png" }
    ];
  }, [triggerHighlightTerminalIcon, currentDay, currentQuestData]);

  useEffect(() => {
    if (!hasWelcomeScriptBeenShown && clippyMessages.length === 0 && !mainAppOpenedThisSession) {
      const timer = setTimeout(() => {
        if (DEV_SKIP_TO_FINALE && finaleMode) {
          const finaleMessages = [...desktopMessages.finale];
          if (finaleMessages.length > 0) {
            const lastMessage = finaleMessages[finaleMessages.length - 1];
            const existingOnComplete = lastMessage.onComplete;
            
            lastMessage.onComplete = () => {
              if (existingOnComplete) existingOnComplete();
              triggerHighlightTerminalIcon('finale');
            };
          }
          showClippyMessages(finaleMessages);
        } else {
          showClippyMessages(createWelcomeScript());
        }
        setHasWelcomeScriptBeenShown(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [hasWelcomeScriptBeenShown, createWelcomeScript, showClippyMessages, clippyMessages, mainAppOpenedThisSession, finaleMode, triggerHighlightTerminalIcon]);



  useEffect(() => {
    const timerId = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timerId);
  }, []);

  const handleOpenMainApp = () => {
    if (challengeCompletion[currentDay]) {
      showClippyMessages(desktopMessages.completed);
      return;
    }
    completeClippyMessages();
    triggerHighlightTerminalIcon(null);
    setMainAppOpenedThisSession(true);


    startDayTracking(currentDay);

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
    } else if (currentDay === 3 && currentQuestData?.type === 'email_phishing') {
      const newX = (window.innerWidth - defaultEmailClientSize.width) / 2;
      const newY = (window.innerHeight - defaultEmailClientSize.height) / 2;
      setEmailClientPosition({ x: newX, y: newY });
      setEmailClientSize(defaultEmailClientSize);
      setIsEmailClientOpen(true);
    }
  };

  const handleCloseTerminal = useCallback(() => setIsTerminalOpen(false), []);
  const handleCloseFileExplorer = useCallback(() => setIsFileExplorerOpen(false), []);
  const handleCloseEmailClient = useCallback(() => {
    setIsEmailClientOpen(false);
    if (challengeCompletion[3]) {
      startFinaleSequence();
      const finaleMessages = [...desktopMessages.finale];


      if (finaleMessages.length > 0) {
        const lastMessage = finaleMessages[finaleMessages.length - 1];
        const existingOnComplete = lastMessage.onComplete;

        lastMessage.onComplete = () => {
          if (existingOnComplete) existingOnComplete();
          triggerHighlightTerminalIcon('finale');
        };
      }

      showClippyMessages(finaleMessages);
    }
  }, [challengeCompletion, startFinaleSequence, showClippyMessages, triggerHighlightTerminalIcon]);

  const handleCloseCommandTerminal = useCallback(() => setIsCommandTerminalOpen(false), []);

  const handleOpenFinaleTerminal = useCallback(() => {
    if (finaleMode) {
      startDayTracking('finale');
      
      const newX = (window.innerWidth - defaultTerminalSize.width) / 2;
      const newY = (window.innerHeight - defaultTerminalSize.height) / 2;
      setCommandTerminalPosition({ x: newX, y: newY });
      setCommandTerminalSize(defaultTerminalSize);
      setIsCommandTerminalOpen(true);
    }
  }, [finaleMode, startDayTracking]);

  const handleGlitchComplete = useCallback(() => {
    setIsCommandTerminalOpen(false);
    setIsTerminalOpen(false);
    setIsFileExplorerOpen(false);
    setIsEmailClientOpen(false);
    setShowFinaleTerminal(true);
  }, []);



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

  const isDay1IconDisabled = currentDay !== 1 || isDay1Complete || (currentDay === 1 && isTerminalOpen);
  const isDay1IconHighlighted = currentDay === 1 && highlightedIconDay === 1 && !isDay1IconDisabled;

  const Day1TerminalIcon = day1QuestStaticInfo ? (
    <div
      class={`icon ${isDay1IconHighlighted ? 'highlight-icon' : ''} ${isDay1IconDisabled ? 'disabled-icon' : ''}`}
      onDblClick={() => {
        if (currentDay === 1 && !isDay1IconDisabled) handleOpenMainApp();

      }}
      title={
        isDay1Complete ? `Day 1 Completed: ${day1QuestStaticInfo.title}` :
          (currentDay === 1 && isTerminalOpen) ? `${day1QuestStaticInfo.title} (Open)` :
            (currentDay === 1 ? day1QuestStaticInfo.title : `${day1QuestStaticInfo.title} (Inactive)`)
      }
    >
      <img src="/icons/terminal.svg" alt={day1QuestStaticInfo.title || "Terminal"} style={{ filter: isDay1IconDisabled ? 'grayscale(80%) opacity(0.6)' : '' }} />
      <span>{day1QuestStaticInfo.title || "Terminal"}</span>
    </div>
  ) : null;

  const day2QuestStaticInfo = allQuests[2];
  const isDay2Complete = challengeCompletion[2];
  const isDay2IconDisabled = currentDay !== 2 || isDay2Complete || (currentDay === 2 && isFileExplorerOpen);
  const isDay2IconHighlighted = currentDay === 2 && highlightedIconDay === 2 && !isDay2IconDisabled;

  const Day2FileExplorerIcon = day2QuestStaticInfo ? (
    <div
      class={`icon ${isDay2IconHighlighted ? 'highlight-icon' : ''} ${isDay2IconDisabled ? 'disabled-icon' : ''}`}
      onDblClick={() => {
        if (currentDay === 2 && !isDay2IconDisabled) handleOpenMainApp();
      }}
      title={
        isDay2Complete ? `Day 2 Completed: ${day2QuestStaticInfo.title}` :
          (currentDay === 2 && isFileExplorerOpen) ? `${day2QuestStaticInfo.title} (Open)` :
            (currentDay === 2 ? day2QuestStaticInfo.title : `${day2QuestStaticInfo.title} (Inactive)`)
      }
    >
      <img src="/icons/folder.svg" alt={day2QuestStaticInfo.title || "File Explorer"} style={{ filter: isDay2IconDisabled ? 'grayscale(80%) opacity(0.6)' : '' }} />
      <span>{day2QuestStaticInfo.title || "File Explorer"}</span>
    </div>
  ) : null;

  const day3QuestStaticInfo = allQuests[3];
  const isDay3Complete = challengeCompletion[3];
  const isDay3IconDisabled = currentDay !== 3 || isDay3Complete || (currentDay === 3 && isEmailClientOpen);
  const isDay3IconHighlighted = currentDay === 3 && highlightedIconDay === 3 && !isDay3IconDisabled;

  const Day3EmailClientIcon = day3QuestStaticInfo ? (
    <div
      class={`icon ${isDay3IconHighlighted ? 'highlight-icon' : ''} ${isDay3IconDisabled ? 'disabled-icon' : ''}`}
      onDblClick={() => {
        if (currentDay === 3 && !isDay3IconDisabled) handleOpenMainApp();
      }}
      title={
        isDay3Complete ? `Day 3 Completed: ${day3QuestStaticInfo.title}` :
          (currentDay === 3 && isEmailClientOpen) ? `${day3QuestStaticInfo.title} (Open)` :
            (currentDay === 3 ? day3QuestStaticInfo.title : `${day3QuestStaticInfo.title} (Inactive)`)
      }
    >
      <img src="/icons/email.svg" alt={day3QuestStaticInfo.title || "EMails"} style={{ filter: isDay3IconDisabled ? 'grayscale(80%) opacity(0.6)' : '' }} />
      <span>{day3QuestStaticInfo.title || "EMails"}</span>
    </div>
  ) : null;

  let FinaleTerminalIcon = null;
  if (finaleMode) {
    const iconDisabled = isCommandTerminalOpen;
    const isFinaleIconHighlighted = highlightedIconDay === 'finale' && !iconDisabled;

    FinaleTerminalIcon = (
      <div
        class={`icon ${isFinaleIconHighlighted ? 'highlight-icon' : ''} ${iconDisabled ? 'disabled-icon' : ''}`}
        onDblClick={!iconDisabled ? handleOpenFinaleTerminal : null}
        title={iconDisabled ? "Terminal (Open)" : "Terminal"}
      >
        <img src="/icons/terminal.svg" alt="Terminal" style={{ filter: iconDisabled ? 'grayscale(80%) opacity(0.6)' : '' }} />
        <span>Terminal</span>
      </div>
    );
  }

  return (
    <div class="desktop-wrapper">
      {showGlitchEffect && <GlitchEffect onComplete={handleGlitchComplete} />}
      {showFinaleTerminal && <FinaleTerminal />}

      <div class="desktop-background">
        <div class="desktop-icons">
          {!finaleMode && Day1TerminalIcon}
          {!finaleMode ? Day2FileExplorerIcon : (
            day2QuestStaticInfo && (
              <div
                class="icon disabled-icon"
                title={`${day2QuestStaticInfo.title} (Inactive)`}
              >
                <img src="/icons/folder.svg" alt={day2QuestStaticInfo.title || "File Explorer"} style={{ filter: 'grayscale(80%) opacity(0.6)' }} />
                <span>{day2QuestStaticInfo.title || "File Explorer"}</span>
              </div>
            )
          )}
          {!finaleMode ? Day3EmailClientIcon : (
            day3QuestStaticInfo && (
              <div
                class="icon disabled-icon"
                title={`${day3QuestStaticInfo.title} (Inactive)`}
              >
                <img src="/icons/email.svg" alt={day3QuestStaticInfo.title || "EMails"} style={{ filter: 'grayscale(80%) opacity(0.6)' }} />
                <span>{day3QuestStaticInfo.title || "EMails"}</span>
              </div>
            )
          )}
          {FinaleTerminalIcon}
        </div>

        {isTerminalOpen && currentDay === 1 && currentQuestData?.type === 'trivia' && (
          <Rnd size={terminalSize} position={terminalPosition} onDragStop={(e, d) => setTerminalPosition({ x: d.x, y: d.y })} onResizeStop={(e, direction, ref, delta, position) => { setTerminalSize({ width: ref.style.width, height: ref.style.height }); setTerminalPosition(position); }} minWidth={500} minHeight={300} dragHandleClassName="terminal-header" className="terminal-rnd-wrapper" default={{ ...defaultTerminalSize, ...terminalPosition }} enableResizing={true} >
            <Terminal onClose={handleCloseTerminal} />
          </Rnd>
        )}

        {isFileExplorerOpen && currentDay === 2 && currentQuestData?.type === 'file_sort' && (
          <Rnd size={fileExplorerSize} position={fileExplorerPosition} onDragStop={(e, d) => setFileExplorerPosition({ x: d.x, y: d.y })} onResizeStop={(e, direction, ref, delta, position) => { setFileExplorerSize({ width: ref.style.width, height: ref.style.height }); setFileExplorerPosition(position); }} minWidth={600} minHeight={450} dragHandleClassName="title-bar" className="file-explorer-rnd-wrapper" default={{ ...defaultFileExplorerSize, ...fileExplorerPosition }} enableResizing={true}>
            <FileExplorer questData={currentQuestData} onClose={handleCloseFileExplorer} />
          </Rnd>
        )}

        {isEmailClientOpen && currentDay === 3 && currentQuestData?.type === 'email_phishing' && (
          <Rnd size={emailClientSize} position={emailClientPosition} onDragStop={(e, d) => setEmailClientPosition({ x: d.x, y: d.y })} onResizeStop={(e, direction, ref, delta, position) => { setEmailClientSize({ width: ref.style.width, height: ref.style.height }); setEmailClientPosition(position); }} minWidth={700} minHeight={500} dragHandleClassName="rnd-drag-handle" className="email-client-rnd-wrapper" default={{ ...defaultEmailClientSize, ...emailClientPosition }} enableResizing={true}>
            <EmailClient questData={currentQuestData} onClose={handleCloseEmailClient} />
          </Rnd>
        )}

        {isCommandTerminalOpen && finaleMode && (
          <Rnd size={commandTerminalSize} position={commandTerminalPosition} onDragStop={(e, d) => setCommandTerminalPosition({ x: d.x, y: d.y })} onResizeStop={(e, direction, ref, delta, position) => { setCommandTerminalSize({ width: ref.style.width, height: ref.style.height }); setCommandTerminalPosition(position); }} minWidth={500} minHeight={300} dragHandleClassName="terminal-header" className="terminal-rnd-wrapper" default={{ ...defaultTerminalSize, ...commandTerminalPosition }} enableResizing={true}>
            <CommandTerminal onClose={handleCloseCommandTerminal} />
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