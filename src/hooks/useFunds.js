import { useCallback } from "react";

export default function useFunds(
  machines,
  funds,
  setFunds,
  lifetimeEarnings,
  setLifetimeEarnings,
) {
  return useCallback(() => {
    const payout = machines.reduce((sum, item) => sum + item.prodRate, 0);
    setFunds(funds + payout);
    setLifetimeEarnings(lifetimeEarnings + payout);
  }, [machines, funds, setFunds, lifetimeEarnings, setLifetimeEarnings]);
}
