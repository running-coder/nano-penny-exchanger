import React from "react";

export const Steps = {
  WALLET: "wallet",
  BALANCE: "balance",
  BLOCKCHAIN: "blockchain",
  DONE: "done"
};

const initialStep = Steps.WALLET;

type ContextProps = [string, Function];

export const StepContext = React.createContext<ContextProps>([
  initialStep,
  () => {}
]);

const Provider: React.FunctionComponent = ({ children }) => {
  const [step, setStep] = React.useState<string>(initialStep);

  return (
    <StepContext.Provider value={[step, setStep]}>
      {children}
    </StepContext.Provider>
  );
};

export default Provider;
