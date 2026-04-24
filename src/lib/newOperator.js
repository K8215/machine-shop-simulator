import Operator from "../classes/Operator";
import operatorData from "../data/operatorSettings.json";

export function newOperator() {
  const id = Math.floor(Math.random() * 9000 + 1000);

  const getRandom = (prop) => {
    const selection =
      operatorData[prop][Math.floor(Math.random() * operatorData[prop].length)];
    return selection;
  };
  const firstname = getRandom("firstNames");
  const lastname = getRandom("lastNames");
  const specialization = getRandom("specializations");
  const quirk = getRandom("quirks");

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
