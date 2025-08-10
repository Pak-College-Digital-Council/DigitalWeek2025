
export const desktopMessages = {
  1: [
    { text: "Hey there! Looks like you made it inside.", interactive: true, clippyImage: "/clippy/happy.png" },
    { text: "My name is C.L.I.P.P.Y. — your Companion and Logistical Interface for Player Progression. You can just call me Clippy.", interactive: true, clippyImage: "/clippy/thinking.png" },
    { text: "L0GIC's system is tough to crack. To get to the core, we first need to pass a 'human verification' test.", interactive: true, clippyImage: "/clippy/thinking.png" },
    { text: "I'm pretty sure we can run this in the Terminal app on the desktop. I'll point it out for you. Double-click it when you're ready to start!", interactive: true, clippyImage: "/clippy/happy.png" }
  ],
  2: [
    { text: "Welcome back, agents!", interactive: true, clippyImage: "/clippy/happy.png" },
    { text: "It looks like there's a new application on your desktop for today's task.", interactive: true, clippyImage: "/clippy/thinking.png" },
    { text: "I'm highlighting it now – let's see what L0GIC has in store for us!", interactive: true, clippyImage: "/clippy/thinking.png" },
    { text: "Double-click the highlighted icon when you're set.", interactive: true, clippyImage: "/clippy/thinking.png" }
  ],
  3: [
    { text: "Hey again! L0GIC's next trick involves phishing emails. Devious!", interactive: true, clippyImage: "/clippy/thinking.png" },
    { text: "We need to identify which emails are legitimate and which are phishing attempts.", interactive: true, clippyImage: "/clippy/thinking.png" },
    { text: "Open the email client when you're ready to begin the analysis.", interactive: true, clippyImage: "/clippy/thinking.png" }
  ],
  completed: [
    { text: "You've already completed this day's task! Excellent work.", interactive: true, clippyImage: "/clippy/happy.png" }
  ],
  finale: [
    { text: "Now that we have the three clues, we can finally put an end to L0GIC!", interactive: true, clippyImage: "/clippy/happy.png" },
    { text: "First, let's open the terminal again.", interactive: true, clippyImage: "/clippy/thinking.png" }
  ]
};

