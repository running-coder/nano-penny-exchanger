import React from "react";

export const initialIsSubscribed = null;

type ContextProps = [boolean | null, Function];

export const IsSubscribedContext = React.createContext<ContextProps>([
  initialIsSubscribed,
  () => {}
]);

const Provider: React.FunctionComponent = ({ children }) => {
  const [isSubscribed, setIsSubscribed] = React.useState<boolean | null>(
    initialIsSubscribed
  );

  return (
    <IsSubscribedContext.Provider value={[isSubscribed, setIsSubscribed]}>
      {children}
    </IsSubscribedContext.Provider>
  );
};

export default Provider;
