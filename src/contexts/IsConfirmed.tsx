import React from "react";

export const initialIsConfirmed = false;

type ContextProps = [boolean, Function];

export const IsConfirmedContext = React.createContext<ContextProps>([
  initialIsConfirmed,
  () => {}
]);

const Provider: React.FunctionComponent = ({ children }) => {
  const [isConfirmed, setIsConfirmed] = React.useState<boolean>(
    initialIsConfirmed
  );

  return (
    <IsConfirmedContext.Provider value={[isConfirmed, setIsConfirmed]}>
      {children}
    </IsConfirmedContext.Provider>
  );
};

export default Provider;
