import { useMenuToggle } from "../hooks/useMenuToggle";
import { Menu } from "./Menu";
import { FaEllipsisVertical } from "react-icons/fa6";

import "./Card.css";

function Card({ quiz }) {
  const { open, anchorRef, openMenu } = useMenuToggle();

  return (
    <div className="card-container">
      <div className="card-header">
        <div className="card-title">{quiz.name}</div>
        <FaEllipsisVertical onClick={openMenu} />
      </div>

      {open && <Menu anchorRef={anchorRef} quiz={quiz} />}

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
