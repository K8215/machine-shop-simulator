import { useEffect, useState } from "react";

export default function useControls() {
  const [pause, setPause] = useState(false);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === " ") {
        setPause((prev) => !prev);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return { pause };
}
