import React, { useState, useEffect, useRef } from "react";
import "./App.css";
import axios from "axios";
import Display from "./Components/Display";
import Results from "./Components/Results";
import { useMediaQuery } from "react-responsive";

export const MediaPlayerContext = React.createContext();

function App() {
  const isSmallScreen = useMediaQuery({ maxWidth: 1024 });
  const isMediumScreen = useMediaQuery({ minWidth: 601, maxWidth: 1024 });
  const isLargeScreen = useMediaQuery({ minWidth: 1025 });
  const [data, setData] = useState(null);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState(null);
  const [musicId, setMusicId] = useState("");
  const [url, setUrl] = useState(null);
  const [selectedResults, setSelectedResults] = useState(null);
  const [playlist, setPlaylist] = useState([]);
  const [audioSrc, setaudioSrc] = useState("");
  const [currentTrack, setCurrentTrack] = useState(0);
  const [isExpanded, setExpanded] = useState(true);
  const audio = useRef(null);

  useEffect(() => {
    if (url) {
      setLoading(true);
      axios
        .get(url)
        .then((response) => {
          setData(response.data.results);
          console.log("Search results", response.data.results);
          setLoading(false);
        })
        .catch((error) => {
          console.log("Search API error:", error);
        });
    }
  }, [url]);

  useEffect(() => {
    if (musicId) {
      // setLoading(true);
      const sound = `https://freesound.org/apiv2/sounds/${musicId}?token=eTn9vAatgMdzT4sB0qHhkOAU0lM8cw4eZgVo5cyx`;
      axios
        .get(sound)
        .then((soundResponse) => {
          setContent(soundResponse.data);
          // setaudioSrc(soundResponse.data.previews["preview-hq-mp3"]);
          console.log("Music Id:", musicId);
          setLoading(false);
        })
        .catch((soundError) => {
          console.log("Search API error:", soundError);
        });
    }
  }, [musicId]);

  const toggleExpanded = () => {
    setExpanded(!isExpanded);
  };

  const handleResultClick = (result) => {
    setSelectedResults(result);
    setMusicId(result.id);
  };

  // console.log("SELECTED", selectedResults);
  const handleNext = (result) => {
    setSelectedResults(result);
    setMusicId(result.id);
    console.log("Next", result);
    setaudioSrc(result.previews["preview-hq-mp3"]);
    setCurrentTrack(result);
  };
  const handlePlaylistClick = (result) => {
    if (playlist.length === 0) {
      setaudioSrc(content.previews["preview-hq-mp3"]);
      setCurrentTrack(result);
    }
    setPlaylist((prev) => [...prev, content]);
  };
  const handleButtonClick = (item) => {
    setaudioSrc(content.previews["preview-hq-mp3"]);
    setCurrentTrack(item);
  };

  const handleSongEnd = () => {
    console.log("Song End", audio.current);
    if (playlist.indexOf(currentTrack) < playlist.length - 1 && audio.current) {
      // Pause the current audio before changing the source
      audio.current.pause();
      const nextTrack = playlist[playlist.indexOf(currentTrack) + 1];
      setCurrentTrack(nextTrack);
      setaudioSrc(nextTrack.previews["preview-hq-mp3"]);
      setTimeout(() => {
        audio.current.play();
      }, 0);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const new_query = e.target.elements.query.value;
    if (new_query.trim() !== "") {
      setQuery(new_query);
      setUrl(
        `https://freesound.org/apiv2/search/text/?query=${new_query}&token=eTn9vAatgMdzT4sB0qHhkOAU0lM8cw4eZgVo5cyx`
      );
    }
  };

  return (
    <MediaPlayerContext.Provider
      value={{
        content,
        data,
        playlist,
        audioSrc,
        handlePlaylistClick,
        handleButtonClick,
        handleResultClick,
        handleNext,
        handleSongEnd,
        currentTrack,
        audio,
        isExpanded,
        toggleExpanded,
        isSmallScreen,
      }}
    >
      <header className="body">
        <div className={`row ${isSmallScreen ? "small-screen" : ""}`}>
          <div className="grp1">
            <h1>Sound Search</h1>
            <form action="#" className="form" onSubmit={handleSubmit}>
              <div>
                <input
                  name="query"
                  type="text"
                  placeholder="text goes here"
                  className="input"
                  required
                  autoFocus
                />
                <button type="submit" className="btn">
                  SEARCH
                </button>
              </div>
            </form>

            <Display
              search={data}
              onResultClick={handleResultClick}
              loading={loading}
              selected={currentTrack}
              selected1={playlist}
            />
          </div>
          <div className="grp2">
            {content && (
              <Results
                selectedResult={selectedResults}
                selected={currentTrack}
              />
            )}
          </div>
        </div>
      </header>
    </MediaPlayerContext.Provider>
  );
}

export default App;
