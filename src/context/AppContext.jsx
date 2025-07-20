import { createContext } from 'preact';
import { useState, useCallback, useEffect, useMemo } from 'preact/hooks';
import { getQuestDataByDay } from '../config/quests';
import { ACTIVE_DAY } from '../config/globalConfig';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [currentDay, setCurrentDay] = useState(ACTIVE_DAY);
  const [clippyMessages, setClippyMessages] = useState([]);
  const [persistentClippyMessages, setPersistentClippyMessages] = useState([]);
  const [highlightedIconDay, setHighlightedIconDay] = useState(null);
  const [challengeCompletion, setChallengeCompletion] = useState({});
  const [finaleMode, setFinaleMode] = useState(false);
  const [showGlitchEffect, setShowGlitchEffect] = useState(false);


  const currentQuestData = useMemo(() => getQuestDataByDay(currentDay), [currentDay]);

  const showClippyMessages = useCallback((messages) => {
    setClippyMessages(messages);
  }, []);

  const completeClippyMessages = useCallback(() => {
    setClippyMessages([]);
  }, []);

  const showPersistentClippyMessages = useCallback((messages) => {
    setPersistentClippyMessages(messages);
  }, []);

  const clearPersistentClippyMessages = useCallback(() => {
    setPersistentClippyMessages([]);
  }, []);


  const completeChallenge = useCallback((dayId) => {
    setChallengeCompletion(prev => ({ ...prev, [dayId]: true }));
  }, []);



  const triggerHighlightTerminalIcon = useCallback((dayToHighlight) => {
    setHighlightedIconDay(dayToHighlight);
  }, []);

  const startFinaleSequence = useCallback(() => {
    setFinaleMode(true);
  }, []);

  const triggerGlitchEffect = useCallback(() => {
    setShowGlitchEffect(true);
  }, []);

  const contextValueDefinition = {
    currentDay,
    setCurrentDay,
    currentQuestData,
    clippyMessages,
    showClippyMessages,
    completeClippyMessages,
    persistentClippyMessages,
    showPersistentClippyMessages,
    clearPersistentClippyMessages,
    highlightedIconDay,
    triggerHighlightTerminalIcon,
    challengeCompletion,
    completeChallenge,
    finaleMode,
    startFinaleSequence,
    showGlitchEffect,
    triggerGlitchEffect,
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
