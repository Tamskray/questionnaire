import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { getQuiz } from "../api/quizzes";
import Question from "../components/Question";
import "./QuizPage.css";

function QuizPage() {
  const { id } = useParams();
  const [quiz, setQuiz] = useState(null);

  useEffect(() => {
    const foundQuiz = getQuiz(id);
    setQuiz(foundQuiz);
  }, []);

  if (!quiz) {
    return <h1>Quiz Not Found</h1>;
  }

  return (
    <div>
      <h1>{quiz.name}</h1>
      <p className="description">{quiz.description}</p>
      <div className="questions-block">
        <h3>Questions:</h3>
        <div className="questions-container">
          {quiz.questions.map((q, index) => (
            <Question
              key={index}
              index={index + 1}
              question={q.question}
              type={q.type}
              answers={q.answers}
              correctAnswer={q.correctAnswer}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default QuizPage;
