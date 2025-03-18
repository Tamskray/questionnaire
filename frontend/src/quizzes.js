export const quizzes = [
  {
    id: 1,
    name: "General Knowledge",
    description: "A quiz about general knowledge.",
    questions: [
      {
        question: "What is 2+2?",
        answers: ["3", "4", "5"],
        correctAnswer: "4",
      },
      {
        question: "Who was the first president of the USA?",
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
        answers: ["20", "25", "30"],
        correctAnswer: "25",
      },
      {
        question: "What is 100/5?",
        answers: ["10", "20", "30"],
        correctAnswer: "20",
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
        answers: ["H2O", "O2", "CO2"],
        correctAnswer: "H2O",
      },
      {
        question: "Who developed the theory of relativity?",
        answers: ["Isaac Newton", "Albert Einstein"],
        correctAnswer: "Albert Einstein",
      },
    ],
    completions: 7,
  },
];
