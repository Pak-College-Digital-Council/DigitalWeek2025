import { createContext } from 'preact';
import { useState, useCallback, useEffect, useMemo, useContext } from 'preact/hooks';
import { getQuestDataByDay } from '../config/quests';
import { ACTIVE_DAY, DEV_SKIP_TO_FINALE, FORM_SUBMIT_URL } from '../config/globalConfig';
import { GameSessionContext } from './GameSessionContext';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const gameSession = useContext(GameSessionContext);
  const [currentDay, setCurrentDay] = useState(ACTIVE_DAY);
  const [clippyMessages, setClippyMessages] = useState([]);
  const [persistentClippyMessages, setPersistentClippyMessages] = useState([]);
  const [highlightedIconDay, setHighlightedIconDay] = useState(null);
  const [challengeCompletion, setChallengeCompletion] = useState(DEV_SKIP_TO_FINALE ? { 1: true, 2: true, 3: true } : {});
  const [finaleMode, setFinaleMode] = useState(DEV_SKIP_TO_FINALE);
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


  const completeChallenge = useCallback(async (dayId) => {
    setChallengeCompletion(prev => ({ ...prev, [dayId]: true }));
    

    gameSession.completeDay(dayId);
    

    await gameSession.submitFormData(dayId, FORM_SUBMIT_URL);
    

  }, [gameSession]);

  const triggerDayComplete = useCallback((dayId) => {
    if (window.onDayComplete) {
      window.onDayComplete(dayId);
    }
  }, []);

  const incrementIncorrectCount = useCallback((dayId) => {
    gameSession.incrementIncorrectCount(dayId);
  }, [gameSession]);

  const startDayTracking = useCallback((dayId) => {
    gameSession.startDay(dayId);
  }, [gameSession]);



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
    incrementIncorrectCount,
    startDayTracking,
    triggerDayComplete,
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
