import { useNavigate } from "react-router";
import { deleteQuiz } from "../api/quizzes";

export const Menu = ({ anchorRef, quiz }) => {
  const navigate = useNavigate();

  const handleRunQuiz = () => navigate(`/quiz/${quiz.id}`);

  const handleEdit = () => {
    navigate(`/quiz/edit/${quiz.id}`);
  };

  const handleDelete = async () => {
    try {
      const result = await deleteQuiz(quiz.id);
      alert(result.message);
      navigate("/");
    } catch (error) {
      alert("Failed to delete quiz: " + error.message);
    }
  };

  return (
    <div className="menu-container" ref={anchorRef}>
      <button className="menu-item" onClick={handleRunQuiz}>
        Run Quiz
      </button>
      <button className="menu-item" onClick={handleEdit}>
        Edit
      </button>
      <button className="menu-item" onClick={handleDelete}>
        Delete
      </button>
    </div>
  );
};
