export default function HireOperators({ setOpenMenu }) {
  return (
    <div className="menu window">
      <h2>
        Hire Operators{" "}
        <button className="button-close" onClick={() => setOpenMenu(null)}>
          X
        </button>
      </h2>
      <div className="menu-contents">TBD</div>
    </div>
  );
}
