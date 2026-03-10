import { useState, useEffect } from "react";
import { startingFunds, prodCycleRate } from "../data/gameSettings";
import { useFunds, useCanvasEvents } from "./";

export default function useProductionCycle({ machines, setMachines, pause }) {
  const [funds, setFunds] = useState(startingFunds);
  const [lifetimeEarnings, setLifetimeEarnings] = useState(0);

  const updateFunds = useFunds(
    machines,
    funds,
    setFunds,
    lifetimeEarnings,
    setLifetimeEarnings,
  );
  const updateCanvasEvents = useCanvasEvents(machines, setMachines);

  useEffect(() => {
    if (!pause) {
      const interval = setInterval(() => {
        updateFunds();
        updateCanvasEvents();
      }, prodCycleRate);
      return () => clearInterval(interval);
    }
  }, [pause, updateFunds, updateCanvasEvents]);

  return { funds, setFunds, lifetimeEarnings };
}
