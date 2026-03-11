export default function Departments({ setOpenMenu }) {
  return (
    <div className="menu window">
      <h2>
        Departments{" "}
        <button className="button-close" onClick={() => setOpenMenu(null)}>
          X
        </button>
      </h2>
      <div className="menu-contents">TBD</div>
    </div>
  );
}
