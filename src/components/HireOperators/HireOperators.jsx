import { useState, useEffect } from "react";
import styles from "./HireOperators.module.css";
import useHireOperator from "../../hooks/useHireOperator";
import { newOperator } from "../../lib";

export default function HireOperator({ setFunds, setOpenMenu, setOperators }) {
  const [availableHires, setAvailableHires] = useState([]);

  const { onHireOperator } = useHireOperator({
    setFunds,
    setOperators,
  });

  const handleHire = (selectedOperator) => onHireOperator(selectedOperator);

  useEffect(() => {
    const newOperators = Array.from({ length: 3 }, () => newOperator());
    setAvailableHires(newOperators);
  }, []);

  return (
    <div className="menu window">
      <h2>
        Hire Operators{" "}
        <button className="button-close" onClick={() => setOpenMenu(null)}>
          X
        </button>
      </h2>
      <div className="menu-contents column">
        {availableHires.map((hire) => (
          <div key={hire.id} className={styles["new-hire"]}>
            <p>
              {hire.id} - {hire.name}
            </p>
            <p>Specialization: {hire.specialization}</p>
            <p>Quirk: {hire.quirk}</p>
            <button
              className={`${styles["button-hire"]} button-menu`}
              onClick={() => {
                handleHire(hire);
              }}
            >
              Hire
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
