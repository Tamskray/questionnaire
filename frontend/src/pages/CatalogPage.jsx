import { useEffect, useState } from "react";
import Card from "../components/Card";
import { getAllQuizzes } from "../api/quizzes";
import { Link, useNavigate } from "react-router";

function CatalogPage() {
  const [quizzesInfo, setQuizzesInfo] = useState([]);
  const [activeMenu, setActiveMenu] = useState(null);
  const navigate = useNavigate();

  const handleMenuOpen = (menuId) => {
    setActiveMenu(menuId);
  };

  useEffect(() => {
    const info = getAllQuizzes();

    setQuizzesInfo(info);
  }, []);

  return (
    <div>
      <div className="catalog-header">
        <h1>Quiz Catalog</h1>
        <Link className="link" to="/quiz/create">Create Quiz</Link>
      </div>
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
