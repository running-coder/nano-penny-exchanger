import React from "react";

const initialPrice = 0;

type ContextProps = [number, Function];

export const PriceContext = React.createContext<ContextProps>([
  initialPrice,
  () => {}
]);

const Provider: React.FunctionComponent = ({ children }) => {
  const [price, setPrice] = React.useState<number>(initialPrice);

  return (
    <PriceContext.Provider value={[price, setPrice]}>
      {children}
    </PriceContext.Provider>
  );
};

export default Provider;
