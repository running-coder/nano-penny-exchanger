import React from "react";
import { BalanceContext } from "contexts/Balance";
import { PriceContext } from "contexts/Price";
import { RateContext } from "contexts/Rate";
import { HashContext } from "contexts/Hash";
import { IsSubscribedContext } from "contexts/IsSubscribed";
import { IsConfirmedContext } from "contexts/IsConfirmed";
import { ConfigurationContext } from "contexts/Configuration";
import { ServerErrorContext } from "contexts/ServerError";

const IpcRenderer = () => {
  const [, setBalance] = React.useContext(BalanceContext);
  const [, setPrice] = React.useContext(PriceContext);
  const [, setRate] = React.useContext(RateContext);
  const [, setHash] = React.useContext(HashContext);
  const [, setIsSubscribed] = React.useContext(IsSubscribedContext);
  const [, setIsConfirmed] = React.useContext(IsConfirmedContext);
  const [, setServerError] = React.useContext(ServerErrorContext);
  const [
    ,
    setConfiguration,
    ,
    setIsConfigurationReady,
    ,
    setIsConfigurationVisible
  ] = React.useContext(ConfigurationContext);

  React.useEffect(() => {
    window.ipcRenderer.on("message", (_event, data) => {
      if (data === "showConfiguration") {
        setIsConfigurationVisible(true);
        return;
      }

      try {
        const {
          price,
          rate,
          balance,
          hash,
          isSubscribed,
          isConfirmed,
          configuration,
          serverError
        } = JSON.parse(data);

        console.log("app receives", data);

        if (balance) {
          setBalance(balance);
        } else if (price) {
          setPrice(price);
        } else if (rate) {
          setRate(rate);
        } else if (hash) {
          setHash(hash);
        } else if (isSubscribed) {
          setIsSubscribed(isSubscribed);
        } else if (isConfirmed) {
          setIsConfirmed(isConfirmed);
        } else if (configuration) {
          setConfiguration(configuration);
          setIsConfigurationReady(true);
        } else if (typeof serverError !== "undefined") {
          setServerError(serverError);
        }
      } catch (e) {
        // Error handling
      }
    });

    window.ipcRenderer.send("message", JSON.stringify({ method: "getPrice" }));
    window.ipcRenderer.send("message", JSON.stringify({ method: "getRate" }));
    window.ipcRenderer.send(
      "message",
      JSON.stringify({ method: "getBalance" })
    );

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <></>;
};

export default IpcRenderer;
