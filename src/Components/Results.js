import React, { useContext } from "react";
import "../App.css";
import ByteConverter from "./ByteConverter";
import StarMultiplier from "./StarMultiplier";
import NowPlaying from "./NowPlaying";
import { MediaPlayerContext } from "../App";

const Results = ({ selectedResult, selected }) => {
  const { content, handlePlaylistClick, handleButtonClick, isExpanded } =
    useContext(MediaPlayerContext);
  // console.log("Content Data:", selected);
  const MAX_WORDS = 25;

  const truncateDescription = (description) => {
    const words = description.split(" ");
    if (words.length > MAX_WORDS) {
      return words.slice(0, MAX_WORDS).join(" ") + "...";
    }
    return description;
  };
  return (
    <div className="grp2">
      <div className="grp4">
        {selectedResult ? (
          <div key={selectedResult.id} className="sound-name">
            {selected && selected.id === selectedResult.id ? (
              <p className="now">NOW PLAYING</p>
            ) : null}
            <span className="style1">{selectedResult.name}</span>
            <span className="style2"> {selectedResult.username}</span>
          </div>
        ) : null}
      </div>
      <div className="grp5">
        <span className="style3">
          {truncateDescription(content.description)}
        </span>
      </div>
      <div className="grp6">
        <span className="style4">{content.tags}</span>
      </div>
      <div className="grp7">
        <div className="style5">
          <button
            className="style-1"
            onClick={() => handleButtonClick(selectedResult)}
          >
            PLAY
          </button>
          <button
            className="style-2"
            onClick={() => handlePlaylistClick(selectedResult)}
          >
            ADD TO PLAYLIST
          </button>
          {/* {content.previews && content.previews["preview-hq-mp3"] ? (
            <audio controls="true" src={content.previews["preview-hq-mp3"]} />
          ) : (
            <p>No preview available</p>
          )} */}
        </div>
        <div className="">
          <button className="style6">
            DOWNLOAD
            <br />
            <span className="style12">
              <ByteConverter content={content} />
            </span>
          </button>
        </div>
      </div>
      <div className="grp8">
        <span className="style7">
          <strong>
            Created On: <br />
            <br />
          </strong>
          {content.created}
        </span>
      </div>
      <div className="grp9">
        <span className="style7">
          <strong>
            Download Count: <br />
            <br />
          </strong>
          {content.num_downloads}
        </span>
      </div>
      <div className="grp10">
        <span className="style7">
          <strong>
            Average Rating: <br />
            <br />
          </strong>
          <StarMultiplier content={content} />
        </span>
      </div>
      <div className="grp11">
        <span className="style7">
          <strong>
            Waveform <br />
            <br />
          </strong>
        </span>
        {content.images && content.images["waveform_bw_l"] ? (
          <img
            className="img"
            src={content.images["waveform_bw_l"]}
            alt="Waveform"
          />
        ) : (
          <p>No waveform available</p>
        )}
      </div>
      <NowPlaying />
    </div>
  );
};

export default Results;
