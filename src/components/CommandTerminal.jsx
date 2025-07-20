import { useState, useEffect, useRef, useContext } from 'preact/hooks';
import { AppContext } from '../context/AppContext';
import './Terminal.css';

const CommandTerminal = ({ onClose }) => {
    const { showClippyMessages, showPersistentClippyMessages, clearPersistentClippyMessages, triggerGlitchEffect } = useContext(AppContext);
    const [input, setInput] = useState('');
    const [output, setOutput] = useState([]);
    const [isWaitingForCommand, setIsWaitingForCommand] = useState(true);
    const [inputEnabled, setInputEnabled] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const inputRef = useRef(null);

    useEffect(() => {
        showClippyMessages([
            {
                text: "Perfect! Now we can access L0GIC's core systems.", interactive: true, onComplete: () => {
                    showPersistentClippyMessages([
                        {
                            text: "Type the command: <code>pkexec logicCore</code> - this will give us administrative access to shut down the rogue AI.", onTypingComplete: () => {
                                setInputEnabled(true);
                            }
                        }
                    ]);
                }
            }
        ]);
    }, [showClippyMessages, showPersistentClippyMessages]);

    useEffect(() => {
        if (inputEnabled && inputRef.current) {
            inputRef.current.focus();
        }
    }, [inputEnabled]);

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            const command = input.trim();

            setOutput(prev => [...prev, { type: 'command', text: `$ ${command}` }]);

            if (command === 'pkexec logicCore') {
                setIsWaitingForCommand(false);
                setInput('');

                showClippyMessages([]);
                clearPersistentClippyMessages();

                setTimeout(() => {
                    setIsLoading(true);
                    setOutput(prev => [...prev, { type: 'loading', text: 'Loading...' }]);
                }, 200);

                setTimeout(() => {
                    setIsLoading(false);
                    setOutput(prev => [...prev.slice(0, -1)]);
                    setTimeout(() => {
                        setIsLoading(true);
                        setOutput(prev => [...prev, { type: 'loading', text: 'Loading...' }]);
                    }, 500);
                }, 2200);

                setTimeout(() => {
                    setIsLoading(false);
                    setOutput(prev => [...prev.slice(0, -1)]);
                    setTimeout(() => {
                        setOutput(prev => [...prev, { type: 'output', text: 'Authenticating...' }]);
                    }, 100);
                    setTimeout(() => {
                        setOutput(prev => [...prev, { type: 'output', text: 'Access granted.' }]);
                    }, 600);
                    setTimeout(() => {
                        setOutput(prev => [...prev, { type: 'output', text: 'Connecting to L0GIC core systems...' }]);
                    }, 1100);
                    setTimeout(() => {
                        triggerGlitchEffect();
                    }, 1800);
                }, 3700); // 2s + 0.5s + 1s
            } else {
                setOutput(prev => [...prev,
                { type: 'error', text: 'bash: command not found: ' + command },
                { type: 'output', text: 'Please try again.' }
                ]);
                setInput('');
            }
        }
    };

    const handleInputChange = (e) => {
        setInput(e.target.value);
    };

    return (
        <div className={`terminal-window ${isLoading ? 'loading' : ''}`}>
            <div className="terminal-header">
                <div className="terminal-header-left">
                    <span className="terminal-title">Terminal</span>
                </div>
                <div className="terminal-header-right">
                    <button className="terminal-close-btn" onClick={onClose} disabled>×</button>
                </div>
            </div>

            <div className="terminal-content">
                <div className="terminal-output">
                    {output.map((line, index) => (
                        <div key={index} className={`terminal-line ${line.type || ''}`}>
                            {line.text || line}
                        </div>
                    ))}
                </div>

                {isWaitingForCommand && (
                    <div className="terminal-input-line">
                        <span className="terminal-prompt">$ </span>
                        <input
                            ref={inputRef}
                            type="text"
                            value={input}
                            onChange={inputEnabled ? handleInputChange : undefined}
                            onKeyPress={inputEnabled ? handleKeyPress : undefined}
                            className="terminal-input"
                            disabled={!inputEnabled}
                            autoFocus={inputEnabled}
                            spellCheck="false"
                            autoComplete="off"
                            autoCorrect="off"
                            autoCapitalize="off"
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

export default CommandTerminal;