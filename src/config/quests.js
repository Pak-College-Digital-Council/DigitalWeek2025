export const quests = {
  1: {
    id: 1,
    title: "Terminal",
    type: "trivia",
    data: [
      { id: 1, question: "What is the strongest password?", options: { A: "password123", B: "Tr0ub4dor&3", C: "Isaiah2008" }, correctAnswer: "B", explanation: { correct: "Correct! 'Tr0ub4dor&3' is strong...", incorrect: ["Not quite..."] }},
      { id: 2, question: "You receive an email from your bank asking you to click a link...", options: { A: "Click the link...", B: "Ignore the email...", C: "Do not click the link..." }, correctAnswer: "C", explanation: { correct: "Exactly! This is a common phishing scam.", incorrect: ["That's a risky choice!"] }},
      { id: 3, question: "What does 'HTTPS' at the beginning of a website URL indicate?", options: { A: "HyperText Transfer Protocol Super", B: "The website has a secure, encrypted connection.", C: "The website is hosted in a special, high-speed server." }, correctAnswer: "B", explanation: { correct: "You got it! The 'S' in HTTPS stands for 'Secure'.", incorrect: ["Close, but not quite!"] }},
      { id: 4, question: "What is two-factor authentication (2FA)?", options: { A: "A password that is twice as long...", B: "Using two different web browsers...", C: "A security method that requires two forms of identification..." }, correctAnswer: "C", explanation: { correct: "That's right! 2FA adds a crucial second layer...", incorrect: ["That's not it."] }},
      { id: 5, question: "You see a shocking news headline shared on social media. What is a good first step?", options: { A: "Share it immediately...", B: "Check the information from a few different, reliable news sources.", C: "Only trust it if the person who shared it is your friend." }, correctAnswer: "B", explanation: { correct: "Excellent! Misinformation spreads quickly.", incorrect: ["Be careful!"] }}
    ],
    completionLog: [
      "[LOG] Human integrity check:", "Core function `main` running", "[ERROR] Access to the registry key `main` is denied.",
      "[CORRUPTED_FRAGMENT] The process `./sys_override` is preventing execution of necessary features.", "[LOG] Connection terminated."
    ],
    successClippyMessages: [
        { text: "Hmm... It looks like an app called `sys_override` is blocking us. That highlighted line is a clue! Keep it in mind.", interactive: true },
        { text: "Amazing work! You've cleared the first of L0GIC's verification challenges.", interactive: true },
        { text: "Every step we take gets us closer to his core and saving the school's data.", interactive: true },
        { text: "Your progress has been logged. Keep this up and you'll be well on your way to winning the grand prize!", interactive: true },
        { text: "I'll be in touch. See you soon!", interactive: false }
    ],
    introClippyMessages: [
        { text: "Alright, here we go. This is the verification terminal.", interactive: true },
        { text: "Just answer the questions as they appear. Type the letter of your answer and press Enter.", interactive: true },
        { text: "Get it right, and we move on. Get it wrong, and you'll have to try that question again. Good luck!", interactive: true }
    ],
    congratulationsClippyMessages: [
        { text: "Congratulations! You've passed the verification.", interactive: true },
        { text: "That means we can proceed further into L0GIC's system!", interactive: true }
    ]
  },
  2: { 
    id: 2,
    title: "Analyse This",
    type: "file_sort",
    data: {
      files: [
        { id: 'file1', name: "DoNotRun.exe", iconType: 'exe', isSuspicious: true, infoClippyMessage: "Executable files (.exe) can run programs. They are common carriers of malware if from an untrusted source." },
        { id: 'file2', name: "VacationPhotos.jpg", iconType: 'jpg', isSuspicious: false, infoClippyMessage: "JPEG files (.jpg) are typically images. While they *can* be crafted to exploit vulnerabilities in image viewers, it's less common for them to be directly malicious like executables." },
        { id: 'file3', name: "L0GIC_RAT.py", iconType: 'py', isSuspicious: true, infoClippyMessage: "Python files (.py) are scripts. RAT stands for Remote Access Trojan, which is definitely suspicious. This script could allow someone to control the computer remotely." },
        { id: 'file4', name: "UrgentInvoice.pdf.exe", iconType: 'exe', isSuspicious: true, infoClippyMessage: "This file looks like a PDF but actually ends in .exe. This is a common trick to disguise malware. Always check the true file extension!" },
        { id: 'file5', name: "MyEssay_final.docx", iconType: 'doc', isSuspicious: false, infoClippyMessage: "Word documents (.docx) can sometimes contain malicious macros, but a standard essay file is usually safe. Check macro settings if unsure!" },
        { id: 'file6', name: "FreeGames_Installer.msi", iconType: 'msi', isSuspicious: true, infoClippyMessage: "MSI files are installers for Windows. Downloading installers from unofficial sources is a high risk for malware." },
        { id: 'file7', name: "System_Important_Update.txt", iconType: 'txt', isSuspicious: false, infoClippyMessage: "Text files (.txt) are generally safe as they only contain plain text and cannot execute code on their own." },
        { id: 'file8', name: "ClickMeForPrize!.html", iconType: 'html', isSuspicious: true, infoClippyMessage: "HTML files (.html) can link to malicious websites or contain scripts for phishing attacks. A name like this is a big red flag!" }
      ],
      suspiciousLabel: "Suspicious Files (Malware Samples)",
      safeLabel: "Safe Files (Non-Threatening Data)"
    },
    completionLog: [
      "[LOG] File analysis complete.", "[LOG] All files correctly categorised.",
      "[LOG] Threat signatures identified: L0GIC.RAT, .EXE_Disguise, MSI_Bundle",
      "[LOG] Non-threatening data verified.", "[SUCCESS] Target Signature Acquired: logic.ego"
    ],
    successClippyMessages: [
        { text: "Incredible work, team! Analysis complete.", interactive: true },
        { text: "By isolating the malware, you've allowed us to pinpoint the AI's central processing nexus.", interactive: true },
        { text: "It's protected by a digital construct it calls its “ego” - the very source of its will that it cannot be wrong.", interactive: true },
        { text: "This is your target: `logic.ego`. That's the second clue! Remember it well.", interactive: true },
        { text: "Progress for Day Two has been recorded. I'll see you later, agents!", interactive: true }
    ],
    introClippyMessages: [
        { text: "Alright, you've opened the './Analyse_This' application. Smart move!", interactive: true },
        { text: "L0GIC's systems are adapting. This looks like a new kind of challenge – we need to analyse these files.", interactive: true },
        { text: "Sort them into 'Suspicious' or 'Safe'. Use the info icon if you need a hint about a file type.", interactive: true },
        { text: "Once everything is categorised, hit 'Submit Analysis'. Be thorough!", interactive: true }
    ],
    feedbackClippyMessages: {
      incorrectSort: [
        { text: "Hmm, that's not quite right. Some files are still in the wrong folders. Review their info and try again!", interactive: true },
        { text: "Close, but no cigar. Double-check each file's properties and potential risks before submitting.", interactive: true }
      ],
      notAllSorted: [
        { text: "Looks like there are still some files left unsorted. Please categorise all of them before submitting.", interactive: true }
      ]
    }
  }
};

export const getQuestDataByDay = (dayId) => {
  return quests[dayId] || null;
};
