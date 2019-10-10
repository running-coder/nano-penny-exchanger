import React from "react";

export const initialHash = "";

type ContextProps = [string, Function];

export const HashContext = React.createContext<ContextProps>([
  initialHash,
  () => {}
]);

const Provider: React.FunctionComponent = ({ children }) => {
  const [hash, setHash] = React.useState<string>(initialHash);

  return (
    <HashContext.Provider value={[hash, setHash]}>
      {children}
    </HashContext.Provider>
  );
};

export default Provider;
