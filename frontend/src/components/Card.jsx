import { FaEllipsisVertical } from "react-icons/fa6";
import "./Card.css";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router";

function Card({ quiz, onMenuOpen, activeMenu }) {
  const navigate = useNavigate();
  const menuRef = useRef(null);
  const handleRunQuiz = () => navigate(`/quiz/${quiz.id}`);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        onMenuOpen(null);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [onMenuOpen]);

  const toggleMenu = (event) => {
    event.stopPropagation();

    if (activeMenu === quiz.id) {
      onMenuOpen(null);
    } else {
      onMenuOpen(quiz.id);
    }
  };

  return (
    <div className="card-container">
      <div className="card-header">
        <div className="card-title">{quiz.name}</div>
        <FaEllipsisVertical onClick={toggleMenu} />
      </div>
      {activeMenu === quiz.id && (
        <div className="menu-container" ref={menuRef}>
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
      <div className="card-description">
        <p>{quiz.description}</p>
      </div>
      <div className="card-header">
        <div>Questions: {quiz.questionCount}</div>
        <div>Completions: {quiz.completions}</div>
      </div>
    </div>
  );
}

export default Card;
