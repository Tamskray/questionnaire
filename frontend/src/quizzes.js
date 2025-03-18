export const quizzes = [
  {
    id: 1,
    name: "General Knowledge Quiz",
    description:
      "This General Knowledge Quiz is designed to test a wide range of information from various fields including history, geography, science, literature, and popular culture. Whether you are a student looking to sharpen your knowledge, or an enthusiast eager to challenge yourself, this quiz will put your memory and reasoning skills to the test.",
    questions: [
      {
        question: "What is the capital of France?",
        answers: ["Berlin", "Madrid", "Paris", "Rome"],
        correctAnswer: "Paris",
        type: "single",
      },
      {
        question: "Who wrote 'Romeo and Juliet'?",
        answers: ["Shakespeare", "Dickens", "Austen", "Hemingway"],
        correctAnswer: "Shakespeare",
        type: "single",
      },
      {
        question: "Which planet is known as the Red Planet?",
        answers: ["Earth", "Mars", "Venus", "Saturn"],
        correctAnswer: "Mars",
        type: "single",
      },
      {
        question: "What is the largest ocean on Earth?",
        answers: ["Atlantic", "Indian", "Arctic", "Pacific"],
        correctAnswer: "Pacific",
        type: "single",
      },
      {
        question: "Which gas do plants absorb from the atmosphere?",
        answers: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Hydrogen"],
        correctAnswer: "Carbon Dioxide",
        type: "single",
      },
      {
        question: "Which element has the chemical symbol 'O'?",
        answers: ["Oxygen", "Osmium", "Ozone", "Oganesson"],
        correctAnswer: "Oxygen",
        type: "single",
      },
      {
        question: "What is the square root of 144?",
        answers: ["10", "12", "14", "16"],
        correctAnswer: "12",
        type: "single",
      },
      {
        question: "Who discovered gravity?",
        answers: [
          "Isaac Newton",
          "Albert Einstein",
          "Galileo Galilei",
          "Marie Curie",
        ],
        correctAnswer: "Isaac Newton",
        type: "single",
      },
      {
        question: "What is the boiling point of water?",
        answers: ["90°C", "100°C", "110°C", "120°C"],
        correctAnswer: "100°C",
        type: "single",
      },
      {
        question: "Which country has the largest population?",
        answers: ["India", "USA", "China", "Brazil"],
        correctAnswer: "China",
        type: "single",
      },
      {
        question: "Which language is primarily spoken in Brazil?",
        answers: ["Spanish", "French", "Portuguese", "English"],
        correctAnswer: "Portuguese",
        type: "single",
      },
      {
        question: "Which animal is known as the King of the Jungle?",
        answers: ["Elephant", "Lion", "Tiger", "Giraffe"],
        correctAnswer: "Lion",
        type: "single",
      },
      {
        question: "What is the chemical formula for water?",
        answers: ["H2O", "O2", "CO2", "H2O2"],
        correctAnswer: "H2O",
        type: "single",
      },
      {
        question: "What is the capital of Japan?",
        answers: ["Seoul", "Tokyo", "Beijing", "Bangkok"],
        correctAnswer: "Tokyo",
        type: "single",
      },
      {
        question: "What is 7 * 8?",
        answers: ["54", "56", "58", "60"],
        correctAnswer: "56",
        type: "single",
      },
    ],
    completions: 0,
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
