import React from "react";
import debounce from "lodash/debounce";
import { Steps, StepContext } from "contexts/Step";
import { WalletContext } from "contexts/Wallet";
import { IsSubscribedContext } from "contexts/IsSubscribed";
import { isValidPublicAddress } from "utils/.";

const MIN_BARCODE_LENGTH = 60;
let keyCount = 0;
let barcode = "";

const useScanner = () => {
  const [, setWallet, , setIsValidWallet] = React.useContext(WalletContext);
  const [, setIsSubscribed] = React.useContext(IsSubscribedContext);
  const [step, setStep] = React.useContext(StepContext);

  const registerBarcodeScan = (e: KeyboardEvent) => {
    e.stopPropagation();

    if (
      [
        "Alt",
        "Shift",
        "Ctrl",
        "Meta",
        "Super",
        "Hyper",
        "Delete",
        "Backspace"
      ].includes(e.key)
    )
      return;

    barcode += e.key;
    keyCount += 1;

    prepareBarcodeScanSubmit();
  };

  const prepareBarcodeScanSubmit = debounce(() => {
    setIsSubscribed(null);
    if (
      keyCount >= MIN_BARCODE_LENGTH &&
      [Steps.WALLET, Steps.BALANCE].includes(step)
    ) {
      const isValid = isValidPublicAddress(barcode);
      setIsValidWallet(isValid);
      setWallet(barcode);

      setStep(Steps.WALLET);
    }

    barcode = "";
    keyCount = 0;
  }, 150);

  const pasteBarcode = (event: ClipboardEvent) => {
    // @ts-ignore
    let paste = (event.clipboardData || window.clipboardData).getData("text");

    barcode = paste;
    keyCount = paste.length;

    prepareBarcodeScanSubmit();
  };

  React.useEffect(() => {
    document.addEventListener("keydown", registerBarcodeScan, true);
    document.addEventListener("paste", pasteBarcode, true);

    return () => {
      document.removeEventListener("keydown", registerBarcodeScan, true);
      document.removeEventListener("paste", pasteBarcode, true);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <></>;
};

export default useScanner;
