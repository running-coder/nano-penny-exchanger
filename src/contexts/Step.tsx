import React from "react";

export const Steps = {
  WALLET: "wallet",
  BALANCE: "balance",
  BLOCKCHAIN: "blockchain",
  DONE: "done"
};

type ContextProps = [string, Function];

export const StepContext = React.createContext<ContextProps>([
  Steps.WALLET,
  () => {}
]);

const Provider: React.FunctionComponent = ({ children }) => {
  const [step, setStep] = React.useState<string>(Steps.WALLET);

  return (
    <StepContext.Provider value={[step, setStep]}>
      {children}
    </StepContext.Provider>
  );
};

export default Provider;
