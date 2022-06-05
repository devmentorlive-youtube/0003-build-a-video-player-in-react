import { useRef, useState, useEffect } from "react";

export default function VideoPlayerPlayHead({
  currentTime,
  duration,
  onChange = () => {},
}) {
  const [left, setLeft] = useState(0);
  const [seeking, setSeeking] = useState(false);

  const headRef = useRef(undefined);
  const timelineRef = useRef(undefined);

  useEffect(() => {
    setLeft((currentTime / duration) * 100);
  }, [currentTime]);

  useEffect(() => {
    headRef.current.addEventListener("pointerdown", handlePointerDown);
    timelineRef.current.addEventListener("pointerdown", handlePointerDown);

    return () =>
      headRef.current?.removeEventListener("pointerdown", handlePointerDown);
  }, []);

  function handlePointerDown(e) {
    timelineRef.current.setPointerCapture(e.pointerId);
    setSeeking(true);
    window.addEventListener("pointerup", handlePointerUp);
    window.addEventListener("pointermove", handlePointerMove);
  }

  function handlePointerUp(e) {
    setSeeking(false);
    window.removeEventListener("pointerup", handlePointerUp);
    window.removeEventListener("pointermove", handlePointerMove);
  }

  function handlePointerMove(e) {
    const { max, min, floor } = Math;
    const { width, left } = timelineRef.current.getBoundingClientRect();
    const location = max(0, min(100, ((e.screenX - left) / width) * 100));
    setLeft(location);
    onChange(location);
  }

  return (
    <div className="relative w-full h-full" ref={timelineRef}>
      <div
        className={`rounded absolute left-0  top-[19px] bg-red-600 h-[10px] cursor-pointer`}
        style={{ width: `${left}%` }}
      />

      <div
        className={` border -translate-x-[50%] rounded-full absolute top-[10px] bg-red-500 w-[28px] h-[28px] cursor-pointer`}
        style={{ left: `${left}%` }}
        ref={headRef}
      />
    </div>
  );
}
