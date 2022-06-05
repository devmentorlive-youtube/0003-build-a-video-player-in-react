import { useRef, useState, useEffect } from "react";

import {
  PlayIcon,
  PauseIcon,
  VolumeOffIcon,
  VolumeUpIcon,
} from "@heroicons/react/solid";

import PlayHead from "./play-head";

export default function VideoPlayerControls({
  volume = 100,
  playing = false,
  setVolume,
  setPlaying,
  currentTime,
  duration,
  onSeek = () => {},
}) {
  const [showVolumeSlider, setShowVolumeSlider] = useState(false);

  const slider = useRef(undefined);
  const dot = useRef(undefined);

  useEffect(() => {
    if (!dot.current || !slider.current) return;

    dot.current.addEventListener("pointerdown", handlePointerDown);
    slider.current.addEventListener("pointerdown", handlePointerDown);

    return () =>
      dot.current?.removeEventListener("pointerdown", handlePointerDown);
  }, [dot, slider, showVolumeSlider]);

  function handlePointerDown(e) {
    window.addEventListener("pointerup", handlePointerUp);
    window.addEventListener("pointermove", handlePointerMove);
  }

  function handlePointerUp(e) {
    window.removeEventListener("pointerup", handlePointerUp);
    window.removeEventListener("pointermove", handlePointerMove);
    setShowVolumeSlider(false);
  }

  function handlePointerMove(e) {
    const { max, min } = Math;
    const { height, bottom } = slider.current.getBoundingClientRect();

    const volume = max(0, min(100, ((e.screenY - bottom) / height) * 100));

    setVolume(volume);
  }

  function onChange(e) {}

  return (
    <div className="flex items-center h-full">
      <div className="flex items-center justify-center h-full gap-3 px-3">
        {playing ? (
          <PauseIcon
            className="text-gray-500 w-[36px] h-[36px]"
            onClick={() => setPlaying(false)}
          />
        ) : (
          <PlayIcon
            className="text-gray-500 w-[36px] h-[36px]"
            onClick={() => setPlaying(true)}
          />
        )}
        <div className="relative">
          <VolumeUpIcon
            className="text-gray-500 w-[24px] h-[24px]"
            onClick={() => setShowVolumeSlider(true)}
          />

          {showVolumeSlider && (
            <div
              className="absolute bottom-10 h-32 w-3 bg-gray-600 rounded z-40"
              ref={slider}>
              <div
                className={`border bottom-0 -translate-x-[4px] -translate-y-[50%] rounded-full absolute bg-gray-500 w-[20px] h-[20px] cursor-pointer`}
                style={{ top: `${volume}%` }}
                ref={dot}
              />
            </div>
          )}
        </div>
      </div>

      <div className="w-full relative h-full px-4">
        <PlayHead {...{ onChange: onSeek, currentTime, duration }} />
      </div>
    </div>
  );
}
