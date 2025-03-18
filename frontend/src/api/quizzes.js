import { quizzes } from "../quizzes";

export const getAllQuizzes = () => {
  return quizzes.map((quiz) => ({
    id: quiz.id,
    name: quiz.name,
    description: quiz.description,
    completions: quiz.completions,
    questionCount: quiz.questions.length,
  }));
};

export const getQuiz = (id) => {
  const quiz = quizzes.find((quiz) => quiz.id === parseInt(id));
  console.log(quiz)
  return quiz;
}
