import { useState, useRef, useEffect } from "react";
import useInterval from "@use-it/interval";

import Controls from "./controls";

export default function VideoPlayer({ src }) {
  const [playing, setPlaying] = useState(false);
  const [volume, setVolume] = useState(100);
  const [currentTime, setCurrentTime] = useState(0);

  const ref = useRef(undefined);

  useEffect(() => {
    if (!ref.current) return;

    ref.current.addEventListener("ended", handledEnded);
  }, [ref]);

  useInterval(
    () => {
      if (!ref.current) return;
      setCurrentTime(ref.current.currentTime);
    },
    playing ? 100 : 0
  );

  useEffect(() => {
    ref.current[playing ? "play" : "pause"]();
  }, [playing]);

  useEffect(() => {
    ref.current.volume = volume * 0.01;
  }, [volume]);

  function handledEnded(e) {
    setPlaying(false);
  }

  return (
    <div className="w-screen h-screen bg-black">
      <video src={src} className="w-screen h-screen" ref={ref} />

      <div className="w-screen border border-gray-800 bg-gray-900 absolute bottom-0 h-[50px]">
        <Controls
          {...{
            volume,
            playing,
            setPlaying,
            setVolume,
            currentTime,
            duration: ref.current?.duration || 0,
            onSeek: (percent) =>
              (ref.current.currentTime = ref.current.duration * percent * 0.01),
          }}
        />
      </div>
    </div>
  );
}
