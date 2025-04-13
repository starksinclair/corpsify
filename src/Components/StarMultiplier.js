import React, { useContext } from "react";
import "../App.css";
import { MediaPlayerContext } from "../App";

const StarMultiplier = () => {
  const { content } = useContext(MediaPlayerContext);
  const baseStar = "⭐️";
  const fullStar = Math.floor(content.avg_rating);

  let stars = " ";
  for (let i = 0; i < fullStar; i++) {
    stars += baseStar;
  }

  return <div className="style7">{stars}</div>;
};

export default StarMultiplier;
