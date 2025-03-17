import { FaEllipsisVertical } from "react-icons/fa6";
import "./Card.css";
import { useState } from "react";

function Card() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };
  return (
    <div className="card-container">
      <div className="card-header">
        <div className="card-title">quiz title</div>
        <FaEllipsisVertical onClick={toggleMenu} />
        {menuOpen && (
          <div className="menu-container">
            <div>edit</div>
            <div>delete</div>
          </div>
        )}
      </div>
      <div className="card-description">desc</div>
      <div className="card-header">
        <div>questions</div>
        <div>completions</div>
      </div>
    </div>
  );
}

export default Card;
