import { h } from 'preact';
import { useState, useEffect, useRef, useCallback } from 'preact/hooks';
import { triviaData, completionLog } from '../config/trivia.js';
import './Terminal.css';

const Terminal = ({ onClose, setClippyScript, onChallengeComplete }) => {
  const [lines, setLines] = useState([]);
  const [input, setInput] = useState('');
  const [isInputDisabled, setIsInputDisabled] = useState(true);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [gameState, setGameState] = useState('intro');
  const [highlightedLine, setHighlightedLine] = useState('');
  const [incorrectCount, setIncorrectCount] = useState(0);
  const [isShowingPrompt, setIsShowingPrompt] = useState(true);
  const [verifyingText, setVerifyingText] = useState('');

  const inputRef = useRef(null);
  const terminalBodyRef = useRef(null);
  
  useEffect(() => {
    if (gameState === 'waiting_for_finish') {
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
  }, [gameState]);


  const animateQuestion = useCallback((questionData) => {
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
    const currentQuestion = triviaData[currentQuestionIndex];
    if (currentQuestion) animateQuestion(currentQuestion);
  }, [currentQuestionIndex, animateQuestion]);

  const startQuiz = useCallback(() => {
    setIsShowingPrompt(false);
    setLines([]);
    showQuestion();
  }, [showQuestion]);
  
  const startGrantedSequence = useCallback(() => {
      setLines([{ text: "ACCESS GRANTED", type: "success" }]);
      
      const animateEllipsis = (lineIndex, baseText, duration, callback) => {
          let ellipsisCount = 0;
          const interval = setInterval(() => {
              const dots = '.'.repeat(ellipsisCount + 1);
              setLines(prev => {
                  const newLines = [...prev];
                  newLines[lineIndex] = { ...newLines[lineIndex], text: `${baseText}${dots}` };
                  return newLines;
              });
              ellipsisCount = (ellipsisCount + 1) % 3;
          }, 400);

          setTimeout(() => {
              clearInterval(interval);
              setLines(prev => {
                const newLines = [...prev];
                newLines[lineIndex] = { ...newLines[lineIndex], text: `${baseText}...` };
                return newLines;
              });
              if(callback) callback();
          }, duration);
      };
      
      setTimeout(() => {
        setLines(prev => [...prev, { text: completionLog[0], type: 'log' }]);
        animateEllipsis(1, completionLog[0], 1500, () => {
          setLines(prev => [...prev, { text: completionLog[1], type: 'log' }]);
          animateEllipsis(2, completionLog[1], 2300, () => {
            setTimeout(() => setLines(prev => [...prev, { text: completionLog[2], type: 'log' }]), 200);
            setTimeout(() => {
              setLines(prev => [...prev, { text: completionLog[3], type: 'log' }]);
              setHighlightedLine(completionLog[3]); 
            }, 600);
            setTimeout(() => setLines(prev => [...prev, { text: completionLog[4], type: 'log' }]), 1000);
            setTimeout(() => {
              setClippyScript([
                  { text: "Hmm... It looks like an app called `sys_override` is blocking us. That highlighted line is a clue! Keep it in mind.", interactive: true },
                  { text: "Amazing work! You've cleared the first of L0GIC's verification challenges.", interactive: true },
                  { text: "Every step we take gets us closer to his core and saving the school's data.", interactive: true },
                  { text: "Your progress has been logged. Keep this up and you'll be well on your way to winning the grand prize!", interactive: true },
                  { text: "I'll be in touch. See you soon!", interactive: false }
              ]);
              onChallengeComplete();
            }, 1800);
          });
        });
      }, 1200);

      setGameState('done');
  }, [setClippyScript, onChallengeComplete]);

  useEffect(() => {
    if (gameState === 'intro') {
      setClippyScript([
        { text: "Alright, here we go. This is the verification terminal.", interactive: true },
        { text: "Just answer the questions as they appear. Type the letter of your answer and press Enter.", interactive: true },
        { text: "Get it right, and we move on. Get it wrong, and you'll have to try that question again. Good luck!", interactive: true, onComplete: startQuiz }
      ]);
      setGameState('waiting_for_intro');
    } else if (gameState === 'next_question') {
      if (currentQuestionIndex < triviaData.length) {
        showQuestion();
      } else {
        setGameState('finished');
      }
    } else if (gameState === 'finished') {
        setIsInputDisabled(true);
        setLines([]);
        setClippyScript([
          { text: "Congratulations! You've passed the verification.", interactive: true },
          { text: "That means we can proceed further into L0GIC's system!", interactive: true, onComplete: () => setGameState('granted') }
        ]);
        setGameState('waiting_for_finish');
    } else if (gameState === 'granted') {
        startGrantedSequence();
    }
  }, [gameState, currentQuestionIndex, showQuestion, setClippyScript, startQuiz, startGrantedSequence]);

  const handleInputSubmit = (e) => {
    e.preventDefault();
    if (isInputDisabled || !input.trim()) return;

    const currentQuestion = triviaData[currentQuestionIndex];
    const formattedInput = input.trim().toUpperCase();
    const isValidAnswer = ['A', 'B', 'C'].includes(formattedInput);

    setLines(prev => [...prev, { text: `> ${input}`, type: 'input' }]);
    setInput('');
    setIsInputDisabled(true);

    if (isValidAnswer) {
      if (formattedInput === currentQuestion.correctAnswer) {
        setIncorrectCount(0);
        setClippyScript([{
          text: currentQuestion.explanation.correct,
          interactive: true,
          onComplete: () => {
            setLines([]);
            setCurrentQuestionIndex(prev => prev + 1);
            setGameState('next_question');
          }
        }]);
      } else {
        const incorrectMessages = currentQuestion.explanation.incorrect;
        const messageToShow = incorrectMessages[incorrectCount % incorrectMessages.length];
        setIncorrectCount(prev => prev + 1);
        setClippyScript([{
          text: messageToShow,
          interactive: true,
          onComplete: () => {
            setLines(prevLines => prevLines.slice(0, prevLines.length - 1));
            setIsInputDisabled(false);
            setGameState('playing');
          }
        }]);
      }
    } else {
      setClippyScript([{
        text: "Oops, that's not a valid option. Please enter A, B, or C.",
        interactive: true,
        onComplete: () => {
          setLines(prevLines => prevLines.slice(0, prevLines.length - 1));
          setIsInputDisabled(false);
          setGameState('playing');
        }
      }]);
    }
  };

  const handleInputKeyDown = (e) => {
    if (e.key === ' ') {
      e.preventDefault();
    }
  };
  
  useEffect(() => { !isInputDisabled && inputRef.current?.focus(); }, [isInputDisabled]);
  useEffect(() => { if (terminalBodyRef.current) terminalBodyRef.current.scrollTop = terminalBodyRef.current.scrollHeight; }, [lines, verifyingText]);
  
  return (
    <div class="terminal-window">
      <div class="terminal-header">
        <div class="terminal-title">L0GIC_OS:/bin/verify_human</div>
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
              maxLength="1"
              autoFocus
            />
          </form>
        )}
      </div>
    </div>
  );
};

export default Terminal;