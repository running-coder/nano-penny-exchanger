import React from "react";

const initialBalance = 0;

interface ContextProps {
  balance: number;
  setBalance(): number;
}

export const BalanceContext = React.createContext<ContextProps>({
  balance: initialBalance,
  // @ts-ignore
  setBalance: () => {}
});

const Provider: React.FunctionComponent = ({ children }) => {
  const [balance, setBalance] = React.useState<number>(initialBalance);

  return (
    <BalanceContext.Provider value={{ balance, setBalance }}>
      {children}
    </BalanceContext.Provider>
  );
};

export default Provider;
