import { h } from 'preact';
import { useState, useEffect, useContext } from 'preact/hooks';
import { AppContext } from '../context/AppContext';
import './FileExplorer.css';

const FileIcon = ({ iconType, isGridIcon = false }) => {
  const size = isGridIcon ? "64px" : "20px";
  let iconSrc = "/icons/file-generic.svg";

  switch (iconType?.toLowerCase()) {
    case 'exe': case 'msi':
      iconSrc = "/icons/file-exe.svg";
      break;
    case 'jpg': case 'jpeg': case 'png':
      iconSrc = "/icons/file-image.svg";
      break;
    case 'py': case 'html':
      iconSrc = "/icons/file-code.svg";
      break;
  }

  return (
    <div className="file-icon-container" style={{ width: size, height: size }}>
      <img
        src={iconSrc}
        alt={`${iconType || 'file'} icon`}
        style={{ width: '100%', height: '100%' }}
      />
    </div>
  );
};

const InfoIcon = ({onClick}) => (
  <svg onClick={onClick} className="info-icon-svg" width="18px" height="18px" strokeWidth="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 11.5V16.5" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"></path>
    <path d="M12 7.51L12.01 7.49889" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"></path>
    <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"></path>
  </svg>
);


const FileExplorer = ({ questData, onClose }) => {
  const { showClippyMessages, completeChallenge, currentDay, clippyMessages, completeClippyMessages: clearPrevClippyMessages } = useContext(AppContext);
  const [unsortedFiles, setUnsortedFiles] = useState([]);
  const [safeFiles, setSafeFiles] = useState([]);
  const [suspiciousFiles, setSuspiciousFiles] = useState([]);
  const [draggedFile, setDraggedFile] = useState(null);
  const [introClippyShown, setIntroClippyShown] = useState(false);
  const [dragOverTarget, setDragOverTarget] = useState(null);
  const [showTerminalView, setShowTerminalView] = useState(false);

  const [animatedTitleVisible, setAnimatedTitleVisible] = useState(false);
  const [displayedLogLines, setDisplayedLogLines] = useState([]);
  const [currentLogLineIndex, setCurrentLogLineIndex] = useState(0);
  const [logAnimationComplete, setLogAnimationComplete] = useState(false);
  const [signatureVisible, setSignatureVisible] = useState(false);

  useEffect(() => {
    if (questData && questData.data && questData.data.files) {
      setUnsortedFiles(questData.data.files.sort((a,b) => a.id.localeCompare(b.id)));
      setSafeFiles([]);
      setSuspiciousFiles([]);
      setIntroClippyShown(false);
      setShowTerminalView(false);
      setAnimatedTitleVisible(false);
      setDisplayedLogLines([]);
      setCurrentLogLineIndex(0);
      setLogAnimationComplete(false);
      setSignatureVisible(false);
    }
  }, [questData]);

  useEffect(() => {
    if (questData && questData.type === 'file_sort' && questData.introClippyMessages && !introClippyShown && clippyMessages.length === 0 && !showTerminalView) {
      showClippyMessages(questData.introClippyMessages);
      setIntroClippyShown(true);
    }
  }, [questData, introClippyShown, showClippyMessages, clippyMessages, showTerminalView]);

  useEffect(() => {
    if (showTerminalView) {
      setAnimatedTitleVisible(true);
      const timer = setTimeout(() => {
        setCurrentLogLineIndex(0);
        setDisplayedLogLines([]);
      }, 700);
      return () => clearTimeout(timer);
    }
  }, [showTerminalView]);

  useEffect(() => {
    if (showTerminalView && questData.completionLog && currentLogLineIndex < questData.completionLog.length) {
      const timer = setTimeout(() => {
        setDisplayedLogLines(prev => [...prev, questData.completionLog[currentLogLineIndex]]);
        setCurrentLogLineIndex(prev => prev + 1);
      }, 200);
      return () => clearTimeout(timer);
    } else if (showTerminalView && questData.completionLog && currentLogLineIndex === questData.completionLog.length && !logAnimationComplete) {
      setLogAnimationComplete(true);
    }
  }, [showTerminalView, currentLogLineIndex, questData.completionLog, logAnimationComplete]);

  useEffect(() => {
    if (logAnimationComplete) {
      const signatureTimer = setTimeout(() => {
        setSignatureVisible(true);
      }, 500);
      return () => clearTimeout(signatureTimer);
    }
  }, [logAnimationComplete]);


  useEffect(() => {
    if (signatureVisible) {
      if (questData.successClippyMessages && questData.successClippyMessages.length > 0) {
        const messagesWithFinalAction = questData.successClippyMessages.map((msg, i) => {
          if (i === questData.successClippyMessages.length - 1) {
            return {
              ...msg,
              onComplete: () => {
                setTimeout(() => {
                  if (onClose) onClose();
                }, 0);
              }
            };
          }
          return msg;
        });
        showClippyMessages(messagesWithFinalAction);
      } else {
        setTimeout(() => { if (onClose) onClose(); }, 0);
      }
    }
  }, [signatureVisible, questData.successClippyMessages, showClippyMessages, onClose, clearPrevClippyMessages]);


  const handleDragStart = (e, file) => {
    setDraggedFile(file);
    if (e.dataTransfer) {
      e.dataTransfer.effectAllowed = 'move';
      e.dataTransfer.setData('text/plain', file.id);
    }
  };

  const handleDragOver = (e, target) => { e.preventDefault(); if (e.dataTransfer) e.dataTransfer.dropEffect = 'move'; setDragOverTarget(target); };
  const handleDragLeave = (e) => { setDragOverTarget(null); }

  const moveFileToListLogic = (fileId, targetCategory) => {
    let fileToMove = null;
    let newUnsorted = [...unsortedFiles], newSafe = [...safeFiles], newSuspicious = [...suspiciousFiles];
    const findAndSplice = arr => { const i = arr.findIndex(f => f.id === fileId); if (i > -1) { fileToMove = arr[i]; arr.splice(i, 1); return true; } return false; };
    if (!findAndSplice(newUnsorted)) if (!findAndSplice(newSafe)) findAndSplice(newSuspicious);
    if (fileToMove) {
        if (targetCategory === 'safe') newSafe.push(fileToMove);
        else if (targetCategory === 'suspicious') newSuspicious.push(fileToMove);
        else if (targetCategory === 'unsorted') newUnsorted.push(fileToMove);
        setUnsortedFiles(newUnsorted.sort((a,b) => a.id.localeCompare(b.id)));
        setSafeFiles(newSafe.sort((a,b) => a.id.localeCompare(b.id)));
        setSuspiciousFiles(newSuspicious.sort((a,b) => a.id.localeCompare(b.id)));
    }
  };

  const handleDrop = (e, targetCategory) => {
    e.preventDefault();
    setDragOverTarget(null);
    const fileId = e.dataTransfer ? e.dataTransfer.getData('text/plain') : draggedFile?.id;
    if (!fileId) return;
    moveFileToListLogic(fileId, targetCategory);
    setDraggedFile(null);
  };

  const handleInfoClick = (file, e) => { e.stopPropagation(); if (file.infoClippyMessage) showClippyMessages([{ text: file.infoClippyMessage, interactive: true }]); };

  const handleSubmitAnalysis = () => {
    if (unsortedFiles.length > 0) { showClippyMessages(questData.feedbackClippyMessages?.notAllSorted || [{ text: "Please sort all files before submitting.", interactive: true }]); return; }
    let allCorrect = !safeFiles.some(file => file.isSuspicious) && !suspiciousFiles.some(file => !file.isSuspicious);
    if (allCorrect) {
      clearPrevClippyMessages();
      setShowTerminalView(true);
      completeChallenge(currentDay);
    } else {
      showClippyMessages(questData.feedbackClippyMessages?.incorrectSort || [{ text: "Some files are misplaced. Please review and try again.", interactive: true }]);
    }
  };

  if (!questData || !questData.data) { return <div className="file-explorer-window"><div className="file-explorer-header"><div className="address-toolbar"><span className="address-bar-path">Error</span></div></div><div className="file-explorer-body"><p>Quest data not loaded.</p></div></div>; }

  const { suspiciousLabel, safeLabel } = questData.data;

  const renderFileListItem = (file, listName) => (
    <div key={`${listName}-${file.id}`} className="file-item-list" draggable="true" onDragStart={(e) => handleDragStart(e, file)} onDragEnd={() => setDraggedFile(null)}>
      <FileIcon iconType={file.iconType} />
      <span className="file-item-name">{file.name}</span>
      <InfoIcon onClick={(e) => handleInfoClick(file, e)} />
    </div>
  );

  const renderFileGridItem = (file) => (
    <div key={`unsorted-${file.id}`} className="file-item-grid" draggable="true" onDragStart={(e) => handleDragStart(e, file)} onDragEnd={() => setDraggedFile(null)}>
      <div className="file-item-icon-wrapper">
        <FileIcon iconType={file.iconType} isGridIcon={true} />
        <div className="info-icon-grid-wrapper"><InfoIcon onClick={(e) => handleInfoClick(file, e)} /></div>
      </div>
      <span className="file-item-name">{file.name}</span>
    </div>
  );

  return (
    <div className="file-explorer-window">
      <div className="title-bar">
        <div className="title-bar-text">{showTerminalView ? "System Output" : "File Explorer"}</div>
        <div className="window-controls">
          <button className="window-btn min" title="Minimize" disabled>_</button>
          <button className="window-btn max" title="Maximize" disabled>☐</button>
          <button className="window-btn close" title="Close" disabled>✕</button>
        </div>
      </div>

      {showTerminalView ? (
        <div className="file-explorer-terminal-view">
          <h2 className={animatedTitleVisible ? 'title-flicker' : ''}>ANALYSIS COMPLETE</h2>
          <div className="terminal-log-output">
            {displayedLogLines.map((logEntry, index) => (
              <p key={index}>{logEntry}</p>
            ))}
          </div>
          {signatureVisible && (
            <p className="terminal-output-emphasis signature-fade-in">Target Signature Acquired: logic.ego</p>
          )}
        </div>
      ) : (
        <>
          <div className="file-explorer-header">
            <div className="address-toolbar">
              <div className="nav-buttons"><span>‹</span><span>›</span></div>
              <div className="address-bar-container"><span className="address-bar-path">This PC &gt; Desktop &gt; Analyse_This</span></div>
            </div>
            <div className="view-toolbar">
              <div className="tool-button"><span>+</span> New</div>
              <div className="tool-button"><span>⟲</span> Refresh</div>
              <div className="tool-button-group"><div className="tool-button"><span>↑↓</span> Sort</div><div className="tool-button"><span>▣</span> View</div></div>
              <div className="tool-button"><span>…</span></div>
            </div>
          </div>

          <div className="file-explorer-body">
            <div onDragOver={e => handleDragOver(e, 'unsorted')} onDrop={e => handleDrop(e, 'unsorted')} onDragLeave={handleDragLeave} className={`main-content-pane ${dragOverTarget === 'unsorted' ? 'drag-over' : ''}`}>
              {unsortedFiles.length > 0 ? unsortedFiles.map(renderFileGridItem) : <div className="empty-pane-text"><span>All files have been sorted!</span></div>}
            </div>

            <div className="details-sidebar">
              <p className="file-explorer-instructions">Drag files from the left into the correct category below.</p>
              <div onDragOver={e => handleDragOver(e, 'safe')} onDrop={e => handleDrop(e, 'safe')} onDragLeave={handleDragLeave} className={`drop-zone safe-area ${dragOverTarget === 'safe' ? 'drag-over' : ''}`}>
                <h4>{safeLabel || "Safe Files"}</h4>
                <div className="drop-zone-content">{safeFiles.length > 0 ? safeFiles.map(file => renderFileListItem(file, 'safe')) : <p className="empty-folder-text">(Empty)</p>}</div>
              </div>
              <div onDragOver={e => handleDragOver(e, 'suspicious')} onDrop={e => handleDrop(e, 'suspicious')} onDragLeave={handleDragLeave} className={`drop-zone suspicious-area ${dragOverTarget === 'suspicious' ? 'drag-over' : ''}`}>
                <h4>{suspiciousLabel || "Suspicious Files"}</h4>
                <div className="drop-zone-content">{suspiciousFiles.length > 0 ? suspiciousFiles.map(file => renderFileListItem(file, 'suspicious')) : <p className="empty-folder-text">(Empty)</p>}</div>
              </div>
              <button className="submit-analysis-btn" onClick={handleSubmitAnalysis} disabled={unsortedFiles.length > 0}>Submit Analysis</button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default FileExplorer;