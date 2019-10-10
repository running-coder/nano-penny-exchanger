import React from "react";

export const initialBalance = 0;

type ContextProps = [number, Function];

export const BalanceContext = React.createContext<ContextProps>([
  initialBalance,
  () => {}
]);

const Provider: React.FunctionComponent = ({ children }) => {
  const [balance, setBalance] = React.useState<number>(initialBalance);

  return (
    <BalanceContext.Provider value={[balance, setBalance]}>
      {children}
    </BalanceContext.Provider>
  );
};

export default Provider;
