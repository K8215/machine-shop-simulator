import Machine from "../classes/Machine.js";

export const updateSingleMachine = (machine, updates) => {
  return new Machine({ ...machine, ...updates });
};

export const updateItemById = (items, id, updates, ItemClass = null) => {
  return items.map((item) => {
    if (item.id === id) {
      const updated = { ...item, ...updates };
      return ItemClass ? new ItemClass(updated) : updated;
    }
    return item;
  });
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
