// das ist config
export const triviaData = [
  {
    id: 1,
    question: "What is the strongest password?",
    options: {
      A: "password123",
      B: "Tr0ub4dor&3",
      C: "Isaiah2008",
    },
    correctAnswer: "B",
    explanation: {
      correct: "Correct! 'Tr0ub4dor&3' is strong because it uses a mix of uppercase letters, lowercase letters, numbers, and symbols. It's also long and not easily guessable.",
      incorrect: [
        "Not quite. A strong password should be complex and hard to guess. Simple words, names, or common number sequences are easy for hackers to crack. Try again!",
        "That password is a bit too predictable. Think about what makes a password truly random and difficult for a computer to guess.",
        "Remember, the best passwords mix different character types together. A name or a simple word won't cut it. Give it another shot!",
      ],
    },
  },
  {
    id: 2,
    question: "You receive an email from your bank asking you to click a link to verify your account details. What should you do?",
    options: {
      A: "Click the link and enter your details. It's from my bank, so it must be safe.",
      B: "Ignore the email and hope for the best.",
      C: "Do not click the link. Go to your bank's website directly by typing the address in your browser.",
    },
    correctAnswer: "C",
    explanation: {
      correct: "Exactly! This is a common phishing scam. Never click on suspicious links in emails. Always go directly to the official website to log in securely.",
      incorrect: [
        "That's a risky choice! Phishing emails are designed to look real to trick you into giving away your information. It's always better to be safe. Try again!",
        "Think about it: could a scammer make an email look like it's from your bank? It's safer to not trust links directly. What's a more secure way to get to their website?",
        "Don't click that link! Even if it looks legitimate, it could lead to a fake site designed to steal your password. There's a much safer option.",
      ],
    },
  },
  {
    id: 3,
    question: "What does 'HTTPS' at the beginning of a website URL indicate?",
    options: {
      A: "The website is the 'HyperText Transfer Protocol Super'",
      B: "The website has a secure, encrypted connection.",
      C: "The website is hosted in a special, high-speed server.",
    },
    correctAnswer: "B",
    explanation: {
      correct: "You got it! The 'S' in HTTPS stands for 'Secure'. It means the data exchanged between your browser and the website is encrypted, protecting it from eavesdroppers.",
      incorrect: [
        "Close, but not quite! Think about what the 'S' might stand for in the context of online safety. Try again!",
        "It's all about security. When you see HTTPS, it's a visual cue that your connection is protected. Which answer relates to protection?",
        "While speed is nice, HTTPS is focused on something even more important: trust and privacy. Have another look at the options.",
      ],
    },
  },
  {
    id: 4,
    question: "What is two-factor authentication (2FA)?",
    options: {
      A: "A password that is twice as long as a normal one.",
      B: "Using two different web browsers to log in.",
      C: "A security method that requires two forms of identification to access an account.",
    },
    correctAnswer: "C",
    explanation: {
      correct: "That's right! 2FA adds a crucial second layer of security, like a code sent to your phone, in addition to your password. It makes it much harder for unauthorized users to get in.",
      incorrect: [
        "That's not it. Two-factor authentication is about adding another layer of proof that it's really you. Think about what that second step might be.",
        "It's not about length or browsers. It's about having two *different types* of proof. One is something you know (your password), what could the other one be?",
        "Consider this: if a hacker steals your password, how can 2FA still protect you? It must require something the hacker doesn't have.",
      ],
    },
  },
  {
    id: 5,
    question: "You see a shocking news headline shared on social media. What is a good first step before you share it?",
    options: {
      A: "Share it immediately so your friends are informed.",
      B: "Check the information from a few different, reliable news sources.",
      C: "Only trust it if the person who shared it is your friend.",
    },
    correctAnswer: "B",
    explanation: {
      correct: "Excellent! Misinformation spreads quickly. Cross-referencing with reputable sources is a key skill for digital literacy and helps stop the spread of fake news.",
      incorrect: [
        "Be careful! Misinformation is designed to be shocking to make you share it. It's always best to verify before you amplify a message. Try again!",
        "Even friends can accidentally share false information. Your own critical thinking is the best tool here. What's the most reliable way to check a fact?",
        "Spreading news without checking it first is how fake news wins. There's a better, more responsible option available.",
      ],
    },
  },
];

export const completionLog = [
  "[LOG] Human integrity check:",
  "Core function `main` running",
  // Removed "Purging logs..." from this line
  "[ERROR] Access to the registry key `main` is denied.",
  "[CORRUPTED_FRAGMENT] The process `./sys_override` is preventing execution of necessary features.",
  "[LOG] Connection terminated.",
];