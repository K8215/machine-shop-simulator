import useHireOperator from "../../hooks/useHireOperator";

export default function HireOperator({
  funds,
  setFunds,
  setOpenMenu,
  setOperators,
}) {
  const { onHireOperator } = useHireOperator({
    funds,
    setFunds,
    setOperators,
  });

  const handleHire = () => onHireOperator();

  return (
    <div className="menu window">
      <h2>
        Hire Operators{" "}
        <button className="button-close" onClick={() => setOpenMenu(null)}>
          X
        </button>
      </h2>
      <div className="menu-contents">
        <button className="button-menu" onClick={handleHire}>
          Hire
        </button>
      </div>
    </div>
  );
}
