import { useState, createContext } from "react";

export const VideoPlayerContext = createContext({});

export function VideoPlayerProvider({ children }) {
  const [playing, setPlaying] = useState(false);
  const [volume, setVolume] = useState(100);
  const [currentTime, setCurrentTime] = useState(0);
  const [showVolumeSlider, setShowVolumeSlider] = useState(false);

  return (
    <VideoPlayerContext.Provider
      value={{
        playing,
        setPlaying,
        volume,
        setVolume,
        currentTime,
        setCurrentTime,
        showVolumeSlider,
        setShowVolumeSlider,
      }}>
      {children}
    </VideoPlayerContext.Provider>
  );
}
