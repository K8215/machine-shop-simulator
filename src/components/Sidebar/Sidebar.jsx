import styles from "./Sidebar.module.css";

export default function Sidebar({ setOpenMenu, funds }) {
  return (
    <aside className={`${styles["sidebar"]} window window--long`}>
      <h2>${funds}</h2>
      <div className="window-wrapper">
        <button className="button-prime" onClick={() => setOpenMenu("buy")}>
          Buy Machines
        </button>
        <button
          className="button-prime"
          onClick={() => setOpenMenu("overview")}
        >
          Overview
        </button>
        <button className="button-prime" onClick={() => setOpenMenu("hire")}>
          Hire Employees
        </button>
        <button className="button-prime" onClick={() => setOpenMenu("hr")}>
          Human Resources
        </button>
      </div>
    </aside>
  );
}
