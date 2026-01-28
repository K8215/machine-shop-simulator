import { useState } from "react";
import { machineMax } from "../data/settings.js";
import { newMachine } from "../lib";

export default function useBuyMachines({
  funds,
  setFunds,
  machines,
  setMachines,
}) {
  const [cart, setCart] = useState([]);
  const [valid, setValid] = useState(true);

  const totalCost = cart.reduce((sum, item) => sum + item.price, 0);

  const onAddCart = (type, price) => {
    const newCart = [...cart, { type, price }];

    setValid(true);
    setCart(newCart);
  };

  const onRemoveCart = (index) => {
    const newCart = [...cart.slice(0, index), ...cart.slice(index + 1)];

    setCart(newCart);
    setValid(true);
  };

  const onBuyMachines = (closeMenuCallback) => {
    // Check that transaction is valid - have enough money, cart not empty, not exceeding max machines
    if (
      totalCost > funds ||
      totalCost === 0 ||
      machines.length + cart.length > machineMax
    ) {
      setValid(false);
    } else {
      const newMachines = cart.map((item, i) =>
        newMachine({ item, index: machines.length + i }),
      );

      setValid(true);
      setFunds(funds - totalCost);
      setMachines((prev) => [...prev, ...newMachines]);
      setCart([]);
      if (typeof closeMenuCallback === "function") closeMenuCallback();
    }
  };

  return { cart, valid, totalCost, onAddCart, onRemoveCart, onBuyMachines };
}
