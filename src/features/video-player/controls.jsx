import { useContext } from "react";

import { VideoPlayerContext } from "./context";
import Slider from "@/ui/slider";

import {
  PlayIcon,
  PauseIcon,
  VolumeOffIcon,
  VolumeUpIcon,
} from "@heroicons/react/solid";

export default function VideoPlayerControls({ duration, onSeek = () => {} }) {
  const {
    playing,
    setPlaying,
    volume,
    setVolume,
    showVolumeSlider,
    setShowVolumeSlider,
    currentTime,
  } = useContext(VideoPlayerContext);
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
          {volume < 1 ? (
            <VolumeOffIcon
              className="text-gray-500 w-[24px] h-[24px]"
              onClick={() => {
                setVolume(0);
                setShowVolumeSlider((prev) => !prev);
              }}
            />
          ) : (
            <VolumeUpIcon
              className="text-gray-500 w-[24px] h-[24px]"
              onClick={() => {
                setVolume(100);
                setShowVolumeSlider((prev) => !prev);
              }}
            />
          )}

          {showVolumeSlider && (
            <div className="ml-1">
              <Slider
                vertical
                {...{
                  value: volume,
                  onChange: setVolume,
                  barClassName: "bg-gray-600 w-full",
                  dotClassName:
                    "bg-gray-500 w-[20px] h-[20px] rounded-full translate-y-[50%]",
                  sliderClassName:
                    "w-[20px] bg-gray-800 bottom-10 h-24  rounded",
                }}
              />
            </div>
          )}
        </div>
      </div>

      <div className="w-full relative h-[32px] mx-8 flex justify-center bg-gray-800 ">
        <Slider
          value={(currentTime / duration) * 100}
          onChange={onSeek}
          {...{
            barClassName: "rounded bg-red-600 h-full",
            dotClassName:
              "rounded bg-red-500 w-[32px] h-[32px] rounded-full -translate-x-[50%] ",
            sliderClassName: "top-0 bottom-10 h-[32px] w-full ",
          }}
        />
      </div>
    </div>
  );
}
