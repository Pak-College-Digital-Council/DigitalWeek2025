import { h, Fragment } from 'preact';
import { useState, useEffect, useContext, useCallback, useRef } from 'preact/hooks';
import { AppContext } from '../../context/AppContext';
import Icon from '../Icon';
import './EmailClient.css';

import LibraryNoticeEmail from './EmailContents/LibraryNoticeEmail';
import PakageNewsletterEmail from './EmailContents/PakageNewsletterEmail';
import ClassroomNoticeEmail from './EmailContents/ClassroomNoticeEmail';
import InstagramPhishingEmail from './EmailContents/InstagramPhishingEmail';
import PasswordResetPhishingEmail from './EmailContents/PasswordResetPhishingEmail';
import PoorNewsletterPhishingEmail from './EmailContents/PoorNewsletterPhishingEmail';
import ClippySuccessEmail from './EmailContents/ClippySuccessEmail';


const getEmailDate = (email) => {
  switch (email.id) {
    case "email1":
      return "Aug 3";
    case "email2":
      return "Aug 2";
    case "email3":
      return "Jul 30";
    case "email4":
      return "Aug 4";
    case "email5":
      return "Jul 28";
    case "email6":
      return "Aug 4";
    default:
      return "Aug 3";
  }
};

const EmailClient = ({ questData, onClose }) => {
  const {
    showClippyMessages,
    completeChallenge,
    currentDay,
    clippyMessages,
    completeClippyMessages: clearPrevClippyMessages,
  } = useContext(AppContext);

  const [emails, setEmails] = useState([]);
  const [selectedEmailIds, setSelectedEmailIds] = useState(new Set());
  const [activeEmail, setActiveEmail] = useState(null);
  const [introClippyShown, setIntroClippyShown] = useState(false);
  const [isHintModeActive, setIsHintModeActive] = useState(false);
  const [challengeCompleted, setChallengeCompleted] = useState(false);
  const [proceedButtonEnabled, setProceedButtonEnabled] = useState(false);
  const emailContentPaneRef = useRef(null);
  const currentHintedElementRef = useRef(null);

  useEffect(() => {
    if (questData && questData.data && questData.data.emails) {
      setEmails(questData.data.emails);
      setActiveEmail(null);
      setSelectedEmailIds(new Set());
      setIntroClippyShown(false);
    }
  }, [questData]);


  useEffect(() => {
    if (
      questData &&
      questData.type === 'email_phishing' &&
      questData.clippyMessages &&
      Array.isArray(questData.clippyMessages.emailClientIntro) &&
      questData.clippyMessages.emailClientIntro.length > 0 &&
      !introClippyShown &&
      clippyMessages.length === 0
    ) {
      showClippyMessages(questData.clippyMessages.emailClientIntro);
      setIntroClippyShown(true);
    }

    return () => {
      if (introClippyShown && clippyMessages === questData.emailClientIntroClippyMessages) {



      }
    };
  }, [questData, introClippyShown, showClippyMessages, clippyMessages]);

  const handleEmailSelectToggle = (emailId) => {
    setSelectedEmailIds(prevSelected => {
      const newSelected = new Set(prevSelected);
      if (newSelected.has(emailId)) {
        newSelected.delete(emailId);
      } else {
        newSelected.add(emailId);
      }
      return newSelected;
    });
  };

  const handleEmailClick = (email) => {
    setActiveEmail(email);

  };

  const handleToggleHintMode = () => {
    const newHintModeState = !isHintModeActive;
    setIsHintModeActive(newHintModeState);
    if (newHintModeState) {
      if (questData.clippyMessages && questData.clippyMessages.hintSystemActivation) {
        showClippyMessages(questData.clippyMessages.hintSystemActivation);
      } else {
        showClippyMessages([{ text: "Hint mode ON! Click on email elements for clues.", interactive: true }]);
      }
    } else {
      if (questData.clippyMessages && questData.clippyMessages.hintSystemDeactivation) {
        showClippyMessages(questData.clippyMessages.hintSystemDeactivation);
      } else {
        showClippyMessages([{ text: "Hint mode OFF.", interactive: true }]);
      }

      if (!newHintModeState && currentHintedElementRef.current) {
        currentHintedElementRef.current.classList.remove('hint-highlight');
        currentHintedElementRef.current = null;

      }
    }
  };

  const handleProceedClick = () => {
    // Day 3.2 - Minimize email client and trigger finale sequence
    if (onClose) onClose();
  };



  const handleClickHint = useCallback((event) => {
    if (!isHintModeActive) return;

    let hintToShow = null;
    let targetElement = null;


    if (activeEmail && emailContentPaneRef.current?.contains(event.target)) {

      const headerSenderTarget = event.target.closest('.email-content-header p[data-hint-available]');
      if (headerSenderTarget) {
        hintToShow = activeEmail.hints.find(h => h.target === 'sender');
        targetElement = headerSenderTarget;
      }

      const headerSubjectTarget = event.target.closest('.email-content-header h2');
      if (headerSubjectTarget && !hintToShow) {
        hintToShow = activeEmail.hints.find(h => h.target === 'subject');
        targetElement = headerSubjectTarget;
      }


      if (!hintToShow) {
        const dataHintTarget = event.target.closest('[data-hint-id]');
        if (dataHintTarget) {
          const hintId = dataHintTarget.dataset.hintId;
          hintToShow = activeEmail.hints.find(h => h.id === hintId);
          targetElement = dataHintTarget;
        }
      }


      if (!hintToShow) {
        for (const hint of activeEmail.hints) {
          if (hint.query) {
            let currentDomTarget = event.target;
            while (currentDomTarget && currentDomTarget !== emailContentPaneRef.current.parentElement) {
              if (currentDomTarget.matches && currentDomTarget.matches(hint.query)) {
                hintToShow = hint;
                targetElement = currentDomTarget;
                break;
              }
              currentDomTarget = currentDomTarget.parentElement;
            }
            if (hintToShow) break;
          }
        }
      }
    }

    if (hintToShow && targetElement) {

      if (currentHintedElementRef.current && currentHintedElementRef.current !== targetElement) {
        currentHintedElementRef.current.classList.remove('hint-highlight');
      }


      targetElement.classList.add('hint-highlight');
      currentHintedElementRef.current = targetElement;


      showClippyMessages([{ text: hintToShow.message, interactive: false }]);


      event.stopPropagation();
    }
  }, [isHintModeActive, activeEmail, showClippyMessages]);


  useEffect(() => {
    const contentPane = emailContentPaneRef.current;

    if (isHintModeActive && contentPane) {
      contentPane.addEventListener('click', handleClickHint);

      return () => {
        if (contentPane) {
          contentPane.removeEventListener('click', handleClickHint);
        }
        if (currentHintedElementRef.current) {
          currentHintedElementRef.current.classList.remove('hint-highlight');
          currentHintedElementRef.current = null;
        }
      };
    } else if (currentHintedElementRef.current) {
      currentHintedElementRef.current.classList.remove('hint-highlight');
      currentHintedElementRef.current = null;
    }
  }, [isHintModeActive, handleClickHint]);


  const handleReportPhishing = () => {
    if (selectedEmailIds.size !== 3) {

      showClippyMessages(questData.clippyMessages?.feedback?.selectThree || [{ text: "Please select exactly THREE emails before reporting.", interactive: true }]);
      return;
    }

    const reportedEmails = emails.filter(email => selectedEmailIds.has(email.id));
    const correctlyReportedPhishing = reportedEmails.filter(email => email.isPhishing);
    const incorrectlyReportedSafe = reportedEmails.filter(email => !email.isPhishing);

    if (correctlyReportedPhishing.length === 3 && incorrectlyReportedSafe.length === 0) {

      clearPrevClippyMessages();
      setChallengeCompleted(true); // Grey out the report button

      completeChallenge(currentDay);

      const currentSuccessClippy = questData.clippyMessages?.success || [];
      const congratulationsClippy = questData.clippyMessages?.congratulations || [];

      // Find the message about sending the email and add the onComplete handler
      const finalMessages = [
        ...currentSuccessClippy.map(msg => ({ ...msg, onComplete: msg.onComplete || (() => { }) })),
        ...congratulationsClippy.map((msg, idx) => {
          // Check if this is the message about sending the email
          if (msg.text && msg.text.includes("I've just sent you an email")) {
            return {
              ...msg,
              onComplete: () => {
                // Add the success email to inbox when user presses space on this message
                const successEmail = questData.data.successEmail;
                setEmails(prevEmails => [successEmail, ...prevEmails.filter(e => e.id !== successEmail.id)]);
                setActiveEmail(successEmail);

                // Call original onComplete if it existed
                if (msg.onComplete) msg.onComplete();
              }
            };
          }
          return {
            ...msg,
            onComplete: (idx === congratulationsClippy.length - 1)
              ? () => {
                // Enable the proceed button after the final message
                setProceedButtonEnabled(true);
                // Don't close the email client anymore - let user click Proceed
                // if (onClose) onClose();
              }
              : (msg.onComplete || (() => { }))
          };
        })
      ];
      showClippyMessages(finalMessages);

    } else {
      let feedbackMessages = [];
      if (incorrectlyReportedSafe.length > 0) {
        feedbackMessages = incorrectlyReportedSafe.map(email => ({
          text: `Regarding "${email.subject}": ${email.phishingExplanation}`,
          interactive: true
        }));

        const genericIncorrectFollowUp = questData.clippyMessages?.feedback?.incorrectReport
          ? questData.clippyMessages.feedback.incorrectReport.find(m => m.text.includes("Some of your selections"))
          : null;
        if (genericIncorrectFollowUp) {
          feedbackMessages.push(genericIncorrectFollowUp)
        } else {
          feedbackMessages.push({ text: "Some selections were incorrect. Please review and try again!", interactive: true });
        }

      } else {

        feedbackMessages = questData.clippyMessages?.feedback?.genericError || [{ text: "That's not the right combination. Please try again.", interactive: true }];
      }
      showClippyMessages(feedbackMessages);
    }
  };

  if (!questData || !questData.data) {
    return (
      <div className="email-client-window">
        <div className="email-client-error">Error: Email quest data not loaded.</div>
      </div>
    );
  }

  return (
    <div className={`email-client-window ${isHintModeActive ? 'hint-mode-active' : ''}`}>
      { }
      <div className="title-bar rnd-drag-handle"> { }
        <img src="/icons/email.svg" alt="" class="title-bar-icon" /> { }
        <div className="title-bar-text">SecureMail</div> { }
        <div className="window-controls">
          <button className="window-btn min" title="Minimize" disabled aria-label="Minimize"></button>
          <button className="window-btn max" title="Maximize" disabled aria-label="Maximize"></button>
          <button className="window-btn close" title="Close" aria-label="Close" disabled></button>
        </div>
      </div>

      { }
      <div className="email-main-header">
        <div className="email-main-header-left">
          { }
        </div>
        <div className="email-main-header-center">
          <div className="search-bar-container">
            <Icon name="search" className="search-icon" />
            <input type="search" className="search-input" placeholder="Search messages" />
          </div>
        </div>
        <div className="email-main-header-right">
          <Icon name="settings" className="header-icon" title="Settings" />
          <span className="user-email-display">user@example.com</span>
          <UserAvatar email="user@example.com" />
        </div>
      </div>

      { }
      <div className="email-client-body">
        <div className="email-sidebar">
          <button className="new-message-btn" disabled> { }
            <Icon name="edit" />
            New message
          </button>
          <ul className="email-folder-list">
            <SidebarItem iconName="inbox" text="Inbox" count={emails.filter(e => e.id !== 'clueEmail').length} isActive={true} />
            <SidebarItem iconName="drafts" text="Drafts" />
            <SidebarItem iconName="send" text="Sent" />
            <SidebarItem iconName="star" text="Starred" />
            <SidebarItem iconName="archive" text="Archive" />
            <SidebarItem iconName="report" text="Spam" />
            <SidebarItem iconName="delete" text="Trash" />
            <SidebarItem iconName="mail" text="All Mail" /> { }
          </ul>
          { }
          <button onClick={handleReportPhishing} className="report-phishing-btn" disabled={selectedEmailIds.size === 0 || challengeCompleted}>
            Report Phishing ({selectedEmailIds.size})
          </button>
        </div>

        <div className="email-main-content-area"> { }
          <div className="email-list-controls">
            <div className="email-list-controls-left">
              <button className="control-button" disabled>
                <Icon name="filter_list" />
                <span className="control-button-text"> All</span> { }
              </button>
              <button className="control-button icon-button" disabled>
                <Icon name="swap_vert" />
              </button>
            </div>
            <div className="email-list-controls-right">
              { }
              <div className="hint-toggle-container">
                <label htmlFor="hintToggle" className={`hint-toggle-label ${challengeCompleted ? 'disabled' : ''}`}>
                  <Icon name="tips_and_updates" className={`hint-icon ${isHintModeActive ? 'active' : ''}`} />
                  Hints
                </label>
                <input
                  type="checkbox"
                  id="hintToggle"
                  className="hint-toggle-checkbox"
                  checked={isHintModeActive}
                  onChange={challengeCompleted ? undefined : handleToggleHintMode}
                  disabled={challengeCompleted}
                />
                { }
                <span onClick={challengeCompleted ? undefined : handleToggleHintMode} className={`hint-visual-switch ${isHintModeActive ? 'active' : ''} ${challengeCompleted ? 'disabled' : ''}`}>
                  <span className="hint-visual-switch-knob"></span>
                </span>
              </div>
              <span className="pagination-text">1-{Math.min(6, emails.filter(e => e.id !== 'clueEmail').length)} of {emails.filter(e => e.id !== 'clueEmail').length}</span>
              <button className="control-button icon-button" disabled>
                <Icon name="chevron_left" />
              </button>
              <button className="control-button icon-button" disabled>
                <Icon name="chevron_right" />
              </button>
            </div>
          </div>

          <div className="email-list-and-content-split"> { }
            <div className="email-list-pane"> { }
              {emails.map(email => (
                <div
                  key={email.id}
                  className={`email-item ${activeEmail && activeEmail.id === email.id ? 'active' : ''} ${selectedEmailIds.has(email.id) ? 'selected-for-report' : ''}`}
                  onClick={() => handleEmailClick(email)}
                  data-email-id={email.id}
                >
                  <input
                    type="checkbox"
                    className="email-checkbox"
                    checked={selectedEmailIds.has(email.id)}
                    onChange={() => handleEmailSelectToggle(email.id)}
                    onClick={(e) => e.stopPropagation()}
                  />
                  <Icon name="account_circle" className="email-sender-icon" aria-hidden="true" />
                  <div className="email-item-sender-subject">
                    <div
                      className="email-item-sender"
                      data-hint-target={email.hints?.find(h => h.target === 'sender') ? 'sender' : undefined}
                    >
                      {email.sender}
                    </div>
                    <div
                      className="email-item-subject"
                      data-hint-target={email.hints?.find(h => h.target === 'subject') ? 'subject' : undefined}
                    >
                      {email.subject}
                    </div>
                  </div>
                  <div className="email-item-date">{getEmailDate(email)}</div>
                </div>
              ))}
            </div>

            <div className="email-content-pane" ref={emailContentPaneRef}> { }
              {activeEmail ? (
                <Fragment>
                  <div className="email-content-header">
                    <h2>{activeEmail.subject}</h2>
                    <p data-hint-available={activeEmail.hints?.find(h => h.target === 'sender') ? 'true' : undefined}>
                      <strong>From:</strong> {activeEmail.sender}
                    </p>
                  </div>
                  { }
                  {activeEmail.componentName === "LibraryNoticeEmail" && <LibraryNoticeEmail />}
                  {activeEmail.componentName === "PakageNewsletterEmail" && <PakageNewsletterEmail />}
                  {activeEmail.componentName === "ClassroomNoticeEmail" && <ClassroomNoticeEmail />}
                  {activeEmail.componentName === "InstagramPhishingEmail" && <InstagramPhishingEmail />}
                  {activeEmail.componentName === "PasswordResetPhishingEmail" && <PasswordResetPhishingEmail />}
                  {activeEmail.componentName === "PoorNewsletterPhishingEmail" && <PoorNewsletterPhishingEmail />}
                  {activeEmail.componentName === "ClippySuccessEmail" && <ClippySuccessEmail proceedButtonEnabled={proceedButtonEnabled} onProceedClick={handleProceedClick} />}

                  { }
                  {!activeEmail.componentName && activeEmail.body && (
                    <div className="email-content-body" dangerouslySetInnerHTML={{ __html: activeEmail.body }} />
                  )}

                  { }
                  {activeEmail.componentName &&
                    !["LibraryNoticeEmail", "PakageNewsletterEmail", "ClassroomNoticeEmail", "InstagramPhishingEmail", "PasswordResetPhishingEmail", "PoorNewsletterPhishingEmail", "ClippySuccessEmail"]
                      .includes(activeEmail.componentName) && (
                      <div className="email-content-body"><p>Error: Email content component '{activeEmail.componentName}' not found.</p></div>
                    )}
                </Fragment>
              ) : (
                <div className="no-email-selected">
                  <Icon name="mail" style={{ fontSize: '48px', marginBottom: '16px' }} />
                  Select an email to read.
                </div>
              )}
            </div>
          </div> { }
        </div> { } { }

        { }
        <div className="email-app-sidebar">
          <button className="app-sidebar-icon-button" title="Calendar" disabled>
            <Icon name="calendar_today" />
          </button>
          <button className="app-sidebar-icon-button" title="Keep" disabled>
            <Icon name="keep" />
          </button>
          <button className="app-sidebar-icon-button" title="Tasks" disabled>
            <Icon name="task" />
          </button>
          <button className="app-sidebar-icon-button notification" title="Add-ons" disabled>
            <Icon name="extension" />
            <span className="notification-badge">10</span>
          </button>
        </div>
      </div> { }
    </div>
  );
};

export default EmailClient;


const SidebarItem = ({ iconName, text, count, isActive }) => (
  <li className={`email-sidebar-item ${isActive ? 'active' : ''}`}>
    <Icon name={iconName} />
    <span className="email-sidebar-item-text">{text}</span>
    {count !== undefined && <span className="email-sidebar-item-count">{count}</span>}
  </li>
);


const UserAvatar = ({ email }) => {
  return (
    <div className="user-avatar">
      <Icon name="person" />
    </div>
  );
};
