export default function useHireOperator({ setFunds, setOperators }) {
  const onHireOperator = (selectedOperator) => {
    if (!selectedOperator) {
      console.log("Error: No operator selected.");
      return;
    }

    const hiredOperator = {
      ...selectedOperator,
      hired: true,
    };

    setFunds((prev) => (prev || 0) - 100);
    setOperators((prev) => {
      const currentList = prev || [];
      const newList = [...currentList, hiredOperator];

      return newList;
    });
  };

  return { onHireOperator };
}
