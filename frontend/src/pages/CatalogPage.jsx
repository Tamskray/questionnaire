import { useEffect, useState } from "react";
import Card from "../components/Card";
import { getAllQuizzes } from "../api/quizzes";

function CatalogPage() {
  const [quizzesInfo, setQuizzesInfo] = useState([]);

  useEffect(
    () => {
      const info = getAllQuizzes();

      setQuizzesInfo(info);
    }, []
  )

  return (
    <div>
      <h1>Quiz Catalog</h1>
      <div className="cards-container container">
        {quizzesInfo.map((quiz) => (
          <Card key={quiz.id} quiz={quiz} />
        ))}
      </div>
    </div>
  );
}

export default CatalogPage;
