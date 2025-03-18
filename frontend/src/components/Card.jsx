import { FaEllipsisVertical } from "react-icons/fa6";
import "./Card.css";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";

function Card({ quiz, onMenuOpen, activeMenu }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const menuRef = useRef(null);
  const handleRunQuiz = () => navigate(`/quiz/${quiz.id}`);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (activeMenu !== quiz.id) {
      setMenuOpen(false);
    }
  }, [activeMenu, quiz.id]);

  const toggleMenu = () => {
    if (menuOpen) {
      setMenuOpen(false);
      onMenuOpen(null);
    } else {
      setMenuOpen(true);
      onMenuOpen(quiz.id);
    }
  };

  return (
    <div className="card-container">
      <div className="card-header">
        <div className="card-title">{quiz.name}</div>
        <FaEllipsisVertical onClick={toggleMenu} />
      </div>
      {menuOpen && (
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
