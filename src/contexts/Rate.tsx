import React from "react";

const initialRate = 0;

type ContextProps = [number, Function];

export const RateContext = React.createContext<ContextProps>([
  initialRate,
  () => {}
]);

const Provider: React.FunctionComponent = ({ children }) => {
  const [rate, setRate] = React.useState<number>(initialRate);

  return (
    <RateContext.Provider value={[rate, setRate]}>
      {children}
    </RateContext.Provider>
  );
};

export default Provider;
