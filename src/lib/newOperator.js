import Operator from "../classes/Operator";
import operatorData from "../data/operatorSettings.json";

export function newOperator() {
  const id = Math.floor(Math.random() * 9000 + 1000);
  const firstname =
    operatorData.firstNames[
      Math.floor(Math.random() * operatorData.firstNames.length + 1)
    ];
  const lastname =
    operatorData.lastNames[
      Math.floor(Math.random() * operatorData.lastNames.length + 1)
    ];
  const specialization =
    operatorData.specializations[
      Math.floor(Math.random() * operatorData.specializations.length)
    ];
  const quirk =
    operatorData.quirks[Math.floor(Math.random() * operatorData.quirks.length)];

  return new Operator({
    id: `O-${id}`,
    name: `${firstname} ${lastname}`,
    position: {
      x: null,
      y: null,
    },
    specialization: specialization,
    rank: "novice",
    experience: 0,
    assignment: null,
    quirk: quirk,
  });
}
