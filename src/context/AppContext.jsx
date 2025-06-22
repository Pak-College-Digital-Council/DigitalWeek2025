import { createContext } from 'preact';
import { useState, useCallback, useEffect, useMemo } from 'preact/hooks';
import { getQuestDataByDay } from '../config/quests';
import { ACTIVE_DAY } from '../config/globalConfig';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [currentDay, setCurrentDay] = useState(ACTIVE_DAY);
  const [clippyMessages, setClippyMessages] = useState([]);
  const [highlightedIconDay, setHighlightedIconDay] = useState(null);
  const [challengeCompletion, setChallengeCompletion] = useState({});
  const [showLogoutCountdown, setShowLogoutCountdown] = useState(false);

  const currentQuestData = useMemo(() => getQuestDataByDay(currentDay), [currentDay]);

  const showClippyMessages = useCallback((messages) => {
    setClippyMessages(messages);
  }, []);

  const completeClippyMessages = useCallback(() => {
    setClippyMessages([]);
  }, []);


  const completeChallenge = useCallback((dayId) => {
    setChallengeCompletion(prev => ({ ...prev, [dayId]: true }));
  }, []);

  const startLogoutCountdown = useCallback(() => {
    setShowLogoutCountdown(true);
  }, []);

  const triggerHighlightTerminalIcon = useCallback((dayToHighlight) => {
    setHighlightedIconDay(dayToHighlight);
  }, []);

  const contextValueDefinition = {
    currentDay,
    setCurrentDay,
    currentQuestData,
    clippyMessages,
    showClippyMessages,
    completeClippyMessages,
    highlightedIconDay,
    triggerHighlightTerminalIcon,
    challengeCompletion,
    completeChallenge,
    showLogoutCountdown,
    startLogoutCountdown,
  };

  useEffect(() => {
    window.DEV_TOOLS = {
      setDay: (day) => {
        console.log(`DEV_TOOLS: Setting active day to ${day} for this session.`);
        setCurrentDay(day);
      },
      getAppContext: () => contextValueDefinition,
    };
    return () => {
      delete window.DEV_TOOLS;
    };
  }, [setCurrentDay]);


  return <AppContext.Provider value={contextValueDefinition}>{children}</AppContext.Provider>;
};
