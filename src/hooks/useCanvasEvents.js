import { useCallback } from "react";
import { useBreakdowns } from ".";

export default function useCanvasEvents(machines, setMachines) {
  const updateBreakdowns = useBreakdowns(machines, setMachines);

  return useCallback(() => {
    updateBreakdowns();
  }, [updateBreakdowns]);
}
