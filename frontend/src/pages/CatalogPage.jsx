import { useEffect, useState } from "react";
import Card from "../components/Card";
import { getAllQuizzes } from "../api/quizzes";

function CatalogPage() {
  const [quizzesInfo, setQuizzesInfo] = useState([]);
  const [activeMenu, setActiveMenu] = useState(null);

  const handleMenuOpen = (menuId) => {
    setActiveMenu(menuId);
  };

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
          <Card
            key={quiz.id}
            quiz={quiz}
            onMenuOpen={handleMenuOpen}
            activeMenu={activeMenu}
          />
        ))}
      </div>
    </div>
  );
}

export default CatalogPage;
