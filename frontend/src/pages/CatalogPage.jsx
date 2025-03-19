import { useEffect, useState } from "react";
import Card from "../components/Card";
import { Link } from "react-router";
import { getAllQuizzes } from "../api/quizzes";

function CatalogPage() {
  const [quizzesInfo, setQuizzesInfo] = useState([]);
  const [activeMenu, setActiveMenu] = useState(null);

  const handleMenuOpen = (menuId) => {
    setActiveMenu(menuId);
  };

 useEffect(() => {
   const fetchQuizzes = async () => {
     const info = await getAllQuizzes();
     setQuizzesInfo(info);
   };

   fetchQuizzes();
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
