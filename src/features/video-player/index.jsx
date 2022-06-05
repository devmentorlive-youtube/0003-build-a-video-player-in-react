import { useRef, useEffect, useContext } from "react";
import useInterval from "@use-it/interval";

import { VideoPlayerProvider, VideoPlayerContext } from "./context";

import Controls from "./controls";

export default function VideoPlayer({ src }) {
  return (
    <VideoPlayerProvider>
      <VideoPlayerConsumer {...{ src }} />
    </VideoPlayerProvider>
  );
}

function VideoPlayerConsumer({ src }) {
  const { setCurrentTime, setPlaying, playing, volume } =
    useContext(VideoPlayerContext);
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
    console.dir(volume * 0.01);
    ref.current.volume = volume * 0.01;
  }, [volume]);

  function handledEnded(e) {
    setPlaying(false);
  }

  return (
    <div className="relative w-screen sm:h-screen h-[300px] bg-black overflow-hidden">
      <video src={src} className="w-full h-full" ref={ref} />

      <div className="w-screen border border-gray-800 bg-gray-900 absolute bottom-0 h-[50px]">
        <Controls
          {...{
            duration: ref.current?.duration || 0,
            onSeek: (percent) =>
              (ref.current.currentTime = ref.current.duration * percent * 0.01),
          }}
        />
      </div>
    </div>
  );
}
