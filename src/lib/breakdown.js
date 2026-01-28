export const conditionDepleted = (condition, isBroken) =>
  condition <= 0 && !isBroken;

export const badDiceRoll = (breakdownChance, maxCondition) => {
  const diceRoll = Math.floor(Math.random() * (maxCondition / 2) + 1);
  return breakdownChance + diceRoll > maxCondition;
};

export const degradeCondition = (current, modifier) =>
  Math.max(0, current - modifier);
