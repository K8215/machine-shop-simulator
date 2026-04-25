export default function HumanResources({ setOpenMenu, operators }) {
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
          <div key={operator.id}>
            <p>
              {operator.id} - {operator.name}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
