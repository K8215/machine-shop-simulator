import { useCallback } from "react";
import { maxCondition } from "../data/settings";
import {
  conditionDepleted,
  badDiceRoll,
  degradeCondition,
} from "../lib";

export default function useBreakdowns(machines, setMachines) {
  return useCallback(() => {
    const updated = machines.map((machine) => {
      const {
        condition,
        breakdown,
        active,
        conditionModifier,
        prodRate,
        constructor,
      } = machine;

      if (conditionDepleted(condition, breakdown)) {
        return new constructor({
          ...machine,
          condition: 0,
          breakdown: true,
          active: false,
          prodRate: 0,
        });
      }

      if (active && !breakdown) {
        const breakdownChance = maxCondition - condition;

        if (badDiceRoll(breakdownChance, maxCondition)) {
          return new constructor({
            ...machine,
            condition,
            breakdown: true,
            active: false,
            prodRate: 0,
          });
        }

        const newCondition = degradeCondition(condition, conditionModifier);
        return new constructor({
          ...machine,
          condition: newCondition,
          breakdown: false,
          active: true,
          prodRate,
        });
      }

      return machine;
    });

    setMachines(updated);
    //console.log("Updated machines:", updated);
  }, [machines, setMachines]);
}
