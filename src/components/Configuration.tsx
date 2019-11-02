import React from "react";
import styled from "@emotion/styled";
import { Box, Flex } from "@lightspeed/flame/Core";
import { Button } from "@lightspeed/flame/Button";
import { Input } from "@lightspeed/flame/Input";
import { Modal, ModalBody } from "@lightspeed/flame/Modal";
import { ConfigurationContext, IConfiguration } from "contexts/Configuration";

const StyledModal = styled(Modal)`
  width: 100%;
`;

const Configuration = () => {
  const [
    configuration,
    ,
    isConfigurationVisible,
    setIsConfigurationVisible
  ] = React.useContext<[IConfiguration, Function, boolean, Function]>(
    ConfigurationContext
  );

  const [apiKey, setApiKey] = React.useState<string>(
    configuration.SNAPY_API_KEY || ""
  );
  const [apiPassword, setApiPassword] = React.useState<string>(
    configuration.SNAPY_API_PASSWORD || ""
  );
  const [nanoAddress, setNanoAddress] = React.useState<string>(
    configuration.SNAPY_NANO_ADDRESS || ""
  );
  const [tunnel, setTunnel] = React.useState<string>(
    configuration.LOCAL_TUNNEL_SUBDOMAIN || ""
  );

  React.useEffect(() => {
    if (!configuration) return;

    if (configuration.SNAPY_API_KEY) {
      setApiKey(configuration.SNAPY_API_KEY);
    }
    if (configuration.SNAPY_API_PASSWORD) {
      setApiPassword(configuration.SNAPY_API_PASSWORD);
    }
    if (configuration.SNAPY_NANO_ADDRESS) {
      setNanoAddress(configuration.SNAPY_NANO_ADDRESS);
    }
    if (configuration.LOCAL_TUNNEL_SUBDOMAIN) {
      setTunnel(configuration.LOCAL_TUNNEL_SUBDOMAIN);
    }
  }, [configuration]);

  const isMissingConfiguration =
    !configuration.SNAPY_API_KEY ||
    !configuration.SNAPY_API_PASSWORD ||
    !configuration.SNAPY_NANO_ADDRESS ||
    !configuration.LOCAL_TUNNEL_SUBDOMAIN;

  const isSaveEnabled = !apiKey || !apiPassword || !nanoAddress || !tunnel;

  const saveConfiguration = () => {
    setIsConfigurationVisible(false);
    console.log("sending message");
    window.ipcRenderer.send(
      "message",
      JSON.stringify({
        configuration: {
          SNAPY_API_KEY: apiKey,
          SNAPY_API_PASSWORD: apiPassword,
          SNAPY_NANO_ADDRESS: nanoAddress,
          LOCAL_TUNNEL_SUBDOMAIN: tunnel
        }
      })
    );
  };

  return (
    <StyledModal isOpen={isMissingConfiguration || isConfigurationVisible}>
      <ModalBody style={{ padding: "12px", width: "100%" }}>
        <Box pb={1}>
          <Input
            type="search"
            placeholder="Snapy.io API key"
            value={apiKey}
            onChange={e => {
              // @ts-ignore
              const { value } = e.target;
              setApiKey(value);
            }}
          />
        </Box>
        <Box pb={1}>
          <Input
            type="search"
            placeholder="Snapy.io API Password"
            value={apiPassword}
            onChange={e => {
              // @ts-ignore
              const { value } = e.target;
              setApiPassword(value);
            }}
          />
        </Box>
        <Box pb={1}>
          <Input
            type="search"
            placeholder="Snapy.io Nano Address"
            value={nanoAddress}
            onChange={e => {
              // @ts-ignore
              const { value } = e.target;
              setNanoAddress(value);
            }}
          />
        </Box>
        <Box pb={1}>
          <Input
            type="search"
            placeholder="Tunnel subdomain (This is a random string)"
            value={tunnel}
            onChange={e => {
              // @ts-ignore
              const { value } = e.target;
              setTunnel(value);
            }}
          />
        </Box>
        <Flex justifyContent="flex-end" pt={1}>
          <Button
            variant="secondary"
            fill
            onClick={saveConfiguration}
            disabled={isSaveEnabled}
          >
            Save
          </Button>
        </Flex>
      </ModalBody>
    </StyledModal>
  );
};

export default Configuration;
