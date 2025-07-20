import { h } from 'preact';

const ClippySuccessEmail = ({ proceedButtonEnabled, onProceedClick }) => {
    return (
        <div className="clippy-success-email">
            <p>You've done it! L0GIC's phishing attempts were based on its flawed understanding of human motivation. It sees trust and empathy as bugs to be exploited. But we see it as a feature. This is the key. An AI built on pure logic physically cannot compute the value of imperfection or the idea that an illogical choice can sometimes be the right one.</p>

            <p>I've formulated this concept into a 'reasoning string' that its system can be forced to process. This is the final key.</p>

            <p><strong>Key String:</strong> <code>//-reason "Because perfect is not always right."</code></p>

            <button
                className={`proceed-btn ${proceedButtonEnabled ? 'enabled' : 'disabled'}`}
                onClick={proceedButtonEnabled ? onProceedClick : undefined}
                disabled={!proceedButtonEnabled}
            >
                Proceed to Final Challenge
            </button>
        </div>
    );
};

export default ClippySuccessEmail;