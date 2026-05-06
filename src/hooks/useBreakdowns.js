import { useCallback } from "react";
import { maxCondition } from "../data/gameSettings";
import {
  conditionDepleted,
  badDiceRoll,
  degradeCondition,
  updateSingleMachine,
} from "../lib";

export default function useBreakdowns(machines, setMachines) {
  return useCallback(() => {
    const updated = machines.map((machine) => {
      const { condition, breakdown, active, conditionModifier, prodRate } =
        machine;

      if (conditionDepleted(condition, breakdown)) {
        return updateSingleMachine(machine, {
          condition: 0,
          breakdown: true,
          active: false,
          prodRate: 0,
        });
      }

      if (active && !breakdown) {
        const breakdownChance = maxCondition - condition;

        if (badDiceRoll(breakdownChance, maxCondition)) {
          return updateSingleMachine(machine, {
            condition,
            breakdown: true,
            active: false,
            prodRate: 0,
          });
        }

        const newCondition = degradeCondition(condition, conditionModifier);
        return updateSingleMachine(machine, {
          condition: newCondition,
          breakdown: false,
          active: true,
          prodRate,
        });
      }

      return machine;
    });

    setMachines(updated);
  }, [machines, setMachines]);
}
