import React from "react";

type ContextProps = [string, Function, boolean, Function];

export const initialWallet = "";
export const initialIsValidWallet = false;

export const WalletContext = React.createContext<ContextProps>([
  initialWallet,
  () => {},
  initialIsValidWallet,
  () => {}
]);

const Provider: React.FunctionComponent = ({ children }) => {
  const [wallet, setWallet] = React.useState<string>(initialWallet);
  const [isValidWallet, setIsValidWallet] = React.useState<boolean>(
    initialIsValidWallet
  );

  return (
    <WalletContext.Provider
      value={[wallet, setWallet, isValidWallet, setIsValidWallet]}
    >
      {children}
    </WalletContext.Provider>
  );
};

export default Provider;
