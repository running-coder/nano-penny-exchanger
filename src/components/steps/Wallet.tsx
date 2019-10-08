import React from "react";
import { Box } from "@lightspeed/flame/Core";
import { IconBarcode } from "@lightspeed/flame/Icon/Barcode";
import { IconVerified } from "@lightspeed/flame/Icon/Verified";
import { Button } from "@lightspeed/flame/Button";
import { Text } from "@lightspeed/flame/Text";
import { WalletContext } from "contexts/Wallet";
import { Steps, StepContext } from "contexts/Step";

interface ColorizeWalletProps {
  wallet: string;
}

const ColorizeWallet: React.FunctionComponent<ColorizeWalletProps> = ({
  wallet
}) => {
  const [step] = React.useContext(StepContext);

  const isActive = step === Steps.WALLET;
  return (
    <>
      <Box as="span" fontWeight="bold" color="#4CADE9">
        {wallet.substr(wallet.length * -1, wallet.length - 60 + 7)}
      </Box>
      <Box as="span" color={isActive ? "#D7DCE1" : "gray-500"}>
        {wallet.substr(-53, 46)}
      </Box>
      <Box as="span" fontWeight="bold" color="#4CADE9">
        {wallet.substr(-7)}
      </Box>
    </>
  );
};

const WalletStep: React.FunctionComponent = () => {
  const [wallet, setWallet, isValidWallet, setIsValidWallet] = React.useContext(
    WalletContext
  );
  const [step, setStep] = React.useContext(StepContext);

  //@NOTE: only for setting up the design
  React.useEffect(() => {
    setWallet(
      "nano_1a4gxn8nhi6nksd18xzccp678r8qm3ixqbiyeetc446ahuya9jf8bnyrt55h"
    );
    setIsValidWallet(true);
    // eslint-disable-next-line
  }, []);
  return (
    <Box width="33%">
      {!wallet ? (
        <Box textAlign="center">
          <IconBarcode size="2rem" color="#D7DCE1" />
          <Text mt={2} color="#D7DCE1">
            Scan your Nano wallet
            <br />
            to continue
          </Text>
        </Box>
      ) : null}
      {wallet && isValidWallet ? (
        <Box>
          <Text
            style={{
              wordWrap: "break-word",
              // backgroundColor: "rgba(255,255,255,0.2)",
              borderRadius: "3px"
            }}
            p={2}
          >
            <ColorizeWallet wallet={wallet} />
          </Text>

          {step === Steps.WALLET ? (
            <Box pt={3} fontSize="0.825rem" color="#D7DCE1">
              Nano(s) will be deposited to the above address, verify that it is
              correct.
            </Box>
          ) : null}

          <Box pt={3} textAlign="center">
            {step === Steps.WALLET ? (
              <Button
                variant="secondary"
                fill
                onClick={() => setStep(Steps.BALANCE)}
              >
                Confirm Wallet
              </Button>
            ) : (
              <IconVerified size="2.2rem" color="#4CADE9" />
            )}
          </Box>
        </Box>
      ) : null}
      {wallet && !isValidWallet ? (
        <>
          <Text
            mt={2}
            color="#D7DCE1"
            style={{
              wordWrap: "break-word",
              maxHeight: "182px",
              overflow: "hidden"
            }}
          >
            {wallet}
          </Text>
          <Text pt={3} fontSize="0.825rem" color="maple-500">
            is not a valid Nano wallet address, try scanning again.
          </Text>
        </>
      ) : null}
    </Box>
  );
};

export default WalletStep;
