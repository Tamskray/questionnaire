import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { quizzes } from "../quizzes";
import { getQuiz } from "../api/quizzes";

function QuizPage() {
  const { id } = useParams();
  const [quiz, setQuiz] = useState(null);

  useEffect(() => {
    const foundQuiz = getQuiz(id);
    setQuiz(foundQuiz);
  }, [quiz]);

  if (!quiz) {
    return <h1>Quiz Not Found</h1>;
  }

  return (
    <div>
      <h1>{quiz.name}</h1>
      <p>{quiz.description}</p>
      <h3>Questions:</h3>
      <ul>
        {quiz.questions.map((q, index) => (
          <li key={index}>
            <p>{q.question}</p>
            <ul>
              {q.answers.map((answer, i) => (
                <li key={i}>{answer}</li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default QuizPage;
