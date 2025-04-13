import React from "react";
import { FaPlay } from "react-icons/fa";
import "../App.css";

const FloatingButton = ({ onClick, isExpanded }) => {
  return (
    <div
      className={`floating-button ${isExpanded ? "collapse" : ""}`}
      onClick={onClick}
    >
      <span className="play-0">Playing</span> <FaPlay className="faplay" />
    </div>
  );
};

export default FloatingButton;
