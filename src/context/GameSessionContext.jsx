import { createContext } from 'preact';
import { useState, useCallback } from 'preact/hooks';

export const GameSessionContext = createContext();

export const GameSessionProvider = ({ children }) => {
  const [sessionData, setSessionData] = useState({
    participantCode: null,
    participantName: null,
    gameStartTime: null,
    dayStartTimes: {},
    dayEndTimes: {},
    incorrectCounts: {
      1: 0,
      2: 0,
      3: 0,
      'finale': 0
    }
  });

  const setParticipant = useCallback((code, name) => {
    setSessionData(prev => ({
      ...prev,
      participantCode: code,
      participantName: name,
      gameStartTime: new Date().toISOString()
    }));
  }, []);

  const startDay = useCallback((day) => {
    setSessionData(prev => ({
      ...prev,
      dayStartTimes: {
        ...prev.dayStartTimes,
        [day]: new Date().toISOString()
      }
    }));
  }, []);

  const completeDay = useCallback((day) => {
    setSessionData(prev => ({
      ...prev,
      dayEndTimes: {
        ...prev.dayEndTimes,
        [day]: new Date().toISOString()
      }
    }));
  }, []);

  const incrementIncorrectCount = useCallback((day) => {
    setSessionData(prev => ({
      ...prev,
      incorrectCounts: {
        ...prev.incorrectCounts,
        [day]: prev.incorrectCounts[day] + 1
      }
    }));
  }, []);

  const submitFormData = useCallback(async (day, formUrl) => {
    const currentTime = new Date().toISOString();
    

    const submitForm = async (currentSessionData) => {
      const startTime = currentSessionData.dayStartTimes[day];
      const endTime = currentTime;
      
      const formData = new FormData();
      

      formData.append('_subject', `CODEBREAKERS Day ${day} Completion - ${currentSessionData.participantName || 'UNKNOWN'}`);
      formData.append('_captcha', 'false');
      formData.append('_template', 'table');
      

      formData.append('participant_code', currentSessionData.participantCode || 'UNKNOWN');
      formData.append('participant_name', currentSessionData.participantName || 'UNKNOWN');
      formData.append('day', day.toString());
      formData.append('game_start_time', currentSessionData.gameStartTime || '');
      formData.append('day_start_time', startTime || '');
      formData.append('day_end_time', endTime);
      formData.append('incorrect_count', (currentSessionData.incorrectCounts[day] || 0).toString());
      formData.append('total_incorrect_count', Object.values(currentSessionData.incorrectCounts).reduce((sum, count) => sum + count, 0).toString());
      formData.append('submission_timestamp', currentTime);

      try {
        const response = await fetch(formUrl, {
          method: 'POST',
          body: formData,
          mode: 'no-cors'
        });
        
        return response;
      } catch (error) {

        return null;
      }
    };


    await submitForm(sessionData);
  }, [sessionData]);

  const contextValue = {
    sessionData,
    setParticipant,
    startDay,
    completeDay,
    incrementIncorrectCount,
    submitFormData
  };

  return (
    <GameSessionContext.Provider value={contextValue}>
      {children}
    </GameSessionContext.Provider>
  );
};