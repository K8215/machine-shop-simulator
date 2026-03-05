import styles from "./MachineInfo.module.css";

export default function MachineInfo({ machine, id, margin }) {
  return (
    <div
      id={id}
      className={styles["machine-info-wrap"]}
      style={{
        margin: `0 0 ${margin ? margin : 0}`,
      }}
    >
      <p>
        Status: {machine.active ? "Running" : "Idle"} &{" "}
        {machine.breakdown ? "Broken" : "Functional"}
      </p>
      {/* TODO: Revise prod rate info later to incorporate operator effects */}
      <p>Production Rate: ${machine.prodRate}</p>
      <p>Repair Cost: ${machine.price / 2}</p>
      <p>Scrap Value: ${machine.price / 4}</p>
      <p>
        Condition: {Math.floor(machine.condition)}%{" "}
        <span
          className={styles["machine-condition"]}
          style={{
            backgroundColor:
              machine.condition >= 70
                ? "green"
                : 50 <= machine.condition && machine.condition < 70
                  ? "yellow"
                  : "red",
            width: `${machine.condition}%`,
          }}
        ></span>
      </p>
    </div>
  );
}
