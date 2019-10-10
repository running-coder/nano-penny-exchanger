import React from "react";
import { BalanceContext } from "contexts/Balance";
import { PriceContext } from "contexts/Price";
import { RateContext } from "contexts/Rate";
import { HashContext } from "contexts/Hash";
import { IsSubscribedContext } from "contexts/IsSubscribed";
import { IsConfirmedContext } from "contexts/IsConfirmed";
import { Connection } from "classes/Connection";

const useWebsocket = () => {
  const [, setBalance] = React.useContext(BalanceContext);
  const [, setPrice] = React.useContext(PriceContext);
  const [, setRate] = React.useContext(RateContext);
  const [, setHash] = React.useContext(HashContext);
  const [, setIsSubscribed] = React.useContext(IsSubscribedContext);
  const [, setIsConfirmed] = React.useContext(IsConfirmedContext);

  React.useEffect(() => {
    Connection.ws = new WebSocket("ws://localhost:8080");

    Connection.ws.onmessage = ({ data }: MessageEvent) => {
      try {
        const {
          price,
          rate,
          balance,
          hash,
          isSubscribed,
          isConfirmed
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
        }
      } catch (e) {
        // Error handling
      }
    };

    Connection.ws.onopen = () => {
      // @ts-ignore
      Connection.ws.send(JSON.stringify({ method: "getPrice" }));
      // @ts-ignore
      Connection.ws.send(JSON.stringify({ method: "getRate" }));
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <></>;
};

export default useWebsocket;
