import React from "react";
import styled from "@emotion/styled";
import { Flex } from "@lightspeed/flame/Core";
import { Modal, ModalBody } from "@lightspeed/flame/Modal";
import { ServerErrorContext } from "contexts/ServerError";
import { ConfigurationContext } from "contexts/Configuration";

const StyledModal = styled(Modal)`
  width: 100%;
`;

const ServerError = () => {
  const [serverError] = React.useContext(ServerErrorContext);

  const [, , , , isConfigurationVisible] = React.useContext(
    ConfigurationContext
  );

  return (
    <StyledModal isOpen={!!serverError && !isConfigurationVisible}>
      <ModalBody style={{ padding: "12px", width: "100%" }}>
        <Flex alignContent="center" flexDirection="row">
          {serverError?.message}
        </Flex>
      </ModalBody>
    </StyledModal>
  );
};

export default ServerError;
