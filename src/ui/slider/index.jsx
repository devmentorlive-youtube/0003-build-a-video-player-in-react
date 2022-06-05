import { useRef, useEffect } from "react";

export default function Slider({
  value,
  onChange = (value) => value,
  vertical = false,
  dotClassName = "bg-gray-500 w-[20px] h-[20px]",
  sliderClassName = "bg-gray-600 bottom-10 h-32 w-3  rounded",
  barClassName = "bg-red-600 w-full",
}) {
  const slider = useRef(undefined);
  const dot = useRef(undefined);

  useEffect(() => {
    if (!dot.current || !slider.current) return;

    dot.current.addEventListener("pointerdown", handlePointerDown);
    slider.current.addEventListener("pointerdown", handlePointerDown);

    return () =>
      dot.current?.removeEventListener("pointerdown", handlePointerDown);
  }, [dot, slider]);

  function handlePointerDown(e) {
    window.addEventListener("pointerup", handlePointerUp);
    window.addEventListener("pointermove", handlePointerMove);
  }

  function handlePointerUp(e) {
    window.removeEventListener("pointerup", handlePointerUp);
    window.removeEventListener("pointermove", handlePointerMove);
  }

  function handlePointerMove(e) {
    const { max, min, floor } = Math;
    const { height, bottom, left, width } =
      slider.current.getBoundingClientRect();
    const base = floor(
      max(
        0,
        min(
          100,
          (vertical
            ? (e.screenY - bottom) / height
            : (e.screenX - left) / width) * 100
        )
      )
    );
    onChange(vertical ? 100 - base : base);
  }

  return (
    <div className={`${sliderClassName} absolute z-40`} ref={slider}>
      <div className="relative w-full h-full">
        <div
          className={`${barClassName} absolute bottom-0 cursor-pointer `}
          style={vertical ? { height: `${value}%` } : { width: `${value}%` }}
        />
        <div
          className={`${dotClassName} absolute cursor-pointer`}
          style={vertical ? { bottom: `${value}%` } : { left: `${value}%` }}
          ref={dot}
        />
      </div>
    </div>
  );
}
