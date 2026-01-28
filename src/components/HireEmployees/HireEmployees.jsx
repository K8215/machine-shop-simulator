export default function HireEmployees({ setOpenMenu }) {
  return (
    <div className="menu window">
      <h2>
        Hire Employees{" "}
        <button className="button-close" onClick={() => setOpenMenu(null)}>
          X
        </button>
      </h2>
      <div className="menu-contents">TBD</div>
    </div>
  );
}
