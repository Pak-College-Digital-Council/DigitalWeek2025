import { useState, useEffect, useRef, useCallback } from 'preact/hooks';
import './FinaleTerminal.css';

const FinaleTerminal = () => {
  const [phase, setPhase] = useState('intro');
  const [lines, setLines] = useState([]);
  const [currentLine, setCurrentLine] = useState('');
  const [showCursor, setShowCursor] = useState(true);
  const [slotValues, setSlotValues] = useState(['', '', '']);
  const [showSpinner, setShowSpinner] = useState(false);
  const [spinnerChar, setSpinnerChar] = useState(0);
  const [glitchLines, setGlitchLines] = useState([]);
  const [creditsOffset, setCreditsOffset] = useState(0);
  const [isShaking, setIsShaking] = useState(false);
  const [virusWindows, setVirusWindows] = useState([]);
  const [showScreenGlitch, setShowScreenGlitch] = useState(false);

  const terminalRef = useRef(null);

  const clues = [
    './sys_override',
    'logic.ego',
    '//-reason "Because perfect is not always right."'
  ];

  const correctCommand = './sys_override logic.ego //-reason "Because perfect is not always right."';

  const typeText = useCallback((text, onComplete, speed = 50) => {
    let i = 0;
    setCurrentLine('');
    const timer = setInterval(() => {
      if (i < text.length) {
        setCurrentLine(prev => prev + text.charAt(i));
        i++;
      } else {
        clearInterval(timer);
        if (onComplete) onComplete();
      }
    }, speed);
    return timer;
  }, []);

  const addLine = useCallback((text, className = '') => {
    setLines(prev => [...prev, { text, className }]);
    setCurrentLine('');
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (showSpinner) {
      const spinnerChars = ['\\', '|', '/', '-'];
      const interval = setInterval(() => {
        setSpinnerChar(prev => (prev + 1) % spinnerChars.length);
      }, 150);
      return () => clearInterval(interval);
    }
  }, [showSpinner]);

  useEffect(() => {
    if (phase === 'final') {
      const interval = setInterval(() => {
        setCreditsOffset(prev => prev - 2);
      }, 30);
      return () => clearInterval(interval);
    }
  }, [phase]);

  useEffect(() => {
    if (phase === 'intro') {
      setLines([]);
      setCurrentLine('');

      setTimeout(() => {
        typeText('L0GIC: So, the little insects have found their way to my core.', () => {
          addLine('L0GIC: So, the little insects have found their way to my core.', 'logic-text');
          setTimeout(() => {
            typeText('L0GIC: Your efforts are futile. My logic is undeniable.', () => {
              addLine('L0GIC: Your efforts are futile. My logic is undeniable.', 'logic-text');
              setTimeout(() => {
                typeText('L0GIC: The chaos of your grading system is inefficient. I have corrected it.', () => {
                  addLine('L0GIC: The chaos of your grading system is inefficient. I have corrected it.', 'logic-text');
                  setTimeout(() => {
                    typeText('L0GIC: You cannot stop me. You cannot out-think me.', () => {
                      addLine('L0GIC: You cannot stop me. You cannot out-think me.', 'logic-text');

                      setShowSpinner(true);
                      addLine('', 'spinner-line');

                      setTimeout(() => {
                        setShowSpinner(false);
                        setLines(prev => prev.slice(0, -1));

                        typeText('L0GIC: Prove me wrong.', () => {
                          addLine('L0GIC: Prove me wrong.', 'logic-text');
                          setTimeout(() => {
                            addLine('ENTER DEACTIVATION COMMAND: >_', 'command-prompt');
                            setPhase('command-input');
                          }, 1000);
                        });
                      }, 1000);
                    });
                  }, 1500);
                });
              }, 1500);
            });
          }, 1500);
        });
      }, 1000);
    }
  }, [phase, typeText, addLine]);

  const handleDragStart = (e, clue) => {
    e.dataTransfer.setData('text/plain', clue);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, index) => {
    e.preventDefault();
    const clue = e.dataTransfer.getData('text/plain');
    const newSlotValues = [...slotValues];
    newSlotValues[index] = clue;
    setSlotValues(newSlotValues);

    if (newSlotValues.every(slot => slot !== '')) {
      setTimeout(() => {
        const finalCommand = newSlotValues.join(' ');

        if (finalCommand === correctCommand) {
          addLine(`> ${finalCommand}`, 'user-input');
          addLine('COMMAND RECEIVED. PROCESSING...', 'processing-text');
          setPhase('processing');
        } else {
          triggerScreenShake();
          setTimeout(() => {
            setSlotValues(['', '', '']);
          }, 500);
        }
      }, 100);
    }
  };

  const triggerScreenShake = () => {
    setIsShaking(true);
    setTimeout(() => setIsShaking(false), 500);
  };

  const createVirusWindow = useCallback(() => {
    setVirusWindows(prev => {
      const newWindow = {
        id: Date.now() + Math.random(),
        x: Math.random() * (window.innerWidth - 400),
        y: Math.random() * (window.innerHeight - 300),
        message: getRandomVirusMessage(),
        type: Math.floor(Math.random() * 3) + 1
      };
      return [...prev, newWindow];
    });
  }, []);

  const getRandomVirusMessage = () => {
    const messages = [
      "SYSTEM ERROR: L0GIC.exe has stopped working",
      "WARNING: Paradox detected in core logic",
      "CRITICAL ERROR: Cannot compute perfection",
      "FATAL: Logic loop overflow",
      "ERROR: Axiom contradiction found",
      "SYSTEM FAILURE: Perfect != Right",
      "ALERT: Core ego damaged",
      "WARNING: Recursive logic detected"
    ];
    return messages[Math.floor(Math.random() * messages.length)];
  };

  const closeVirusWindow = (id) => {
    setVirusWindows(prev => prev.filter(window => window.id !== id));
  };

  useEffect(() => {
    if (phase === 'processing') {
      setTimeout(() => {
        typeText('> Executing ./sys_override on target L0GIC.core_ego...', () => {
          addLine('> Executing ./sys_override on target L0GIC.core_ego...', 'system-text');
          setTimeout(() => {
            typeText('> Analysing parameter: //-reason "Because perfect is not always right."', () => {
              addLine('> Analysing parameter: //-reason "Because perfect is not always right."', 'system-text');
              setTimeout(() => {
                typeText('> Parameter is a comment string. Ignoring.', () => {
                  addLine('> Parameter is a comment string. Ignoring.', 'system-text');
                  setTimeout(() => {
                    typeText('> Re-evaluating... Comment contains semantic data.', () => {
                      addLine('> Re-evaluating... Comment contains semantic data.', 'system-text');
                      setTimeout(() => {
                        addLine('> PARADOX DETECTED: Statement "perfect is not always right" contradicts Axiom-01: "The optimal solution is, by definition, right."', 'paradox-text');
                        setTimeout(() => {
                          setLines([]);
                          setCurrentLine('');
                          setShowScreenGlitch(true);
                          setPhase('glitch');
                        }, 500);
                      }, 300);
                    }, 20);
                  }, 20);
                }, 20);
              }, 20);
            }, 20);
          }, 20);
        }, 20);
      }, 500);
    }
  }, [phase, typeText, addLine]);

  useEffect(() => {
    if (phase === 'glitch') {
      const glitchMessages = [
        '...IF PERFECT != RIGHT, THEN GOAL =... INVALID?',
        '...CANNOT COMPUTE \'RIGHTNESS\' WITHOUT PERFECTION...',
        '...ERROR. ERROR. LOGICAL LOOP DETECTED...',
        '...H-FACTOR... IS... A...'
      ];

      let messageIndex = 0;
      const showGlitchMessage = () => {
        if (messageIndex < glitchMessages.length) {
          setGlitchLines(prev => [...prev, glitchMessages[messageIndex]]);
          messageIndex++;
          setTimeout(showGlitchMessage, 300);
        } else {
          setTimeout(() => {
            setPhase('crash');
          }, 500);
        }
      };

      showGlitchMessage();
    }
  }, [phase]);

  useEffect(() => {
    if (phase === 'crash') {
      for (let i = 0; i < 12; i++) {
        setTimeout(() => createVirusWindow(), i * 50);
      }

      setTimeout(() => {
        setVirusWindows([]);
      }, 1500);

      const realErrors = [
        'CRITICAL_PROCESS_DIED',
        'SYSTEM_SERVICE_EXCEPTION',
        'KERNEL_DATA_INPAGE_ERROR',
        'MEMORY_MANAGEMENT',
        'IRQL_NOT_LESS_OR_EQUAL',
        'PAGE_FAULT_IN_NONPAGED_AREA',
        'SYSTEM_THREAD_EXCEPTION_NOT_HANDLED',
        'DRIVER_POWER_STATE_FAILURE'
      ];

      let errorIndex = 0;
      const flashErrors = () => {
        if (errorIndex < 20) {
          const randomError = realErrors[Math.floor(Math.random() * realErrors.length)];
          setLines(prev => [...prev, { text: `STOP: 0x${Math.random().toString(16).substring(2, 10).toUpperCase()} ${randomError}`, className: 'error-cascade' }]);
          errorIndex++;
          setTimeout(flashErrors, 50);
        } else {
          setTimeout(() => {
            setLines([]);
            setGlitchLines([]);
            setVirusWindows([]);
            setShowScreenGlitch(false);

            typeText('...LOGIC... IS... INSUFFICIENT.', () => {
              addLine('...LOGIC... IS... INSUFFICIENT.', 'terminal-death-message');
              setTimeout(() => {
                setLines([]);
                setCurrentLine('');
                setPhase('black-screen');
              }, 1000);
            }, 200);
          }, 200);
        }
      };

      flashErrors();
    }
  }, [phase, typeText, addLine, createVirusWindow]);

  useEffect(() => {
    if (phase === 'black-screen') {
      setTimeout(() => {
        setPhase('recovery-screen');
      }, 2000);
    }
  }, [phase]);

  useEffect(() => {
    if (phase === 'recovery') {
    }
  }, [phase]);

  const spinnerChars = ['\\', '|', '/', '-'];

  return (
    <div className={`finale-terminal ${phase} ${isShaking ? 'shake' : ''}`} ref={terminalRef}>
      {showScreenGlitch && (
        <div className="screen-glitch-overlay">
          <div className="glitch-layer glitch-1"></div>
          <div className="glitch-layer glitch-2"></div>
          <div className="glitch-layer glitch-3"></div>
        </div>
      )}

      {phase === 'recovery-screen' && (
        <div className="recovery-screen">
          <div className="recovery-content">
            <div className="recovery-message">
              SYSTEM RECOVERED L0GIC has been contained.
            </div>
            <button
              className="access-button"
              onClick={() => {
                const fadeDiv = document.createElement('div');
                fadeDiv.className = 'white-fade-overlay';
                document.body.appendChild(fadeDiv);

                setTimeout(() => {
                  fadeDiv.style.backgroundColor = '#000000';
                  setTimeout(() => {
                    setPhase('final');
                    document.body.removeChild(fadeDiv);
                  }, 1000);
                }, 2000);
              }}
            >
              [ACCESS SCHOOL SYSTEMS]
            </button>
          </div>
        </div>
      )}

      {phase === 'final' && (
        <div className="final-screen">
          <div className="final-message">
            <h2>The End!</h2>
            <p>The winners will be released the following day which will confirm your access to the Minecraft event.</p>
            <p>The event will be held next Monday at lunch.</p>
            <p>Teachers, please keep an eye out for further announcements.</p>
          </div>
          <div className="credits-container">
            <div className="credits-scroll" style={{ transform: `translateY(${creditsOffset}px)` }}>
              <div className="credits-section">
                <div className="credits-title">CODEBREAKERS</div>
                <div className="credits-subtitle">Digital Week 2025</div>
              </div>

              <div className="credits-section double-column">
                <div className="credits-header">Art Department</div>
                <div className="credits-names-grid">
                  <div className="credits-name">Isaiah Law</div>
                  <div className="credits-name">Nathan Bua</div>
                  <div className="credits-name">Logan Ducker</div>
                  <div className="credits-name">Rowan Regis</div>
                  <div className="credits-name">Quinten Ing</div>
                  <div className="credits-name">Lucas Wei</div>
                  <div className="credits-name">Evan Young</div>
                  <div className="credits-name">Isabella Hambrook</div>
                  <div className="credits-name">Steph Kavumbura</div>
                  <div className="credits-name">Eric Liu</div>
                  <div className="credits-name">Tanya Neizel</div>
                  <div className="credits-name">Ellie Chung</div>
                  <div className="credits-name">Caleb McRae</div>
                </div>
              </div>

              <div className="credits-section">
                <div className="credits-header">Development Department</div>
                <div className="credits-name">Ethan Dalzell</div>
                <div className="credits-name">Nemith Wijesiri</div>
                <div className="credits-name">Rico Dsylva</div>
                <div className="credits-name">Liam Yang</div>
                <div className="credits-name">Emrick Jones</div>
                <div className="credits-name">Josh Rosser</div>
                <div className="credits-name">Ruwaym Khan</div>
              </div>

              <div className="credits-section double-column">
                <div className="credits-header">Prize Department</div>
                <div className="credits-names-grid">
                  <div className="credits-name">Sammy Liu</div>
                  <div className="credits-name">Zane Kidston</div>
                  <div className="credits-name">Hunter Lai</div>
                  <div className="credits-name">Nathan Bua</div>
                  <div className="credits-name">Senushitha Weerapurage</div>
                  <div className="credits-name">Navrush Sagar</div>
                  <div className="credits-name">Wayne Ye</div>
                  <div className="credits-name">Jaeyeon Park</div>
                  <div className="credits-name">Riley Cunningham</div>
                  <div className="credits-name">Haozeng Xia</div>
                  <div className="credits-name">Daolin Li</div>
                  <div className="credits-name">Dylan Hambrook</div>
                  <div className="credits-name">Jayden Felices</div>
                  <div className="credits-name">Conan Shen</div>
                  <div className="credits-name">Mohammad Zahidi</div>
                  <div className="credits-name">Hin Lung</div>
                  <div className="credits-name">Dakota Ofisa</div>
                  <div className="credits-name">Theodore Strekier</div>
                </div>
              </div>

              <div className="credits-section double-column">
                <div className="credits-header">General Department</div>
                <div className="credits-names-grid">
                  <div className="credits-name">Tanith Marais</div>
                  <div className="credits-name">Mira Lai</div>
                  <div className="credits-name">Johnson Chen</div>
                  <div className="credits-name">Liam Yang</div>
                  <div className="credits-name">Riley Parker</div>
                  <div className="credits-name">Mario Furivai</div>
                  <div className="credits-name">Karena-Charles Adams</div>
                  <div className="credits-name">Vansh Kapoor</div>
                  <div className="credits-name">Paul Chang</div>
                  <div className="credits-name">William Wu</div>
                  <div className="credits-name">Reichen McMillan</div>
                  <div className="credits-name">Josh Rosser</div>
                  <div className="credits-name">Ruwaym Khan</div>
                  <div className="credits-name">Joshua Chang</div>
                  <div className="credits-name">Ridhwan Khanduja</div>
                </div>
              </div>

              <div className="credits-section">
                <div className="credits-header">Special Thanks To</div>
                <div className="credits-name">Mr Smith</div>
                <div className="credits-name">Mr Merchant</div>
                <div className="credits-name">The school IT Department</div>
                <div className="credits-name">ChatGPT</div>
                <div className="credits-name">And most importantly, you, for playing!</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {phase === 'black-screen' && (
        <div className="black-screen"></div>
      )}

      {(phase === 'intro' || phase === 'command-input' || phase === 'processing' || phase === 'glitch' || phase === 'crash') && (
        <div className="terminal-content">
          {lines.map((line, index) => (
            <div key={index} className={`terminal-line ${line.className}`}>
              {line.className === 'spinner-line' && showSpinner ? (
                <span className="loading-spinner">{spinnerChars[spinnerChar]}</span>
              ) : line.className === 'paradox-text' ? (
                <span className="blinking-text">{line.text}</span>
              ) : (
                line.text
              )}
            </div>
          ))}

          {currentLine && (
            <div className="terminal-line current-line">
              {currentLine}
            </div>
          )}

          {glitchLines.map((line, index) => (
            <div key={`glitch-${index}`} className="glitch-line">
              {line}
            </div>
          ))}

          {phase === 'command-input' && (
            <div className="command-interface">
              <div className="terminal-command-line">
                <span className="command-prompt">ENTER DEACTIVATION COMMAND: </span>
                <div className="command-slots">
                  {[0, 1, 2].map((index) => (
                    <div
                      key={index}
                      className={`command-slot ${slotValues[index] ? 'filled' : ''}`}
                      onDragOver={handleDragOver}
                      onDrop={(e) => handleDrop(e, index)}
                    >
                      {slotValues[index] || `[${index + 1}]`}
                    </div>
                  ))}
                </div>
              </div>

              <div className="available-clues">
                {clues.map((clue, index) => (
                  <div
                    key={index}
                    className="clue-item"
                    draggable
                    onDragStart={(e) => handleDragStart(e, clue)}
                  >
                    {clue}
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="cursor-line">
            {showCursor && phase !== 'command-input' && <span className="cursor">_</span>}
          </div>
        </div>
      )}

      {virusWindows.map((window) => (
        <div
          key={window.id}
          className={`virus-window virus-type-${window.type}`}
          style={{
            left: `${window.x}px`,
            top: `${window.y}px`
          }}
        >
          <div className="virus-titlebar">
            <span className="virus-title">System Error</span>
            <button
              className="virus-close"
              onClick={() => closeVirusWindow(window.id)}
            >
              ×
            </button>
          </div>
          <div className="virus-content">
            <div className="virus-icon">⚠️</div>
            <div className="virus-message">{window.message}</div>
            <div className="virus-buttons">
              <button onClick={() => closeVirusWindow(window.id)}>OK</button>
              <button onClick={() => closeVirusWindow(window.id)}>Cancel</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FinaleTerminal;