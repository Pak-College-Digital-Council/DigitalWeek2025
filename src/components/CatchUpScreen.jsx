import { useState, useEffect, useCallback, useContext } from 'preact/hooks';
import { PARTICIPANT_CODES } from '../config/globalConfig';
import { GameSessionContext } from '../context/GameSessionContext';
import './BootAnimation.css'

const CatchUpScreen = ({ onCatchUpComplete }) => {
    const { setParticipant } = useContext(GameSessionContext);
    const [displayedLines, setDisplayedLines] = useState([
        "CODEBREAKERS CATCH-UP SYSTEM",
        "",
        "Enter the code given to you in the email:",
        "",
        "(Press ESC to return to main screen)"
    ]);
    const [showCursor, setShowCursor] = useState(true);
    const [authStage, setAuthStage] = useState('code-input');
    const [codeInput, setCodeInput] = useState('');
    const [dayInput, setDayInput] = useState('');
    const [shakeScreen, setShakeScreen] = useState(false);

    useEffect(() => {
        const cursorTimer = setInterval(() => {
            setShowCursor(prevShow => !prevShow);
        }, 500);
        return () => clearInterval(cursorTimer);
    }, []);

    const handleKeyPress = useCallback((event) => {
        if (event.key === 'Escape' && (authStage === 'code-input' || authStage === 'day-input')) {
            window.history.pushState({}, '', '/');
            window.location.reload();
            return;
        }

        if (authStage === 'code-input') {
            if (event.key === 'Enter') {
                const trimmedCode = codeInput.trim();
                if (PARTICIPANT_CODES[trimmedCode]) {
                    setParticipant(trimmedCode, PARTICIPANT_CODES[trimmedCode]);
                    setAuthStage('day-input');
                    setDisplayedLines([
                        "CODEBREAKERS CATCH-UP SYSTEM",
                        "",
                        "Enter the code given to you in the email:",
                        `> ${'*'.repeat(trimmedCode.length)}`,
                        "ACCEPTED",
                        "",
                        "Enter the day number you want to play (1, 2, or 3):"
                    ]);
                } else {
                    setShakeScreen(true);
                    setCodeInput('');
                    setTimeout(() => setShakeScreen(false), 500);
                }
            } else if (event.key === 'Backspace') {
                setCodeInput(prev => prev.slice(0, -1));
            } else if (event.ctrlKey && event.key === 'v') {
                event.preventDefault();
                navigator.clipboard.readText().then(text => {
                    const cleanText = text.trim().replace(/[^0-9]/g, '').slice(0, 6);
                    setCodeInput(cleanText);
                }).catch(err => {
                    console.error('Failed to read clipboard:', err);
                });
            } else if (event.key.length === 1 && /[0-9]/.test(event.key) && codeInput.length < 6) {
                setCodeInput(prev => prev + event.key);
            }
        } else if (authStage === 'day-input') {
            if (event.key === 'Enter') {
                const dayNumber = parseInt(dayInput.trim());
                if (dayNumber >= 1 && dayNumber <= 3) {
                    setDisplayedLines(prev => [
                        ...prev,
                        `> ${dayInput}`,
                        "ACCEPTED",
                        "",
                        `Loading Day ${dayNumber}...`,
                        "Press Enter to continue"
                    ]);
                    setAuthStage('confirmed');
                } else {
                    setShakeScreen(true);
                    setDayInput('');
                    setTimeout(() => setShakeScreen(false), 500);
                }
            } else if (event.key === 'Backspace') {
                setDayInput(prev => prev.slice(0, -1));
            } else if (event.key.length === 1 && /[1-3]/.test(event.key) && dayInput.length === 0) {
                setDayInput(event.key);
            }
        } else if (authStage === 'confirmed' && event.key === 'Enter') {
            const selectedDay = parseInt(dayInput);
            onCatchUpComplete(selectedDay);
        }
    }, [authStage, codeInput, dayInput, setParticipant, onCatchUpComplete]);

    useEffect(() => {
        window.addEventListener('keydown', handleKeyPress);
        return () => {
            window.removeEventListener('keydown', handleKeyPress);
        };
    }, [handleKeyPress]);

    return (
        <div class={`boot-animation-container ${shakeScreen ? 'shake' : ''}`}>
            {displayedLines.map((line, index) => (
                <p key={index}>{line}</p>
            ))}
            {authStage === 'code-input' && (
                <p>
                    {"> "}{'*'.repeat(codeInput.length)}
                    {showCursor ? '_' : ' '}
                </p>
            )}
            {authStage === 'day-input' && (
                <p>
                    {"> "}{dayInput}
                    {showCursor ? '_' : ' '}
                </p>
            )}
        </div>
    );
};

export default CatchUpScreen;