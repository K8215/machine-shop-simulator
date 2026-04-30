import { useCallback } from "react";

export default function useFunds(
  machines,
  funds,
  setFunds,
  lifetimeEarnings,
  setLifetimeEarnings,
) {
  return useCallback(() => {
    const payout = machines.reduce((sum, item) => {
      if (item.active && !item.breakdown) {
        return sum + item.prodRate;
      }
      return sum;
    }, 0);

    setFunds(funds + payout);
    setLifetimeEarnings(lifetimeEarnings + payout);
  }, [machines, funds, setFunds, lifetimeEarnings, setLifetimeEarnings]);
}
