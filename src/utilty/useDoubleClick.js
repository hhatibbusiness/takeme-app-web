import { useState, useCallback } from "react";

function useDoubleTap(callback, delay = 300) {
  const [lastTapTime, setLastTapTime] = useState(0);

  const handleTap = useCallback(() => {
    const currentTime = Date.now();
    const timeSinceLastTap = currentTime - lastTapTime;

    if (timeSinceLastTap < delay && timeSinceLastTap > 0) {
      callback();
    }

    setLastTapTime(currentTime);
  }, [callback, delay, lastTapTime]);

  return handleTap;
}

export default useDoubleTap;
