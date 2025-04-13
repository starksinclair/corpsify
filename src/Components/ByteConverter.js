import React, { useContext } from "react";
import "../App.css";
import { MediaPlayerContext } from "../App";

const ByteConverter = () => {
  const { content } = useContext(MediaPlayerContext);
  const size = content.filesize;
  const megabyte = size / (1024 * 1024);
  const file_size = megabyte.toFixed(2);

  return <div className="style12"> File size: {file_size} MB, MP3</div>;
};

export default ByteConverter;
