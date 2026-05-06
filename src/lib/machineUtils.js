import Machine from "../classes/Machine.js";

export const updateMachines = (machines, machineId, updates) => {
  return machines.map((machine) => {
    const machineData =
      machine.id === machineId ? { ...machine, ...updates } : machine;

    return new Machine(machineData);
  });
};

export const updateSingleMachine = (machine, updates) => {
  return new Machine({ ...machine, ...updates });
};

//Condition/Breakdown handlers
export const conditionDepleted = (condition, isBroken) =>
  condition <= 0 && !isBroken;

export const badDiceRoll = (breakdownChance, maxCondition) => {
  const diceRoll = Math.floor(Math.random() * (maxCondition / 2) + 1);
  return breakdownChance + diceRoll > maxCondition;
};

export const degradeCondition = (current, modifier) =>
  Math.max(0, current - modifier);
