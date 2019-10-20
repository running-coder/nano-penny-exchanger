import React from "react";

export const initialConfiguration = {};

export interface IConfiguration {
  SNAPY_API_KEY?: string;
  SNAPY_API_PASSWORD?: string;
  SNAPY_NANO_ADDRESS?: string;
  LOCAL_TUNNEL_SUBDOMAIN?: string;
}

type ContextProps = [IConfiguration, Function];

export const ConfigurationContext = React.createContext<ContextProps>([
  initialConfiguration,
  () => {}
]);

const Provider: React.FunctionComponent = ({ children }) => {
  const [configuration, setConfiguration] = React.useState<IConfiguration>(
    initialConfiguration
  );

  React.useEffect(() => {
    console.log("configuration", configuration);
  }, [configuration]);

  return (
    <ConfigurationContext.Provider value={[configuration, setConfiguration]}>
      {children}
    </ConfigurationContext.Provider>
  );
};

export default Provider;
