import React, { useState } from "react";
import "../App.css";
import Loading from "./Loading";
import playing from "../icon-playing.svg";
import playlist1 from "../icon-playlist.svg";

const Display = ({ search, onResultClick, loading, selected, selected1 }) => {
  const [clickedResult, setClickedResult] = useState(null);
  if (loading) {
    return <Loading />;
  }
  if (!search) {
    return null;
  }
  if (search.length === 0) {
    return <h1 className="missing">Sound not found !!!!</h1>;
  }
  // console.log("isPlaying:", selected1);

  console.log("selected1:", selected1, "result.id:", search);

  return (
    <div className="left">
      {search.map((result) => (
        <div
          key={result.id}
          className={`result-item ${
            clickedResult === result.id ? "selected" : ""
          }`}
          onClick={() => {
            onResultClick(result);
            setClickedResult(result.id);
          }}
        >
          <div>
            <strong>{result.name}</strong>
            <p> {result.username}</p>
          </div>
          <div>
            {selected && selected.id === result.id ? (
              <img src={playing} alt="Play" />
            ) : null}

            {selected1 &&
            selected1.length > 0 &&
            selected1.some(
              (item) =>
                item.id === result.id && selected && selected.id !== item.id
            ) ? (
              <img src={playlist1} alt="Play" />
            ) : null}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Display;