export const quests = {
  1: {
    id: 1,
    title: "Terminal",
    type: "trivia",
    data: [
      { id: 1, question: "What is the strongest password?", options: { A: "password123", B: "Tr0ub4dor&3", C: "Isaiah2008" }, correctAnswer: "B", explanation: { correct: "Correct! 'Tr0ub4dor&3' is strong because it uses a mix of uppercase letters, lowercase letters, numbers, and symbols. It's also long and not easily guessable.", incorrect: ["Not quite. A strong password should be complex and hard to guess. Simple words, names, or common number sequences are easy for hackers to crack. Try again!", "Remember, the best passwords mix different character types together. A name or a simple word won't cut it. Give it another shot!"] } },
      { id: 2, question: "You receive an email from your bank asking you to click a link to verify your account details. What should you do?", options: { A: "Click the link and enter your details. It's from my bank, so it must be safe.", B: "Ignore the email and hope for the best.", C: "Do not click the link. Go to your bank's website directly by typing the address in your browser." }, correctAnswer: "C", explanation: { correct: "Exactly! This is a common phishing scam. Never click on suspicious links in emails. Always go directly to the official website to log in securely.", incorrect: ["That's a risky choice! Phishing emails are designed to look real to trick you into giving away your information. It's always better to be safe. Try again!", "Think about it: could a scammer make an email look like it's from your bank? It's safer to not trust links directly. What's a more secure way to get to their website?", "Don't click that link! Even if it looks legitimate, it could lead to a fake site designed to steal your password. There's a much safer option."] } },
      { id: 3, question: "What does 'HTTPS' at the beginning of a website URL indicate?", options: { A: "HyperText Transfer Protocol Super", B: "The website has a secure, encrypted connection.", C: "The website is hosted in a special, high-speed server." }, correctAnswer: "B", explanation: { correct: "You got it! The 'S' in HTTPS stands for 'Secure'.", incorrect: ["Close, but not quite!"] } },
      { id: 4, question: "What is two-factor authentication (2FA)?", options: { A: "A password that is twice as long as a normal one.", B: "Using two different web browsers to log in.", C: "A security method that requires two forms of identification to access an account." }, correctAnswer: "C", explanation: { correct: "That's right! 2FA adds a crucial second layer of security, like a code sent to your phone, in addition to your password. It makes it much harder for unauthorised users to get in.", incorrect: ["That's not it. Two-factor authentication is about adding another layer of proof that it's really you. Think about what that second step might be.", "It's not about length or browsers. It's about having two *different types* of proof. One is something you know (your password), what could the other one be?", "Consider this: if a hacker steals your password, how can 2FA still protect you? It must require something the hacker doesn't have."] } },
      { id: 5, question: "You see a shocking news headline shared on social media. What is a good first step before you share it?", options: { A: "Share it immediately so your friends are informed.", B: "Check the information from a few different, reliable news sources.", C: "Only trust it if the person who shared it is your friend." }, correctAnswer: "B", explanation: { correct: "Excellent! Misinformation spreads quickly. Cross-referencing with reputable sources is a key skill for digital literacy and helps stop the spread of fake news.", incorrect: ["Be careful! Misinformation is designed to be shocking to make you share it. It's always best to verify before you amplify a message. Try again!", "Even friends can accidentally share false information. Your own critical thinking is the best tool here. What's the most reliable way to check a fact?", "Spreading news without checking it first is how fake news wins. There's a better, more responsible option available."] } }
    ],
    completionLog: [
      "[LOG] Human integrity check:", "Core function `main` running", "[ERROR] Access to the registry key `main` is denied.",
      "[CORRUPTED_FRAGMENT] The process `./sys_override` is preventing execution of necessary features.", "[LOG] Connection terminated."
    ],
    successClippyMessages: [
      { text: "Hmm... It looks like an app called `sys_override` is blocking us. That highlighted line is a clue! Keep it in mind.", interactive: true, clippyImage: "/clippy/thinking.png" },
      { text: "Amazing work! You've cleared the first of L0GIC's verification challenges.", interactive: true, clippyImage: "/clippy/happy.png" },
      { text: "Every step we take gets us closer to his core and saving the school's data.", interactive: true, clippyImage: "/clippy/happy.png" },
      { text: "Your progress has been logged. Keep this up and you'll be well on your way to winning the grand prize!", interactive: true, clippyImage: "/clippy/happy.png" },
      { text: "I'll be in touch. See you soon!", interactive: true, clippyImage: "/clippy/happy.png", onComplete: () => window.triggerDayComplete && window.triggerDayComplete(1) }
    ],
    introClippyMessages: [
      { text: "Alright, here we go. This is the verification terminal.", interactive: true, clippyImage: "/clippy/thinking.png" },
      { text: "Just answer the questions as they appear. Type the letter of your answer and press Enter.", interactive: true, clippyImage: "/clippy/thinking.png" },
      { text: "Get it right, and we move on. Get it wrong, and you'll have to try that question again. Good luck!", interactive: true, clippyImage: "/clippy/thinking.png" }
    ],
    congratulationsClippyMessages: [
      { text: "Congratulations! You've passed the verification.", interactive: true, clippyImage: "/clippy/happy.png" },
      { text: "That means we can proceed further into L0GIC's system!", interactive: true, clippyImage: "/clippy/happy.png" }
    ]
  },
  2: {
    id: 2,
    title: "File Explorer",
    type: "file_sort",
    data: {
      files: [
        { id: 'file1', name: "DoNotRun.exe", iconType: 'exe', isSuspicious: true, infoClippyMessage: "Executable files (.exe) can run programmes. They are common carriers of malware if from an untrusted source.", infoClippyImage: "/clippy/thinking.png" },
        { id: 'file2', name: "VacationPhotos.jpg", iconType: 'jpg', isSuspicious: false, infoClippyMessage: "JPEG files (.jpg) are typically images. While they *can* be crafted to exploit vulnerabilities in image viewers, it's less common for them to be directly malicious like executables.", infoClippyImage: "/clippy/thinking.png" },
        { id: 'file3', name: "L0GIC_RAT.py", iconType: 'py', isSuspicious: true, infoClippyMessage: "Python files (.py) are scripts. RAT stands for Remote Access Trojan, which is definitely suspicious. This script could allow someone to control the computer remotely.", infoClippyImage: "/clippy/thinking.png" },
        { id: 'file4', name: "UrgentInvoice.pdf.exe", iconType: 'exe', isSuspicious: true, infoClippyMessage: "This file looks like a PDF but actually ends in .exe. This is a common trick to disguise malware. Always check the true file extension!", infoClippyImage: "/clippy/thinking.png" },
        { id: 'file5', name: "MyEssay_final.docx", iconType: 'docx', isSuspicious: false, infoClippyMessage: "Word documents (.docx) can sometimes contain malicious macros, but a standard essay file is usually safe. Check macro settings if unsure!", infoClippyImage: "/clippy/thinking.png" },
        { id: 'file6', name: "FreeGames_Installer.msi", iconType: 'msi', isSuspicious: true, infoClippyMessage: "MSI files are installers for Windows. Downloading installers from unofficial sources is a high risk for malware.", infoClippyImage: "/clippy/thinking.png" },
        { id: 'file7', name: "System_Important_Update.txt", iconType: 'txt', isSuspicious: false, infoClippyMessage: "Text files (.txt) are generally safe as they only contain plain text and cannot execute code on their own.", infoClippyImage: "/clippy/thinking.png" },
        { id: 'file8', name: "ClickMeForPrize!.html", iconType: 'html', isSuspicious: true, infoClippyMessage: "HTML files (.html) can link to malicious websites or contain scripts for phishing attacks. A name like this is a big red flag!", infoClippyImage: "/clippy/thinking.png" }
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
      { text: "Incredible work, team! Analysis complete.", interactive: true, clippyImage: "/clippy/happy.png" },
      { text: "By isolating the malware, you've allowed us to pinpoint the AI's central processing nexus.", interactive: true, clippyImage: "/clippy/thinking.png" },
      { text: "It's protected by a digital construct it calls its “ego” - the very source of its will that it cannot be wrong.", interactive: true, clippyImage: "/clippy/thinking.png" },
      { text: "This is your target: `logic.ego`. That's the second clue! Remember it well.", interactive: true, clippyImage: "/clippy/thinking.png" },
      { text: "Progress for Day Two has been recorded. I'll see you later, agents!", interactive: true, clippyImage: "/clippy/happy.png", onComplete: () => window.triggerDayComplete && window.triggerDayComplete(2) }
    ],
    introClippyMessages: [
      { text: "Alright, you've opened the File Explorer application. Smart move!", interactive: true, clippyImage: "/clippy/thinking.png" },
      { text: "L0GIC's systems are adapting. This looks like a new kind of challenge – we need to analyse these files.", interactive: true, clippyImage: "/clippy/thinking.png" },
      { text: "Sort them into 'Suspicious' or 'Safe'. Use the info icon if you need a hint about a file type.", interactive: true, clippyImage: "/clippy/thinking.png" },
      { text: "Once everything is categorised, hit 'Submit Analysis'. Be thorough!", interactive: true, clippyImage: "/clippy/thinking.png" }
    ],
    feedbackClippyMessages: {
      incorrectSort: [
        { text: "Hmm, that's not quite right. Some files are still in the wrong folders. Review their info and try again!", interactive: true, clippyImage: "/clippy/thinking.png" },
        { text: "Close, but no cigar. Double-check each file's properties and potential risks before submitting.", interactive: true, clippyImage: "/clippy/thinking.png" }
      ],
      notAllSorted: [
        { text: "Looks like there are still some files left unsorted. Please categorise all of them before submitting.", interactive: true, clippyImage: "/clippy/thinking.png" }
      ]
    }
  },
  3: {
    id: 3,
    title: "EMails",
    type: "email_phishing",
    data: {
      emails: [
        {
          id: "email4",
          sender: "Pakūranga College Library <library@pakuranga.school.nz>",
          subject: "Reminder Notice",
          componentName: "LibraryNoticeEmail",
          isPhishing: false,
          phishingExplanation: "This is an official library reminder. It provides specific details about borrowed items and uses official contact information. The styling is plain and professional.",
          hints: [
            { target: "sender", message: "The sender 'library@pakuranga.school.nz' is a legitimate school email address." },
            { id: "ln-content-detail", query: "[data-hint-id='ln-content-detail']", message: "This email provides specific and accurate details about borrowed books (title, author, due date), which is expected from a library system." },
            { id: "ln-contact", query: "[data-hint-id='ln-contact']", message: "Official contact phone and email are provided, matching known school details. This adds to its legitimacy." }
          ]
        },
        {
          id: "email6",
          sender: "Charlie Smith (Classroom) <no-reply@classroom.google.com>",
          subject: "Due tomorrow: 'Task Submission'",
          componentName: "ClassroomNoticeEmail",
          isPhishing: false,
          phishingExplanation: "This is a standard automated notification from Google Classroom. It's informational, uses expected Google styling, and the sender is a typical no-reply address from Google.",
          hints: [
            { target: "sender", message: "The sender 'no-reply@classroom.google.com' is the official Google Classroom email address used for automated notifications." },
            { id: "cr-class-name", query: "td.card-title-text", message: "The email refers to a specific class name ('12COM SMH 2025'), which is typical for Google Classroom notifications and makes it relevant to the recipient." },
            { id: "cr-assignment-title", query: "td.assignment-title div", message: "Details about the assignment ('Task Submission') are clear and specific, as expected from such a notification." },
            { id: "cr-google-footer", query: ".footer-text-wrapper", message: "This email includes a standard Google footer with information about notification settings, a common feature of legitimate Google service emails." }
          ]
        },
        {
          id: "email1",
          sender: "Instagram Support <admin@instagrarn.com>",
          subject: "Your Instagram Account Has Been Locked!",
          componentName: "InstagramPhishingEmail",
          isPhishing: true,
          phishingExplanation: "The sender 'instagrarn.com' is misspelled. Real companies rarely make such errors in their domain names. The immediate threat of account deletion is also a common phishing tactic.",
          hints: [
            { target: "sender", message: "The sender's email address ends in 'instagrarn.com' - a common phishing technique is to misspell a well-known domain." },
            { id: "insta-logo", query: "[data-hint-id='insta-logo']", message: "This logo looks like a placeholder and not an official Instagram graphic. Phishers often use low-quality or missing images." },
            { id: "insta-verify-link", query: "[data-hint-id='insta-verify-link']", message: "Hovering over this link would show a suspicious URL (instagram.verify-security.com). Always check where a link *actually* goes before clicking! The text tries to rush you." },
            { id: "insta-urgency-threat", query: "[data-hint-id='insta-urgency-threat']", message: "Threatening permanent account deletion within 24 hours creates a false sense of urgency, trying to make you act without thinking." }
          ]
        },
        {
          id: "email2",
          sender: "Helpdesk <passwordresetrequired@school-portal.ru>",
          subject: "Password Reset Required",
          componentName: "PasswordResetPhishingEmail",
          isPhishing: true,
          phishingExplanation: "The sender's email domain '.ru' is from Russia, which might be unusual for a school portal. The email is very vague, doesn't mention which service the password is for, and contains grammatical errors and an odd closing ('Spasibo').",
          hints: [
            { target: "sender", message: "The .ru (Russian) domain in 'school-portal.ru' is highly suspicious for a local school helpdesk." },
            { target: "subject", message: "A vague subject like 'Password Reset Required' without mentioning the service is a red flag. It's a tactic to make you worry about multiple accounts." },
            { id: "pr-vague-body", query: "[data-hint-id='pr-vague-body']", message: "The email is extremely vague and doesn't mention which specific account or service this password reset is for. This is a common phishing tactic." },
            { id: "pr-spasibo", query: "[data-hint-id='pr-spasibo']", message: "Using 'Spasibo' (Russian for 'thank you') is very out of place for a professional helpdesk email and indicates it might not be legitimate." },
            { id: "pr-link", query: "[data-hint-id='pr-link']", message: "Generic link text like 'Reset Your Passwod Here' without context is risky. The misspelling of 'Passwod' is also a red flag." },
            { id: "pr-grammar", query: "[data-hint-id='pr-grammar']", message: "Poor grammar like 'This link expire in short time' (should be 'expires') is a common sign of phishing emails from non-native English speakers." }
          ]
        },
        {
          id: "email3",
          sender: "Epic Gamez News <newsletter@epic-gamez-official-source.info>",
          subject: "CONGRATULATIONS! You WIN Big V-Bucks Prize!",
          componentName: "PoorNewsletterPhishingEmail",
          isPhishing: true,
          phishingExplanation: "This email uses a suspicious sender domain ('epic-gamez', '.info') trying to mimic Epic Games. The promise of free V-Bucks is a common lure. The design is garish and unprofessional, with poor grammar and font choices, unlike official communications.",
          hints: [
            { target: "sender", message: "The sender 'epic-gamez-official-source.info' uses 'gamez' instead of 'games' and a generic '.info' domain, not official Epic Games channels." },
            { target: "subject", message: "Subjects promising large prizes like 'CONGRATULATIONS! You WIN Big V-Bucks Prize!' are very common in phishing scams." },
            { id: "pn-font-style", query: "[data-hint-id='pn-font-style']", message: "The use of Comic Sans font and garish colours is highly unprofessional and not typical of a real company's newsletter." },
            { id: "pn-grammar", query: "[data-hint-id='pn-grammar']", message: "Phrases like 'must be please verifying' or 'doing the needful' are awkward and often indicate a non-native English speaker, common in phishing emails." },
            { id: "pn-link", query: "[data-hint-id='pn-link']", message: "The link text 'CLICK HERE FOR SECURE LOGIN & VERIFY ACCOONT NOW PLEASE' is aggressive, misspelled, and overly demanding." }
          ]
        },
        {
          id: "email5",
          sender: "Pakūranga College <info@pakuranga.school.nz>",
          subject: "The Pakage: Issue 2 2025",
          componentName: "PakageNewsletterEmail",
          isPhishing: false,
          phishingExplanation: "This is an official school newsletter with proper branding and professional design. The links (though disabled here) would typically go to legitimate school resources.",
          hints: [
            { target: "sender", message: "The sender 'info@pakuranga.school.nz' is the official school email address used for newsletters and communications." },
            { id: "pkg-title", query: "p.size-18 span.text-primary strong", message: "This email uses consistent branding and a professional design typical of the school's newsletter." },
            { id: "pkg-button", query: "a.btn-primary", message: "Links in official newsletters usually direct to school resources or content. This one is styled professionally. (Link is disabled for the game)." },
            { id: "pkg-footer", query: ".email-flexible-footer__additionalinfo--centre span.text-primary", message: "The footer contains correct and verifiable school contact information with proper styling, reinforcing its authenticity as an official school communication." }
          ]
        }
      ],
      successEmail: {
        id: "clueEmail",
        sender: "C.L.I.P.P.Y. <clippy@agent.net>",
        subject: "The Final Piece",
        componentName: "ClippySuccessEmail",
        isPhishing: false,
        phishingExplanation: "",
        hints: []
      }
    },
    clippyMessages: {
      emailClientIntro: [
        { text: "Welcome to your SecureMail Client!", interactive: true, clippyImage: "/clippy/happy.png" },
        { text: "Your mission is to identify the THREE phishing emails from the list in your inbox.", interactive: true, clippyImage: "/clippy/thinking.png" },
        { text: "Look for the usual red flags: suspicious links, urgent demands for personal information, unexpected attachments, poor grammar, or anything that just feels 'off'.", interactive: true, clippyImage: "/clippy/thinking.png" },
        { text: "Select the three emails you believe are phishing attempts using the checkboxes next to each one.", interactive: true, clippyImage: "/clippy/thinking.png" },
        { text: "Once you've made your selections, click the 'Report Phishing' button.", interactive: true, clippyImage: "/clippy/thinking.png" },
        { text: "If you incorrectly report a legitimate email, I'll explain why it was safe, and you'll need to re-evaluate and try again. Good luck, agent!", interactive: true, clippyImage: "/clippy/thinking.png" }
      ],
      success: [
        { text: "Brilliant! You've correctly identified all three phishing emails!", interactive: true, clippyImage: "/clippy/happy.png" },
        { text: "L0GIC underestimated your keen eye for digital deception.", interactive: true, clippyImage: "/clippy/happy.png" }
      ],
      feedback: {
        incorrectReport: [
          { text: "Not quite. At least one of the emails you reported as phishing is actually legitimate, or one of the actual phishing emails wasn't reported. Review the emails carefully and try again!", interactive: true, clippyImage: "/clippy/thinking.png" },
          { text: "Remember to look for unusual sender addresses, links that don't match the supposed source, urgent demands, and unexpected attachments or requests.", interactive: true, clippyImage: "/clippy/thinking.png" }
        ],
        genericError: [
          { text: "Hmm, that selection isn't quite right. Double-check each email for those tricky phishing signs and select exactly three.", interactive: true, clippyImage: "/clippy/thinking.png" }
        ],
        selectThree: [
          { text: "Please select exactly THREE emails before reporting.", interactive: true, clippyImage: "/clippy/thinking.png" }
        ]
      },
      congratulations: [
        { text: "You've found the final piece of the puzzle! I've just sent you an email with the details.", interactive: true, clippyImage: "/clippy/happy.png" },
        { text: "Check your inbox for a message from me. That 'reasoning string' is crucial!", interactive: true, clippyImage: "/clippy/thinking.png" },
        { text: "Fantastic work, agents! You've gathered all the clues needed to confront L0GIC!", interactive: true, clippyImage: "/clippy/happy.png" }
      ],
      hintSystemActivation: [
        { text: "Hint mode activated! Click on parts of an email like the sender, subject, or links to get clues.", interactive: true, clippyImage: "/clippy/thinking.png" },
        { text: "I'll point out suspicious things or confirm safe elements. Toggle the switch again to turn hints off.", interactive: true, clippyImage: "/clippy/thinking.png" }
      ],
      hintSystemDeactivation: [
        { text: "Hint mode deactivated.", interactive: true, clippyImage: "/clippy/thinking.png" }
      ]
    }
  }
};

export const getQuestDataByDay = (dayId) => {
  return quests[dayId] || null;
};
