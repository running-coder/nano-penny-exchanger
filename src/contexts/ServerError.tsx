import React from "react";

const initialServerError = null;

type ContextProps = [Error | null, Function];

export const ServerErrorContext = React.createContext<ContextProps>([
  initialServerError,
  () => {}
]);

const Provider: React.FunctionComponent = ({ children }) => {
  const [serverError, setServerError] = React.useState<Error | null>(
    initialServerError
  );

  return (
    <ServerErrorContext.Provider value={[serverError, setServerError]}>
      {children}
    </ServerErrorContext.Provider>
  );
};

export default Provider;
