import React from "react";
import { Box } from "@lightspeed/flame/Core";
import { IconBarcode } from "@lightspeed/flame/Icon/Barcode";
import { IconVerified } from "@lightspeed/flame/Icon/Verified";
import { Button } from "@lightspeed/flame/Button";
import { Text } from "@lightspeed/flame/Text";
import { WalletContext } from "contexts/Wallet";
import { IsSubscribedContext } from "contexts/IsSubscribed";
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
  const [isLoading, setIsLoading] = React.useState<boolean>();
  const [wallet, , isValidWallet] = React.useContext(WalletContext);
  const [step, setStep] = React.useContext(StepContext);
  const [isSubscribed] = React.useContext(IsSubscribedContext);

  const sendWallet = () => {
    setIsLoading(true);

    window.ipcRenderer.send(
      "message",
      JSON.stringify({
        address: wallet
      })
    );
  };

  React.useEffect(() => {
    setIsLoading(false);

    if (isSubscribed) {
      setStep(Steps.BALANCE);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSubscribed]);

  return (
    <Box width="33%">
      {!wallet ? (
        <Box textAlign="center">
          <IconBarcode size="2rem" color="#D7DCE1" />
          <Text mt={2} color="#D7DCE1">
            Scan your Nano wallet
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
              Nano will be sent to the above address, verify that it is correct.
            </Box>
          ) : null}

          <Box pt={3} textAlign="center">
            {step === Steps.WALLET ? (
              <Button
                variant="secondary"
                fill
                disabled={isLoading}
                loading={isLoading}
                // onClick={() => setStep(Steps.BALANCE)}
                onClick={() => sendWallet()}
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
