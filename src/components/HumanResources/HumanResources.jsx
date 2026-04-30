import { useState } from "react";
import styles from "./HumanResources.module.css";
import Machine from "../../classes/Machine";

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

    const updatedOperators = operators.map((operator) =>
      operator.id === selectedOperator.id
        ? { ...operator, assignment: machineId }
        : operator,
    );

    const updatedMachines = machines.map((machine) => {
      const updatedData =
        machine.id === machineId ? { ...machine, active: "active" } : machine;

      if (updatedData instanceof Machine) {
        return updatedData;
      } else {
        return new Machine(updatedData);
      }
    }); // TODO: create util helper for machine updates. See Lumo project.

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
              Assign
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
