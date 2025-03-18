export const quizzes = [
  {
    id: 1,
    name: "General Knowledge",
    description: "A quiz about general knowledge.",
    questions: [
      {
        question: "What is 2+2?",
        type: "single", // Single choice question
        answers: ["3", "4", "5"],
        correctAnswer: "4",
      },
      {
        question: "Who was the first president of the USA?",
        type: "single", // Single choice question
        answers: ["George Washington", "Abraham Lincoln"],
        correctAnswer: "George Washington",
      },
    ],
    completions: 5,
  },
  {
    id: 2,
    name: "Math Quiz",
    description: "Test your math skills.",
    questions: [
      {
        question: "What is 5*5?",
        type: "single", // Single choice question
        answers: ["20", "25", "30"],
        correctAnswer: "25",
      },
      {
        question: "Select the correct numbers.",
        type: "multiple", // Multiple choice question
        answers: ["10", "20", "30", "50"],
        correctAnswer: ["20", "30"], // Multiple correct answers
      },
    ],
    completions: 3,
  },
  {
    id: 3,
    name: "Science Trivia",
    description: "A quiz about science facts.",
    questions: [
      {
        question: "What is the chemical symbol for water?",
        type: "single", // Single choice question
        answers: ["H2O", "O2", "CO2"],
        correctAnswer: "H2O",
      },
      {
        question: "What is your favorite planet?",
        type: "text", // Free text question
        correctAnswer: "", // No correct answer for free text questions
      },
    ],
    completions: 7,
  },
];
