import React from "react";

export const initialConfiguration = {};
export const initialIsConfigurationVisible = false;

export interface IConfiguration {
  SNAPY_API_KEY?: string;
  SNAPY_API_PASSWORD?: string;
  SNAPY_NANO_ADDRESS?: string;
  LOCAL_TUNNEL_SUBDOMAIN?: string;
}

type ContextProps = [IConfiguration, Function, boolean, Function];

export const ConfigurationContext = React.createContext<ContextProps>([
  initialConfiguration,
  () => {},
  initialIsConfigurationVisible,
  () => {}
]);

const Provider: React.FunctionComponent = ({ children }) => {
  const [configuration, setConfiguration] = React.useState<IConfiguration>(
    initialConfiguration
  );
  const [isConfigurationVisible, setIsConfigurationVisible] = React.useState<
    boolean
  >(initialIsConfigurationVisible);

  return (
    <ConfigurationContext.Provider
      value={[
        configuration,
        setConfiguration,
        isConfigurationVisible,
        setIsConfigurationVisible
      ]}
    >
      {children}
    </ConfigurationContext.Provider>
  );
};

export default Provider;
