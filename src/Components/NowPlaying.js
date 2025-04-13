import React, { useContext } from "react";
import "../App.css";
import { MediaPlayerContext } from "../App";
import FloatingButton from "./FloatingButton";

const NowPlaying = () => {
  const {
    playlist,
    audioSrc,
    currentTrack,
    handleResultClick,
    handleNext,
    audio,
    handleSongEnd,
    isExpanded,
    toggleExpanded,
  } = useContext(MediaPlayerContext);
  // console.log("name", currentTrack);

  if (!currentTrack) return null;

  return (
    <div>
      <div className={`wrapper ${isExpanded ? "expanded" : "collapsed"}`}>
        {isExpanded && (
          <>
            <div className="playing">
              <h5>NOW PLAYING</h5>
            </div>
            <div className="main">
              <p>{currentTrack.name}</p>
              <audio
                autoPlay
                controls
                src={audioSrc}
                ref={audio}
                className="audio"
                onEnded={handleSongEnd}
              />
              <p
                className="details"
                onClick={() => handleResultClick(currentTrack)}
              >
                View Details &gt; &gt;
              </p>
            </div>
            <div className="next">
              <h5>UP NEXT</h5>
              <ul className="next-0">
                {playlist.map((item) => (
                  <li key={item.id} onClick={() => handleNext(item)}>
                    {item.name}
                  </li>
                ))}
              </ul>
            </div>
          </>
        )}
      </div>
      <FloatingButton onClick={toggleExpanded} isExpanded={isExpanded} />
    </div>
  );
};

export default NowPlaying;
