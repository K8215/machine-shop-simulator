export default function HireOperators({ setOpenMenu, setOperators }) {
  return (
    <div className="menu window">
      <h2>
        Hire Operators{" "}
        <button className="button-close" onClick={() => setOpenMenu(null)}>
          X
        </button>
      </h2>
      <div className="menu-contents"></div>
    </div>
  );
}
