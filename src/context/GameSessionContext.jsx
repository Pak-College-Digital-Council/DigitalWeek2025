import { createContext } from 'preact';
import { useState, useCallback } from 'preact/hooks';
import { createClient } from '@supabase/supabase-js';

export const GameSessionContext = createContext();

// Supabase setup
const supabaseUrl = 'https://eqcwfsadfgirsoncearu.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVxY3dmc2FkZmdpcnNvbmNlYXJ1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ4Njg3NTgsImV4cCI6MjA3MDQ0NDc1OH0.o7NKv4f5MgfOsiGh9knRCFlgp9CdXzS394qCcKXLUvw';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

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

      const dataToInsert = {
        subject: `CODEBREAKERS Day ${day} Completion - ${currentSessionData.participantName || 'UNKNOWN'}`,
        participant_code: currentSessionData.participantCode || 'UNKNOWN',
        participant_name: currentSessionData.participantName || 'UNKNOWN',
        day: day,
        game_start_time: currentSessionData.gameStartTime || null,
        day_start_time: startTime || null,
        day_end_time: endTime,
        incorrect_count: currentSessionData.incorrectCounts[day] || 0,
        total_incorrect_count: Object.values(currentSessionData.incorrectCounts).reduce((sum, count) => sum + count, 0),
        submission_timestamp: currentTime
      };

      try {
        const { data, error } = await supabase
            .from('completions') // table name in Supabase
            .insert([dataToInsert]);

        if (error) {
          console.error('Error inserting data:', error);
          return null;
        }

        return data;
      } catch (error) {
        console.error('Unexpected error:', error);
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
