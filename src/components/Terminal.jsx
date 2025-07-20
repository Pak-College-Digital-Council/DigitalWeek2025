import { h } from 'preact';
import { useState, useEffect, useRef, useCallback, useContext, useMemo } from 'preact/hooks';
import { getQuestDataByDay } from '../config/quests.js';
import { AppContext } from '../context/AppContext';
import './Terminal.css';

const Terminal = ({ onClose }) => {
  const {
    showClippyMessages,
    completeChallenge,
    currentDay,
  } = useContext(AppContext);

  const currentQuest = useMemo(() => getQuestDataByDay(currentDay), [currentDay]);

  const [lines, setLines] = useState([]);
  const [input, setInput] = useState('');
  const [isInputDisabled, setIsInputDisabled] = useState(true);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [gameState, setGameState] = useState('loading');
  const [highlightedLine, setHighlightedLine] = useState('');
  const [incorrectCount, setIncorrectCount] = useState(0);
  const [isShowingPrompt, setIsShowingPrompt] = useState(false);
  const [verifyingText, setVerifyingText] = useState('');

  const inputRef = useRef(null);
  const terminalBodyRef = useRef(null);

  useEffect(() => {
    if (!currentQuest) {
      setLines([{ text: `No quest data found for Day ${currentDay}.`, type: 'error' }]);
      setIsInputDisabled(true);
      setIsShowingPrompt(false);
      setGameState('error');
      return;
    }

    setLines([]);
    setCurrentQuestionIndex(0);
    setIncorrectCount(0);
    setIsInputDisabled(true);

    if (currentQuest.type === "trivia") {
      setGameState('intro');
      setIsShowingPrompt(true);
      setIsInputDisabled(true);
    } else if (currentQuest.type === "coming_soon") {
      setLines([{ text: `Quest: ${currentQuest.title} - Coming Soon!`, type: 'system' }]);
      setIsShowingPrompt(false);
      setIsInputDisabled(true);
      setGameState('locked');
    } else {
      setGameState('intro');
      setIsShowingPrompt(true);
      setIsInputDisabled(true);
    }
  }, [currentQuest, currentDay]);


  useEffect(() => {
    if (gameState === 'waiting_for_finish' && currentQuest) {
      const loaderChars = ['|', '/', '-', '\\'];
      let charIndex = 0;
      const interval = setInterval(() => {
        setVerifyingText(`Verifying you are human [${loaderChars[charIndex]}]`);
        charIndex = (charIndex + 1) % loaderChars.length;
      }, 150);
      return () => clearInterval(interval);
    } else {
      setVerifyingText('');
    }
  }, [gameState, currentQuest]);


  const animateQuestion = useCallback((questionData) => {
    if (!questionData) return;
    const questionLines = [
      { text: `Question ${questionData.id}: ${questionData.question}`, type: 'question' },
      ...Object.entries(questionData.options).map(([key, value]) => ({
        text: `  ${key}) ${value}`,
        type: 'option'
      }))
    ];

    let delay = 0;
    questionLines.forEach((line) => {
      setTimeout(() => setLines(prev => [...prev, line]), delay);
      delay += 100;
    });

    setTimeout(() => {
      setIsInputDisabled(false);
      setGameState('playing');
    }, delay);
  }, []);

  const showQuestion = useCallback(() => {
    if (!currentQuest || !currentQuest.data || currentQuest.type !== 'trivia') return;
    const questionToShow = currentQuest.data[currentQuestionIndex];
    if (questionToShow) animateQuestion(questionToShow);
  }, [currentQuest, currentQuestionIndex, animateQuestion]);

  const startQuiz = useCallback(() => {
    if (!currentQuest || currentQuest.type !== 'trivia') return;
    setIsShowingPrompt(false);
    setLines([]);
    showQuestion();
  }, [currentQuest, showQuestion, setIsShowingPrompt]);
  
  const startGrantedSequence = useCallback(() => {
      if (!currentQuest) return;
      setLines([{ text: "ACCESS GRANTED", type: "success" }]);
      
      const animateEllipsis = (lineIndex, baseText, duration, callback) => {
          let ellipsisCount = 0;
          const interval = setInterval(() => {
              const dots = '.'.repeat(ellipsisCount + 1);
              setLines(prev => {
                  const newLines = [...prev];
                  if (newLines[lineIndex]) newLines[lineIndex] = { ...newLines[lineIndex], text: `${baseText}${dots}` };
                  return newLines;
              });
              ellipsisCount = (ellipsisCount + 1) % 3;
          }, 400);

          setTimeout(() => {
              clearInterval(interval);
              setLines(prev => {
                const newLines = [...prev];
                if (newLines[lineIndex]) newLines[lineIndex] = { ...newLines[lineIndex], text: `${baseText}...` };
                return newLines;
              });
              if(callback) callback();
          }, duration);
      };
      
      const log = currentQuest.completionLog || [];
      setTimeout(() => {
        if (log[0]) setLines(prev => [...prev, { text: log[0], type: 'log' }]);
        if (log[0]) animateEllipsis(1, log[0], 1500, () => {
          if (log[1]) setLines(prev => [...prev, { text: log[1], type: 'log' }]);
          if (log[1]) animateEllipsis(2, log[1], 2300, () => {
            if (log[2]) setTimeout(() => setLines(prev => [...prev, { text: log[2], type: 'log' }]), 200);
            setTimeout(() => {
              if (log[3]) {
                setLines(prev => [...prev, { text: log[3], type: 'log' }]);
                setHighlightedLine(log[3]);
              }
            }, 600);
            if (log[4]) setTimeout(() => setLines(prev => [...prev, { text: log[4], type: 'log' }]), 1000);
            setTimeout(() => {
              if (currentQuest.successClippyMessages) {
                showClippyMessages(currentQuest.successClippyMessages);
              }
              completeChallenge(currentDay);
            }, 1800);
          });
        });
      }, 1200);

      setGameState('done');
  }, [currentQuest, showClippyMessages, completeChallenge, currentDay, setHighlightedLine]);

  useEffect(() => {
    if (!currentQuest || gameState === 'loading' || gameState === 'error' || gameState === 'locked') {
        return;
    }

    if (gameState === 'intro') {
      if (currentQuest.introClippyMessages) {
        const messagesWithCallback = currentQuest.introClippyMessages.map((msg, index) => {
          if (index === currentQuest.introClippyMessages.length - 1) {
            if (currentQuest.type === 'trivia') {
              return { ...msg, onComplete: startQuiz };
            }
          }
          return msg;
        });
        showClippyMessages(messagesWithCallback);
      }
      setGameState('waiting_for_intro');
    } else if (gameState === 'next_question') {
      if (currentQuest.type === 'trivia' && currentQuest.data && currentQuest.data[currentQuestionIndex] && currentQuestionIndex < currentQuest.data.length) {
        showQuestion();
      } else if (currentQuest.type === 'trivia') {
        setGameState('finished');
      }
    } else if (gameState === 'finished') {
        setIsInputDisabled(true);
        setLines([]);
        if (currentQuest.type === 'trivia' && currentQuest.congratulationsClippyMessages) {
            const messagesWithCallback = currentQuest.congratulationsClippyMessages.map((msg, index) =>
              index === currentQuest.congratulationsClippyMessages.length - 1 ? { ...msg, onComplete: () => setGameState('granted') } : msg
            );
            showClippyMessages(messagesWithCallback);
        } else {
            setGameState('granted');
        }
        setGameState('waiting_for_finish');
    } else if (gameState === 'granted') {
        startGrantedSequence();
    }
  }, [gameState, currentQuest, currentQuestionIndex, showQuestion, showClippyMessages, startQuiz, startGrantedSequence, setIsInputDisabled, setLines, setIsShowingPrompt]);

  const handleInputSubmit = (e) => {
    e.preventDefault();
    if (isInputDisabled || !input.trim() || !currentQuest || !currentQuest.data ) return;

    const currentInput = input.trim();
    setLines(prev => [...prev, { text: `> ${currentInput}`, type: 'input' }]);
    setInput('');
    setIsInputDisabled(true);

    if (currentQuest.type === 'trivia') {
      const currentQuestionData = currentQuest.data[currentQuestionIndex];
      if (!currentQuestionData) return;

      const formattedInput = currentInput.toUpperCase();
      const isValidAnswer = Object.keys(currentQuestionData.options).includes(formattedInput);

      if (isValidAnswer) {
        if (formattedInput === currentQuestionData.correctAnswer) {
          setIncorrectCount(0);
          showClippyMessages([{
            text: currentQuestionData.explanation.correct,
            interactive: true,
            onComplete: () => {
              setLines([]);
              setCurrentQuestionIndex(prev => prev + 1);
              setGameState('next_question');
            }
          }]);
        } else {
          const incorrectMessages = currentQuestionData.explanation.incorrect;
          const messageToShow = incorrectMessages[incorrectCount % incorrectMessages.length];
          setIncorrectCount(prev => prev + 1);
          showClippyMessages([{
            text: messageToShow,
            interactive: true,
            onComplete: () => {
              setLines(prevLines => prevLines.slice(0, prevLines.length - 1 ));
              setIsInputDisabled(false);
              setGameState('playing');
            }
          }]);
        }
      } else {
        showClippyMessages([{
          text: "Oops, that's not a valid option. Please enter A, B, or C (or the available options).",
          interactive: true,
          onComplete: () => {
            setLines(prevLines => prevLines.slice(0, prevLines.length - 1));
            setIsInputDisabled(false);
            setGameState('playing');
          }
        }]);
      }
    }
  };

  const handleInputKeyDown = (e) => {
    if (e.key === ' ') {
      e.stopPropagation();
    }
  };
  
  useEffect(() => {
    if (!isInputDisabled && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isInputDisabled]);

  useEffect(() => {
    if (terminalBodyRef.current) {
      terminalBodyRef.current.scrollTop = terminalBodyRef.current.scrollHeight;
    }
  }, [lines, verifyingText]);

  const terminalTitle = useMemo(() => {
    if (currentQuest?.title) {
      return `L0GIC_OS:/bin/${currentQuest.title.toLowerCase().replace(/\s+/g, '_')}`;
    }
    return "L0GIC_OS:/bin/unknown_process";
  }, [currentQuest]);

  if (gameState === 'loading') {
    return (
      <div class="terminal-window">
        <div class="terminal-header">
          <div class="terminal-title">L0GIC_OS:/bin/loading...</div>
          <div class="terminal-buttons">
            <button class="terminal-btn min"></button>
            <button class="terminal-btn max"></button>
            <button class="terminal-btn close" onClick={onClose}></button>
          </div>
        </div>
        <div class="terminal-body" ref={terminalBodyRef}>
          <p>Loading Quest...</p>
        </div>
      </div>
    );
  }
  
  return (
    <div class="terminal-window">
      <div class="terminal-header">
        <div class="terminal-title">{terminalTitle}</div>
        <div class="terminal-buttons">
          <button class="terminal-btn min"></button>
          <button class="terminal-btn max"></button>
          <button class="terminal-btn close"></button>
        </div>
      </div>
      <div class="terminal-body" ref={terminalBodyRef}>
        {isShowingPrompt && ( <p><span class="prompt"></span><span class="blinking-cursor">_</span></p>)}
        {verifyingText && <p class="verifying">{verifyingText}</p>}
        {lines.map((line, index) => (
          <p
            key={index}
            class={`${line.type} ${line.text === highlightedLine ? 'highlight' : ''}`}
          >
            {line.text}
          </p>
        ))}
        {!isInputDisabled && (
          <form onSubmit={handleInputSubmit} class="terminal-input-form">
            <span class="prompt"></span>
            <input
              ref={inputRef}
              type="text"
              class="terminal-input"
              value={input}
              onInput={(e) => setInput(e.target.value.toUpperCase())}
              onKeyDown={handleInputKeyDown}
              disabled={isInputDisabled}
              maxLength={currentQuest?.type === 'trivia' ? "1" : undefined}
              autoFocus
            />
          </form>
        )}
      </div>
    </div>
  );
};

export default Terminal;