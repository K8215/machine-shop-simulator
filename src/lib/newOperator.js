import Operator from "../classes/Operator";
import operatorData from "../data/operatorSettings.json";

export function newOperator() {
  const id = Math.floor(Math.random() * 9000 + 1000);
  console.log(operatorData);
  //const firstname

  return new Operator({
    id: `O-${id}`,
    name: "john doe",
    position: {
      x: null,
      y: null,
    },
    specialization: "lathe",
    rank: "novice",
    experience: 0,
    assignment: null,
    quirk: "lazy",
  });
}
