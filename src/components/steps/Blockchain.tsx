import React from "react";
import { Box } from "@lightspeed/flame/Core";
import { StepContext, Steps } from "contexts/Step";

const BlockchainStep: React.FunctionComponent = () => {
  const [step, setStep] = React.useContext(StepContext);
  const isActive = step === Steps.BLOCKCHAIN;

  return (
    <Box
      width="33%"
      textAlign="center"
      color={isActive ? "gray-100" : "gray-500"}
    >
      Broadcast transaction to Nano blockchain
    </Box>
  );
};

export default BlockchainStep;
