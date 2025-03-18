import { useEffect, useState } from "react";
import Card from "../components/Card";
import { quizzes } from "../quizzes";
import { getAllQuizzes } from "../api/quizzes";

function CatalogPage() {
  const [quizzesInfo, setQuizzesInfo] = useState([]);

  useEffect(
    () => {
      const info = getAllQuizzes();

      setQuizzesInfo(info);
    }, [quizzesInfo]
  )

  return (
    <div>
      <h1>Quiz Catalog</h1>
      <div className="cards-container">
        {quizzesInfo.map((quiz) => (
          <Card key={quiz.id} quiz={quiz} />
        ))}
      </div>
    </div>
  );
}

export default CatalogPage;
