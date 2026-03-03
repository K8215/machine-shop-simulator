import MachineInfo from "../MachineInfo/MachineInfo";
import styles from "./Overview.module.css";

export default function Overview({ setOpenMenu, machines, lifetimeEarnings }) {
  const currentProdRate =
    machines.length > 0
      ? machines.reduce((sum, machine) => sum + machine.prodRate, 0)
      : 0;
  const scrapValue =
    machines.length > 0
      ? machines.reduce((sum, machine) => sum + machine.price / 4, 0)
      : 0;

  return (
    <div className="menu window">
      <h2>
        Overview{" "}
        <button className="button-close" onClick={() => setOpenMenu(null)}>
          X
        </button>
      </h2>
      <div className="menu-contents column">
        {machines.length > 0 ? (
          <>
            <div className={`${styles.overview} ${styles["overview-data"]}`}>
              <h2>Fast Stats:</h2>
              <div>
                <p>Lifetime Earnings: ${lifetimeEarnings}</p>
                <p>Current Production Rate: ${currentProdRate}/S</p>
                <p>Cumulative Scrap Value: ${Math.floor(scrapValue)}</p>
              </div>
            </div>
            <div
              className={`${styles.overview} ${styles["overview-machines"]}`}
            >
              <h2>Machines Status:</h2>
              <div>
                {machines.map((machine) => (
                  <div key={machine.id}>
                    <p>
                      {machine.label} {machine.id}
                    </p>
                    <MachineInfo
                      machine={machine}
                      id={machine.id}
                      margin="2rem"
                    />
                  </div>
                ))}
              </div>
            </div>
          </>
        ) : (
          <p>Purchase a machine.</p>
        )}
      </div>
    </div>
  );
}
