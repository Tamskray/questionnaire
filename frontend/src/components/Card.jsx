import { FaEllipsisVertical } from "react-icons/fa6";
import "./Card.css";
import { useState } from "react";
import { useNavigate } from "react-router";

function Card({ quiz }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const handleRunQuiz = () => navigate(`/quiz/${quiz.id}`);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };
  return (
    <div className="card-container">
      <div className="card-header">
        <div className="card-title">{quiz.name}</div>
        <FaEllipsisVertical onClick={toggleMenu} />
      </div>
      {menuOpen && (
        <div className="menu-container">
          <button className="menu-item" onClick={handleRunQuiz}>
            Run Quiz
          </button>
          <button className="menu-item" onClick={() => alert("Edit Quiz")}>
            Edit
          </button>
          <button className="menu-item" onClick={() => alert("Delete Quiz")}>
            Delete
          </button>
        </div>
      )}
      <div className="card-description">{quiz.description}</div>
      <div className="card-header">
        <div>Questions: {quiz.questionCount}</div>
        <div>Completions: {quiz.completions}</div>
      </div>
    </div>
  );
}

export default Card;
