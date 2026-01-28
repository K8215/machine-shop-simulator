import styles from "./BuyMachines.module.css";
import { machineMax } from "../../data/settings.js";
import machinesData from "../../data/machineSettings.json";
import useBuyMachines from "../../hooks/useBuyMachines";

export default function BuyMachines({
  funds,
  setFunds,
  setOpenMenu,
  machines,
  setMachines,
}) {
  const { cart, valid, totalCost, onAddCart, onRemoveCart, onBuyMachines } =
    useBuyMachines({ funds, machines, setFunds, setMachines });

  const handleBuy = () => onBuyMachines(() => setOpenMenu(null));

  //Render
  return (
    <div className="menu window">
      <h2>
        Machines{" "}
        <button className="button-close" onClick={() => setOpenMenu(null)}>
          X
        </button>
      </h2>
      <div className={`${styles["buy-menu"]} menu-contents`}>
        <div className={styles["buy-menu-list"]}>
          {machinesData.map((m) => (
            <button
              key={m.type}
              className="button-prime"
              onClick={() => onAddCart(m.type, m.price)}
            >
              <span>{m.label}</span>
              <span className={styles["dots"]}></span>
              <span>${m.price}</span>
            </button>
          ))}
        </div>

        <div className={styles["buy-menu-cart"]}>
          <div className={styles["buy-menu-items"]}>
            {(cart || []).map((item, index) => (
              <p key={index} className={styles["cart-item"]}>
                {item.type}
                <button
                  className={styles["button-remove"]}
                  onClick={() => onRemoveCart(index)}
                >
                  x
                </button>
              </p>
            ))}

            {!valid && (
              <p className="error">
                {totalCost === 0
                  ? "No machines selected"
                  : machines.length + cart.length > machineMax
                    ? `Max machines: ${machineMax}`
                    : "Insufficient funds"}
              </p>
            )}
          </div>

          <div className={styles["buy-menu-tray"]}>
            <div className={styles["buy-menu-totalCost"]}>
              Total: ${totalCost}
            </div>
            <button className="button-menu" onClick={handleBuy}>
              Buy
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
