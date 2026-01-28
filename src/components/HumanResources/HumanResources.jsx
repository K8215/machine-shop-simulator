export default function HumanResources({ setOpenMenu }) {
  return (
    <div className="menu window">
      <h2>
        Human Resources{" "}
        <button className="button-close" onClick={() => setOpenMenu(null)}>
          X
        </button>
      </h2>
      <div className="menu-contents">TBD</div>
    </div>
  );
}
