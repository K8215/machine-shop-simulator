import Machine from "../classes/Machine.js";
import machinesData from "../data/machineSettings.json";
import { machineColumns, machineGap, machineSize } from "../data/settings.js";

export function newMachine({ item, index }) {
  const machineType = machinesData.find((m) => m.type === item.type);
  const row = Math.floor(index / machineColumns);
  const col = index % machineColumns;
  const id = Math.floor(Math.random() * 9000 + 1000);

  return new Machine({
    id: `m-${id}`,
    label: machineType.label,
    position: {
      x: col * (machineSize + machineGap),
      y: row * (machineSize + machineGap) + machineGap,
    },
    type: machineType.type,
    letter: machineType.letter,
    price: machineType.price,
    prodRate: machineType.prodRate,
    conditionModifier: machineType.conditionModifier,
  });
}
