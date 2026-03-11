import { useState } from "react";
import { newOperator } from "../lib";

export default function useHireOperator({
  funds,
  setFunds,
  operators,
  setOperators,
}) {
  const onHireOperator = () => {
    const hiredOperator = newOperator();

    setFunds(funds - 100);
    setOperators((prev) => [...prev, hiredOperator]);
  };

  return { onHireOperator };
}
