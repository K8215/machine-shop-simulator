import { useState } from "react";
import styles from "./HumanResources.module.css";
import { updateSingleMachine } from "../../lib";

export default function HumanResources({
  setOpenMenu,
  operators,
  setOperators,
  machines,
  setMachines,
}) {
  const [popup, setPopup] = useState(false);
  const [selectedOperator, setSelectedOperator] = useState(null);

  const handlePopup = (operator) => {
    setSelectedOperator(operator);
    setPopup(true);
  };

  const handleAssignment = (machineId) => {
    if (!selectedOperator || !machineId) return;

    let updatedOperators, updatedMachines;

    if (machineId === "remove") {
      //Check for assignmed machine...
      const prevMachineId =
        selectedOperator.assignment !== "idle"
          ? selectedOperator.assignment
          : null;
      //...and remove it if it's there.
      if (prevMachineId) {
        updatedMachines = machines.map((machine) => {
          if (machine.id === prevMachineId) {
            return updateSingleMachine(machine, { active: false });
          }
          return machine;
        });
      }

      updatedOperators = operators.map((operator) => {
        return operator.id === selectedOperator.id
          ? { ...operator, assignment: "idle" }
          : operator;
      });
    } else {
      updatedOperators = operators.map((operator) => {
        return operator.id === selectedOperator.id
          ? { ...operator, assignment: machineId }
          : operator;
      });

      updatedMachines = machines.map((machine) => {
        if (machine.id === machineId) {
          return updateSingleMachine(machine, { active: true });
        }
        return machine;
      });
    }

    setOperators(updatedOperators);
    setMachines(updatedMachines);
    setPopup(false);
    setSelectedOperator(null);
  };

  return (
    <div className="menu window">
      <h2>
        Human Resources{" "}
        <button className="button-close" onClick={() => setOpenMenu(null)}>
          X
        </button>
      </h2>
      <div className="menu-contents column">
        {operators.map((operator) => (
          <div key={operator.id} className={styles["operator"]}>
            <p>
              {operator.id} - {operator.name}
            </p>
            <p>Specialization: {operator.specialization}</p>
            <p>Rank: {operator.rank}</p>
            <p>Experience: {operator.experience}</p>
            <p>Assignment: {operator.assignment}</p>
            <p>Quirk: {operator.quirk}</p>
            <button
              className="button-menu button-short"
              onClick={() => {
                handlePopup(operator);
              }}
            >
              Edit Assignment
            </button>
          </div>
        ))}
      </div>
      {popup && (
        <div className="popup">
          <div className="window">
            <h2>
              Machine Assignment{" "}
              <button className="button-close" onClick={() => setPopup(false)}>
                X
              </button>
            </h2>
            <div className="menu-contents column">
              {machines.length === 0 ? (
                <p>Purchase a machine.</p>
              ) : (
                <>
                  <p>
                    <button
                      onClick={() => handleAssignment("remove")}
                      className="button-menu"
                    >
                      Remove Assignment
                    </button>
                  </p>
                  {machines.map((machine) => (
                    <div key={machine.id}>
                      <p>
                        {machine.id} - {machine.label}
                        <button
                          onClick={() => handleAssignment(machine.id)}
                          className="button-menu"
                        >
                          Assign
                        </button>
                      </p>
                    </div>
                  ))}
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
