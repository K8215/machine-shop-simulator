import styles from "./Info.module.css";
import { useState, useEffect } from "react";
import {
  machineColumns,
  machineGap,
  machineSize,
  maxCondition,
} from "../../data/gameSettings.js";
import machinesData from "../../data/machineSettings.json";
import MachineInfo from "../MachineInfo/MachineInfo";

export default function Info({
  selectedMachine,
  funds,
  setFunds,
  setMachines,
}) {
  const repairCost = selectedMachine ? selectedMachine.price / 2 : 0;
  const scrapCost = selectedMachine ? selectedMachine.price / 4 : 0;

  const [fundsError, setFundsError] = useState(false);

  const handleRepair = () => {
    if (!selectedMachine) return;
    if (funds < repairCost) {
      setFundsError(true);
      return;
    }

    const machineType = machinesData.find(
      (machine) => machine.type === selectedMachine.type,
    );

    setMachines((prev) =>
      prev.map((machine) => {
        if (machine.id !== selectedMachine.id) return machine;

        return new machine.constructor({
          ...machine,
          condition: maxCondition,
          breakdown: false,
          active: true,
          prodRate: machineType ? machineType.prodRate : machine.prodRate,
        });
      }),
    );

    setFunds(funds - repairCost);
  };

  const handleScrap = () => {
    if (!selectedMachine) return;

    setMachines((prev) =>
      prev
        .filter((machine) => machine.id !== selectedMachine.id)
        .map((machine, index) => {
          const row = Math.floor(index / machineColumns);
          const col = index % machineColumns;
          const updated = {
            ...machine,
            position: {
              x: col * (machineSize + machineGap),
              y: row * (machineSize + machineGap) + machineGap,
            },
          };

          return new machine.constructor(updated);
        }),
    );

    setFunds(funds + scrapCost);
  };

  useEffect(() => {
    if (fundsError) {
      setTimeout(() => {
        setFundsError(false);
      }, 1000);
    }
  }, [fundsError]);

  return (
    <div className={`${styles["drawer"]} window`}>
      {selectedMachine ? (
        <>
          <h2>
            Info: {selectedMachine.label} {selectedMachine.id}
          </h2>
          <div className={styles["drawer-wrapper"]}>
            <div className="window-wrapper">
              {!fundsError ? (
                <MachineInfo machine={selectedMachine} />
              ) : (
                <div className={styles["drawer-error"]}>
                  <p>Error: Insufficient Funds</p>
                </div>
              )}
            </div>
            <div className={styles["drawer-controls"]}>
              <button className="button-menu" onClick={handleRepair}>
                Repair
              </button>
              <button className="button-menu" onClick={handleScrap}>
                Scrap
              </button>
            </div>
          </div>
        </>
      ) : (
        <>
          <h2>Info: Select Machine</h2>
          <div className="window-wrapper"></div>
        </>
      )}
    </div>
  );
}
