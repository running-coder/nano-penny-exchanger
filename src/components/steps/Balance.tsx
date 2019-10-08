import React from "react";
import { Box } from "@lightspeed/flame/Core";
import { Button } from "@lightspeed/flame/Button";
import { IconArrowDown } from "@lightspeed/flame/Icon/ArrowDown";
import { IconVerified } from "@lightspeed/flame/Icon/Verified";
import { Text } from "@lightspeed/flame/Text";
import { StepContext, Steps } from "contexts/Step";
import { BalanceContext } from "contexts/Balance";
import { RateContext } from "contexts/Rate";
import { PriceContext } from "contexts/Price";

const MAX_DECIMALS = 1000000000000;

const BalanceStep: React.FunctionComponent = () => {
  const [balance] = React.useContext(BalanceContext);
  const [rate] = React.useContext(RateContext);
  const [price] = React.useContext(PriceContext);
  const [step, setStep] = React.useContext(StepContext);

  const isActive = step === Steps.BALANCE;

  const nanoAmount =
    balance && rate && price
      ? Math.floor((balance / rate / price / 100) * MAX_DECIMALS) / MAX_DECIMALS
      : 0;

  return (
    <Box
      width="33%"
      textAlign="center"
      color={isActive ? "gray-100" : "gray-500"}
    >
      <Box>
        <Box as="span" fontSize="2rem">
          $
        </Box>
        <Box as="span" fontSize="3rem">
          {(balance / 100).toFixed(2)}
        </Box>
      </Box>
      <Text color={isActive ? "gray-100" : "gray-500"}>
        $ {(balance / rate / 100).toFixed(2)} USD
      </Text>

      {balance && rate && price ? (
        <>
          <Box py={2}>
            <IconArrowDown
              color={isActive ? "#4CADE9" : "gray-500"}
              size="1.8rem"
            />
          </Box>

          <Text
            style={{
              wordWrap: "break-word"
            }}
            color="#4CADE9"
            fontWeight="bold"
          >
            {nanoAmount}{" "}
            <Box
              as="span"
              color={isActive ? "gray-100" : "gray-500"}
              fontWeight="normal"
            >
              Nano
            </Box>
          </Text>
          {step === Steps.BALANCE || step === Steps.BLOCKCHAIN ? (
            <Box pt={3} textAlign="center">
              {step === Steps.BALANCE ? (
                <Button
                  variant="secondary"
                  fill
                  onClick={() => setStep(Steps.BLOCKCHAIN)}
                >
                  Convert
                </Button>
              ) : null}

              {step === Steps.BLOCKCHAIN ? (
                <IconVerified size="2.2rem" color="#4CADE9" />
              ) : null}
            </Box>
          ) : null}
        </>
      ) : null}
    </Box>
  );
};

export default BalanceStep;
